// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Editorial Separator / Cinematic Visual Break
// Clean Architectural Horizon • Astrolabe Glyphs • Telemetry
// Dual-Theme Support: Luminous Sunlit & Twilight Noir
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import './EditorialSeparator.css';

interface EditorialSeparatorProps {
  label?: string;
  coordinates?: string;
  number?: string;
  variant?: 'minimal' | 'detailed' | 'aperture';
  theme?: 'light' | 'dark';
}

export function EditorialSeparator({
  label = 'UNCHARTED TERRITORIES',
  coordinates = 'LAT 08°20\'N — 137°20\'E • ELEV 2,800M',
  number = '— 00 —',
  variant = 'detailed',
  theme = 'dark',
}: EditorialSeparatorProps) {
  return (
    <div
      className={`editorial-separator-wrap variant-${variant} theme-${theme}`}
      aria-hidden="true"
    >
      <div className="separator-container">
        {/* Left Hairline Rule */}
        <div className="separator-hairline hairline-left" />

        {/* Center Astrolabe / Coordinate Emblem */}
        <div className="separator-emblem">
          <div className="astrolabe-ring">
            <svg viewBox="0 0 40 40" className="astrolabe-svg">
              <circle cx="20" cy="20" r="18" className="astrolabe-outer" />
              <circle cx="20" cy="20" r="12" className="astrolabe-inner" />
              <line x1="20" y1="2" x2="20" y2="38" className="astrolabe-axis" />
              <line x1="2" y1="20" x2="38" y2="20" className="astrolabe-axis" />
              <circle cx="20" cy="20" r="2.5" className="astrolabe-core" />
            </svg>
          </div>

          <div className="separator-telemetry">
            <span className="telemetry-label">{label}</span>
            <span className="telemetry-number">{number}</span>
            <span className="telemetry-coords">{coordinates}</span>
          </div>
        </div>

        {/* Right Hairline Rule */}
        <div className="separator-hairline hairline-right" />
      </div>
    </div>
  );
}

export default EditorialSeparator;
