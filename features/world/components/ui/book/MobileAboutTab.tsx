'use client';

import React from 'react';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

interface MobileAboutTabProps {
  skillsList: string[];
  onClose: () => void;
  onOpenContact?: () => void;
}

export const MobileAboutTab: React.FC<MobileAboutTabProps> = ({ skillsList, onClose, onOpenContact }) => {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-3">
        <div style={{ clipPath: PIXEL_CLIP_SM }} className="w-12 h-12 bg-[#243C6E] text-white flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] overflow-hidden">
          <img src={profileData.images.about.src || '/images/profile/about.png'} alt={profileData.name} className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-[#1F1914]">{profileData.name} ({profileData.alias})</h2>
          <span className="text-xs text-[#2563EB] font-bold">{profileData.role}</span>
        </div>
      </div>

      <p className="text-xs text-[#4A4036] leading-relaxed">{profileData.subtext}</p>

      <div className="grid grid-cols-3 gap-1.5">
        {profileData.stats.map((stat, idx) => (
          <div key={idx} style={{ clipPath: PIXEL_CLIP_SM }} className="p-1.5 bg-[#FAF5E6] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] text-center">
            <span className={`block text-xs font-black ${idx === 0 ? 'text-[#1F1914]' : idx === 1 ? 'text-[#2563EB]' : 'text-[#10B981]'}`}>
              {stat.value}
            </span>
            <span className="text-[8px] font-bold text-[#7A6E5F] block whitespace-pre-line leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="text-xs font-bold uppercase text-[#7A6E5F]">Tech Stack & Tools ({skillsList.length})</div>
        <div className="flex flex-wrap gap-1 h-fit">
          {skillsList.map((skill) => (
            <span key={skill} style={{ clipPath: PIXEL_CLIP_SM }} className="px-2 py-0.5 bg-[#FAF5E6] border border-black shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-[10px] font-mono font-bold text-[#3D332A]">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => { onClose(); onOpenContact?.(); }}
        style={{ clipPath: PIXEL_CLIP_MD }}
        className="w-full py-2.5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] text-xs font-black uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px cursor-pointer"
      >
        <span>{profileData.hero?.secondaryCta?.label || 'Send Message'}</span>
        <PaperPlaneTiltIcon size={14} weight="bold" />
      </button>
    </div>
  );
};
