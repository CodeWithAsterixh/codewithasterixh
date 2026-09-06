'use client';

import React from 'react';

interface ProjectMediaPanelProps {
  currentProject: {
    title: string;
    thumbnail?: string | null;
    tags: string[];
    tools: string[];
  };
}

export const ProjectMediaPanel: React.FC<ProjectMediaPanelProps> = ({ currentProject }) => {
  return (
    <div className="md:col-span-5 flex flex-col gap-2">
      <div className="relative w-full aspect-video sm:aspect-[16/10] bg-[#F4EADA] border-2 border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D] md:shadow-[3px_3px_0px_#3E2B1D] overflow-hidden group">
        {currentProject.thumbnail ? (
          <img
            src={currentProject.thumbnail}
            alt={currentProject.title}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-[#3E2B1D] text-[#F4EADA] font-mono text-center">
            <div className="text-[9px] sm:text-xs font-black text-[#D4A373] mb-1">SYSTEM ARCHITECTURE</div>
            <div className="text-[10px] sm:text-xs font-bold">{currentProject.title}</div>
            <div className="text-[8px] text-[#A89078] mt-1">PRODUCTION BACKEND API</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E2B1D]/5 to-transparent pointer-events-none opacity-40" />
      </div>

      <div className="flex flex-wrap gap-1">
        {currentProject.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="px-1.5 py-0.5 bg-[#F4EADA] border border-[#3E2B1D]/40 text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-0.5 sm:mt-1">
        <div className="text-[8px] sm:text-[9px] font-mono font-black text-[#8C6D53] uppercase mb-1">
          TECHNOLOGIES & ARCHITECTURE:
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {currentProject.tools.map((tool, toolIdx) => (
            <span
              key={toolIdx}
              className="px-1.5 py-0.5 bg-[#E0CEBB] border border-[#3E2B1D] text-[8px] sm:text-[9px] font-mono font-bold text-[#3E2B1D]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
