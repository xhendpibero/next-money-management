'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { accountsAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

interface Account {
  _id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  description?: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'cash',
    balance: '0',
    currency: 'USD',
    description: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      setAccounts(response.data.data.accounts);
    } catch {
      toast.error('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        balance: parseFloat(formData.balance),
      };
      if (editingAccount) {
        await accountsAPI.update(editingAccount._id, data);
        toast.success('Account updated successfully');
      } else {
        await accountsAPI.create(data);
        toast.success('Account created successfully');
      }
      setIsModalOpen(false);
      setEditingAccount(null);
      resetForm();
      fetchAccounts();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save account';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance.toString(),
      currency: account.currency,
      description: account.description || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) return;
    try {
      await accountsAPI.delete(id);
      toast.success('Account deleted successfully');
      fetchAccounts();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete account';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'cash',
      balance: '0',
      currency: 'USD',
      description: '',
    });
  };

  const openModal = () => {
    resetForm();
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const accountTypes = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'savings', label: 'Savings' },
    { value: 'investment', label: 'Investment' },
  ];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
        <Button onClick={openModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => (
            <motion.div
              key={account._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {account.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {account.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(account._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {account.currency} {account.balance.toFixed(2)}
                  </p>
                  {account.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {account.description}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {accounts.length === 0 && !loading && (
        <Card>
          <div className="text-center py-12 text-gray-500">
            No accounts found. Create your first account!
          </div>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAccount(null);
          resetForm();
        }}
        title={editingAccount ? 'Edit Account' : 'Add Account'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Account Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              {accountTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Initial Balance"
            type="number"
            step="0.01"
            value={formData.balance}
            onChange={(e) =>
              setFormData({ ...formData, balance: e.target.value })
            }
            required
          />

          <Input
            label="Currency"
            type="text"
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value.toUpperCase() })
            }
            required
            maxLength={3}
          />

          <Input
            label="Description (Optional)"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingAccount(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingAccount ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

