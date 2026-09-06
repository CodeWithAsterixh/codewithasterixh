'use client';

import React, { useState } from 'react';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import { ContactFormSuccess } from './ContactFormSuccess';

interface ContactFormPanelProps {
  isSoundOn: boolean;
  onPlaySound: (type: 'start' | 'click') => void;
}

export const ContactFormPanel: React.FC<ContactFormPanelProps> = ({ isSoundOn, onPlaySound }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactErrorMsg, setContactErrorMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setIsContactSubmitting(true);
    setContactStatus('idle');
    setContactErrorMsg('');
    if (isSoundOn) onPlaySound('click');

    try {
      const res = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || 'Portfolio Contact Inquiry',
          message: contactMessage.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setContactStatus('success');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        if (isSoundOn) onPlaySound('start');
      } else {
        setContactStatus('error');
        setContactErrorMsg(data.error || 'Failed to send message. Please email directly.');
      }
    } catch {
      setContactStatus('error');
      setContactErrorMsg('Network error. Please email directly.');
    } finally {
      setIsContactSubmitting(false);
    }
  };

  if (contactStatus === 'success') {
    return <ContactFormSuccess onReset={() => setContactStatus('idle')} />;
  }

  return (
    <div className="md:col-span-7">
      <form onSubmit={handleContactSubmit} className="flex flex-col gap-2 sm:gap-2.5">
        {contactStatus === 'error' && (
          <div className="p-1.5 bg-[#C84B31]/10 border border-[#C84B31] text-[9px] sm:text-[10px] font-mono text-[#C84B31] font-bold">
            {contactErrorMsg || 'Failed to send message. Please try again.'}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">YOUR NAME *</label>
            <input
              type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)}
              placeholder="Peter Paul"
              className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
            />
          </div>
          <div>
            <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">EMAIL ADDRESS *</label>
            <input
              type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">SUBJECT</label>
          <input
            type="text" value={contactSubject} onChange={(e) => setContactSubject(e.target.value)}
            placeholder="Project inquiry / Full-time role / Contract"
            className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
          />
        </div>
        <div>
          <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">MESSAGE *</label>
          <textarea
            required rows={3} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
            placeholder="Tell me about your goals, timeline, or requirements..."
            className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31] resize-none"
          />
        </div>
        <button
          type="submit" disabled={isContactSubmitting}
          className="self-start px-3 py-1.5 sm:px-4 sm:py-2 bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] disabled:opacity-60 text-[#F4EADA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] text-[10px] sm:text-xs font-mono font-black uppercase transition-all cursor-pointer disabled:cursor-wait flex items-center gap-1.5 sm:gap-2"
        >
          <span>{isContactSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
          <PaperPlaneTiltIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </form>
    </div>
  );
};

