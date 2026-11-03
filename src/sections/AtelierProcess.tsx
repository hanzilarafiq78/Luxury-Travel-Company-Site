// ═══════════════════════════════════════════════════════════════
// ELYSIAN — The Atelier Process: The Architecture of an Unrepeatable Journey
// Alternating 2-Column Monograph Timeline • Centered Finale CTA
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AtelierProcess.css';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  id: string;
  num: string;
  roman: string;
  tag: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-1',
    num: '01',
    roman: 'I',
    tag: 'CONFIDENTIAL DIALOGUE',
    title: 'The Unfolding of Your Inner Horizon',
    description:
      'Every journey begins with an unhurried, private exchange with your dedicated expedition architect. We do not ask for travel checklists; we listen to your acoustic preferences, threshold for solitude, and untamed yearnings.',
  },
  {
    id: 'step-2',
    num: '02',
    roman: 'II',
    tag: 'SOVEREIGN ACCESS',
    title: 'Securing the Unreachable',
    description:
      'Our advance reconnaissance unit locks private atolls, negotiates sovereign airspace clearances for helicopter drops, and commissions resident naturalists and Michelin-trained field gastronomists weeks prior to your arrival.',
  },
  {
    id: 'step-3',
    num: '03',
    roman: 'III',
    tag: 'UNINTERRUPTED TRANSIT',
    title: 'Where Silence Replaces the World',
    description:
      'From runway tarmac to remote sand massifs, your transit bypasses every commercial terminal. You arrive via private twin-turboprop or silent catamaran into complete architectural seclusion.',
  },
  {
    id: 'step-4',
    num: '04',
    roman: 'IV',
    tag: 'ECOLOGICAL LEGACY',
    title: 'A Memory Bound in Leather and Earth',
    description:
      'Upon return, receive a hand-bound photographic monograph printed on archival cotton rag, paired with a permanent land-protection deed verifying the exact wilderness coordinates conserved by your journey.',
  },
];

interface AtelierProcessProps {
  onOpenConcierge: () => void;
}

export function AtelierProcess({ onOpenConcierge }: AtelierProcessProps) {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Text reveal on section header: slow, silky rise in place
      const headerEls = container.querySelectorAll('.atelier-eyebrow, .atelier-headline');
      if (headerEls.length > 0) {
        gsap.fromTo(
          headerEls,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.querySelector('.atelier-header'),
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Scroll-driven progress line along the center timeline
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container.querySelector('.atelier-timeline-wrap'),
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Staggered text & card reveal for each monograph stage: slow, gentle rise
      const stepElements = container.querySelectorAll<HTMLElement>('.atelier-monograph-stage');
      stepElements.forEach((el, index) => {
        const cardEls = el.querySelectorAll('.stage-pin-node, .stage-num-row, .stage-title, .stage-desc');
        gsap.fromTo(
          cardEls,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Step triggers for active dot states
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 50%',
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });
      });

      // 4. Center-aligned finale CTA reveal: gentle unhurried rise
      const ctaWrap = container.querySelector('.atelier-timeline-cta-wrap');
      if (ctaWrap) {
        gsap.fromTo(
          ctaWrap,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaWrap,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="atelier-process-section light-atelier-theme" id="process">
      <div className="atelier-container">
        {/* ── CENTERED SECTION HEADER ON TOP ── */}
        <div className="atelier-header">
          <div className="atelier-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">THE ATELIER PROCESS</span>
            <span className="eyebrow-line" />
          </div>
          <h2 className="atelier-headline">
            The Architecture of an <br />
            <span className="atelier-gradient-text italicized">Unrepeatable</span> Journey.
          </h2>
        </div>

        {/* ── ALTERNATING 2-COLUMN TIMELINE FLOW ── */}
        <div className="atelier-timeline-wrap">
          {/* Central Vertical Golden Beam Track */}
          <div className="atelier-progress-track">
            <div ref={progressBarRef} className="atelier-progress-beam" />
          </div>

          {/* Alternating Monograph Stages */}
          <div className="atelier-stages-list">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              // Step 1 (idx 0) on RIGHT, Step 2 (idx 1) on LEFT, Step 3 on RIGHT, Step 4 on LEFT
              const isRight = idx % 2 === 0;

              return (
                <article
                  key={step.id}
                  className={`atelier-monograph-stage interactive ${
                    isRight ? 'stage-right' : 'stage-left'
                  } ${isActive ? 'is-active' : ''}`}
                >
                  {/* Central Spine Pin Node */}
                  <div className="stage-pin-node" aria-hidden="true">
                    <span className="node-glow" />
                  </div>

                  <div className="stage-inner-card">
                    <div className="stage-num-row">
                      <span className="stage-roman-num">{step.roman}</span>
                      <span className="stage-tag">{step.tag}</span>
                    </div>

                    <h3 className="stage-title">{step.title}</h3>

                    <p className="stage-desc">{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── CENTER-ALIGNED CTA AT THE END OF TIMELINE ── */}
          <div className="atelier-timeline-cta-wrap">
            <button
              type="button"
              className="atelier-inquire-btn interactive"
              onClick={onOpenConcierge}
            >
              <span>Commission an Expedition</span>
              <span className="btn-arrow">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AtelierProcess;
