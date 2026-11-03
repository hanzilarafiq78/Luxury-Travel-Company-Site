// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Interactive Booking Drawer
// Credible Luxury Reservation Flow with Authoritative Pricing
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import type { Expedition } from './ExpeditionCollection';
import './BookingDrawer.css';

interface BookingDrawerProps {
  expedition: Expedition | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export function BookingDrawer({ expedition, isOpen, onClose, onConfirmBooking }: BookingDrawerProps) {
  const [guests, setGuests] = useState(2);
  const [selectedSeason, setSelectedSeason] = useState('Spring Solstice');
  const [flightCharter, setFlightCharter] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !expedition) return null;

  const basePrice = expedition.startingPrice * guests;
  const charterFee = flightCharter ? 3200 : 0;
  const conservationLevy = 450 * guests;
  const totalPrice = basePrice + charterFee + conservationLevy;

  const handleBook = () => {
    const ref = `ELY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setBookingRef(ref);
    setConfirmed(true);
    onConfirmBooking({
      ref,
      expeditionId: expedition.id,
      title: expedition.title,
      guests,
      season: selectedSeason,
      flightCharter,
      totalPrice,
    });
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="booking-drawer-backdrop" onClick={onClose}>
      <div className="booking-drawer" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="drawer-close-btn interactive" onClick={onClose}>
          ✕
        </button>

        {!confirmed ? (
          <div className="drawer-body">
            <span className="drawer-eyebrow">RESERVATION ENQUIRY</span>
            <h2 className="drawer-title">{expedition.title}</h2>
            <p className="drawer-loc">{expedition.location}</p>

            <div className="drawer-section">
              <label className="drawer-label">Preferred Expedition Season</label>
              <div className="season-pills">
                {['Spring Solstice', 'Summer Zenith', 'Autumn Equinox', 'Winter Aurora'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`season-pill interactive ${selectedSeason === s ? 'active' : ''}`}
                    onClick={() => setSelectedSeason(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="drawer-section">
              <div className="guest-row">
                <label className="drawer-label">Guests (Max 8)</label>
                <div className="guest-counter">
                  <button
                    type="button"
                    className="counter-btn interactive"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    −
                  </button>
                  <span className="guest-count">{guests}</span>
                  <button
                    type="button"
                    className="counter-btn interactive"
                    onClick={() => setGuests(Math.min(8, guests + 1))}
                    disabled={guests >= 8}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="drawer-section">
              <label className="drawer-checkbox-row interactive">
                <input
                  type="checkbox"
                  checked={flightCharter}
                  onChange={(e) => setFlightCharter(e.target.checked)}
                />
                <div className="checkbox-text">
                  <span className="checkbox-title">Private Amphibious / Helo Charter</span>
                  <span className="checkbox-sub">Direct door-to-sanctuary transit with VIP tarmac clearance</span>
                </div>
                <span className="checkbox-cost">+$3,200</span>
              </label>
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Sanctuary & Villa ({guests} Guests × {expedition.duration})</span>
                <span>${basePrice.toLocaleString()}</span>
              </div>
              {flightCharter && (
                <div className="breakdown-row">
                  <span>VIP Aviation Charter</span>
                  <span>${charterFee.toLocaleString()}</span>
                </div>
              )}
              <div className="breakdown-row">
                <span>Wilderness Conservation Levy</span>
                <span>${conservationLevy.toLocaleString()}</span>
              </div>
              <div className="breakdown-total">
                <span>Total Guaranteed Itinerary</span>
                <span className="total-number">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button type="button" className="submit-booking-btn interactive" onClick={handleBook}>
              Proceed to Verified Booking &rarr;
            </button>
            <p className="drawer-guarantee">
              Bank-grade SSL encryption. No immediate charge until the ELYSIAN Host reviews your itinerary.
            </p>
          </div>
        ) : (
          <div className="drawer-confirmed">
            <div className="confirmed-icon">✓</div>
            <span className="drawer-eyebrow">RESERVATION REQUEST VERIFIED</span>
            <h2 className="drawer-title">Your Journey is Initiated</h2>
            <p className="confirmed-ref">
              Booking Reference: <strong>{bookingRef}</strong>
            </p>
            <p className="confirmed-msg">
              An ELYSIAN private travel host has been assigned to your party. We have dispatched your preliminary
              itinerary overview to your email.
            </p>

            <div className="confirmed-summary">
              <div>
                <span>Expedition:</span> {expedition.title}
              </div>
              <div>
                <span>Party Size:</span> {guests} Guests
              </div>
              <div>
                <span>Season:</span> {selectedSeason}
              </div>
              <div>
                <span>Estimated Value:</span> ${totalPrice.toLocaleString()}
              </div>
            </div>

            <button type="button" className="submit-booking-btn interactive" onClick={handleReset}>
              Return to Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDrawer;

