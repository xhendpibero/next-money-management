'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { categoriesAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  _id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    icon: '💰',
    color: '#6366f1',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data.categories);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory._id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoriesAPI.create(formData);
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      resetForm();
      fetchCategories();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoriesAPI.delete(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete category';
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'expense',
      icon: '💰',
      color: '#6366f1',
    });
  };

  const openModal = () => {
    resetForm();
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const filteredCategories =
    filterType === 'all'
      ? categories
      : categories.filter((cat) => cat.type === filterType);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <Button onClick={openModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="mb-6 flex space-x-4">
        <Button
          variant={filterType === 'all' ? 'primary' : 'outline'}
          onClick={() => setFilterType('all')}
        >
          All
        </Button>
        <Button
          variant={filterType === 'income' ? 'primary' : 'outline'}
          onClick={() => setFilterType('income')}
        >
          Income
        </Button>
        <Button
          variant={filterType === 'expense' ? 'primary' : 'outline'}
          onClick={() => setFilterType('expense')}
        >
          Expense
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {category.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filteredCategories.length === 0 && !loading && (
        <Card>
          <div className="text-center py-12 text-gray-500">
            No categories found. Create your first category!
          </div>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
          resetForm();
        }}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

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
            label="Icon (Emoji)"
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            required
            maxLength={2}
          />

          <Input
            label="Color (Hex)"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingCategory(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

