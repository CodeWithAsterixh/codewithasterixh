'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { PlayIcon, FilePdfIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface FooterDockProps {
  opacity: MotionValue<number>;
  visibility: MotionValue<any>;
  targetSlotRef: React.RefObject<HTMLDivElement | null>;
  resumeTargetSlotRef: React.RefObject<HTMLDivElement | null>;
  desktopSocialsTargetRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
}

export const FooterDock: React.FC<FooterDockProps> = ({
  opacity,
  visibility,
  targetSlotRef,
  resumeTargetSlotRef,
  desktopSocialsTargetRef,
  isLoading,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        visibility: visibility as any,
      }}
      className="relative z-20 w-full max-w-6xl flex flex-row items-center justify-between gap-1 sm:gap-2 md:gap-0 text-[10px] sm:text-xs md:text-sm font-mono font-bold text-[#8C6D53] border-t border-[#3E2B1D]/20 md:border-t-2 pt-1 sm:pt-1.5 md:pt-3 pointer-events-none px-1 sm:px-2 md:px-0"
    >
      {/* Target Dock Slots for both ENTER WORLD and SEE RESUME buttons side-by-side */}
      <div className="relative flex items-center justify-start gap-1 sm:gap-2 md:gap-2.5 pointer-events-none shrink-0">
        {/* Dock Slot 1: ENTER WORLD */}
        <div ref={targetSlotRef} className="relative flex items-center pointer-events-none">
          <div className="invisible pointer-events-none inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 select-none whitespace-nowrap">
            <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>{isLoading ? 'LOADING WORLD...' : 'ENTER WORLD'}</span>
          </div>
        </div>

        {/* Dock Slot 2: SEE RESUME */}
        <div ref={resumeTargetSlotRef} className="relative flex items-center pointer-events-none">
          <div className="invisible pointer-events-none inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 select-none whitespace-nowrap font-mono">
            <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span>SEE RESUME</span>
          </div>
        </div>
      </div>

      {/* Right Side: Dock Slot 3 for Social Links */}
      <div className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-4 pointer-events-none shrink-0">
        <div ref={desktopSocialsTargetRef} className="relative flex items-center pointer-events-none">
          <div className="invisible pointer-events-none inline-flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
            {profileData.socials.map((_, i) => (
              <div key={i} className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
              </div>
            ))}
            <div className="p-1 sm:p-1.5 md:p-2.5 border border-[#3E2B1D] md:border-2">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4.5 md:h-4.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
