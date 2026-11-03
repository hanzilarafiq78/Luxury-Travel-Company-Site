// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Quiet Luxury Navigation Bar
// Adaptive Dual-Theme (Luminous Travertine & Twilight Noir)
// Silky Subtle Cross-Fade Transitions on Section Scroll
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Navbar.css';

gsap.registerPlugin(ScrollToPlugin);

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenConcierge?: () => void;
}

export function Navbar({ onOpenBooking, onOpenConcierge }: NavbarProps) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Slow, smooth, luxury scroll navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: 0, autoKill: true },
        ease: 'power2.inOut',
      });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: {
          y: targetEl,
          autoKill: true,
        },
        ease: 'power2.inOut',
      });
    }
  };

  useEffect(() => {
    const checkNavbarTheme = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Height of the navigation threshold (navbar top zone)
      // Generous 100px threshold ensures navbar gracefully transitions into light mode
      // *before* the cream blanket settles, avoiding any white-on-cream visibility clash.
      const navThreshold = 100;

      const frontiersEl = document.getElementById('frontiers');
      const pillarsEl = document.getElementById('pillars');
      const manifestoEl = document.querySelector('.manifesto-exact-section') || document.getElementById('manifesto');
      const processEl = document.getElementById('process');

      let overLight = false;

      // 1. If Pillars (cream) covers the navbar zone:
      if (pillarsEl) {
        const pRect = pillarsEl.getBoundingClientRect();
        if (pRect.top <= navThreshold && pRect.bottom >= 15) {
          overLight = true;
        }
      }

      // 2. If Process / Atelier (cream) covers the navbar zone:
      if (!overLight && processEl) {
        const prRect = processEl.getBoundingClientRect();
        if (prRect.top <= navThreshold && prRect.bottom >= 15) {
          overLight = true;
        }
      }

      // 3. If Manifesto (cream) is in view AND Frontiers has NOT yet covered the navbar:
      if (!overLight && manifestoEl) {
        const mRect = manifestoEl.getBoundingClientRect();
        const fRect = frontiersEl ? frontiersEl.getBoundingClientRect() : null;
        const frontiersCovering = fRect && fRect.top <= navThreshold;

        if (!frontiersCovering && mRect.top <= navThreshold && mRect.bottom >= 15) {
          overLight = true;
        }
      }

      setIsLightMode(overLight);
      ticking = false;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkNavbarTheme);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    checkNavbarTheme();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header
      className={`navbar-hero-exact ${isLightMode ? 'theme-light' : 'theme-dark'} ${isScrolled ? 'is-scrolled' : ''
        }`}
    >
      <div className="navbar-hero-inner">
        {/* Brand: slow, smooth glide to top */}
        <a
          href="/"
          className="navbar-brand-exact interactive"
          onClick={(e) => handleNavClick(e, 'top')}
        >
          <span>ELYSIAN</span>
        </a>

        {/* Center Links: slow, stately, award-winning cruise to sections */}
        <nav className="navbar-nav-exact">
          <a
            href="#manifesto"
            className="nav-item-exact interactive"
            onClick={(e) => handleNavClick(e, 'manifesto')}
          >
            Manifesto
          </a>
          <a
            href="#frontiers"
            className="nav-item-exact interactive"
            onClick={(e) => handleNavClick(e, 'frontiers')}
          >
            Frontiers
          </a>
          <a
            href="#process"
            className="nav-item-exact interactive"
            onClick={(e) => handleNavClick(e, 'process')}
          >
            Atelier
          </a>
          <a
            href="#sanctuaries"
            className="nav-item-exact interactive"
            onClick={(e) => handleNavClick(e, 'sanctuaries')}
          >
            Sanctuaries
          </a>
        </nav>

        {/* Right CTA */}
        <div className="navbar-action-exact">
          <button
            type="button"
            className="navbar-reserve-pill interactive"
            onClick={onOpenBooking}
          >
            Reserve Itinerary
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
