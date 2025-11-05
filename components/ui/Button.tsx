import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Check if className contains any text color class (including arbitrary values)
  const hasCustomTextColor = className.includes('text-[') || /\btext-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)-(50|100|200|300|400|500|600|700|800|900|950|DEFAULT)\b/.test(className);

  // Remove text-white from variants if custom text color is provided
  const getVariantStyles = () => {
    let variantStyle = '';
    switch (variant) {
      case 'primary':
        variantStyle = hasCustomTextColor
          ? 'bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-[#3b82f6]'
          : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] focus:ring-[#3b82f6]';
        break;
      case 'secondary':
        variantStyle = hasCustomTextColor
          ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
          : 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500';
        break;
      case 'danger':
        variantStyle = hasCustomTextColor
          ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
          : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
        break;
      case 'outline':
        variantStyle = hasCustomTextColor
          ? 'border-2 border-[#2563eb] hover:bg-[#eff6ff] focus:ring-[#3b82f6]'
          : 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff] focus:ring-[#3b82f6]';
        break;
    }
    return variantStyle;
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${getVariantStyles()} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

