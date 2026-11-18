import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'blur-in';
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className,
  as: Component = 'div',
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, isVisible]);

  // Variant transformations
  const getInitialStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 32px, 0)',
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -32px, 0)',
        };
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translate3d(32px, 0, 0)',
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translate3d(-32px, 0, 0)',
        };
      case 'zoom-in':
        return {
          opacity: 0,
          transform: 'scale3d(0.92, 0.92, 1)',
        };
      case 'blur-in':
        return {
          opacity: 0,
          filter: 'blur(8px)',
          transform: 'translate3d(0, 16px, 0)',
        };
      default:
        return { opacity: 0 };
    }
  };

  const getVisibleStyle = (): React.CSSProperties => {
    return {
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
      filter: 'blur(0px)',
      transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    };
  };

  return (
    <Component
      ref={ref}
      style={isVisible ? getVisibleStyle() : getInitialStyle()}
      className={cn('will-change-[transform,opacity]', className)}
    >
      {children}
    </Component>
  );
};
