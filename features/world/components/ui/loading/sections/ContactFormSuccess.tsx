'use client';

import React from 'react';
import { CheckIcon } from '@phosphor-icons/react';

interface ContactFormSuccessProps {
  onReset: () => void;
}

export const ContactFormSuccess: React.FC<ContactFormSuccessProps> = ({ onReset }) => {
  return (
    <div className="md:col-span-7 p-4 bg-[#F4EADA] border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] flex flex-col items-center text-center gap-2">
      <div className="w-8 h-8 bg-[#8C6D53] text-[#F4EADA] flex items-center justify-center font-bold text-base border border-[#3E2B1D]">
        <CheckIcon weight="duotone" className="w-5 h-5 text-[#F4EADA]" />
      </div>
      <h4 className="text-xs sm:text-sm font-mono font-black uppercase text-[#3E2B1D]">Message Sent Successfully!</h4>
      <p className="text-[10px] sm:text-xs font-mono text-[#6E543F]">
        Thank you for reaching out. I&apos;ll review your message and reply shortly.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-3 py-1 bg-[#D4A373] hover:bg-[#C08D5D] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase cursor-pointer"
      >
        [ SEND ANOTHER MESSAGE ]
      </button>
    </div>
  );
};
