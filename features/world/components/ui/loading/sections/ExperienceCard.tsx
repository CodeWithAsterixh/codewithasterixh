'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CaretRightIcon } from '@phosphor-icons/react';

interface ExperienceCardProps {
  currentExp: {
    name: string;
    role: string;
    workType: string;
    duration: { from: number; to: number };
    achievements?: string[];
    stacks: string[];
  };
  displayedExpDesc: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ currentExp, displayedExpDesc }) => {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C84B31] border border-[#3E2B1D]" />
            <h3 className="text-sm sm:text-base md:text-xl font-black uppercase text-[#3E2B1D] tracking-wide">
              {currentExp.name}
            </h3>
          </div>
          <p className="text-[9px] sm:text-xs font-mono font-bold text-[#8C6D53] uppercase ml-4.5">
            {currentExp.role}
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center ml-4 sm:ml-0">
          <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 bg-[#F4EADA] border border-[#3E2B1D] text-[#3E2B1D] uppercase font-bold whitespace-nowrap">
            {currentExp.workType}
          </span>
          <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 bg-[#D4A373] text-[#F4EADA] border border-[#3E2B1D] font-black uppercase whitespace-nowrap">
            {currentExp.duration.from === currentExp.duration.to
              ? `${currentExp.duration.from}`
              : `${currentExp.duration.from} - ${currentExp.duration.to}`}
          </span>
        </div>
      </div>

      <div className="bg-[#F4EADA]/70 border border-[#3E2B1D]/40 p-2 sm:p-2.5 text-[10px] sm:text-xs md:text-sm font-mono text-[#3E2B1D] leading-relaxed select-text min-h-[48px] sm:min-h-[58px] md:min-h-[64px]">
        <span>{displayedExpDesc}</span>
        <span className="inline-block ml-0.5 text-[#C84B31] font-black animate-pulse">▌</span>
      </div>

      {currentExp.achievements && currentExp.achievements.length > 0 && (
        <div className="flex flex-col gap-1">
          {currentExp.achievements.slice(0, 2).map((ach, aIdx) => (
            <div key={aIdx} className="flex items-start gap-1.5 text-[9px] sm:text-[11px] md:text-xs font-mono text-[#4A3728]">
              <CaretRightIcon weight="duotone" className="w-3 h-3 text-[#C84B31] shrink-0 mt-0.5" />
              <span className="line-clamp-1 select-text">{ach}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
        {currentExp.stacks.map((st, sIdx) => (
          <motion.span
            key={sIdx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: sIdx * 0.03 }}
            className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-[#F4EADA] hover:bg-[#D4A373] text-[#3E2B1D] font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase border border-[#3E2B1D] shadow-[1px_1px_0px_#3E2B1D] cursor-default"
          >
            {st}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
