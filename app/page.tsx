'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Wallet,
      title: 'Transaction Management',
      description: 'Easily track your income and expenses with detailed categorization.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into your spending patterns with comprehensive statistics.',
    },
    {
      icon: TrendingUp,
      title: 'Account Management',
      description: 'Manage multiple accounts and track balances in real-time.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely.',
    },
  ];

  const benefits = [
    'Track income and expenses effortlessly',
    'Categorize transactions for better insights',
    'Manage multiple accounts',
    'View detailed statistics and reports',
    'Secure authentication system',
    'User-friendly dashboard interface',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Wallet className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">
              Money Manager
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </motion.div>
        </nav>

        <div className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Take Control of Your
              <span className="text-primary-600"> Finances</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A simple, powerful money management system to track your income,
              expenses, and financial goals.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/register">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Manage your finances with our comprehensive features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Our Money Management System?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Built with modern technologies and best practices to provide you
                with a seamless experience.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-primary-200 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-2xl p-8 text-gray-900">
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of users managing their finances better.
                </p>
                <Link href="/register">
                  <Button size="lg" className="w-full">
                    Create Free Account
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Wallet className="w-6 h-6 text-primary-400" />
            <span className="text-xl font-bold">Money Manager</span>
          </div>
          <p className="text-gray-400">
            © 2024 Money Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
