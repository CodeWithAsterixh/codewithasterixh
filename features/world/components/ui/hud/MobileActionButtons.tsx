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
  const handleDir = (action: VirtualInputAction) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleVirtualInput(action);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {isCombatActive && (
        <>
          <button
            onPointerDown={handleDir('attack1')}
            className="w-14 h-10 bg-[#DC2626] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK1
          </button>
          <button
            onPointerDown={handleDir('attack2')}
            className="w-14 h-10 bg-[#2563EB] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK2
          </button>
          <button
            onPointerDown={handleDir('attack3')}
            className="w-14 h-10 bg-[#7C3AED] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK3
          </button>
          <button
            onPointerDown={handleDir('attack4')}
            className="w-14 h-10 bg-[#EA580C] text-white font-black uppercase text-[9px] flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            ATK4
          </button>
        </>
      )}

      <button
        onPointerDown={handleDir('jump')}
        className="w-14 h-10 bg-[#6366F1] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        <ArrowFatUpIcon size={14} weight="fill" />
        <span>JUMP</span>
      </button>

      <button
        onClick={() => handleInspectStation()}
        className="w-14 h-10 bg-[#0D9488] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
      >
        <EyeIcon size={14} weight="bold" />
        <span>INSP</span>
      </button>
    </div>
  );
};
