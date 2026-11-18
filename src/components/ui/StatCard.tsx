import React from 'react';
import { cn } from '../../utils/cn';
import { TiltCard } from '../animations/TiltCard';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'amber';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  variant = 'default',
  className,
}) => {
  const variantStyles = {
    default: 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs hover:shadow-md',
    primary: 'border-orange-200/90 bg-gradient-to-br from-white to-orange-50/40 hover:border-orange-300 shadow-xs hover:shadow-md',
    secondary: 'border-emerald-200/90 bg-gradient-to-br from-white to-emerald-50/40 hover:border-emerald-300 shadow-xs hover:shadow-md',
    amber: 'border-amber-200/90 bg-gradient-to-br from-white to-amber-50/40 hover:border-amber-300 shadow-xs hover:shadow-md',
  }[variant];

  const iconBgStyles = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-[#E35914]/10 text-[#E35914]',
    secondary: 'bg-[#136938]/10 text-[#136938]',
    amber: 'bg-amber-100 text-amber-700',
  }[variant];

  return (
    <TiltCard
      maxTilt={5}
      scale={1.018}
      glare={true}
      className={cn(
        'group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 sm:p-5',
        variantStyles,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-devanagari text-xs font-semibold text-slate-600 sm:text-sm">
          {label}
        </p>
        {icon && (
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
              iconBgStyles
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="font-devanagari text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl transition-colors duration-200 group-hover:text-[#E35914]">
          {value}
        </div>
        {subtext && (
          <p className="mt-1 font-devanagari text-xs text-slate-500">
            {subtext}
          </p>
        )}
      </div>
    </TiltCard>
  );
};
