'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';

interface AboutSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  visibility: MotionValue<string>;
  charCount: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  opacity,
  y,
  rotateX,
  scale,
  pointerEvents,
  visibility,
  charCount,
}) => {
  const rawAbout = profileData.about?.content || '';
  const normalizedAbout = rawAbout.replace(/\\n/g, '\n');
  const displayedText = normalizedAbout.slice(0, charCount);
  const paragraphs = displayedText.split('\n\n');

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        rotateX,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
      className="absolute inset-0 w-full flex flex-col justify-center z-10"
    >
      <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
        {/* Retro Window Header */}
        <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>ABOUT // {profileData.alias || profileData.name}</span>
          </div>
        </div>

        {/* Terminal Typewriter Content with Blinking Cursor */}
        <div className="p-3 sm:p-4 md:p-5 font-mono text-[11px] sm:text-xs md:text-sm text-[#3E2B1D] leading-relaxed max-h-[260px] sm:max-h-[300px] md:max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:hidden select-text">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-2 md:mb-3 last:mb-0">
              {para}
              {idx === paragraphs.length - 1 && (
                <span className="inline-block ml-0.5 text-[#C84B31] font-black animate-pulse">
                  ▌
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
