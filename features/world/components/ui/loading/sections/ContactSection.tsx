'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import profileData from '@/data/profile.json';
import { ContactInfoPanel } from './ContactInfoPanel';
import { ContactFormPanel } from './ContactFormPanel';

interface ContactSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
  isSoundOn: boolean;
  onPlaySound: (type: 'start' | 'click') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  opacity,
  y,
  scale,
  pointerEvents,
  visibility,
  isSoundOn,
  onPlaySound,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30"
    >
      <div className="w-full max-h-[calc(100dvh-175px)] md:max-h-[460px] flex flex-col bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] overflow-hidden text-left pointer-events-auto">
        <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#C84B31] border border-[#3E2B1D]" />
            <span>CHAPTER 06: GET IN TOUCH</span>
          </div>
          <div className="text-[8px] sm:text-[10px] font-bold text-[#3E2B1D]">
            {profileData.location.toUpperCase()}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 md:p-5 text-[#3E2B1D] min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 items-start">
            <ContactInfoPanel isSoundOn={isSoundOn} onPlaySound={onPlaySound} />
            <ContactFormPanel isSoundOn={isSoundOn} onPlaySound={onPlaySound} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

