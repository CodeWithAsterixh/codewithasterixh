'use client';

import React from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

interface MobileWorksTabProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProjectIndex: number;
  setSelectedProjectIndex: (idx: number) => void;
  activeProject: any;
  filteredProjects: any[];
  onClose: () => void;
  onOpenProjectDetail?: (projectSlug: string) => void;
}

export const MobileWorksTab: React.FC<MobileWorksTabProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedProjectIndex,
  setSelectedProjectIndex,
  activeProject,
  filteredProjects,
  onClose,
  onOpenProjectDetail,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setSelectedCategory(cat); setSelectedProjectIndex(0); }}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className={`px-2 py-1 text-xs font-black uppercase border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] ${
              selectedCategory === cat ? 'bg-[#1F1914] text-white' : 'bg-[#FAF5E6] text-[#5C4F41]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ clipPath: PIXEL_CLIP_MD }} className="p-3 bg-[#FAF5E6] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-2">
        {activeProject.thumbnail && (
          <img
            src={activeProject.thumbnail}
            alt={activeProject.title}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className="w-full h-32 object-cover border-2 border-black"
          />
        )}
        <h3 className="text-sm font-extrabold text-[#1F1914]">{activeProject.title}</h3>
        <p className="text-xs text-[#5C4F41] leading-relaxed">{activeProject.excerpt}</p>

        <div className="flex flex-wrap gap-1">
          {activeProject.tools?.map((tool: string) => (
            <span key={tool} style={{ clipPath: PIXEL_CLIP_SM }} className="px-1.5 py-0.5 bg-[#EFE3C3] border border-black text-[10px] font-bold">
              {tool}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => { onClose(); onOpenProjectDetail?.(activeProject.slug); }}
          style={{ clipPath: PIXEL_CLIP_MD }}
          className="w-full py-2 bg-[#243C6E] hover:bg-[#2F4E8F] text-white text-xs font-black uppercase flex items-center justify-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRightIcon size={12} weight="bold" />
        </button>
      </div>

      <div className="space-y-1.5 pt-2">
        <div className="text-[11px] font-bold uppercase text-[#7A6E5F]">All Projects</div>
        {filteredProjects.map((proj: any, idx: number) => (
          <button
            key={proj.slug}
            type="button"
            onClick={() => setSelectedProjectIndex(idx)}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className={`w-full text-left p-2 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${
              idx === selectedProjectIndex ? 'bg-white shadow-[2px_2px_0px_#243C6E]' : 'bg-[#FAF5E6] shadow-[1px_1px_0_rgba(0,0,0,0.5)]'
            }`}
          >
            <span className="text-xs font-bold text-[#1F1914] truncate">{proj.title}</span>
            <ArrowRightIcon size={12} weight="bold" className="text-[#243C6E]" />
          </button>
        ))}
      </div>
    </div>
  );
};
