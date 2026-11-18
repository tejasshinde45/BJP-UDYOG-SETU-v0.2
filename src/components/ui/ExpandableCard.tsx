import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  summary?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  accent?: 'none' | 'primary' | 'secondary' | 'gold';
  className?: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  subtitle,
  badge,
  icon,
  summary,
  children,
  defaultExpanded = false,
  accent = 'none',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const accentStyles = {
    none: 'border-slate-200 hover:border-slate-300',
    primary: 'border-l-4 border-l-[#E35914] border-slate-200',
    secondary: 'border-l-4 border-l-[#136938] border-slate-200',
    gold: 'border-l-4 border-l-amber-500 border-slate-200',
  }[accent];

  return (
    <div
      className={cn(
        'rounded-xl border bg-white shadow-xs transition-all duration-200',
        accentStyles,
        isExpanded && 'shadow-md ring-1 ring-slate-200',
        className
      )}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-start justify-between gap-4 p-4 sm:p-5"
      >
        <div className="flex items-start gap-3.5">
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-devanagari text-base font-bold text-[#111827]">
                {title}
              </h3>
              {badge}
            </div>
            {subtitle && (
              <p className="font-devanagari text-xs text-slate-500">
                {subtitle}
              </p>
            )}
            {summary && <div className="pt-1">{summary}</div>}
          </div>
        </div>

        <button
          type="button"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-transform duration-200 hover:bg-slate-50 hover:text-slate-900',
            isExpanded && 'rotate-180 bg-slate-50 text-[#E35914]'
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 font-devanagari text-xs sm:p-5 sm:text-sm">
          {children}
        </div>
      )}
    </div>
  );
};
