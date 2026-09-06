import React from 'react';
import clsx from 'clsx';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_MD = 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))';

export interface ControlPanelProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ icon, title, children }) => {
  return (
    <div style={{ clipPath: PIXEL_CLIP_MD }} className="space-y-2 border-2 border-black bg-[#1F242C] p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#F0C75E]">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};

export interface ControlRowProps {
  label: string;
  keys: string[];
}

export const ControlRow: React.FC<ControlRowProps> = ({ label, keys }) => {
  return (
    <div style={{ clipPath: PIXEL_CLIP_SM }} className="flex items-center justify-between border border-black bg-[#2A313C] px-2.5 py-1.5 text-[9px] shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">
      <span className="font-black uppercase text-[#CAD1DB]">{label}</span>
      <div className="flex gap-1">
        {keys.map((key) => (
          <kbd key={key} style={{ clipPath: PIXEL_CLIP_SM }} className="flex items-center justify-center border-2 border-black bg-[#1A1F26] px-1.5 py-0.5 font-mono text-[9px] font-black text-[#F0C75E] shadow-[1px_1px_0px_rgba(0,0,0,1)]">
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
};
