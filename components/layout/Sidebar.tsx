'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  Tag,
  TrendingUp,
  LogOut,
  Home,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/transactions', icon: Wallet, label: 'Transactions' },
  { href: '/dashboard/categories', icon: Tag, label: 'Categories' },
  { href: '/dashboard/accounts', icon: TrendingUp, label: 'Accounts' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Wallet className="w-8 h-8 text-primary-400" />
          <span className="text-xl font-bold">Money Manager</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="px-4 py-2 mb-2 text-sm text-gray-400">
          {user?.name}
        </div>
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mb-2"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

