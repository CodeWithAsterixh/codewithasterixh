'use client';

import React from 'react';
import { XIcon } from '@phosphor-icons/react';
import projectsData from '@/data/projects.json';
import { MobileAboutTab } from './MobileAboutTab';
import { MobileWorksTab } from './MobileWorksTab';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_OUTER = 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))';

interface MobileBookViewProps {
  currentTab: 'about' | 'works';
  setCurrentTab: (tab: 'about' | 'works') => void;
  onClose: () => void;
  onOpenContact?: () => void;
  onOpenProjectDetail?: (projectSlug: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProjectIndex: number;
  setSelectedProjectIndex: (idx: number) => void;
  filteredProjects: any[];
  activeProject: any;
  categories: string[];
  skillsList: string[];
}

export const MobileBookView: React.FC<MobileBookViewProps> = ({
  currentTab,
  setCurrentTab,
  onClose,
  onOpenContact,
  onOpenProjectDetail,
  selectedCategory,
  setSelectedCategory,
  selectedProjectIndex,
  setSelectedProjectIndex,
  filteredProjects,
  activeProject,
  categories,
  skillsList,
}) => {
  return (
    <div style={{ clipPath: PIXEL_CLIP_OUTER }} className="block sm:hidden relative w-full max-w-md bg-[#EFE3C3] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh] text-[#241F1A]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#E8DAAF] border-b-2 border-black">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentTab('about')}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className={`px-3 py-1 text-xs font-black uppercase transition-all border-2 border-black ${
              currentTab === 'about' ? 'bg-[#243C6E] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-[#FAF5E6] text-[#5C4F41]'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab('works')}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className={`px-3 py-1 text-xs font-black uppercase transition-all border-2 border-black ${
              currentTab === 'works' ? 'bg-[#243C6E] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'bg-[#FAF5E6] text-[#5C4F41]'
            }`}
          >
            Projects ({projectsData.length})
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{ clipPath: PIXEL_CLIP_SM }}
          className="w-7 h-7 bg-[#FAF5E6] hover:bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#1F1914] flex items-center justify-center font-bold"
        >
          <XIcon size={14} weight="bold" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentTab === 'about' ? (
          <MobileAboutTab skillsList={skillsList} onClose={onClose} onOpenContact={onOpenContact} />
        ) : (
          <MobileWorksTab
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedProjectIndex={selectedProjectIndex}
            setSelectedProjectIndex={setSelectedProjectIndex}
            activeProject={activeProject}
            filteredProjects={filteredProjects}
            onClose={onClose}
            onOpenProjectDetail={onOpenProjectDetail}
          />
        )}
      </div>
    </div>
  );
};
