// ═══════════════════════════════════════════════════════════════
// ELYSIAN — The Manifesto: "We don't believe in itinerary. We believe in being."
// Exact Layout Matching Master Reference: Asymmetric Editorial & Overlapping Dual Photos
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ManifestoSection.css';

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cliffRef = useRef<HTMLDivElement>(null);
  const sunsetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Text elements rise in place with subtle stagger (Award-Winning Style)
      const eyebrow = section.querySelector('.manifesto-eyebrow-row');
      const quoteLines = section.querySelectorAll('.quote-line-dark, .quote-line-gold');
      const leadParagraph = section.querySelector('.manifesto-lead-paragraph');
      const ctaRow = section.querySelector('.manifesto-cta-row');

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      if (eyebrow) {
        textTl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          0
        );
      }

      if (quoteLines.length > 0) {
        textTl.fromTo(
          quoteLines,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            stagger: 0.18,
            ease: 'power2.out',
          },
          0.12
        );
      }

      if (leadParagraph) {
        textTl.fromTo(
          leadParagraph,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          0.38
        );
      }

      if (ctaRow) {
        textTl.fromTo(
          ctaRow,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
          0.52
        );
      }

      // 2. Dual photos reveal: slow, silky rise in place with subtle scale
      if (cliffRef.current) {
        gsap.fromTo(
          cliffRef.current,
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cliffRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (sunsetRef.current) {
        gsap.fromTo(
          sunsetRef.current,
          { opacity: 0, y: 36, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.8,
            delay: 0.22,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sunsetRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToFrontiers = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('frontiers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="manifesto-exact-section light-luminous-theme" id="manifesto">
      <div className="manifesto-exact-container">
        {/* ── LEFT COLUMN: EDITORIAL STATEMENT ── */}
        <div ref={textRef} className="manifesto-editorial-col">
          {/* Eyebrow with horizontal trailing hairline */}
          <div className="manifesto-eyebrow-row">
            <span className="manifesto-eyebrow-text">MANIFESTO</span>
            <span className="manifesto-eyebrow-rule" />
          </div>

          {/* Grand Typographic Quote */}
          <h2 className="manifesto-quote-title">
            <span className="quote-line-dark">We don&apos;t believe</span>
            <span className="quote-line-dark">in itinerary.</span>
            <span className="quote-line-gold">We believe in being.</span>
          </h2>

          {/* Minimal Editorial Lead Paragraph */}
          <p className="manifesto-lead-paragraph">
            We curate sovereign, unscripted solitudes across earth’s most secluded sanctuaries. Journeys shaped not by scheduled hours, but by the quiet luxury of absolute presence.
          </p>

          {/* Explore Further Action */}
          <div className="manifesto-cta-row">
            <a
              href="#frontiers"
              className="manifesto-explore-cta interactive"
              onClick={scrollToFrontiers}
            >
              <span className="cta-hairline" />
              <span className="cta-label">EXPLORE FURTHER</span>
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN: OVERLAPPING DUAL-PHOTO EXHIBITION ── */}
        <div className="manifesto-visual-col">
          {/* Dual Photos Stage */}
          <div className="manifesto-photos-stage">
            {/* Top Image: Vertical Ocean Cliff Portrait */}
            <div ref={cliffRef} className="manifesto-photo-wrap photo-cliff-portrait">
              <img
                src="/images/manifesto_cliff.jpg"
                alt="Coastal Headland Sanctuary"
                className="manifesto-photo-img"
                loading="eager"
              />
            </div>

            {/* Bottom Image: Horizontal Sunset Aegean Landscape (Overlapping at Bottom) */}
            <div ref={sunsetRef} className="manifesto-photo-wrap photo-sunset-landscape">
              <img
                src="/images/manifesto_sunset.jpg"
                alt="Sunlit Solitude"
                className="manifesto-photo-img"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManifestoSection;
