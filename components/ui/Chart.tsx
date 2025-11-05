'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatChartDate } from '@/lib/utils';

interface ChartData {
  date: string;
  income: number;
  expense: number;
}

interface ChartProps {
  data: ChartData[];
  type?: 'line' | 'bar';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const Chart: React.FC<ChartProps> = ({ data, type = 'bar', period }) => {
  const chartData = data.map((item) => ({
    ...item,
    date: formatChartDate(item.date, period),
    net: item.income - item.expense,
  }));

  const commonElements = (
    <>
      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
      <XAxis
        dataKey="date"
        className="text-xs"
        tick={{ fill: '#6B7280' }}
        angle={-45}
        textAnchor="end"
        height={80}
      />
      <YAxis
        className="text-xs"
        tick={{ fill: '#6B7280' }}
        tickFormatter={(value) => `$${value.toLocaleString()}`}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
        }}
        formatter={(value: number) => `$${value.toFixed(2)}`}
      />
      <Legend />
    </>
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'line' ? (
        <LineChart data={chartData}>
          {commonElements}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={2}
            name="Income"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={2}
            name="Expense"
            dot={{ r: 4 }}
          />
        </LineChart>
      ) : (
        <BarChart data={chartData}>
          {commonElements}
          <Bar
            dataKey="income"
            fill="#10B981"
            name="Income"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#EF4444"
            name="Expense"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

