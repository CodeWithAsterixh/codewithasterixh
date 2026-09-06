'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { StarIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';
import { ThankYouActionButtons } from './ThankYouActionButtons';

interface ThankYouSectionProps {
  opacity: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
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
      style={{ opacity, pointerEvents: pointerEvents as any, visibility: visibility as any }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 text-center select-none pointer-events-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 pointer-events-auto my-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-[#C84B31] font-mono font-black">
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#EADBCC] border-2 border-[#3E2B1D] text-[#3E2B1D] text-[9px] sm:text-xs md:text-sm uppercase tracking-widest font-mono shadow-[2px_2px_0px_#3E2B1D]">
            ALL 6 CHAPTERS EXPLORED
          </span>
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
          <StarIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C84B31]" />
        </div>

        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#3E2B1D] uppercase tracking-wider font-pixelify drop-shadow-[2px_2px_0px_#D4A373] md:drop-shadow-[4px_4px_0px_#D4A373] leading-tight">
            THANK YOU FOR VISITING!
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
            {profileData.name} ({profileData.handle}) — {profileData.role}
          </p>
        </div>

        <p className="max-w-xl sm:max-w-2xl text-[11px] sm:text-xs md:text-sm lg:text-base font-mono text-[#4A3728] leading-relaxed font-medium px-2">
          Thanks for taking the time to journey through my portfolio! Whether you have an exciting project to build, a full-time role, contract opportunity, or just want to connect, feel free to reach out anytime.
        </p>

        <ThankYouActionButtons
          thankYouButtonSlotRef={thankYouButtonSlotRef}
          thankYouResumeSlotRef={thankYouResumeSlotRef}
          onContactClick={onContactClick}
          onScrollToTop={onScrollToTop}
        />

        <div className="flex items-center justify-center mt-1 sm:mt-2">
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
