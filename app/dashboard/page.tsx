'use client';

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Chart } from '@/components/ui/Chart';
import { transactionsAPI, accountsAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
  BarChart3,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Account {
  _id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

type ChartPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';
type ChartType = 'line' | 'bar';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0,
  });
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('monthly');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [charts, setCharts] = useState({
    daily: [],
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    fetchStats();
  }, [selectedAccount]);

  const fetchAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      setAccounts(response.data.data.accounts);
      // Set first account as default if available
      if (response.data.data.accounts.length > 0 && selectedAccount === 'all') {
        // Keep 'all' as default to show all accounts
      }
    } catch {
      toast.error('Failed to load accounts');
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = selectedAccount !== 'all' ? { account: selectedAccount } : {};
      const response = await transactionsAPI.getStats(params);
      
      setStats(response.data.data.stats);
      if (response.data.data.charts) {
        setCharts(response.data.data.charts);
      }
    } catch {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: stats.totalIncome > 0 ? 'positive' : 'neutral',
    },
    {
      title: 'Total Expense',
      value: formatCurrency(stats.totalExpense),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: stats.totalExpense > 0 ? 'negative' : 'neutral',
    },
    {
      title: 'Balance',
      value: formatCurrency(stats.balance),
      icon: DollarSign,
      color: stats.balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bgColor: stats.balance >= 0 ? 'bg-blue-100' : 'bg-red-100',
      change: stats.balance >= 0 ? 'positive' : 'negative',
    },
    {
      title: 'Transactions',
      value: stats.transactionCount.toString(),
      icon: Wallet,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: 'neutral',
    },
  ];

  const accountOptions = [
    { value: 'all', label: 'All Accounts' },
    ...accounts.map((account) => ({
      value: account._id,
      label: `${account.name} (${formatCurrency(account.balance, account.currency)})`,
    })),
  ];

  const periodOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const chartTypeOptions = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
  ];

  const currentChartData = charts[chartPeriod] || [];

  if (loading && !stats.balance && !stats.transactionCount) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Account Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="w-full sm:w-auto">
            <Select
              options={accountOptions}
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="min-w-[200px]"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Financial Overview
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 w-fit sm:w-auto">
              <Select
                options={periodOptions}
                value={chartPeriod}
                onChange={(e) => setChartPeriod(e.target.value as ChartPeriod)}
                className="w-full sm:w-auto min-w-[120px]"
              />
              <Select
                options={chartTypeOptions}
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="w-full sm:w-auto min-w-[130px]"
              />
            </div>
          </div>

          {currentChartData.length > 0 ? (
            <div className="mt-4">
              <Chart
                data={currentChartData}
                type={chartType}
                period={chartPeriod}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm">
                Start adding transactions to see your financial overview
              </p>
            </div>
          )}
        </Card>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Account Summary
            </h3>
            {selectedAccount === 'all' ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Total Accounts: <span className="font-semibold">{accounts.length}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Total Balance: <span className="font-semibold text-blue-600">
                    {formatCurrency(
                      accounts.reduce((sum, acc) => sum + acc.balance, 0)
                    )}
                  </span>
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {accounts
                  .filter((acc) => acc._id === selectedAccount)
                  .map((account) => (
                    <div key={account._id}>
                      <p className="text-sm text-gray-600">
                        Account: <span className="font-semibold">{account.name}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Type: <span className="font-semibold capitalize">{account.type}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Balance: <span className="font-semibold text-blue-600">
                          {formatCurrency(account.balance, account.currency)}
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Transaction Summary
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Total Transactions: <span className="font-semibold">{stats.transactionCount}</span>
              </p>
              <p className="text-sm text-gray-600">
                Income Transactions: <span className="font-semibold text-green-600">
                  {stats.totalIncome > 0 ? 'Yes' : 'No'}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Expense Transactions: <span className="font-semibold text-red-600">
                  {stats.totalExpense > 0 ? 'Yes' : 'No'}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Net Flow: <span className={`font-semibold ${
                  stats.totalIncome - stats.totalExpense >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {formatCurrency(stats.totalIncome - stats.totalExpense)}
                </span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

