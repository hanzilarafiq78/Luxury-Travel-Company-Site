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
        gsap.fromTo(
          titleEl || headerRef.current,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Architectural rows rise in place on scroll with graceful stagger; disappear on scroll-up
      const rows = container.querySelectorAll<HTMLElement>('.standard-horizontal-row');
      rows.forEach((row) => {
        const hairline = row.querySelector('.row-hairline');
        const innerCols = row.querySelectorAll('.row-col-index, .row-col-title, .row-col-narrative');

        // Hairline fades in cleanly
        if (hairline) {
          gsap.fromTo(
            hairline,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Editorial columns rise gracefully in place from disappeared state
        gsap.fromTo(
          innerCols,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
