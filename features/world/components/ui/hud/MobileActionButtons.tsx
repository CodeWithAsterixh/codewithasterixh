'use client';

import React from 'react';
import { ArrowFatUpIcon, EyeIcon } from '@phosphor-icons/react';
import { VirtualInputAction } from '../../../types';

interface MobileActionButtonsProps {
  isCombatActive: boolean;
  handleVirtualInput: (action: VirtualInputAction, payload?: any) => void;
  handleInspectStation: () => void;
}

export const MobileActionButtons: React.FC<MobileActionButtonsProps> = ({
  isCombatActive,
  handleVirtualInput,
  handleInspectStation,
}) => {
  const handleAction = (action: VirtualInputAction) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleVirtualInput(action);
  };

  return (
    <div className="flex flex-col gap-1.5 select-none touch-none">
      {isCombatActive && (
        <>
          <button
            onPointerDown={handleAction('attack1')}
            className="w-14 h-10 bg-[#DC2626] active:bg-[#B91C1C] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK1
          </button>
          <button
            onPointerDown={handleAction('attack2')}
            className="w-14 h-10 bg-[#2563EB] active:bg-[#1D4ED8] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK2
          </button>
          <button
            onPointerDown={handleAction('attack3')}
            className="w-14 h-10 bg-[#7C3AED] active:bg-[#6D28D9] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK3
          </button>
          <button
            onPointerDown={handleAction('attack4')}
            className="w-14 h-10 bg-[#EA580C] active:bg-[#C2410C] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK4
          </button>
        </>
      )}

      <button
        onPointerDown={handleAction('jump_start')}
        onPointerUp={handleAction('jump_stop')}
        onPointerLeave={handleAction('jump_stop')}
        onPointerCancel={handleAction('jump_stop')}
        className="w-14 h-10 bg-[#6366F1] active:bg-[#4F46E5] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        <ArrowFatUpIcon size={14} weight="fill" />
        <span>JUMP</span>
      </button>

      <button
        onClick={() => handleInspectStation()}
        className="w-14 h-10 bg-[#0D9488] active:bg-[#0F766E] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        <EyeIcon size={14} weight="bold" />
        <span>INSP</span>
      </button>
    </div>
  );
};
