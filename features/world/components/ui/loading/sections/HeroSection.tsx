'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';

interface HeroSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
  imgSrc: string;
  onImgError: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  opacity,
  y,
  pointerEvents,
  visibility,
  imgSrc,
  onImgError,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        y,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
      className="relative z-20 w-full flex flex-col items-center md:items-start text-center md:text-left gap-1 sm:gap-2 md:gap-4"
    >
      {/* Mobile-Only Avatar Frame */}
      <div className="md:hidden flex flex-col items-center mb-1.5 sm:mb-2">
        <div className="relative group w-[30vw] min-w-[100px] max-w-[140px] aspect-square">
          <div className="relative w-full h-full border-2 border-[#3E2B1D] shadow-[3px_3px_0px_#3E2B1D] bg-[#EADBCC] overflow-hidden flex items-center justify-center">
            <img
              src={imgSrc}
              alt={profileData.name}
              onError={onImgError}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Handle Badge Overlay */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#D4A373] text-[#F4EADA] text-[8px] sm:text-[9px] font-black tracking-widest uppercase border border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#3E2B1D] whitespace-nowrap">
            {profileData.handle}
          </div>
        </div>
      </div>

      {/* Header Title & Role */}
      <div className="flex flex-col gap-0.5 md:gap-1.5">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-wider text-[#3E2B1D] uppercase drop-shadow-[2px_2px_0px_#D4A373] md:drop-shadow-[3px_3px_0px_#D4A373]">
          {profileData.name.toUpperCase()}
        </h1>
        <p className="text-[10px] sm:text-xs md:text-base font-extrabold tracking-widest text-[#8C6D53] uppercase font-mono">
          {profileData.role}
        </p>
      </div>

      {/* Bio Subtext */}
      <p className="text-[11px] sm:text-xs md:text-base text-[#4A3728] font-mono leading-snug md:leading-relaxed max-w-xl font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
        {profileData.subtext}
      </p>

      {/* Quick Stats Grid */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 my-0.5 sm:my-1">
        {profileData.stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3.5 md:py-2 bg-[#EADBCC] border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D]"
          >
            <span className="text-[11px] sm:text-xs md:text-base font-black text-[#C84B31] font-mono">{stat.value}</span>
            <span className="text-[8px] sm:text-[10px] md:text-xs font-extrabold text-[#3E2B1D] uppercase font-mono leading-tight">
              {stat.label.replace('\n', ' ')}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
