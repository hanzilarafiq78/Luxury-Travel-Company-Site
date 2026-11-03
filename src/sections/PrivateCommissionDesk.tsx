// ═══════════════════════════════════════════════════════════════
// ELYSIAN — The Cinematic Finale: Where Will Your Next Journey Take You?
// Greyish Monochrome Video Canvas • Centered Architectural Typographic Spread
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PrivateCommissionDesk.css';

gsap.registerPlugin(ScrollTrigger);

interface PrivateCommissionDeskProps {
  onOpenConcierge?: () => void;
  onExploreSanctuaries?: () => void;
}

export function PrivateCommissionDesk({
  onOpenConcierge,
  onExploreSanctuaries,
}: PrivateCommissionDeskProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Video backdrop smooth entry & subtle parallax
      if (videoWrapRef.current) {
        gsap.fromTo(
          videoWrapRef.current,
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1,
            scale: 1.0,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Editorial text elements rise in place: decoupled, slow, silky, understated
      if (contentRef.current) {
        const eyebrow = contentRef.current.querySelector('.desk-eyebrow');
        const headline = contentRef.current.querySelector('.desk-headline');
        const subtext = contentRef.current.querySelector('.desk-subtext');
        const ctaWrap = contentRef.current.querySelector('.desk-cta-wrap');

        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (headline) {
          gsap.fromTo(
            headline,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 87%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (subtext) {
          gsap.fromTo(
            subtext,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 84%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (ctaWrap) {
          gsap.fromTo(
            ctaWrap,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 81%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleExplore = () => {
    if (onExploreSanctuaries) {
      onExploreSanctuaries();
    } else if (onOpenConcierge) {
      onOpenConcierge();
    }
  };

  return (
    <section ref={sectionRef} className="private-desk-section cinematic-video-theme" id="concierge-desk">
      {/* ── Background Video Layer (Black & White / Greyish Aesthetic) ── */}
      <div ref={videoWrapRef} className="desk-video-bg-wrap" aria-hidden="true">
        <video
          className="desk-bg-video"
          src="/videos/compressed_final_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="desk-video-overlay" />
      </div>

      {/* ── Centered Content Layer ── */}
      <div ref={contentRef} className="desk-container">
        {/* Eyebrow */}
        <div className="desk-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">YOUR NEXT JOURNEY</span>
          <span className="eyebrow-line" />
        </div>

        {/* Headline */}
        <h2 className="desk-headline">
          Where Will <br />
          Your Next Journey <br />
          Take <span className="italic-accent">You?</span>
        </h2>

        {/* Subtitle */}
        <p className="desk-subtext">
          Extraordinary destinations. Unforgettable experiences. <br />
          Tailored just for you.
        </p>

        {/* Action Button */}
        <div className="desk-cta-wrap">
          <button
            type="button"
            className="desk-explore-btn interactive"
            onClick={handleExplore}
          >
            <span>EXPLORE DESTINATIONS</span>
            <span className="btn-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default PrivateCommissionDesk;
