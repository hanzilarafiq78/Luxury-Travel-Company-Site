// ═══════════════════════════════════════════════════════════════
// ELYSIAN — The Standards of Seclusion
// Horizontal Architectural Monolith Rows • Card-Free Luxury Editorial
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PillarsSection.css';

gsap.registerPlugin(ScrollTrigger);

interface StandardRow {
  num: string;
  metric: string;
  title: string;
  subtitle: string;
  description: string;
}

const STANDARDS: StandardRow[] = [
  {
    num: '01',
    metric: '8 GUESTS MAXIMUM',
    title: 'Absolute Seclusion',
    subtitle: 'Zero Shared Horizons',
    description:
      'We strictly cap property occupancy across our global atolls, cloud forest reserves, and summit chalets. Never a neighboring crowd, never an uninvited presence. Complete sovereign privacy.',
  },
  {
    num: '02',
    metric: '100% PRIVATE TRANSIT',
    title: 'Sovereign Velocity',
    subtitle: 'Direct Vector to Wilderness',
    description:
      'Private air corridors, confidential deep-water moorings, and point-to-point helicopter transfers direct to remote geological landmarks, entirely bypassing commercial terminals.',
  },
  {
    num: '03',
    metric: '0.00 NET IMPACT',
    title: 'Restorative Imprint',
    subtitle: 'Preservation in Perpetuity',
    description:
      'Each expedition underwrites 500+ hectares of indigenous wilderness preservation, safeguarding fragile ecosystems and ancient cultural territories in permanent trust.',
  },
];

export function PillarsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Title rises in place on scroll with slow, smooth ease; disappears on scroll-up
      if (headerRef.current) {
        const titleEl = headerRef.current.querySelector('.pillars-title');
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { y: 45, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. Architectural rows rise in place on scroll with decoupled column reveals; disappear on scroll-up
      const rows = container.querySelectorAll<HTMLElement>('.standard-horizontal-row');
      rows.forEach((row) => {
        const hairline = row.querySelector('.row-hairline');
        const colIndex = row.querySelector('.row-col-index');
        const colTitle = row.querySelector('.row-col-title');
        const colNarrative = row.querySelector('.row-col-narrative');

        // Hairline expands in cleanly
        if (hairline) {
          gsap.fromTo(
            hairline,
            { opacity: 0, scaleX: 0.8 },
            {
              opacity: 1,
              scaleX: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Column 1: Index Number & Metric tag
        if (colIndex) {
          gsap.fromTo(
            colIndex,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Column 2: Title & Subtitle
        if (colTitle) {
          gsap.fromTo(
            colTitle,
            { y: 45, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 87%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Column 3: Narrative Statement
        if (colNarrative) {
          gsap.fromTo(
            colNarrative,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 84%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pillars-section light-gallery-theme" id="pillars">
      <div className="pillars-content-wrap">
        {/* Header */}
        <div ref={headerRef} className="pillars-header">
          <h2 className="pillars-title">
            The Three Inviolable <br />
            <span className="pillars-gradient-text italicized">Standards</span> of Elysian.
          </h2>
        </div>

        {/* Horizontal Editorial Rows (Zero Box Cards) */}
        <div className="standards-rows-list">
          {STANDARDS.map((item) => (
            <div key={item.num} className="standard-horizontal-row interactive">
              <div className="row-hairline" />

              <div className="row-grid-layout">
                {/* Number & Metric */}
                <div className="row-col-index">
                  <span className="row-index-num">{item.num}</span>
                  <span className="row-metric-tag">{item.metric}</span>
                </div>

                {/* Title & Subtitle */}
                <div className="row-col-title">
                  <h3 className="row-main-title">{item.title}</h3>
                  <span className="row-sub-title">{item.subtitle}</span>
                </div>

                {/* Narrative Statement */}
                <div className="row-col-narrative">
                  <p className="row-description">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="row-hairline" />
        </div>
      </div>
    </section>
  );
}

export default PillarsSection;
