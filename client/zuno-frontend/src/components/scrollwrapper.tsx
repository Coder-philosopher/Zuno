'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollWrapperProps {
  children: ReactNode;
  speed?: number; // scroll speed multiplier (default: 0.1)
}

const ScrollWrapper = ({ children, speed = 0.9 }: ScrollWrapperProps) => {
  const isScrolling = useRef(false);
  const scrollTarget = useRef<number | null>(null);

  const smoothScrollTo = (targetY: number) => {
    if (isScrolling.current) return;

    isScrolling.current = true;
    scrollTarget.current = targetY;

    const animate = () => {
      const currentY = window.scrollY;
      const distance = targetY - currentY;
      const step = distance * speed;

      if (Math.abs(distance) > 1) {
        window.scrollTo(0, currentY + step);
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, targetY);
        isScrolling.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetY);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [speed]);

  return <>{children}</>;
};

export default ScrollWrapper;
