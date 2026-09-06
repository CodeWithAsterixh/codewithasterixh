'use client';

import React from 'react';

interface ProjectDetailsPanelProps {
  currentProject: {
    title: string;
    category: string;
    goal?: string;
    problem?: string;
  };
  displayedProjectExcerpt: string;
}

export const ProjectDetailsPanel: React.FC<ProjectDetailsPanelProps> = ({
  currentProject,
  displayedProjectExcerpt,
}) => {
  return (
    <div className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
      <div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
          {currentProject.title}
        </h3>
        <div className="text-[9px] sm:text-[11px] font-mono font-bold text-[#C84B31] uppercase mt-0.5">
          {currentProject.category}
        </div>
      </div>

      <div className="p-2.5 sm:p-3 bg-[#F4EADA] border border-[#3E2B1D]/40 text-[10px] sm:text-xs md:text-sm font-mono leading-relaxed text-[#3E2B1D] min-h-[90px] sm:min-h-[120px] shadow-[2px_2px_0px_#3E2B1D]/10">
        <span>{displayedProjectExcerpt}</span>
        <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-[#C84B31] animate-pulse ml-0.5 align-middle" />
      </div>

      {(currentProject.goal || currentProject.problem) && (
        <div className="text-[9px] sm:text-[11px] font-mono text-[#6E543F] leading-snug">
          <span className="font-bold text-[#3E2B1D]">CORE FOCUS: </span>
          {currentProject.goal || currentProject.problem}
        </div>
      )}
    </div>
  );
};
