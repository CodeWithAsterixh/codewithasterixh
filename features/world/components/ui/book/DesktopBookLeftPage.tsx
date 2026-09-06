'use client';

import React from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';
import { getOptimizedImageUrl } from '@/features/world/utils/imageProxy';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

interface DesktopBookLeftPageProps {
  currentTab: 'about' | 'works';
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProjectIndex: number;
  setSelectedProjectIndex: (idx: number) => void;
  filteredProjects: any[];
  categories: string[];
}

export const DesktopBookLeftPage: React.FC<DesktopBookLeftPageProps> = ({
  currentTab,
  selectedCategory,
  setSelectedCategory,
  selectedProjectIndex,
  setSelectedProjectIndex,
  filteredProjects,
  categories,
}) => {
  if (currentTab === 'about') {
    return (
      <div className="h-full flex flex-col justify-between space-y-2">
        <div className="space-y-2 flex flex-col items-center text-center">
          <div style={{ clipPath: PIXEL_CLIP_MD }} className="w-fit max-w-md h-auto aspect-square overflow-hidden shrink-0">
            <img
              src={getOptimizedImageUrl(profileData.images.about.src || '/images/profile/about.png')}
              alt={profileData.name}
              className="w-full h-auto max-h-32 object-contain object-center"
            />
          </div>

          <div>
            <div className="text-[8.5px] font-bold uppercase tracking-wider text-[#7A6E5F]">{profileData.role}</div>
            <h2 className="text-sm md:text-base font-extrabold text-[#1F1914] leading-tight">{profileData.name}</h2>
            <span className="text-[9.5px] font-bold text-[#2563EB]">{profileData.handle} • {profileData.about.badgeLabel}</span>
          </div>

          <p className="text-[9px] md:text-[10px] leading-relaxed text-[#4A4036] font-medium line-clamp-3">
            {profileData.subtext}
          </p>

          <div style={{ clipPath: PIXEL_CLIP_MD }} className="p-2 bg-[#E2D5B7] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)] space-y-0.5">
            <div className="text-[9.5px] font-bold text-[#1F1914] uppercase">Mission & Focus</div>
            <p className="text-[8px] text-[#5C4F41] leading-tight italic">&ldquo;{profileData.hero.quote}&rdquo;</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-1.5 border-t-2 border-black">
          {profileData.stats.map((stat, idx) => (
            <div key={idx} style={{ clipPath: PIXEL_CLIP_SM }} className="p-1 bg-[#FAF4E4] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] text-center flex flex-col justify-center">
              <span className={`block text-xs font-black ${idx === 0 ? 'text-[#1F1914]' : idx === 1 ? 'text-[#2563EB]' : 'text-[#10B981]'}`}>
                {stat.value}
              </span>
              <span className="text-[7.5px] font-bold text-[#7A6E5F] leading-tight block whitespace-pre-line">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-start space-y-1.5">
      <div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-[#7A6E5F]">Directory</div>
        <h2 className="text-xs sm:text-sm font-extrabold text-[#1F1914]">Projects ({filteredProjects.length})</h2>
      </div>

      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setSelectedProjectIndex(0); }}
            style={{ clipPath: PIXEL_CLIP_SM }}
            className={`px-2 py-1 text-[9px] font-black uppercase transition-all border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] ${
              selectedCategory === cat ? 'bg-[#1F1914] text-white' : 'bg-[#FAF4E4] text-[#5C4F41]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1 pt-1 max-h-[220px]">
        {filteredProjects.map((proj: any, idx: number) => {
          const isSelected = idx === selectedProjectIndex;
          return (
            <button
              key={proj.slug}
              onClick={() => setSelectedProjectIndex(idx)}
              style={{ clipPath: PIXEL_CLIP_SM }}
              className={`w-full text-left p-2 border-2 border-black transition-all flex items-center justify-between cursor-pointer ${
                isSelected ? 'bg-white shadow-[2px_2px_0px_#243C6E]' : 'bg-[#FAF4E4] shadow-[1px_1px_0_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="overflow-hidden pr-1">
                <div className="text-[10px] md:text-xs font-bold text-[#1F1914] truncate">{proj.title}</div>
                <div className="text-[8.5px] text-[#7A6E5F] truncate">{proj.excerpt}</div>
              </div>
              <ArrowRightIcon size={12} weight="bold" className={isSelected ? 'text-[#243C6E]' : 'text-[#7A6E5F]'} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
