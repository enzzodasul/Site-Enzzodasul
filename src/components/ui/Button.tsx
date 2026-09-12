import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-display font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-glow',
    secondary:
      'bg-surface text-text hover:bg-surface-hover border border-surface-border',
    outline:
      'border border-accent text-accent hover:bg-accent hover:text-white',
    ghost:
      'bg-transparent text-text-muted hover:text-text hover:bg-surface-hover',
    glow:
      'bg-accent text-white shadow-glow hover:shadow-glow-lg animate-pulse-glow',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs uppercase tracking-wider',
    md: 'px-5 py-2.5 text-sm uppercase tracking-wider',
    lg: 'px-7 py-3.5 text-base uppercase tracking-widest',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
