'use client';

import React from 'react';

interface ProjectTabsBarProps {
  projects: any[];
  activeProjectIdx: number;
  onSelectProject: (idx: number) => void;
}

export const ProjectTabsBar: React.FC<ProjectTabsBarProps> = ({
  projects,
  activeProjectIdx,
  onSelectProject,
}) => {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 bg-[#E0CEBB] border-b border-[#3E2B1D]/30 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {projects.map((proj, idx) => (
        <button
          key={idx}
          onClick={() => onSelectProject(idx)}
          className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-mono font-black uppercase transition-all whitespace-nowrap border cursor-pointer ${
            activeProjectIdx === idx
              ? 'bg-[#3E2B1D] text-[#F4EADA] border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#C84B31]'
              : 'bg-[#F4EADA] text-[#3E2B1D] hover:bg-[#D8C2AA] border-[#3E2B1D]/40'
          }`}
        >
          0{idx + 1} {proj.title.split('–')[0].split('-')[0].trim().toUpperCase()}
        </button>
      ))}
    </div>
  );
};
