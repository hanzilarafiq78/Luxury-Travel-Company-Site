// ═══════════════════════════════════════════════════════════════
// Custom Cursor — Luxury Interactive Cursor
// Robust Event Delegation • Never Disappears on Hover • Zero Windows Hand Cursor
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([cursor, dot], { opacity: 1, duration: 0.25 });
        isVisible = true;
      }
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'none',
      });
    };

    // Event delegation: robustly detects hover across all static & dynamic elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, [role="button"], .interactive, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (isInteractive) {
        cursor.classList.add('hovering');
        dot.classList.add('hovering');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      const currentInteractive = target?.closest(
        'a, button, [role="button"], .interactive, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const nextInteractive = related?.closest(
        'a, button, [role="button"], .interactive, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (currentInteractive && !nextInteractive) {
        cursor.classList.remove('hovering');
        dot.classList.remove('hovering');
      }
    };

    const onMouseLeaveDoc = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    const onMouseEnterDoc = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.25 });
      isVisible = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);
    document.documentElement.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterDoc);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

export default CustomCursor;

