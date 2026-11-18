import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'text-center sm:items-center',
        className
      )}
    >
      <div className={cn('space-y-1', align === 'center' && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-wider text-[#E35914] font-label">
            {eyebrow}
          </p>
        )}
        <h2 className="font-devanagari text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="font-devanagari text-xs text-[#64748B] sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
