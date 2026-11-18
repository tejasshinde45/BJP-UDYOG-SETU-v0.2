import React from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../hooks/useLanguage';

export interface StepItem {
  id: string | number;
  stepNumber?: number;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface CompactStepperProps {
  steps: StepItem[];
  activeStep?: number;
  onStepClick?: (index: number) => void;
  className?: string;
  showControls?: boolean;
  showProgressBadge?: boolean;
}

export const CompactStepper: React.FC<CompactStepperProps> = ({
  steps,
  activeStep = 0,
  onStepClick,
  className,
  showControls = true,
  showProgressBadge = true,
}) => {
  const { language } = useLanguage();
  const totalSteps = steps.length;
  const progressRatio = totalSteps > 1 ? activeStep / (totalSteps - 1) : 0;
  const progressPercent = Math.min(Math.max(progressRatio * 100, 0), 100);
  const completionPercent = Math.round(((activeStep + 1) / totalSteps) * 100);

  const stepWord = language === 'mr' ? 'टप्पा' : language === 'hi' ? 'चरण' : 'Stage';
  const completeWord = language === 'en' ? 'complete' : 'पूर्ण';
  const prevLabel = language === 'mr' ? 'मागील' : language === 'hi' ? 'पिछला' : 'Prev';
  const nextLabel = language === 'mr' ? 'पुढील' : language === 'hi' ? 'अगला' : 'Next';
  const prevAria = language === 'mr' ? 'मागील टप्पा' : language === 'hi' ? 'पिछला चरण' : 'Previous step';
  const nextAria = language === 'mr' ? 'पुढील टप्पा' : language === 'hi' ? 'अगला चरण' : 'Next step';

  const formatStepNumber = (num: number) => {
    const formatted = String(num).padStart(2, '0');
    if (language === 'mr' || language === 'hi') {
      const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return formatted.split('').map((ch) => devanagariDigits[parseInt(ch, 10)] ?? ch).join('');
    }
    return formatted;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep > 0) {
      onStepClick?.(activeStep - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep < totalSteps - 1) {
      onStepClick?.(activeStep + 1);
    }
  };

  return (
    <div className={cn('w-full space-y-5', className)}>
      {/* Top Status Header: Institutional & Minimalist */}
      {(showProgressBadge || showControls) && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
          {showProgressBadge && (
            <div className="flex items-center gap-3">
              <span className="font-label text-xs font-bold uppercase tracking-wider text-slate-700">
                {stepWord} {formatStepNumber(activeStep + 1)} / {formatStepNumber(totalSteps)}
              </span>
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden border border-slate-200/70">
                  <div
                    className="h-full bg-[#E35914] transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="font-label text-[11px] font-semibold text-slate-500">
                  {completionPercent}% {completeWord}
                </span>
              </div>
            </div>
          )}

          {showControls && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeStep === 0}
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
                  activeStep === 0
                    ? 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs'
                )}
                aria-label={prevAria}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-devanagari">{prevLabel}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeStep === totalSteps - 1}
                className={cn(
                  'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
                  activeStep === totalSteps - 1
                    ? 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs'
                )}
                aria-label={nextAria}
              >
                <span className="hidden sm:inline font-devanagari">{nextLabel}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop Horizontal Milestone Track: Clean, Authoritative & Architectural */}
      <div className="hidden lg:block pt-3 pb-2">
        <div className="relative flex items-start justify-between">
          {/* Background Connecting Rail */}
          <div className="absolute left-6 right-6 top-[18px] h-[2px] bg-slate-200" />

          {/* Active Progress Line */}
          <div
            className="absolute left-6 top-[18px] h-[2px] bg-[#E35914] transition-all duration-300 ease-out"
            style={{
              width: `calc(${progressPercent}% * (1 - 48px / 100%))`,
            }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick?.(idx)}
                className="group relative z-10 flex flex-1 flex-col items-center text-center focus:outline-none cursor-pointer"
              >
                {/* Milestone Node */}
                <div
                  className={cn(
                    'relative flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200',
                    isCompleted &&
                      'bg-[#136938] text-white ring-2 ring-[#136938]/20 shadow-xs hover:scale-105',
                    isCurrent &&
                      'bg-[#E35914] text-white border-2 border-white ring-4 ring-[#E35914]/20 shadow-xs scale-105',
                    !isCompleted &&
                      !isCurrent &&
                      'border-2 border-slate-300 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[2.5] text-white" />
                  ) : (
                    step.icon || step.stepNumber || idx + 1
                  )}
                </div>

                {/* Step Labels */}
                <div className="mt-2.5 max-w-[130px] px-1 text-center">
                  <p
                    className={cn(
                      'font-devanagari text-xs leading-tight transition-colors',
                      isCurrent
                        ? 'font-bold text-slate-900'
                        : isCompleted
                          ? 'font-semibold text-slate-700 group-hover:text-slate-900'
                          : 'font-medium text-slate-500 group-hover:text-slate-700'
                    )}
                  >
                    {step.title}
                  </p>

                  {step.subtitle && (
                    <p
                      className={cn(
                        'mt-0.5 font-devanagari text-[11px] line-clamp-1 transition-colors',
                        isCurrent
                          ? 'font-medium text-[#E35914]'
                          : 'text-slate-400'
                      )}
                    >
                      {step.subtitle}
                    </p>
                  )}

                  {isCurrent && (
                    <div className="mx-auto mt-1 h-0.5 w-5 rounded-full bg-[#E35914]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Segmented Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden no-scrollbar">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(idx)}
              className={cn(
                'group flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-all',
                isCurrent
                  ? 'border-[#E35914] bg-white text-slate-900 shadow-xs ring-1 ring-[#E35914]/30'
                  : isCompleted
                    ? 'border-slate-200 bg-emerald-50/40 text-slate-700 hover:border-slate-300'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                  isCurrent
                    ? 'bg-[#E35914] text-white'
                    : isCompleted
                      ? 'bg-[#136938] text-white'
                      : 'bg-slate-100 text-slate-600'
                )}
              >
                {isCompleted ? <Check className="h-3 w-3 stroke-[2.5]" /> : idx + 1}
              </div>

              <div className="min-w-0 pr-1">
                <p className="font-devanagari text-xs font-semibold leading-tight truncate">
                  {step.title}
                </p>
                {step.subtitle && (
                  <p className="font-devanagari text-[10px] text-slate-400 truncate">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
