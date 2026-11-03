// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Quiet Luxury Storyline
// Award-Winning Blanket Overlay Transition • Scroll-Locked Editorial Flow
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ElysianStoryline.css';

gsap.registerPlugin(ScrollTrigger);

interface ElysianStorylineProps {
  onExploreSanctuaries?: () => void;
}

export const FRONTIERS = [
  {
    id: 'frontier-tropical',
    eyebrow: 'FRONTIER 01 / COASTAL SANCTUARIES',
    headingMain: 'Find Your Own',
    headingAccent: 'Paradise.',
    description:
      'Secluded overwater pavilions nestled amidst protected Polynesian atolls. Untouched crystal lagoons, private motus, and ocean horizons uninterrupted by the modern world.',
    linkText: 'View Coastal Sanctuaries',
    image: '/images/tropical.webp',
  },
  {
    id: 'frontier-jungle',
    eyebrow: 'FRONTIER 02 / PRIMEVAL CANOPY',
    headingMain: 'Lose Yourself in the',
    headingAccent: 'Extraordinary.',
    description:
      'Glass-walled architecture suspended within ancient cloud forests. Encounter extraordinary biodiversity, winding canopy trails, and guided midnight river expeditions.',
    linkText: 'View Rainforest Lodges',
    image: '/images/jungle.webp',
  },
  {
    id: 'frontier-desert',
    eyebrow: 'FRONTIER 03 / DUNES & CANYONS',
    headingMain: 'Discover the Beauty of',
    headingAccent: 'Solitude.',
    description:
      'Minimalist stone pavilions sculpted into ancient sandstone massifs. Endless celestial skies, vast silent expanses, and hearth-cooked Bedouin gastronomy under the stars.',
    linkText: 'View Desert Sanctuaries',
    image: '/images/desert.webp',
  },
  {
    id: 'frontier-alpine',
    eyebrow: 'FRONTIER 04 / HIGH SUMMITS',
    headingMain: 'Find Your Next',
    headingAccent: 'Summit.',
    description:
      'Handcrafted timber and stone chalets perched at 2,800 meters. Private helicopter glacier drop-offs, panoramic alpine views, and fireside serenity overlooking glacial valleys.',
    linkText: 'View Alpine Chalets',
    image: '/images/alpine.webp',
  },
];

export function ElysianStoryline({ onExploreSanctuaries }: ElysianStorylineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.chapter-panel');
      if (panels.length <= 1) return;

      // Panel 0 (Frontier 01) begins resting in full view (yPercent: 0)
      // Subsequent panels start below the viewport at yPercent: 100
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          yPercent: i === 0 ? 0 : 100,
          y: 0,
          opacity: 1,
          force3D: true,
        });
      });

      // Initial text reveal for Panel 0 (Frontier 01) as it enters viewport: slow, silky rise in place
      const p0Content = panels[0].querySelectorAll('.chapter-eyebrow, .chapter-heading, .chapter-description, .chapter-link');
      gsap.fromTo(
        p0Content,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.6,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Master Sticky Blanket Timeline:
      // The viewport is CSS sticky at top: 0 while scrolling through the 1000vh container.
      // Frontiers 01 -> 02 -> 03 -> 04 blanket over each other with slow, silky scrub.
      // Frontier 04 locks firmly on screen for a generous, serene reading dwell.
      // Then #pillars naturally glides over it like a blanket while Frontier 04 softly dims in place.
      // Once Frontier 04 is completely covered, the screen unlocks into natural scroll!
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      });

      // Chapter 1: Initial comfortable reading dwell on Frontier 01
      tl.to({}, { duration: 0.8 });

      // Animate each subsequent frontier coming over like a blanket
      for (let i = 1; i < panels.length; i++) {
        const isLast = i === panels.length - 1; // Frontier 04
        const prevPanel = panels[i - 1];
        const currentPanel = panels[i];

        // 1. Current panel glides up slowly, stately, and steadily like a heavy silk blanket
        tl.to(
          currentPanel,
          {
            yPercent: 0,
            duration: 1.4,
            ease: 'sine.inOut',
          },
          `blanket-${i}`
        );

        // Text elements inside the rising frontier rise in place with slow, graceful ease
        const contentEls = currentPanel.querySelectorAll(
          '.chapter-eyebrow, .chapter-heading, .chapter-description, .chapter-link'
        );
        tl.fromTo(
          contentEls,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.12,
            ease: 'power2.out',
          },
          `blanket-${i}+=0.35`
        );

        // 2. The previous panel beneath softly dims in tandem
        tl.to(
          prevPanel,
          {
            opacity: 0.25,
            duration: 1.4,
            ease: 'sine.inOut',
          },
          `blanket-${i}`
        );

        // Once current blanket finishes arriving, hide earlier panels completely
        // to prevent any background ghost-text bleed-through!
        const earlierPanels = panels.slice(0, i);
        tl.set(earlierPanels, { opacity: 0 });

        // 3. Dwell between panels: Frontiers 02 and 03 get a calm reading dwell
        if (!isLast) {
          tl.to({}, { duration: 0.6 });
        }
      }

      // Frontier 04 calm, locked reading dwell — rock-solid serenity on screen
      tl.to({}, { duration: 1.6 });

      // As #pillars glides over Frontier 04 like a blanket, Frontier 04 softly dims to 0 (zero lingering GPU compositor weight)
      const panel4 = panels[panels.length - 1];
      tl.to(panel4, {
        opacity: 0,
        duration: 1.2,
        ease: 'sine.inOut',
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="elysian-storyline-wrapper" id="frontiers">
      {/* ── Viewport sticky-locked on screen during storyline ── */}
      <div className="elysian-pinned-viewport">
        {FRONTIERS.map((frontier, idx) => (
          <div
            key={frontier.id}
            className={`chapter-panel chapter-panel-${idx + 1}`}
            id={frontier.id}
            style={{ zIndex: idx + 1 }}
          >
            {/* Full-bleed cinematic backdrop */}
            <div className="chapter-backdrop" aria-hidden="true">
              <img
                src={frontier.image}
                alt={frontier.headingAccent}
                className="chapter-bg-image"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="chapter-vignette" />
            </div>

            {/* Center-aligned editorial content */}
            <div className="chapter-content">
              <span className="chapter-eyebrow">
                <span className="eyebrow-line" />
                {frontier.eyebrow}
                <span className="eyebrow-line" />
              </span>

              <h2 className="chapter-heading">
                {frontier.headingMain} <br />
                <span className="luxury-gradient-text">{frontier.headingAccent}</span>
              </h2>

              <p className="chapter-description">{frontier.description}</p>

              <a
                href="#sanctuaries"
                className="chapter-link interactive"
                onClick={(e) => {
                  if (onExploreSanctuaries) {
                    e.preventDefault();
                    onExploreSanctuaries();
                  }
                }}
              >
                <span>{frontier.linkText}</span>
                <span className="link-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElysianStoryline;
