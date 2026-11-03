// ═══════════════════════════════════════════════════════════════
// Hero Section — Full-Screen Cinematic 3D Hero
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HeroScene } from '../three';
import './HeroSection.css';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3.2, // After preloader completes
    });

    // Reveal the overlay gradient
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Heading animation — word by word
    tl.fromTo(
      '.hero__heading-line',
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'luxury',
      },
      '-=0.6'
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'luxury' },
      '-=0.6'
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'luxury' },
      '-=0.4'
    );

    // Scroll-driven parallax on heading
    gsap.to('.hero__content', {
      yPercent: 30,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="hero">
      {/* 3D Canvas */}
      <div className="hero__3d-container">
        <HeroScene />
      </div>

      {/* Gradient overlay */}
      <div ref={overlayRef} className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">
        <div className="hero__label">
          <span className="luxury-divider" style={{ margin: 0, width: 40, display: 'inline-block', verticalAlign: 'middle', marginRight: '12px' }} />
          <span className="hero__label-text">LUXURY TRAVEL REDEFINED</span>
        </div>

        <h1 ref={headingRef} className="hero__heading">
          <span className="hero__heading-line-wrapper">
            <span className="hero__heading-line">Discover the</span>
          </span>
          <span className="hero__heading-line-wrapper">
            <span className="hero__heading-line luxury-gradient-text">
              Extraordinary
            </span>
          </span>
        </h1>

        <p ref={subtitleRef} className="hero__subtitle">
          Curated journeys to the world's most breathtaking destinations.
          <br />
          Every detail, meticulously crafted. Every moment, unforgettable.
        </p>

        <div ref={ctaRef} className="hero__cta-group">
          <a href="#destinations" className="hero__cta-primary interactive">
            <span>Explore Destinations</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#experience" className="hero__cta-secondary interactive">
            Watch Film
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator">
          <span className="hero__scroll-text">Scroll to explore</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

