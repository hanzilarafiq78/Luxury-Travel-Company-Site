// ═══════════════════════════════════════════════════════════════
// GSAP Animation Engine — Core Setup & Scroll Infrastructure
// ═══════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

// Register all GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase);

// ── Custom Eases ──
CustomEase.create('luxury', '0.16, 1, 0.3, 1');
CustomEase.create('smooth-out', '0.23, 1, 0.32, 1');
CustomEase.create('cinematic', '0.77, 0, 0.175, 1');
CustomEase.create('elastic-gentle', '0.68, -0.3, 0.27, 1.3');

// ── GSAP Defaults ──
gsap.defaults({
  ease: 'luxury',
  duration: 1,
});

// ── ScrollSmoother Instance ──
let smoother: ScrollSmoother | null = null;

export function initScrollSmoother(): ScrollSmoother | null {
  if (smoother) return smoother;

  const wrapper = document.getElementById('smooth-wrapper');
  const content = document.getElementById('smooth-content');

  if (!wrapper || !content) {
    console.warn('[Aurelia] smooth-wrapper or smooth-content not found. Skipping ScrollSmoother.');
    return null;
  }

  smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
  });

  return smoother;
}

export function getSmoother(): ScrollSmoother | null {
  return smoother;
}

// ── Reveal Animations (triggered by ScrollTrigger) ──
export function createRevealAnimations(): void {
  // Fade up reveals: slow, silky, understated luxury rise
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Slide from left
  gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
    gsap.fromTo(
      el,
      { x: -35, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Slide from right
  gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el) => {
    gsap.fromTo(
      el,
      { x: 35, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Scale reveals
  gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

// ── Text Split & Reveal ──
export function createTextReveal(
  selector: string | HTMLElement,
  options?: {
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Timeline {
  const {
    type = 'chars',
    stagger = 0.03,
    delay = 0,
    scrollTrigger: scrollTriggerVars,
  } = options || {};

  const element =
    typeof selector === 'string' ? document.querySelector(selector) : selector;

  if (!element) {
    console.warn(`[Aurelia] Element not found: ${selector}`);
    return gsap.timeline();
  }

  const split = new SplitText(element, {
    type: type === 'chars' ? 'chars,words' : type,
  });

  const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

  const tl = gsap.timeline({
    scrollTrigger: scrollTriggerVars || {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from(targets, {
    y: type === 'lines' ? '100%' : 30,
    opacity: type === 'lines' ? 1 : 0,
    rotateX: type === 'lines' ? 0 : -20,
    duration: type === 'chars' ? 0.8 : 1,
    stagger,
    delay,
    ease: 'luxury',
  });

  return tl;
}

// ── Parallax Effect ──
export function createParallax(
  trigger: string | HTMLElement,
  target: string | HTMLElement,
  speed: number = 0.5
): void {
  gsap.to(target, {
    yPercent: speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ── Magnetic Effect (for buttons/interactive elements) ──
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3): () => void {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic-gentle',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// ── Stagger Grid Animation ──
export function createStaggerGrid(
  container: string | HTMLElement,
  items: string,
  options?: {
    from?: 'start' | 'center' | 'end' | 'random';
    stagger?: number;
  }
): void {
  const { from = 'start', stagger = 0.1 } = options || {};

  gsap.from(items, {
    y: 60,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'luxury',
    stagger: {
      amount: (gsap.utils.toArray(items).length * stagger),
      from,
      grid: 'auto',
    },
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ── Horizontal Scroll Section ──
export function createHorizontalScroll(
  container: string | HTMLElement,
  panels: string
): ScrollTrigger {
  const panelEls = gsap.utils.toArray<HTMLElement>(panels);
  const totalWidth = panelEls.reduce((acc, el) => acc + el.offsetWidth, 0);

  const tween = gsap.to(panels, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
  });

  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${totalWidth}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });
}

// ── Cleanup ──
export function destroyAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  smoother?.kill();
  smoother = null;
}

// Re-export for convenience
export { gsap, ScrollTrigger, ScrollSmoother, SplitText };

