'use client';

import React, { useState } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { PaperPlaneTiltIcon, CheckIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface ContactSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  visibility: MotionValue<string>;
  isSoundOn: boolean;
  onPlaySound: (type: 'start' | 'click') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  opacity,
  y,
  scale,
  pointerEvents,
  visibility,
  isSoundOn,
  onPlaySound,
}) => {
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

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30"
    >
      <div className="w-full max-h-[calc(100dvh-175px)] md:max-h-[460px] flex flex-col bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] overflow-hidden text-left pointer-events-auto">
        {/* Window Title Header */}
        <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#C84B31] border border-[#3E2B1D]" />
            <span>CHAPTER 06: GET IN TOUCH</span>
          </div>
          <div className="text-[8px] sm:text-[10px] font-bold text-[#3E2B1D]">
            {profileData.location.toUpperCase()}
          </div>
        </div>

        {/* Window Content Body */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 md:p-5 text-[#3E2B1D] min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-start">
            {/* Left: Contact Info & Direct Email */}
            <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
              <div>
                <h3 className="text-sm sm:text-base md:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
                  Let&apos;s build together
                </h3>
                <p className="text-[10px] sm:text-xs text-[#6E543F] font-mono leading-relaxed mt-1">
                  Have a project in mind, a question, or a role to discuss? Send a message directly.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="p-2 sm:p-2.5 bg-[#F4EADA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D]">
                <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                  DIRECT EMAIL
                </div>
                <a
                  href={`mailto:${profileData.email}`}
                  onClick={() => isSoundOn && onPlaySound('click')}
                  className="text-[10px] sm:text-xs font-mono font-black text-[#C84B31] hover:underline break-all"
                >
                  {profileData.email}
                </a>
              </div>

              {/* Social Links */}
              <div>
                <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-1">
                  FIND ME ON
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => isSoundOn && onPlaySound('click')}
                      className="px-2 py-1 bg-[#F4EADA] hover:bg-[#D8C2AA] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1"
                    >
                      <span>{s.icon}</span>
                      <ArrowUpRightIcon weight="duotone" className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Clean Contact Form */}
            <div className="md:col-span-7">
              {contactStatus === 'success' ? (
                <div className="p-4 bg-[#F4EADA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-[#8C6D53] text-[#F4EADA] flex items-center justify-center font-bold text-base border border-[#3E2B1D]">
                    <CheckIcon weight="duotone" className="w-5 h-5 text-[#F4EADA]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-mono font-black uppercase text-[#3E2B1D]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-[#6E543F]">
                    Thank you for reaching out. I&apos;ll review your message and reply shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactStatus('idle')}
                    className="mt-2 px-3 py-1 bg-[#D4A373] hover:bg-[#C08D5D] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    [ SEND ANOTHER MESSAGE ]
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-2 sm:gap-2.5">
                  {contactStatus === 'error' && (
                    <div className="p-1.5 bg-[#C84B31]/10 border border-[#C84B31] text-[9px] sm:text-[10px] font-mono text-[#C84B31] font-bold">
                      {contactErrorMsg || 'Failed to send message. Please try again.'}
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Peter Paul"
                        className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="Project inquiry / Full-time role / Contract"
                      className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell me about your goals, timeline, or requirements..."
                      className="w-full px-2 py-1 bg-[#F4EADA] border border-[#3E2B1D] text-[10px] sm:text-xs font-mono text-[#3E2B1D] placeholder-[#A89078] focus:outline-none focus:ring-1 focus:ring-[#C84B31] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="self-start px-3 py-1.5 sm:px-4 sm:py-2 bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] disabled:opacity-60 text-[#F4EADA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] text-[10px] sm:text-xs font-mono font-black uppercase transition-all cursor-pointer disabled:cursor-wait flex items-center gap-1.5 sm:gap-2"
                  >
                    <span>{isContactSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                    <PaperPlaneTiltIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
