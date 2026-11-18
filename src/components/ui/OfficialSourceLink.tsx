import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

interface OfficialSourceLinkProps {
  label: string;
  href: string;
  department?: string;
  variant?: 'inline' | 'card' | 'badge';
  className?: string;
}

export const OfficialSourceLink: React.FC<OfficialSourceLinkProps> = ({
  label,
  href,
  department,
  variant = 'badge',
  className,
}) => {
  if (variant === 'card') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-[#136938] hover:shadow-md',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#136938]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-devanagari text-sm font-semibold text-slate-800 group-hover:text-[#136938]">
              {label}
            </p>
            {department && (
              <p className="text-xs text-slate-500">{department}</p>
            )}
          </div>
        </div>
        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#136938]" />
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'inline-flex items-center gap-1 font-semibold text-[#136938] hover:underline',
          className
        )}
      >
        <span>{label}</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-50/70 px-2.5 py-1 text-xs font-semibold text-[#136938] transition hover:bg-emerald-100/80',
        className
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5 text-[#136938]" />
      <span>{label}</span>
      <ExternalLink className="h-3 w-3 text-[#136938]/70" />
    </a>
  );
};
