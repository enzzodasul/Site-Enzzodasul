import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'live' | 'outline' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'accent',
  className,
}) => {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest rounded-full font-semibold';

  const variants = {
    accent: 'bg-accent/15 text-accent border border-accent/30',
    live: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse',
    outline: 'border border-surface-border text-text-muted',
    neutral: 'bg-surface text-text-muted border border-surface-border',
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {variant === 'live' && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
      )}
      {children}
    </span>
  );
};
