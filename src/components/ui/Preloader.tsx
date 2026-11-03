// ═══════════════════════════════════════════════════════════════
// Preloader — Cinematic Loading Experience
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

export function Preloader({ onComplete, minimumDuration = 2500 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onComplete?.();
      },
    });

    // Animate counter 0 → 100
    tl.to(counterRef.current, {
      innerText: 100,
      duration: minimumDuration / 1000,
      snap: { innerText: 1 },
      ease: 'power2.inOut',
    });

    // Progress bar
    tl.to(
      progressRef.current,
      {
        scaleX: 1,
        duration: minimumDuration / 1000,
        ease: 'power2.inOut',
      },
      0
    );

    // Brand name letter animation
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.5em' },
      {
        opacity: 1,
        y: 0,
        letterSpacing: '0.3em',
        duration: 1,
        ease: 'power2.out',
      },
      0
    );

    // Exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete, minimumDuration]);

  return (
    <div ref={containerRef} className="preloader" aria-hidden={isComplete}>
      <div className="preloader__inner">
        <span ref={textRef} className="preloader__brand">
          ELYSIAN
        </span>
        <div className="preloader__progress-track">
          <div ref={progressRef} className="preloader__progress-bar" />
        </div>
        <div className="preloader__counter">
          <span ref={counterRef} className="preloader__counter-number">
            0
          </span>
          <span className="preloader__counter-symbol">%</span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
