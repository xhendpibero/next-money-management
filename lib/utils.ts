import { format, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Get date range for a period
 */
export const getDateRange = (period: 'week' | 'month' | 'year') => {
  const now = new Date();
  let start: Date;
  let end: Date = now;

  switch (period) {
    case 'week':
      start = startOfWeek(now, { weekStartsOn: 1 });
      end = endOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'month':
      start = startOfMonth(now);
      end = endOfMonth(now);
      break;
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
      break;
    default:
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days
  }

  return { start, end };
};

/**
 * Format chart date label based on period
 */
export const formatChartDate = (date: string, period: 'daily' | 'weekly' | 'monthly' | 'yearly'): string => {
  const dateObj = parseISO(date);
  
  switch (period) {
    case 'daily':
      return format(dateObj, 'MMM dd');
    case 'weekly':
      return format(dateObj, 'MMM dd');
    case 'monthly':
      return format(dateObj, 'MMM yyyy');
    case 'yearly':
      return format(dateObj, 'yyyy');
    default:
      return format(dateObj, 'MMM dd, yyyy');
  }
};

/**
 * Get readable period name
 */
export const getPeriodLabel = (period: 'daily' | 'weekly' | 'monthly' | 'yearly'): string => {
  const labels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  };
  return labels[period] || period;
};

