// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Exact Hero Section Design
// Full-Screen Workspace Hero Background Video
// Bottom-Left Grand Typography • Bottom-Right Scroll Indicator
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideoUrl from '../assets/videos/hero.mp4';
import './HeroVideoSection.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoSectionProps {
  onExplore: () => void;
  isLoaded?: boolean;
}

export function HeroVideoSection({ onExplore, isLoaded }: HeroVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let onUserInteract: (() => void) | undefined;
    let playVideo: (() => void) | undefined;

    if (video) {
      // Ensure HTML attributes match properties for WebKit / Safari iOS policy
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');

      playVideo = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('[ELYSIAN] Autoplay was prevented:', err);
          });
        }
      };

      playVideo();
      video.addEventListener('loadeddata', playVideo);
      video.addEventListener('canplay', playVideo);

      // In case iOS Low Power Mode delays autoplay, activate on first interaction
      onUserInteract = () => {
        if (video.paused && playVideo) {
          playVideo();
        }
      };
      window.addEventListener('touchstart', onUserInteract, { once: true, passive: true });
      window.addEventListener('scroll', onUserInteract, { once: true, passive: true });
      window.addEventListener('click', onUserInteract, { once: true, passive: true });
    }

    const section = sectionRef.current;
    let ctx: gsap.Context | undefined;
    if (section) {
      ctx = gsap.context(() => {
        // 1. Slow, subtle media background parallax scrub on scroll
        if (mediaRef.current) {
          gsap.to(mediaRef.current, {
            yPercent: 14,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          });
        }

        // 2. Headline & scroll cue decoupled soft upward drift & fade
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -45,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }, section);
    }

    return () => {
      if (video && playVideo) {
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('canplay', playVideo);
      }
      if (onUserInteract) {
        window.removeEventListener('touchstart', onUserInteract);
        window.removeEventListener('scroll', onUserInteract);
        window.removeEventListener('click', onUserInteract);
      }
      ctx?.revert();
    };
  }, []);

  // Entrance reveal: Headline and scroll cue rise into place once preloader curtains open
  useEffect(() => {
    if (!isLoaded) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.headline-line-white', '.headline-line-gold', '.hero-exact-bottom-right'],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.22,
          ease: 'power3.out',
          delay: 0.25,
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section ref={sectionRef} className="hero-exact-section">
      {/* ── Cinematic Fullscreen Video Backdrop ── */}
      <div ref={mediaRef} className="hero-exact-media">
        {/* Fallback image */}
        <img
          src="/images/hero_highland_clean.jpg"
          alt="Highland Horizon"
          className="hero-exact-backdrop-img"
          loading="eager"
        />

        {/* Live Workspace Video (Imported directly via Vite) */}
        <video
          ref={videoRef}
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-exact-video-el"
        >
          <source src={heroVideoUrl} type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Filmic 35mm Vignette Scrim */}
        <div className="hero-exact-vignette" />
      </div>

      {/* ── Exact Hero Layout Content ── */}
      <div ref={contentRef} className="hero-exact-content-grid">
        {/* Bottom-Left: Imposing Editorial Headline */}
        <div className="hero-exact-bottom-left">
          <h1 className="hero-exact-headline">
            <span className="headline-line-white">Travel Beyond</span>
            <span className="headline-line-gold">the Expected.</span>
          </h1>
        </div>

        {/* Bottom-Right: Refined Scroll Indicator */}
        <div className="hero-exact-bottom-right" onClick={onExplore}>
          <span className="scroll-discover-text">SCROLL TO DISCOVER</span>
          <span className="scroll-discover-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}

export default HeroVideoSection;
