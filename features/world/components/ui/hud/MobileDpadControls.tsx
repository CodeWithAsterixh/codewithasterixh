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

  const createDirHandlers = (startAction: VirtualInputAction, stopAction: VirtualInputAction) => ({
    onPointerDown: (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleVirtualInput(startAction);
    },
    onPointerUp: (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleVirtualInput(stopAction);
    },
    onPointerLeave: (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleVirtualInput(stopAction);
    },
    onPointerCancel: (e: React.SyntheticEvent) => {
      e.preventDefault();
      handleVirtualInput(stopAction);
    },
  });

  return (
    <div className="flex items-center gap-2 select-none touch-none bg-transparent">
      {/* Transparent D-Pad container with no background */}
      <div className="relative w-32 h-32 p-0 grid grid-cols-3 grid-rows-3 gap-1 touch-none select-none bg-transparent">
        <div />
        <button
          {...createDirHandlers('up_start', 'up_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#4B5563] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-sm cursor-pointer"
          aria-label="Move Up"
        >
          <ArrowUpIcon size={18} weight="bold" />
        </button>
        <div />

        <button
          {...createDirHandlers('left_start', 'left_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#4B5563] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-sm cursor-pointer"
          aria-label="Move Left"
        >
          <ArrowLeftIcon size={18} weight="bold" />
        </button>
        <div className="w-full h-full bg-[#1A1D24] border border-[#384252] flex items-center justify-center">
          <div className="w-2 h-2 bg-[#D9A441]" />
        </div>
        <button
          {...createDirHandlers('right_start', 'right_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#4B5563] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-sm cursor-pointer"
          aria-label="Move Right"
        >
          <ArrowRightIcon size={18} weight="bold" />
        </button>

        <div />
        <button
          {...createDirHandlers('down_start', 'down_stop')}
          className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#4B5563] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-sm cursor-pointer"
          aria-label="Move Down"
        >
          <ArrowDownIcon size={18} weight="bold" />
        </button>
        <div />
      </div>

      {/* Sprint Button without glassmorphism */}
      <button
        onClick={handleToggleSprint}
        className={`w-14 h-14 font-black uppercase text-xs flex flex-col items-center justify-center gap-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-sm cursor-pointer ${
          isSprintActive ? 'bg-[#E5A93C] text-[#1A1D24]' : 'bg-[#1E242D] text-white/90'
        }`}
        aria-label="Toggle Sprint"
      >
        <LightningIcon size={20} weight={isSprintActive ? 'fill' : 'bold'} />
        <span className="text-[9px] font-mono">{isSprintActive ? 'RUN' : 'SPRINT'}</span>
      </button>
    </div>
  );
};
