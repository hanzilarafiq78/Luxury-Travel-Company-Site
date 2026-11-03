// ═══════════════════════════════════════════════════════════════
// Animation Presets — Reusable GSAP configurations
// ═══════════════════════════════════════════════════════════════

import { gsap } from 'gsap';

// Page transition configs
export const pageTransitions = {
  enter: {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'luxury',
  },
  enterActive: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'luxury',
  },
  exit: {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: 'power2.in',
  },
};

// Common scroll-trigger presets
export const scrollPresets = {
  fadeUp: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: 'luxury' },
    trigger: { start: 'top 85%', toggleActions: 'play none none reverse' as const },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1.2, ease: 'power2.out' },
    trigger: { start: 'top 80%', toggleActions: 'play none none reverse' as const },
  },
  scaleIn: {
    from: { scale: 0.85, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 1.2, ease: 'luxury' },
    trigger: { start: 'top 80%', toggleActions: 'play none none reverse' as const },
  },
  slideLeft: {
    from: { x: -80, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: 'luxury' },
    trigger: { start: 'top 85%', toggleActions: 'play none none reverse' as const },
  },
  slideRight: {
    from: { x: 80, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: 'luxury' },
    trigger: { start: 'top 85%', toggleActions: 'play none none reverse' as const },
  },
};

// Stagger patterns
export const staggerPatterns = {
  cascade: { each: 0.08, from: 'start' as const },
  center: { each: 0.06, from: 'center' as const },
  random: { each: 0.1, from: 'random' as const },
  grid: { each: 0.05, grid: 'auto' as const, from: 'start' as const },
};

// Duration presets
export const durations = {
  micro: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  dramatic: 1.5,
  cinematic: 2,
};

// Helper: create a scroll-triggered animation from presets
export function applyScrollPreset(
  target: string | HTMLElement,
  preset: keyof typeof scrollPresets,
  overrides?: Partial<{ stagger: number; delay: number }>
) {
  const config = scrollPresets[preset];
  return gsap.fromTo(target, config.from, {
    ...config.to,
    ...overrides,
    scrollTrigger: {
      trigger: target,
      ...config.trigger,
    },
  });
}

