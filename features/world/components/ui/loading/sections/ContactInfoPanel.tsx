'use client';

import React from 'react';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import profileData from '@/data/profile.json';

interface ContactInfoPanelProps {
  isSoundOn: boolean;
  onPlaySound: (type: 'start' | 'click') => void;
}

export const ContactInfoPanel: React.FC<ContactInfoPanelProps> = ({ isSoundOn, onPlaySound }) => {
  return (
    <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
      <div>
        <h3 className="text-sm sm:text-base md:text-xl font-black text-[#3E2B1D] uppercase leading-tight font-mono">
          Let&apos;s build together
        </h3>
        <p className="text-[10px] sm:text-xs text-[#6E543F] font-mono leading-relaxed mt-1">
          Have a project in mind, a question, or a role to discuss? Send a message directly.
        </p>
      </div>

      <div className="p-2 sm:p-2.5 bg-[#F4EADA] border border-[#3E2B1D] shadow-[2px_2px_0px_#3E2B1D]">
        <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-0.5">
          DIRECT EMAIL
        </div>
        <a
          href={`mailto:${profileData.email}`}
          onClick={() => isSoundOn && onPlaySound('click')}
          className="text-[10px] sm:text-xs font-mono font-black text-[#C84B31] hover:underline break-all"
        >
          {profileData.email}
        </a>
      </div>

      <div>
        <div className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8C6D53] uppercase mb-1">
          FIND ME ON
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profileData.socials.map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => isSoundOn && onPlaySound('click')}
              className="px-2 py-1 bg-[#F4EADA] hover:bg-[#D8C2AA] border border-[#3E2B1D] text-[9px] sm:text-[10px] font-mono font-bold uppercase transition-colors flex items-center gap-1"
            >
              <span>{s.icon}</span>
              <ArrowUpRightIcon weight="duotone" className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
