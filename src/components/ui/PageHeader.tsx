import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ParticleConstellation } from '../animations/ParticleConstellation';
import { Reveal } from '../animations/Reveal';

export interface PageHeaderProps {
  category?: string;
  categoryIcon?: React.ReactNode;
  title: string;
  description: string;
  officialSource?: {
    label: string;
    href: string;
  };
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  categoryIcon,
  title,
  description,
  officialSource,
  actions,
  badge,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/40 p-6 shadow-[0_16px_36px_-12px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] sm:p-8 lg:p-9',
        className
      )}
    >
      {/* Precision Luminous Accent Rail - sleek 2px hairline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#E35914] via-[#F59E0B] to-[#136938]" />

      {/* Soft Ambient Glow under top rail */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#E35914]/15 via-[#F59E0B]/12 to-[#136938]/15 blur-xs"
        aria-hidden="true"
      />

      {/* Subtle Micro-Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"
        aria-hidden="true"
      />

      {/* Interactive Particle Constellation Network */}
      <ParticleConstellation
        className="pointer-events-none absolute inset-0 opacity-40"
        numParticles={18}
        maxDistance={90}
        particleColor="rgba(227, 89, 20, 0.25)"
        lineColor="rgba(227, 89, 20, 0.06)"
      />

      {/* Ambient Luminous Gradient Halos */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-amber-500/[0.06] via-orange-500/[0.03] to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-500/[0.04] via-teal-500/[0.02] to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Architectural Watermark Pattern in background */}
      <div
        className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 select-none opacity-[0.03] text-slate-900"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="h-full w-full">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path
            d="M100 10 L100 190 M10 100 L190 100 M36.36 36.36 L163.64 163.64 M36.36 163.64 L163.64 36.36"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Reveal variant="fade-right" duration={500} className="max-w-3xl space-y-3.5">
            <div className="flex flex-wrap items-center gap-2.5">
              {category && (
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-gradient-to-r from-orange-50/90 to-amber-50/60 px-3.5 py-1 text-xs font-semibold text-[#C2410C] shadow-2xs font-label">
                  {categoryIcon ? (
                    <span className="shrink-0 text-[#E35914]">{categoryIcon}</span>
                  ) : (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E35914] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E35914]" />
                    </span>
                  )}
                  {category}
                </span>
              )}
              {badge}
              {officialSource && (
                <a
                  href={officialSource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-gradient-to-r from-emerald-50/90 to-teal-50/50 px-3 py-1 text-xs font-semibold text-[#136938] shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-100/70 hover:shadow-xs"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#136938]" />
                  <span>{officialSource.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>

            <h1 className="font-devanagari text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl lg:text-[2.2rem] lg:leading-[1.25]">
              {title}
            </h1>

            <p className="font-devanagari text-sm leading-relaxed text-[#475569] sm:text-base sm:leading-relaxed">
              {description}
            </p>
          </Reveal>

          {actions && (
            <Reveal
              variant="fade-left"
              duration={500}
              delay={150}
              className="flex shrink-0 flex-wrap items-center gap-3"
            >
              {actions}
            </Reveal>
          )}
        </div>

        {children && <div className="pt-2">{children}</div>}
      </div>
    </div>
  );
};
