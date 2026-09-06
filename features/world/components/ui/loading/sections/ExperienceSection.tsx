'use client';

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import experienceData from '@/data/experience.json';
import profileData from '@/data/profile.json';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
  activeExpIdx: number;
  expCharCount: number;
  onSelectExp: (idx: number) => void;
  onPrevExp: () => void;
  onNextExp: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  opacity,
  y,
  scale,
  pointerEvents,
  visibility,
  activeExpIdx,
  expCharCount,
  onSelectExp,
  onPrevExp,
  onNextExp,
}) => {
  const currentExp = experienceData[activeExpIdx] || experienceData[0];
  const displayedExpDesc = (currentExp?.description || '').slice(0, expCharCount);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        pointerEvents: pointerEvents as any,
        visibility: visibility as any,
        transformPerspective: 1200,
      }}
      className="absolute inset-0 w-full flex flex-col justify-center z-20"
    >
      <div className="w-full bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[6px_6px_0px_#3E2B1D] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 bg-[#D4A373] text-[#3E2B1D] border-b-2 border-[#3E2B1D] font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider select-none">
          <span>EXPERIENCE // {profileData.alias || profileData.name}</span>
        </div>

        <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
          {experienceData.map((exp, idx) => {
            const yearLabel = exp.duration.from === exp.duration.to ? `${exp.duration.from}` : `${exp.duration.from}-${exp.duration.to}`;
            return (
              <button
                key={idx}
                onClick={() => onSelectExp(idx)}
                className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeExpIdx === idx
                  ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                  : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                  }`}
              >
                <span className="text-[#C84B31] font-mono">{yearLabel}</span>
                <span className="truncate hidden sm:inline">{exp.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-[240px] sm:min-h-[270px] md:min-h-[300px] relative" style={{ perspective: 1000 }}>
          <div className="absolute top-2 left-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┌</div>
          <div className="absolute top-2 right-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┐</div>
          <div className="absolute bottom-2 left-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">└</div>
          <div className="absolute bottom-2 right-2 text-[#8C6D53]/40 font-mono text-[10px] pointer-events-none">┘</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExpIdx}
              initial={{ opacity: 0, scale: 0.78, z: -70 }}
              animate={{ opacity: 1, scale: 1, z: 0 }}
              exit={{ opacity: 0, scale: 1.18, z: 70 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <ExperienceCard currentExp={currentExp} displayedExpDesc={displayedExpDesc} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-2 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onPrevExp}
              disabled={activeExpIdx === 0}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
            >
              <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>ZOOM -</span>
            </button>
            <button
              onClick={onNextExp}
              disabled={activeExpIdx === experienceData.length - 1}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
            >
              <span>ZOOM +</span>
              <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

