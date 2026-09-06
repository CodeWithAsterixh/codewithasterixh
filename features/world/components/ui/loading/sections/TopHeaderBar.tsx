'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { MapPinIcon, SpeakerHighIcon, SpeakerSlashIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface TopHeaderBarProps {
  opacity: MotionValue<number>;
  visibility: MotionValue<any>;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({
  opacity,
  visibility,
  isSoundOn,
  onToggleSound,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        visibility: visibility as any,
      }}
      className="relative z-20 w-full max-w-6xl flex items-center justify-between pt-1 md:pt-2 pointer-events-auto"
    >
      {/* Location Badge */}
      <div className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
        <MapPinIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C84B31]" />
        <span>{profileData.location}</span>
      </div>

      {/* Audio Toggle Button */}
      <button
        onClick={onToggleSound}
        className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[#EADBCC] hover:bg-[#D8C2AA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] transition-transform active:translate-y-0.5 cursor-pointer"
      >
        {isSoundOn ? (
          <SpeakerHighIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D]" />
        ) : (
          <SpeakerSlashIcon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#3E2B1D]" />
        )}
        <span className="text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider text-[#3E2B1D] uppercase font-mono">
          {isSoundOn ? 'SOUND ON' : 'MUTED'}
        </span>
      </button>
    </motion.div>
  );
};
