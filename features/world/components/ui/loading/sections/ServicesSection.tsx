'use client';

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import servicesData from '@/data/services.json';
import profileData from '@/data/profile.json';

interface ServicesSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
  activeServiceIdx: number;
  onSelectService: (idx: number) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  opacity,
  y,
  scale,
  rotateX,
  pointerEvents,
  visibility,
  activeServiceIdx,
  onSelectService,
}) => {
  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        rotateX,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
        transformPerspective: 1200,
      }}
      className="absolute inset-0 w-full flex flex-col justify-center z-20"
    >
      <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
        {/* Retro Window Header */}
        <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>SERVICES // {profileData.alias || profileData.name}</span>
          </div>
        </div>

        {/* 3D Selector Tabs */}
        <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
          {servicesData.map((service, idx) => (
            <button
              key={idx}
              onClick={() => onSelectService(idx)}
              className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeServiceIdx === idx
                ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                }`}
            >
              <span className="text-[#C84B31]">0{idx + 1}</span>
              <span className="truncate">{service.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* 3D Interactive Showcase Area */}
        <div
          className="p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] md:min-h-[300px]"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceIdx}
              initial={{ opacity: 0, rotateY: 15, z: -40, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, z: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -15, z: -40, scale: 0.95 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-2 md:gap-3"
            >
              {/* Service Title with Accent Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#C84B31] border border-[#3E2B1D]" />
                  <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-black uppercase text-[#3E2B1D] tracking-wide">
                    {servicesData[activeServiceIdx]?.label}
                  </h3>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 bg-[#F4EADA] border border-[#3E2B1D] text-[#8C6D53] uppercase font-bold whitespace-nowrap">
                  PROTOCOL 0{activeServiceIdx + 1}
                </span>
              </div>

              {/* Service Description */}
              <p className="text-[11px] sm:text-xs md:text-sm font-mono text-[#4A3728] leading-relaxed select-text line-clamp-4 sm:line-clamp-6 md:line-clamp-none">
                {servicesData[activeServiceIdx]?.description}
              </p>

              {/* Stack & Capability Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-1 md:mt-2">
                {servicesData[activeServiceIdx]?.tags.map((tag, tIdx) => (
                  <motion.span
                    key={tIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: tIdx * 0.03 }}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#F4EADA] hover:bg-[#D4A373] text-[#3E2B1D] font-mono text-[8px] sm:text-[10px] md:text-xs font-bold uppercase border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] transition-transform hover:-translate-y-0.5 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
