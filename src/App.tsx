// ═══════════════════════════════════════════════════════════════
// ELYSIAN — The Floating World
// Ultra-Luxury Adventure & Exploration Platform
// Luminous Sun-Drenched Editorial Architecture • Fluid Continuous Flow
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Preloader } from './components/ui/Preloader';

gsap.registerPlugin(ScrollToPlugin);
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroVideoSection } from './sections/HeroVideoSection';
import { ManifestoSection } from './sections/ManifestoSection';
import { ElysianStoryline } from './sections/ElysianStoryline';
import { PillarsSection } from './sections/PillarsSection';
import { AtelierProcess } from './sections/AtelierProcess';
import { ExpeditionCollection, EXPEDITIONS, type Expedition } from './components/layout/ExpeditionCollection';
import { PrivateCommissionDesk } from './sections/PrivateCommissionDesk';
import { BookingDrawer } from './components/layout/BookingDrawer';
import { ConciergeModal } from './components/layout/ConciergeModal';
import { createRevealAnimations, destroyAnimations } from './animations/gsap-engine';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Modals & Drawers state
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(EXPEDITIONS[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Detect touch/mobile for cursor
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsMobile(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    requestAnimationFrame(() => {
      createRevealAnimations();
    });
  }, []);

  // Cleanup GSAP on unmount
  useEffect(() => {
    return () => destroyAnimations();
  }, []);

  const handleSelectExpedition = (exp: Expedition) => {
    setSelectedExpedition(exp);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedExpedition(EXPEDITIONS[0]);
    setIsBookingOpen(true);
  };

  const scrollToFrontiers = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: el, autoKill: true },
        ease: 'power2.inOut',
      });
    }
  };

  const scrollToSanctuaries = () => {
    const el = document.getElementById('sanctuaries');
    if (el) {
      gsap.to(window, {
        duration: 1.8,
        scrollTo: { y: el, autoKill: true },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <>
      {/* ── Branded Preloader ── */}
      <Preloader
        onComplete={handlePreloaderComplete}
        minimumDuration={1800}
      />

      {/* ── Custom Luxury Cursor (Desktop) ── */}
      {!isMobile && <CustomCursor />}

      {/* ── Quiet Luxury Navigation ── */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* ── Master Cinematic Journey (Fluid Seamless Scroll Flow) ── */}
      <main id="main-content">
        {/* ACT 0: Full-Bleed Sunlit Landscape Video Hero */}
        <HeroVideoSection
          onExplore={scrollToFrontiers}
          isLoaded={isLoaded}
        />

        {/* ACT I: The Manifesto (Bright Sunlit Alabaster Travertine) */}
        <ManifestoSection />

        {/* ACT II: The Regional Frontiers (Vibrant Turquoise, Dunes & Glaciers) */}
        <ElysianStoryline onExploreSanctuaries={scrollToSanctuaries} />

        {/* ACT III: The Pillars of Seclusion (The Three Inviolable Standards) */}
        <PillarsSection />

        {/* ACT IV: The Atelier Process (Bright Sunlit Editorial Atelier & Gold Laser) */}
        <AtelierProcess onOpenConcierge={() => setIsConciergeOpen(true)} />

        {/* ACT V: Curated Sanctuaries (Dark Obsidian Sanctuary Showcase) */}
        <section
          id="sanctuaries"
          className="sanctuaries-dark-section"
        >
          <ExpeditionCollection
            onSelectExpedition={handleSelectExpedition}
            onOpenConcierge={() => setIsConciergeOpen(true)}
          />
        </section>

        {/* ACT VI: The Private Commission Desk (Warm Amber Sunset Twilight) */}
        <PrivateCommissionDesk
          onOpenConcierge={() => setIsConciergeOpen(true)}
          onExploreSanctuaries={scrollToSanctuaries}
        />
      </main>

      {/* ── Platform Footer ── */}
      <Footer />

      {/* ── Verified Booking Drawer ── */}
      <BookingDrawer
        expedition={selectedExpedition}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onConfirmBooking={(details) => {
          console.log('[ELYSIAN] Verified Booking Request Created:', details);
        }}
      />

      {/* ── Bespoke Concierge Desk Modal ── */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </>
  );
}

export default App;
