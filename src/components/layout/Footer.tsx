// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Platform Footer
// Streamlined Single-Page Architecture • Portfolio Showcase
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LANDING_LINKS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Frontiers', href: '#frontiers' },
  { label: 'Atelier', href: '#process' },
  { label: 'Sanctuaries', href: '#sanctuaries' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const brand = footer.querySelector('.footer__brand');
      const navGroup = footer.querySelector('.footer__nav-group');
      const bottom = footer.querySelector('.footer__bottom');

      if (brand) {
        gsap.fromTo(
          brand,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (navGroup) {
        gsap.fromTo(
          navGroup,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (bottom) {
        gsap.fromTo(
          bottom,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: 0, autoKill: true },
      ease: 'power2.inOut',
    });
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: el, autoKill: true },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        {/* Top Section */}
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">ELYSIAN</span>
            <p className="footer__tagline">
              Travel Beyond the Expected. Curating the world's most untamed, secluded sanctuaries and bespoke private
              expeditions since 2024.
            </p>
          </div>

          <div className="footer__nav-group">
            <span className="footer__nav-title">Navigation</span>
            <ul className="footer__nav-links">
              {LANDING_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__link interactive"
                    onClick={(e) => handleFooterLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2026 Created by{' '}
            <a
              href="http://hanzila.me/HanzilaRafiq-Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__author-link interactive"
            >
              Hanzila Rafiq
            </a>
            . All rights reserved.
          </p>

          <button
            type="button"
            className="footer__back-to-top interactive"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>Back to Top</span>
            <span className="back-arrow">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
