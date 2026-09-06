'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';

interface LeftAvatarFrameProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  visibility: MotionValue<string>;
  imgSrc: string;
  onImgError: () => void;
}

export const LeftAvatarFrame: React.FC<LeftAvatarFrameProps> = ({
  opacity,
  scale,
  visibility,
  imgSrc,
  onImgError,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        scale,
        visibility: visibility as any,
      }}
      className="hidden md:flex md:col-span-5 flex-col items-center justify-center pointer-events-auto"
    >
      <div className="relative group w-full max-w-[110px] sm:max-w-[150px] md:max-w-[340px] lg:max-w-[380px]">
        {/* Retro Pixel Picture Frame */}
        <div className="relative w-full aspect-square border-2 sm:border-3 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] bg-[#EADBCC] overflow-hidden flex items-center justify-center">
          <img
            src={imgSrc}
            alt={profileData.name}
            onError={onImgError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {/* Handle Badge Overlay */}
        <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 md:px-5 md:py-1.5 bg-[#D4A373] text-[#F4EADA] text-[9px] sm:text-[10px] md:text-sm font-black tracking-widest uppercase border border-[#3E2B1D] md:border-2 shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] whitespace-nowrap">
          {profileData.handle}
        </div>
      </div>
    </motion.div>
  );
};
