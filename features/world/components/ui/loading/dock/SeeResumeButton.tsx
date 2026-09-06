'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { FilePdfIcon } from '@phosphor-icons/react';

interface SeeResumeButtonProps {
  resumeAnchorRef: React.RefObject<HTMLDivElement | null>;
  resumeX: MotionValue<number>;
  resumeY: MotionValue<number>;
  resumeRotateZ: MotionValue<number>;
  resumeRotateX: MotionValue<number>;
  resumeScale: MotionValue<number>;
  resumeShadow: MotionValue<string>;
  onLinkClick: () => void;
}

export const SeeResumeButton: React.FC<SeeResumeButtonProps> = ({
  resumeAnchorRef,
  resumeX,
  resumeY,
  resumeRotateZ,
  resumeRotateX,
  resumeScale,
  resumeShadow,
  onLinkClick,
}) => {
  return (
    <div ref={resumeAnchorRef} className="relative inline-block z-[60] pointer-events-none shrink-0">
      <motion.a
        href="/resume/peterpaulresume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onLinkClick}
        style={{
          x: resumeX,
          y: resumeY,
          rotateZ: resumeRotateZ,
          rotateX: resumeRotateX,
          scale: resumeScale,
          boxShadow: resumeShadow,
          transformPerspective: 1000,
        }}
        className="group relative z-[60] inline-flex items-center gap-1 md:gap-2 px-2 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3.5 bg-[#EADBCC] hover:bg-[#D8C2AA] text-[#3E2B1D] font-extrabold text-[9px] sm:text-[11px] md:text-sm lg:text-base tracking-wider uppercase border-2 md:border-4 border-[#3E2B1D] transition-colors cursor-pointer select-none whitespace-nowrap font-mono pointer-events-auto"
        title="See Resume"
      >
        <FilePdfIcon weight="duotone" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#3E2B1D]" />
        SEE RESUME
      </motion.a>
    </div>
  );
};
