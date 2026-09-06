'use client';

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';

interface ProjectsSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  visibility: MotionValue<string>;
  activeProjectIdx: number;
  projectCharCount: number;
  onSelectProject: (idx: number) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onLinkClick: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  opacity,
  y,
  scale,
  pointerEvents,
  visibility,
  activeProjectIdx,
  projectCharCount,
  onSelectProject,
  onPrevProject,
  onNextProject,
  onLinkClick,
}) => {
  const featuredProjects = projectsData.slice(0, 4);
  const currentProject = featuredProjects[activeProjectIdx] || featuredProjects[0];
  const currentProjectExcerpt = currentProject?.excerpt || '';
  const displayedProjectExcerpt = currentProjectExcerpt.slice(0, projectCharCount);

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
        {/* Window Title Header */}
        <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>CHAPTER 05: FEATURED PROJECTS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline bg-[#F4EADA] px-1.5 py-0.5 border border-[#3E2B1D] text-[9px] font-bold">
              {currentProject.category.toUpperCase()}
            </span>
            {currentProject.url && (
              <a
                href={currentProject.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onLinkClick}
                className="px-1.5 py-0.5 bg-[#C84B31] hover:bg-[#A8321D] text-[#F4EADA] border border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#3E2B1D] flex items-center gap-1 text-[8px] sm:text-[10px] cursor-pointer"
              >
                <span>LIVE DEMO</span>
                <ArrowSquareOutIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Selector Pills (Tabs) */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 bg-[#E0CEBB] border-b border-[#3E2B1D]/30 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {featuredProjects.map((proj, idx) => {
            const isActive = activeProjectIdx === idx;
            const shortTitle = proj.title.split('–')[0].split('-')[0].trim().toUpperCase();
            return (
              <button
                key={idx}
                onClick={() => onSelectProject(idx)}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs font-mono font-black uppercase transition-all whitespace-nowrap border cursor-pointer ${isActive
                  ? 'bg-[#3E2B1D] text-[#F4EADA] border-[#3E2B1D] shadow-[1.5px_1.5px_0px_#C84B31]'
                  : 'bg-[#F4EADA] text-[#3E2B1D] hover:bg-[#D8C2AA] border-[#3E2B1D]/40'
                  }`}
              >
                0{idx + 1} {shortTitle}
              </button>
            );
          })}
        </div>

        {/* Project Content Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 text-[#3E2B1D] min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 md:gap-5 items-start"
            >
              {/* Left: Project Thumbnail Frame & Technologies */}
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

                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E2B1D]/5 to-transparent pointer-events-none opacity-40" />
                </div>

                {/* Tag Chips */}
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

                {/* Technologies */}
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

              {/* Right: Project Details & Typewriter Excerpt */}
              <div className="md:col-span-7 flex flex-col gap-2 sm:gap-3">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
                    {currentProject.title}
                  </h3>
                  <div className="text-[9px] sm:text-[11px] font-mono font-bold text-[#C84B31] uppercase mt-0.5">
                    {currentProject.category}
                  </div>
                </div>

                {/* Typewriter Excerpt */}
                <div className="p-2.5 sm:p-3 bg-[#F4EADA] border border-[#3E2B1D]/40 text-[10px] sm:text-xs md:text-sm font-mono leading-relaxed text-[#3E2B1D] min-h-[90px] sm:min-h-[120px] shadow-[2px_2px_0px_#3E2B1D]/10">
                  <span>{displayedProjectExcerpt}</span>
                  <span className="inline-block w-1.5 h-3.5 sm:h-4 bg-[#C84B31] animate-pulse ml-0.5 align-middle" />
                </div>

                {currentProject.problem && (
                  <div className="text-[9px] sm:text-[11px] font-mono text-[#6E543F] leading-snug">
                    <span className="font-bold text-[#3E2B1D]">CORE FOCUS: </span>
                    {currentProject.goal || currentProject.problem}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status & Navigation Footer */}
        <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onPrevProject}
              disabled={activeProjectIdx === 0}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
              title="Previous Project"
            >
              <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>PREV PROJ</span>
            </button>
            <button
              onClick={onNextProject}
              disabled={activeProjectIdx === featuredProjects.length - 1}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 disabled:hover:bg-[#EADBCC] border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 font-mono text-[8px] sm:text-[10px]"
              title="Next Project"
            >
              <span>NEXT PROJ</span>
              <CaretRightIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
