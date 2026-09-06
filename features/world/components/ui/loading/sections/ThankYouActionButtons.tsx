'use client';

import React from 'react';
import { PlayIcon, FilePdfIcon, EnvelopeSimpleIcon, ArrowFatUpIcon } from '@phosphor-icons/react';

interface ThankYouActionButtonsProps {
  thankYouButtonSlotRef: React.RefObject<HTMLDivElement | null>;
  thankYouResumeSlotRef: React.RefObject<HTMLDivElement | null>;
  onContactClick: () => void;
  onScrollToTop: () => void;
}

export const ThankYouActionButtons: React.FC<ThankYouActionButtonsProps> = ({
  thankYouButtonSlotRef,
  thankYouResumeSlotRef,
  onContactClick,
  onScrollToTop,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 w-full max-w-full">
      {/* Row 1: Target Slots for animated ENTER WORLD and SEE RESUME */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
        <div ref={thankYouButtonSlotRef} className="relative inline-flex items-center pointer-events-none shrink-0">
          <div className="invisible pointer-events-none inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] select-none whitespace-nowrap">
            <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>ENTER WORLD</span>
          </div>
        </div>

        <div ref={thankYouResumeSlotRef} className="relative inline-flex items-center pointer-events-none shrink-0">
          <div className="invisible pointer-events-none inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] select-none whitespace-nowrap font-mono">
            <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>SEE RESUME</span>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary CTAs (CONTACT ME and SCROLL TO TOP) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
        <button
          onClick={onContactClick}
          className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3.5 bg-[#C84B31] hover:bg-[#B03E26] active:bg-[#96341F] text-[#F4EADA] font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[4px_4px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-2 md:gap-3 font-pixelify whitespace-nowrap shrink-0"
        >
          <EnvelopeSimpleIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA]" />
          <span>CONTACT ME</span>
        </button>

        <button
          onClick={onScrollToTop}
          className="px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#E0CEBB] hover:bg-[#D4C0AB] active:bg-[#C8B29C] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-1.5 font-mono whitespace-nowrap shrink-0"
        >
          <ArrowFatUpIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 text-[#3E2B1D]" />
          <span>SCROLL TO TOP</span>
        </button>
      </div>
    </div>
  );
};
