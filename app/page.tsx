'use client';

import React, { useState } from 'react';
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
  Users,
  Zap,
  Globe,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Clock,
  Lock,
  Target,
  PieChart,
  Receipt,
  Calendar,
  Bell,
  Download,
  Play,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  UserPlus,
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Wallet,
      title: 'Transaction Management',
      description: 'Easily track your income and expenses with detailed categorization and smart filtering.',
      image: 'https://placehold.co/600x400/2563eb/ffffff?text=Transaction+Management',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into your spending patterns with comprehensive statistics and visual reports.',
      image: 'https://placehold.co/600x400/1d4ed8/ffffff?text=Analytics+Reports',
    },
    {
      icon: TrendingUp,
      title: 'Account Management',
      description: 'Manage multiple accounts and track balances in real-time with automatic synchronization.',
      image: 'https://placehold.co/600x400/1e40af/ffffff?text=Account+Management',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely with bank-level security protocols.',
      image: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Secure+Private',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set financial goals and track your progress with automated reminders and milestones.',
      image: 'https://placehold.co/600x400/2563eb/ffffff?text=Goal+Setting',
    },
    {
      icon: PieChart,
      title: 'Budget Planning',
      description: 'Create and manage budgets with intelligent recommendations based on your spending habits.',
      image: 'https://placehold.co/600x400/1d4ed8/ffffff?text=Budget+Planning',
    },
  ];

  const benefits = [
    'Track income and expenses effortlessly',
    'Categorize transactions for better insights',
    'Manage multiple accounts seamlessly',
    'View detailed statistics and reports',
    'Secure authentication system',
    'User-friendly dashboard interface',
    'Real-time synchronization',
    'Export data in multiple formats',
  ];

  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '$2.5M+', label: 'Transactions Tracked', icon: DollarSign },
    { value: '99.9%', label: 'Uptime', icon: Zap },
    { value: '4.9/5', label: 'User Rating', icon: Star },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      content: 'This platform has completely transformed how I manage my finances. The analytics are incredible!',
      rating: 5,
      image: 'https://placehold.co/100x100/2563eb/ffffff?text=SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      content: 'Managing multiple accounts used to be a nightmare. Now it\'s effortless and I have full visibility.',
      rating: 5,
      image: 'https://placehold.co/100x100/1d4ed8/ffffff?text=MC',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      content: 'The budgeting features helped me save 30% more this year. Highly recommend to everyone!',
      rating: 5,
      image: 'https://placehold.co/100x100/1e40af/ffffff?text=ER',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Sign Up Free',
      description: 'Create your account in less than 2 minutes. No credit card required.',
      icon: UserPlus,
      image: 'https://placehold.co/400x300/2563eb/ffffff?text=Sign+Up',
    },
    {
      step: 2,
      title: 'Add Your Accounts',
      description: 'Connect your bank accounts or manually add transactions. Your data stays secure.',
      icon: Wallet,
      image: 'https://placehold.co/400x300/1d4ed8/ffffff?text=Add+Accounts',
    },
    {
      step: 3,
      title: 'Track & Analyze',
      description: 'Monitor your spending, set budgets, and achieve your financial goals.',
      icon: BarChart3,
      image: 'https://placehold.co/400x300/1e40af/ffffff?text=Track+Analyze',
    },
  ];

  const faqs = [
    {
      question: 'Is my financial data secure?',
      answer: 'Absolutely! We use bank-level encryption (256-bit SSL) to protect your data. We never store your banking passwords and all transactions are encrypted in transit and at rest.',
    },
    {
      question: 'Can I use this for multiple accounts?',
      answer: 'Yes! You can manage unlimited accounts - checking, savings, credit cards, investments, and more. Each account is tracked separately with its own balance and transaction history.',
    },
    {
      question: 'How much does it cost?',
      answer: 'We offer a free plan with all essential features. Premium plans start at $9.99/month with advanced analytics, unlimited accounts, and priority support.',
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes, you can export your data in multiple formats including CSV, Excel, and PDF. All exports include complete transaction history and reports.',
    },
    {
      question: 'Do you offer mobile apps?',
      answer: 'Our web application is fully responsive and works on all devices. Native mobile apps for iOS and Android are coming soon!',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer comprehensive support including email support, live chat, knowledge base, video tutorials, and community forums. Premium users get priority support.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 accounts',
        'Basic transaction tracking',
        'Simple reports',
        'Email support',
        'Mobile responsive',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious money managers',
      features: [
        'Unlimited accounts',
        'Advanced analytics',
        'Budget planning',
        'Goal tracking',
        'Priority support',
        'Data export',
        'Custom categories',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per year',
      description: 'For businesses and teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced security',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantees',
        'Training & onboarding',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Wallet className="w-8 h-8 text-[#2563eb]" />
            <span className="text-2xl font-bold text-gray-900">
              Money Manager
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <a href="#features" className="text-gray-700 hover:text-[#2563eb] transition-colors font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-[#2563eb] transition-colors font-medium">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-[#2563eb] transition-colors font-medium">
              FAQ
            </a>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 text-[#2563eb] rounded-full text-sm font-semibold mb-6">
                ✨ Trusted by 50,000+ users worldwide
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Take Control of Your
                <span className="text-[#2563eb] block"> Finances</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed opacity-90">
                A powerful, intuitive money management system to track your income, expenses, and achieve your financial goals. Join thousands who are already taking control of their finances.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 py-6 text-[#2563eb]">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    <Play className="mr-2 w-5 h-5 inline" />
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="opacity-90">No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="opacity-90">14-day free trial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="opacity-90">Cancel anytime</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://placehold.co/800x600/2563eb/ffffff?text=Dashboard+Preview"
                  alt="Money Manager Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Savings</div>
                    <div className="text-2xl font-bold text-gray-900">$12,450</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-[#2563eb]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 opacity-80">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-90">
              Powerful features designed to help you manage your finances effortlessly and make informed decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed opacity-90">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-90">
              Get started in three simple steps and start managing your finances like a pro.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="relative">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#2563eb]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed opacity-90">{step.description}</p>
                    </div>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRightIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our Money Management System?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed opacity-95">
                Built with modern technologies and best practices to provide you with a seamless, secure, and intuitive experience that puts you in control.
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
                    <CheckCircle className="w-6 h-6 text-blue-200 flex-shrink-0" />
                    <span className="text-lg opacity-95">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-[#2563eb] hover:bg-gray-100">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-2xl p-8 text-gray-900">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Financial Overview</h3>
                  <Award className="w-8 h-8 text-[#2563eb]" />
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Balance</span>
                    <span className="text-2xl font-bold text-gray-900">$45,230</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">This Month</span>
                    <span className="text-xl font-semibold text-green-600">+$2,450</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Goals Progress</span>
                    <span className="text-xl font-semibold text-[#2563eb]">78%</span>
                  </div>
                </div>
                <img
                  src="https://placehold.co/400x200/2563eb/ffffff?text=Financial+Chart"
                  alt="Financial Chart"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-90">
              See what our users are saying about their experience with Money Manager.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed opacity-90 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 opacity-80">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto opacity-90">
              Choose the plan that's right for you. Upgrade or downgrade at any time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  plan.popular
                    ? 'border-[#2563eb] scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#2563eb] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period !== 'forever' && (
                      <span className="text-gray-600 ml-2 opacity-80">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2 opacity-80">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block">
                  <Button
                    size="lg"
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 opacity-90">
              Everything you need to know about Money Manager.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-700 leading-relaxed opacity-90">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto opacity-95">
              Join thousands of users who are already taking control of their finances. Start your free trial today, no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#2563eb] hover:bg-gray-100 text-lg px-8 py-6">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100 opacity-90">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>14-day free trial</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">Money Manager</span>
              </div>
              <p className="text-gray-400 leading-relaxed opacity-90 mb-4">
                Your trusted partner in financial management. Take control of your money and achieve your financial goals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#2563eb] transition-colors">
                  <Users className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors opacity-90">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors opacity-90">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors opacity-90">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 opacity-90">
              © 2024 Money Management System. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-90">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
