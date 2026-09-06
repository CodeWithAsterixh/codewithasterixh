'use client';

import React from 'react';
import { CodeIcon, ArrowRightIcon, PaperPlaneTiltIcon, MailboxIcon, MapPinIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

interface DesktopBookRightPageProps {
  currentTab: 'about' | 'works';
  onClose: () => void;
  onOpenContact?: () => void;
  onOpenProjectDetail?: (projectSlug: string) => void;
  activeProject: any;
  skillsList: string[];
}

export const DesktopBookRightPage: React.FC<DesktopBookRightPageProps> = ({
  currentTab,
  onClose,
  onOpenContact,
  onOpenProjectDetail,
  activeProject,
  skillsList,
}) => {
  if (currentTab === 'about') {
    return (
      <div className="h-full flex flex-col">
        <div className="text-[10px] font-bold text-[#1F1914] uppercase tracking-wider mb-1.5">
          Tech Stack & Tools ({skillsList.length})
        </div>

        <div className="flex-1 overflow-y-auto pr-0.5 mb-2">
          <div className="flex flex-wrap gap-1 content-start">
            {skillsList.map((skill) => (
              <span key={skill} style={{ clipPath: PIXEL_CLIP_SM }} className="px-1.5 py-0.5 bg-[#FAF4E4] border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[8.5px] font-mono font-bold text-[#1F1914]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{ clipPath: PIXEL_CLIP_MD }} className="p-2 bg-[#E2D5B7] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)] space-y-0.5 shrink-0 mb-2">
          <div className="text-[9.5px] font-bold text-[#1F1914] uppercase">Standards & Contact</div>
          <p className="text-[8.5px] text-[#5C4F41] leading-tight">
            <MapPinIcon /> {profileData.location} &bull; <MailboxIcon /> {profileData.email}
          </p>
          <p className="text-[8px] text-[#7A6E5F] leading-tight">
            Clean code, modular architecture, responsive designs, and test-driven development.
          </p>
        </div>

        <div className="pt-2 border-t-2 border-black shrink-0">
          <button
            onClick={() => { onClose(); onOpenContact?.(); }}
            style={{ clipPath: PIXEL_CLIP_MD }}
            className="w-full py-2.5 px-3 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] text-xs font-black uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
          >
            <span>{profileData.hero?.secondaryCta?.label || 'Send Message'}</span>
            <PaperPlaneTiltIcon size={14} weight="bold" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-1.5">
        <div style={{ clipPath: PIXEL_CLIP_MD }} className="w-full h-28 md:h-32 overflow-hidden bg-[#1F1914] border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.6)] relative">
          {activeProject.thumbnail ? (
            <img src={activeProject.thumbnail} alt={activeProject.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7A6E5F]">
              <CodeIcon size={24} weight="duotone" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xs md:text-sm font-extrabold text-[#1F1914] truncate">{activeProject.title}</h3>
          <p className="text-[9px] text-[#5C4F41] mt-0.5 line-clamp-2">{activeProject.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {activeProject.tools?.slice(0, 4).map((tool: string) => (
            <span key={tool} style={{ clipPath: PIXEL_CLIP_SM }} className="px-2 py-0.5 bg-[#FAF4E4] border border-black text-[8.5px] font-mono font-bold text-[#1F1914]">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t-2 border-black">
        <button
          onClick={() => { onClose(); onOpenProjectDetail?.(activeProject.slug); }}
          style={{ clipPath: PIXEL_CLIP_MD }}
          className="w-full py-2 px-3 bg-[#243C6E] hover:bg-[#2F4E8F] text-white font-black uppercase text-xs flex items-center justify-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
        >
          <span>View Project Details</span>
          <ArrowRightIcon size={12} weight="bold" />
        </button>
      </div>
    </div>
  );
};
