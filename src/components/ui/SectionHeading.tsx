import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-10 sm:mb-14', alignments[align], className)}>
      {tag && (
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase mb-2">
          // {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-12 bg-accent rounded-full mt-4" />
    </div>
  );
};
