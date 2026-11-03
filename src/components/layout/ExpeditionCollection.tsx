// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Curated Sanctuaries Collection
// Minimalist High-End Indexed Layout • Award-Winning Architectural Flow
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExpeditionCollection.css';

gsap.registerPlugin(ScrollTrigger);

export interface Expedition {
  id: string;
  title: string;
  location: string;
  region: string;
  duration: string;
  startingPrice: number;
  image: string;
  badge: string;
  description: string;
}

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'coral-lagoon',
    title: 'The Coral Lagoon Atoll',
    location: 'Tetiaroa Private Island, French Polynesia',
    region: 'French Polynesia',
    duration: '7 Nights',
    startingPrice: 14500,
    image: '/images/sanctuary_tetiaroa.jpg',
    badge: 'Private Island Sanctuary',
    description: 'An untouched Polynesian haven surrounded by 12 private motus. Dedicated island host, bespoke solar catamaran atoll exploration, and personal marine biologist guides.',
  },
  {
    id: 'amazonian-cloud',
    title: 'Amazonian Cloud Forest Sanctuary',
    location: 'Mashpi Reserve, Ecuadorian Chocó',
    region: 'Ecuadorian Chocó',
    duration: '5 Nights',
    startingPrice: 9200,
    image: '/images/sanctuary_mashpi.jpg',
    badge: 'Canopy Wilderness Lodge',
    description: 'A glass-walled architectural marvel suspended in the misty canopy. Unmatched biodiversity with private resident naturalists and nocturnal canopy expeditions.',
  },
  {
    id: 'wadi-rum-nomad',
    title: 'Wadi Rum Nomad Pavilion',
    location: 'Protected Desert Valley, Jordan',
    region: 'Jordan',
    duration: '4 Nights',
    startingPrice: 7800,
    image: '/images/sanctuary_wadirum.jpg',
    badge: 'Architectural Desert Camp',
    description: 'Minimalist stone pavilions sculpted into ancient sandstone massifs. Endless celestial skies, vast silent expanses, and hearth-cooked Bedouin gastronomy under the stars.',
  },
  {
    id: 'glacial-peaks',
    title: 'High Summits Glacial Chalet',
    location: 'Valais Alps, Zermatt, Switzerland',
    region: 'Switzerland',
    duration: '6 Nights',
    startingPrice: 16000,
    image: '/images/sanctuary_zermatt.jpg',
    badge: 'Alpine Ski & Spa Sanctuary',
    description: 'A handcrafted cedar and granite chalet perched at 2,800 meters. Private helicopter glacier drops, panoramic alpine horizons, and fireside thermal serenity.',
  },
];

interface ExpeditionCollectionProps {
  onSelectExpedition: (expedition: Expedition) => void;
  onOpenConcierge?: () => void;
}

export function ExpeditionCollection({ onSelectExpedition }: ExpeditionCollectionProps) {
  // All items collapsed by default; users expand items on interaction
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Decoupled text elements in header rise in place on scroll
      if (headerRef.current) {
        const tagWrapper = headerRef.current.querySelector('.expedition-tag-wrapper');
        const title = headerRef.current.querySelector('.expedition-title');
        const subtitle = headerRef.current.querySelector('.expedition-subtitle');

        if (tagWrapper) {
          gsap.fromTo(
            tagWrapper,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (title) {
          gsap.fromTo(
            title,
            { y: 45, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 87%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (subtitle) {
          gsap.fromTo(
            subtitle,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 84%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // 2. Entry reveal for sanctuary index rows: prompt plus button & smooth text rise
      const items = container.querySelectorAll<HTMLElement>('.sanctuary-index-block');
      items.forEach((item) => {
        const rowText = item.querySelectorAll('.collapsed-index, .collapsed-title, .collapsed-region');
        const toggleBtn = item.querySelector('.sanctuary-toggle-btn');

        // Text elements rise in place
        gsap.fromTo(
          rowText,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Plus toggle button reveals promptly in tandem with zero lag
        if (toggleBtn) {
          gsap.fromTo(
            toggleBtn,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div ref={containerRef} className="expedition-collection">
      {/* ── Top Editorial Header ── */}
      <div ref={headerRef} className="expedition-header">
        <div className="expedition-tag-wrapper">
          <span className="expedition-tag-line" />
          <span className="expedition-tag">CURATED SANCTUARIES</span>
          <span className="expedition-tag-line" />
        </div>
        <h2 className="expedition-title">
          Journeys for the <span className="luxury-gradient-text">Few</span>
        </h2>
        <p className="expedition-subtitle">
          Each sanctuary accommodates a maximum of 8 guests to preserve absolute solitude and wilderness integrity.
        </p>
      </div>

      {/* ── Minimalist High-End Indexed Accordion Layout ── */}
      <div className="sanctuaries-index-wrapper" role="region" aria-label="Curated Sanctuaries Index">
        {EXPEDITIONS.map((item, index) => {
          const indexNumber = String(index + 1).padStart(2, '0');
          const isExpanded = activeId === item.id;

          return (
            <div
              key={item.id}
              className={`sanctuary-index-block ${isExpanded ? 'is-active' : ''}`}
            >
              {/* ── Row Header (Always Present): Clean, Interactive, Silky ── */}
              <div
                className="sanctuary-collapsed-row interactive"
                onClick={() => toggleItem(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
              >
                <div className="collapsed-left">
                  <span className="collapsed-index">{indexNumber}</span>
                  <h3 className="collapsed-title">{item.title}</h3>
                  <span className="collapsed-region">{item.region}</span>
                </div>

                <div className="collapsed-right">
                  <span
                    className="sanctuary-toggle-btn"
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
                  >
                    <span className="toggle-glyph">+</span>
                  </span>
                </div>
              </div>

              {/* ── Expandable Details Drawer: Slow, Smooth, Award-Winning CSS Grid Unfold ── */}
              <div className="sanctuary-expandable-drawer" aria-hidden={!isExpanded}>
                <div className="sanctuary-drawer-inner">
                  <div className="expanded-grid">
                    {/* Visual Media with Fine Architectural Framing */}
                    <div className="expanded-media-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="expanded-image"
                        loading="lazy"
                      />
                    </div>

                    {/* Minimalist Editorial Content */}
                    <div className="expanded-content">
                      <span className="expanded-breadcrumb">
                        {indexNumber} &mdash; {item.region}
                      </span>
                      <h4 className="expanded-title">{item.title}</h4>
                      <p className="expanded-location-sub">{item.location}</p>

                      <div className="expanded-meta-bar">
                        <div className="meta-spec">
                          <span className="spec-label">STAY</span>
                          <span className="spec-val">{item.duration}</span>
                        </div>
                        <div className="spec-divider" />
                        <div className="meta-spec">
                          <span className="spec-label">ALL-INCLUSIVE</span>
                          <span className="spec-val">${item.startingPrice.toLocaleString()} / Night</span>
                        </div>
                      </div>

                      <div className="expanded-action-wrap">
                        <button
                          type="button"
                          className="expanded-reserve-btn interactive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectExpedition(item);
                          }}
                        >
                          <span>Reserve Sanctuary</span>
                          <span className="reserve-arrow">&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No explore more CTA at the end as requested */}
    </div>
  );
}

export default ExpeditionCollection;
