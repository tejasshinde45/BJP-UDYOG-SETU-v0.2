import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export const TabsBar: React.FC<TabsBarProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pill',
  className,
}) => {
  if (variant === 'underline') {
    return (
      <div className={cn('border-b border-slate-200', className)}>
        <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                type="button"
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap border-b-2 py-3 px-1 font-devanagari text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-[#E35914] text-[#E35914]'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={cn(
                      'ml-1.5 rounded-full px-2 py-0.5 text-xs',
                      isActive
                        ? 'bg-orange-100 text-[#E35914]'
                        : 'bg-slate-100 text-slate-600'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-2xs',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
            className={cn(
              'flex items-center gap-2 rounded-lg px-3.5 py-2 font-devanagari text-xs font-semibold transition-all sm:text-sm',
              isActive
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.2 text-[11px]',
                  isActive
                    ? 'bg-orange-100 text-[#E35914]'
                    : 'bg-slate-200 text-slate-600'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
