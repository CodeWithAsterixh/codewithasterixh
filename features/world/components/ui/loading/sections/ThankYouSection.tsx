'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import {
  StarIcon,
  PlayIcon,
  FilePdfIcon,
  EnvelopeSimpleIcon,
  ArrowFatUpIcon,
} from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface ThankYouSectionProps {
  opacity: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  visibility: MotionValue<string>;
  thankYouButtonSlotRef: React.RefObject<HTMLDivElement | null>;
  thankYouResumeSlotRef: React.RefObject<HTMLDivElement | null>;
  thankYouSocialsSlotRef: React.RefObject<HTMLDivElement | null>;
  onContactClick: () => void;
  onScrollToTop: () => void;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  opacity,
  pointerEvents,
  visibility,
  thankYouButtonSlotRef,
  thankYouResumeSlotRef,
  thankYouSocialsSlotRef,
  onContactClick,
  onScrollToTop,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 text-center select-none pointer-events-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 pointer-events-auto">
        {/* Star Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#C84B31] font-mono font-black">
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
          <span className="px-3 py-1 bg-[#EADBCC] border-2 border-[#3E2B1D] text-[#3E2B1D] text-[10px] sm:text-xs md:text-sm uppercase tracking-widest font-mono shadow-[2px_2px_0px_#3E2B1D]">
            ALL 6 CHAPTERS EXPLORED
          </span>
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
        </div>

        {/* Giant Headline */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#3E2B1D] uppercase tracking-wider font-pixelify drop-shadow-[3px_3px_0px_#D4A373] md:drop-shadow-[5px_5px_0px_#D4A373] leading-none">
            THANK YOU FOR VISITING!
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
            {profileData.name} ({profileData.handle}) — {profileData.role}
          </p>
        </div>

        {/* Message */}
        <p className="max-w-2xl sm:max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg font-mono text-[#4A3728] leading-relaxed font-medium px-2">
          Thanks for taking the time to journey through my portfolio! Whether you have an exciting project to build, a full-time role, contract opportunity, or just want to connect, feel free to reach out anytime.
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4 mt-2 sm:mt-4 w-full max-w-full">
          {/* Target Slot for ENTER WORLD */}
          <div ref={thankYouButtonSlotRef} className="relative flex items-center pointer-events-none shrink-0">
            <div className="invisible pointer-events-none inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 select-none whitespace-nowrap">
              <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>ENTER WORLD</span>
            </div>
          </div>

          {/* Target Slot for SEE RESUME */}
          <div ref={thankYouResumeSlotRef} className="relative flex items-center pointer-events-none shrink-0">
            <div className="invisible pointer-events-none inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 select-none whitespace-nowrap font-mono">
              <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>SEE RESUME</span>
            </div>
          </div>

          {/* CTA: Contact Me */}
          <button
            onClick={onContactClick}
            className="px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3.5 bg-[#C84B31] hover:bg-[#B03E26] active:bg-[#96341F] text-[#F4EADA] font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[4px_4px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-2 md:gap-3 font-pixelify whitespace-nowrap shrink-0"
          >
            <EnvelopeSimpleIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA]" />
            <span>CONTACT ME</span>
          </button>

          {/* CTA: Scroll to Top */}
          <button
            onClick={onScrollToTop}
            className="px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#E0CEBB] hover:bg-[#D4C0AB] active:bg-[#C8B29C] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer flex items-center gap-1 sm:gap-1.5 font-mono whitespace-nowrap shrink-0"
          >
            <ArrowFatUpIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 text-[#3E2B1D]" />
            <span>SCROLL TO TOP</span>
          </button>
        </div>

        {/* Target Slot for Social Links */}
        <div className="flex items-center justify-center mt-2 sm:mt-3">
          <div ref={thankYouSocialsSlotRef} className="relative flex items-center pointer-events-none">
            <div className="invisible pointer-events-none inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
              {profileData.socials.map((_, i) => (
                <div key={i} className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
                </div>
              ))}
              <div className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
