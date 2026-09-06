import React, { useState } from 'react';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import { ContactTilesetSuccess } from './ContactTilesetSuccess';

interface ContactFormTilesetProps {
  onClose: () => void;
}

export const ContactFormTileset: React.FC<ContactFormTilesetProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <ContactTilesetSuccess
        name={formData.name}
        onReset={() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
          onClose();
        }}
      />
    );
  }

  return (
    <form onSubmit={handleContactSubmit} className="space-y-3">
      <div>
        <h3 className="text-sm font-extrabold text-[#1F1914]">Send a Message</h3>
        <p className="text-xs text-[#5C4F41]">Feel free to reach out about opportunities, projects, or questions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex"
            className="w-full px-3 py-2 bg-[#FAF5E6] border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-xs font-semibold text-[#1F1914] focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. alex@example.com"
            className="w-full px-3 py-2 bg-[#FAF5E6] border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-xs font-semibold text-[#1F1914] focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">Subject</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g. Project Collaboration"
          className="w-full px-3 py-2 bg-[#FAF5E6] border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-xs font-semibold text-[#1F1914] focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-[#6E5C3B]">Message</label>
        <textarea
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Type your message here..."
          className="w-full px-3 py-2 bg-[#FAF5E6] border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-xs font-semibold text-[#1F1914] focus:outline-none resize-none"
        />
      </div>

      <div className="pt-2 border-t-2 border-black flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2.5 px-6 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <PaperPlaneTiltIcon size={14} weight="bold" />
        </button>
      </div>
    </form>
  );
};
