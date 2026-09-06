'use client';

import React from 'react';
import { XIcon } from '@phosphor-icons/react';
import { DesktopBookLeftPage } from './DesktopBookLeftPage';
import { DesktopBookRightPage } from './DesktopBookRightPage';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';

interface DesktopBookSpreadProps {
  currentTab: 'about' | 'works';
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

export const DesktopBookSpread: React.FC<DesktopBookSpreadProps> = (props) => {
  return (
    <div className="hidden sm:block relative w-full max-w-[880px] aspect-[246/183] drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] animate-in zoom-in-95 duration-200">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/books/opened_book_bg.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
        }}
      />

      <button
        onClick={props.onClose}
        style={{ clipPath: PIXEL_CLIP_SM }}
        className="absolute top-2 right-3 w-8 h-8 bg-[#1F1914] hover:bg-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#EADBCC] hover:text-white flex items-center justify-center transition-all z-40 active:translate-x-px active:translate-y-px cursor-pointer"
        title="Close [ESC]"
      >
        <XIcon size={16} weight="bold" />
      </button>

      <div className="absolute inset-0 flex text-[#241F1A] px-[7.5%] pt-[8%] pb-[9%]">
        <div className="w-[45%] h-full flex flex-col justify-start pr-[2%] overflow-hidden">
          <DesktopBookLeftPage
            currentTab={props.currentTab}
            selectedCategory={props.selectedCategory}
            setSelectedCategory={props.setSelectedCategory}
            selectedProjectIndex={props.selectedProjectIndex}
            setSelectedProjectIndex={props.setSelectedProjectIndex}
            filteredProjects={props.filteredProjects}
            categories={props.categories}
          />
        </div>

        <div className="w-[10%]" />

        <div className="w-[45%] h-full flex flex-col pl-[2%] overflow-hidden">
          <DesktopBookRightPage
            currentTab={props.currentTab}
            onClose={props.onClose}
            onOpenContact={props.onOpenContact}
            onOpenProjectDetail={props.onOpenProjectDetail}
            activeProject={props.activeProject}
            skillsList={props.skillsList}
          />
        </div>
      </div>
    </div>
  );
};
