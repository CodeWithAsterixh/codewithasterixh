'use client';

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import techStackData from '@/data/tech-stack.json';
import profileData from '@/data/profile.json';
import { TechStackItemCard } from './TechStackItemCard';

interface TechStackSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
  activeTechCategoryIdx: number;
  onSelectCategory: (idx: number) => void;
  onPrevCategory: () => void;
  onNextCategory: () => void;
  onLinkClick: () => void;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  opacity,
  y,
  scale,
  pointerEvents,
  visibility,
  activeTechCategoryIdx,
  onSelectCategory,
  onPrevCategory,
  onNextCategory,
  onLinkClick,
}) => {
  const techCategories = Object.keys(techStackData) as (keyof typeof techStackData)[];
  const currentCategoryName = techCategories[activeTechCategoryIdx] || techCategories[0];
  const currentTechList = techStackData[currentCategoryName] || [];

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
          <span>TECH STACK // {profileData.alias || profileData.name}</span>
        </div>

        <div className="flex items-center border-b-2 border-[#3E2B1D] bg-[#DFCEBA] font-mono text-[9px] sm:text-xs font-bold">
          {techCategories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => onSelectCategory(idx)}
              className={`flex-1 py-1.5 sm:py-2 px-1 sm:px-2 border-r border-[#3E2B1D] last:border-r-0 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1 ${activeTechCategoryIdx === idx
                ? 'bg-[#EADBCC] text-[#3E2B1D] font-black shadow-[inset_0_-2px_0_#C84B31]'
                : 'bg-[#D4C3AE] text-[#8C6D53] hover:bg-[#DBCABA]'
                }`}
            >
              <span className="text-[#C84B31]">0{idx + 1}</span>
              <span className="truncate">{category}</span>
            </button>
          ))}
        </div>

        <div className="p-3 sm:p-3.5 md:p-4 min-h-[240px] sm:min-h-[270px] md:min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechCategoryIdx}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 max-h-[210px] sm:max-h-[240px] md:max-h-[260px] overflow-y-auto [&::-webkit-scrollbar]:hidden pr-0.5"
            >
              {currentTechList.map((item, i) => (
                <TechStackItemCard key={i} item={item} index={i} onLinkClick={onLinkClick} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onPrevCategory}
              disabled={activeTechCategoryIdx === 0}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
            >
              <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>PREV CAT</span>
            </button>
            <button
              onClick={onNextCategory}
              disabled={activeTechCategoryIdx === techCategories.length - 1}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
            >
              <span>NEXT CAT</span>
              <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

