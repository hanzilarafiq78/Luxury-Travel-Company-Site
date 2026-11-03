// ═══════════════════════════════════════════════════════════════
// ELYSIAN — Bespoke Concierge Modal
// Private Travel Host & Custom Expedition Inquiries
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import './ConciergeModal.css';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConciergeModal({ isOpen, onClose }: ConciergeModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="concierge-modal-backdrop" onClick={onClose}>
      <div className="concierge-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn interactive" onClick={onClose}>
          ✕
        </button>

        {!submitted ? (
          <form className="concierge-form" onSubmit={handleSubmit}>
            <span className="modal-eyebrow">ELYSIAN PRIVATE DESK</span>
            <h2 className="modal-title">Bespoke Journey Consultation</h2>
            <p className="modal-desc">
              Whether arranging an unchartered private island buyout, luxury air safari, or Arctic icebreaker
              itinerary, our private desk curates every detail with absolute discretion.
            </p>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="Lord / Lady / Mr. / Ms. Alexander Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Private Email / Telegraph</label>
              <input
                type="email"
                required
                placeholder="vance@privateoffice.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Desired Frontier & Expedition Wishes</label>
              <textarea
                rows={3}
                required
                placeholder="Private catamaran charter in French Polynesia with personal dive master..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="modal-submit-btn interactive">
              Request Host Consultation &rarr;
            </button>
          </form>
        ) : (
          <div className="modal-submitted">
            <div className="confirmed-icon">✦</div>
            <span className="modal-eyebrow">CONSULTATION LOGGED</span>
            <h2 className="modal-title">Discretion Guaranteed</h2>
            <p className="confirmed-msg">
              Thank you, <strong>{name}</strong>. A senior expedition partner will contact your office within 4 hours.
            </p>
            <button type="button" className="modal-submit-btn interactive" onClick={handleReset}>
              Close Desk
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConciergeModal;

