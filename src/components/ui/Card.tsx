import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass-panel rounded-xl p-5 transition-all duration-300 relative overflow-hidden',
        hoverEffect &&
          'hover:border-accent/40 hover:-translate-y-1 hover:shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
