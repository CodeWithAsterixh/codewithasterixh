'use client';

import React from 'react';
import { motion, MotionValue, AnimatePresence } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';
import { ProjectMediaPanel } from './ProjectMediaPanel';
import { ProjectDetailsPanel } from './ProjectDetailsPanel';
import { ProjectTabsBar } from './ProjectTabsBar';

interface ProjectsSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  pointerEvents: MotionValue<any>;
  visibility: MotionValue<any>;
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
  const displayedProjectExcerpt = (currentProject?.excerpt || '').slice(0, projectCharCount);

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents: pointerEvents as any, visibility: visibility as any }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30"
    >
      <div className="w-full max-h-[calc(100dvh-175px)] md:max-h-[460px] flex flex-col bg-[#EADBCC] border-2 md:border-4 border-[#3E2B1D] shadow-[4px_4px_0px_#3E2B1D] md:shadow-[8px_8px_0px_#3E2B1D] overflow-hidden text-left pointer-events-auto">
        <div className="flex items-center justify-between px-2.5 py-1 sm:px-4 sm:py-2 bg-[#D4A373] text-[#3E2B1D] border-b-2 md:border-b-4 border-[#3E2B1D] font-mono text-[9px] sm:text-xs md:text-sm font-black tracking-wider uppercase">
          <span>CHAPTER 05: FEATURED PROJECTS</span>
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

        <ProjectTabsBar projects={featuredProjects} activeProjectIdx={activeProjectIdx} onSelectProject={onSelectProject} />

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
              <ProjectMediaPanel currentProject={currentProject} />
              <ProjectDetailsPanel currentProject={currentProject} displayedProjectExcerpt={displayedProjectExcerpt} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-2.5 sm:px-3 py-1 bg-[#F4EADA] border-t border-[#3E2B1D]/30 text-[8px] sm:text-[10px] font-mono text-[#8C6D53]">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onPrevProject}
              disabled={activeProjectIdx === 0}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
            >
              <CaretLeftIcon weight="duotone" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>PREV PROJ</span>
            </button>
            <button
              onClick={onNextProject}
              disabled={activeProjectIdx === featuredProjects.length - 1}
              className="px-1.5 py-0.5 bg-[#EADBCC] hover:bg-[#D8C2AA] disabled:opacity-40 border border-[#3E2B1D] font-bold text-[#3E2B1D] cursor-pointer disabled:cursor-not-allowed uppercase flex items-center gap-1 text-[8px] sm:text-[10px]"
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
