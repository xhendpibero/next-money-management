'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { transactionsAPI, categoriesAPI, accountsAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Transaction {
  _id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: { _id: string; name: string; icon: string };
  account: { _id: string; name: string };
  date: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
    account: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchAccounts();
  }, []);

  const fetchData = async () => {
    try {
      const response = await transactionsAPI.getAll({ limit: 50 });
      setTransactions(response.data.data.transactions);
    } catch (error) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data.categories);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      setAccounts(response.data.data.accounts);
    } catch (error) {
      toast.error('Failed to load accounts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await transactionsAPI.update(editingTransaction._id, formData);
        toast.success('Transaction updated successfully');
      } else {
        await transactionsAPI.create(formData);
        toast.success('Transaction created successfully');
      }
      setIsModalOpen(false);
      setEditingTransaction(null);
      resetForm();
      fetchData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save transaction';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      description: transaction.description,
      category: transaction.category._id,
      account: transaction.account._id,
      date: transaction.date.split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await transactionsAPI.delete(id);
      toast.success('Transaction deleted successfully');
      fetchData();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete transaction';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      account: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const openModal = () => {
    resetForm();
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <Button onClick={openModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Account</th>
                  <th className="text-right py-3 px-4">Amount</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center space-x-1 ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center space-x-2">
                        <span>{transaction.category.icon}</span>
                        <span>{transaction.category.name}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.account.name}</td>
                    <td className="py-3 px-4 text-right font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No transactions found. Create your first transaction!
              </div>
            )}
          </div>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
          resetForm();
        }}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />

          <Input
            label="Description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select a category</option>
              {categories
                .filter((cat) => cat.type === formData.type)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account
            </label>
            <select
              value={formData.account}
              onChange={(e) =>
                setFormData({ ...formData, account: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select an account</option>
              {accounts.map((acc) => (
                <option key={acc._id} value={acc._id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingTransaction(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingTransaction ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

