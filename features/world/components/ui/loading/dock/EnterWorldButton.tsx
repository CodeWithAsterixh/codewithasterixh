'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { PlayIcon, SpinnerIcon } from '@phosphor-icons/react';

interface EnterWorldButtonProps {
  buttonAnchorRef: React.RefObject<HTMLDivElement | null>;
  buttonX: MotionValue<number>;
  buttonY: MotionValue<number>;
  buttonRotateZ: MotionValue<number>;
  buttonRotateX: MotionValue<number>;
  buttonScale: MotionValue<number>;
  buttonShadow: MotionValue<string>;
  isLoading: boolean;
  onPlayClick: () => void;
}

export const EnterWorldButton: React.FC<EnterWorldButtonProps> = ({
  buttonAnchorRef,
  buttonX,
  buttonY,
  buttonRotateZ,
  buttonRotateX,
  buttonScale,
  buttonShadow,
  isLoading,
  onPlayClick,
}) => {
  return (
    <div ref={buttonAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
      <motion.button
        onClick={isLoading ? undefined : onPlayClick}
        disabled={isLoading}
        style={{
          x: buttonX,
          y: buttonY,
          rotateZ: buttonRotateZ,
          rotateX: buttonRotateX,
          scale: buttonScale,
          boxShadow: buttonShadow,
          transformPerspective: 1000,
        }}
        className={`group relative z-[60] inline-flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-7 md:py-3.5 font-black text-[10px] sm:text-xs md:text-base lg:text-lg tracking-wider md:tracking-widest uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors select-none whitespace-nowrap pointer-events-auto ${isLoading
          ? 'bg-[#A89078] text-[#F4EADA]/90 cursor-wait'
          : 'bg-[#8C6D53] hover:bg-[#72553E] active:bg-[#5C4033] text-[#F4EADA] cursor-pointer'
          }`}
        title={isLoading ? 'Loading World...' : 'Enter World'}
      >
        {isLoading ? (
          <span className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
            <SpinnerIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] animate-spin" />
            <span className="animate-pulse">LOADING WORLD...</span>
          </span>
        ) : (
          <>
            <PlayIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#F4EADA] fill-current" />
            <span className="whitespace-nowrap">ENTER WORLD</span>
          </>
        )}
      </motion.button>
    </div>
  );
};
