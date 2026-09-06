'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, LightningIcon } from '@phosphor-icons/react';
import { VirtualInputAction } from '../../../types';

interface MobileDpadControlsProps {
  handleVirtualInput: (action: VirtualInputAction, payload?: any) => void;
}

export const MobileDpadControls: React.FC<MobileDpadControlsProps> = ({ handleVirtualInput }) => {
  const [isSprintActive, setIsSprintActive] = useState<boolean>(false);

  const handleToggleSprint = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSprintActive((prev) => {
      const next = !prev;
      handleVirtualInput(next ? 'sprint_start' : 'sprint_stop');
      return next;
    });
  };

  const handleDir = (action: VirtualInputAction) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleVirtualInput(action);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-32 h-32 bg-[#0F141F] border-4 border-[#384252] shadow-[4px_4px_0px_rgba(0,0,0,1)] p-1.5 grid grid-cols-3 grid-rows-3 gap-1 touch-none select-none">
        <div />
        <button
          onPointerDown={handleDir('up_start')}
          onPointerUp={handleDir('up_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] text-white font-bold flex items-center justify-center border border-black cursor-pointer"
        >
          <ArrowUpIcon size={18} weight="bold" />
        </button>
        <div />
        <button
          onPointerDown={handleDir('left_start')}
          onPointerUp={handleDir('left_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] text-white font-bold flex items-center justify-center border border-black cursor-pointer"
        >
          <ArrowLeftIcon size={18} weight="bold" />
        </button>
        <div className="w-full h-full bg-[#1A1D24] border border-[#384252] flex items-center justify-center">
          <div className="w-2 h-2 bg-[#D9A441]" />
        </div>
        <button
          onPointerDown={handleDir('right_start')}
          onPointerUp={handleDir('right_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] text-white font-bold flex items-center justify-center border border-black cursor-pointer"
        >
          <ArrowRightIcon size={18} weight="bold" />
        </button>
        <div />
        <button
          onPointerDown={handleDir('down_start')}
          onPointerUp={handleDir('down_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] text-white font-bold flex items-center justify-center border border-black cursor-pointer"
        >
          <ArrowDownIcon size={18} weight="bold" />
        </button>
        <div />
      </div>

      <button
        onClick={handleToggleSprint}
        className={`w-14 h-14 font-black uppercase text-xs flex flex-col items-center justify-center gap-0.5 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer ${
          isSprintActive ? 'bg-[#E5A93C] text-[#1A1D24]' : 'bg-[#1E242D] text-white/80'
        }`}
      >
        <LightningIcon size={20} weight={isSprintActive ? 'fill' : 'bold'} />
        <span className="text-[9px] font-mono">{isSprintActive ? 'RUN' : 'SPRINT'}</span>
      </button>
    </div>
  );
};
