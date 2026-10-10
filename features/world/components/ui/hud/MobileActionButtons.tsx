'use client';

import React from 'react';
import {
  TriangleIcon,
  SquareIcon,
  CircleIcon,
  XIcon,
  ArrowFatUpIcon,
  EyeIcon,
} from '@phosphor-icons/react';
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
    <div className="flex flex-col items-end gap-2 select-none touch-none pointer-events-auto bg-transparent">
      {/* 1. XBOX CONTROLLER DIAMOND CLUSTER FOR COMBAT (NO CONTAINER BACKGROUND) */}
      {isCombatActive && (
        <div className="relative w-32 h-32 flex items-center justify-center bg-transparent">
          {/* TOP (Triangle - Amber) */}
          <button
            onPointerDown={handleAction('attack1')}
            className="absolute top-1.5 w-10 h-10 rounded-full bg-[#EAB308] hover:bg-[#FACC15] active:bg-[#CA8A04] text-[#1A1D24] flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
            aria-label="Attack 1 Triangle"
          >
            <TriangleIcon size={18} weight="duotone" />
          </button>

          {/* LEFT (Square - Blue) */}
          <button
            onPointerDown={handleAction('attack2')}
            className="absolute left-1.5 w-10 h-10 rounded-full bg-[#2563EB] hover:bg-[#3B82F6] active:bg-[#1D4ED8] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
            aria-label="Attack 2 Square"
          >
            <SquareIcon size={18} weight="duotone" />
          </button>

          {/* RIGHT (Circle - Red) */}
          <button
            onPointerDown={handleAction('attack3')}
            className="absolute right-1.5 w-10 h-10 rounded-full bg-[#DC2626] hover:bg-[#EF4444] active:bg-[#B91C1C] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
            aria-label="Attack 3 Circle"
          >
            <CircleIcon size={18} weight="duotone" />
          </button>

          {/* BOTTOM (X - Green) */}
          <button
            onPointerDown={handleAction('attack4')}
            className="absolute bottom-1.5 w-10 h-10 rounded-full bg-[#10B981] hover:bg-[#34D399] active:bg-[#059669] text-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
            aria-label="Attack 4 X"
          >
            <XIcon size={18} weight="bold" />
          </button>
        </div>
      )}

      {/* 2. JUMP & INSPECT BUTTONS (NO CONTAINER BACKGROUND) */}
      <div className="flex items-center gap-1.5 bg-transparent">
        <button
          onPointerDown={handleAction('jump_start')}
          onPointerUp={handleAction('jump_stop')}
          onPointerLeave={handleAction('jump_stop')}
          onPointerCancel={handleAction('jump_stop')}
          className="px-3 py-1.5 rounded-sm bg-[#6366F1] active:bg-[#4F46E5] text-white font-black uppercase text-[10px] flex items-center justify-center gap-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
          aria-label="Jump"
        >
          <ArrowFatUpIcon size={14} weight="fill" />
          <span>JUMP</span>
        </button>

        <button
          onClick={() => handleInspectStation()}
          className="px-3 py-1.5 rounded-sm bg-[#0D9488] active:bg-[#0F766E] text-white font-black uppercase text-[10px] flex items-center justify-center gap-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:scale-95 transition-transform"
          aria-label="Inspect Station"
        >
          <EyeIcon size={14} weight="bold" />
          <span>INSP</span>
        </button>
      </div>
    </div>
  );
};
