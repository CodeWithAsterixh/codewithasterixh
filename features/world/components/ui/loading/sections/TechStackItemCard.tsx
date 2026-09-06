'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { TechIcon } from '@/components/ui/TechIcon';

interface TechStackItemCardProps {
  item: { name: string; url: string; icon: string };
  index: number;
  onLinkClick: () => void;
}

export const TechStackItemCard: React.FC<TechStackItemCardProps> = ({ item, index, onLinkClick }) => {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onLinkClick}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.025 }}
      className="group bg-[#F4EADA]/80 hover:bg-[#F4EADA] active:bg-[#E0D0BE] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] hover:shadow-[3px_3px_0px_#3E2B1D] p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer select-none"
      title={`Visit ${item.name} (${item.url})`}
    >
      <div className="p-1 sm:p-1.5 bg-[#EADBCC] group-hover:bg-[#D4A373] border border-[#3E2B1D] flex items-center justify-center text-[#3E2B1D] transition-colors shrink-0">
        <TechIcon name={item.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="flex items-center justify-between gap-1 flex-1 min-w-0">
        <span className="text-[10px] sm:text-xs md:text-sm font-black uppercase text-[#3E2B1D] truncate tracking-tight">
          {item.name}
        </span>
        <ArrowUpRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8C6D53] group-hover:text-[#C84B31] shrink-0 transition-colors" />
      </div>
    </motion.a>
  );
};
