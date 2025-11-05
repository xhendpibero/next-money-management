import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6';

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
        className={`${baseStyles} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
};

