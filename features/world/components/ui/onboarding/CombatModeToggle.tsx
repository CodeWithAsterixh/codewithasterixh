'use client';

import React from 'react';
import clsx from 'clsx';

const PIXEL_CLIP_SM = 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))';
const PIXEL_CLIP_LG = 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))';

interface CombatModeToggleProps {
  isCombatActive: boolean;
  setIsCombatActive: (active: boolean) => void;
}

export const CombatModeToggle: React.FC<CombatModeToggleProps> = ({
  isCombatActive,
  setIsCombatActive,
}) => {
  return (
    <div style={{ clipPath: PIXEL_CLIP_LG }} className="sm:col-span-12 flex items-center justify-between p-2.5 px-3.5 bg-[#FAF5E6] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2.5">
        <div
          style={{ clipPath: PIXEL_CLIP_SM }}
          className={clsx(
            'w-7 h-7 flex items-center justify-center border-2 border-black shadow-[1px_1px_0_rgba(0,0,0,1)] text-xs font-black select-none',
            isCombatActive ? 'bg-[#DC2626] text-white' : 'bg-[#2C3440] text-white/70'
          )}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
            <path d="M1 1h2v2H1V1zm2 2h2v2H3V3zm2 2h2v2H5V5zm4 0h2v2H9V5zm2-2h2v2h-2V3zm2-2h2v2h-2V1zm-4 6h2v2H9V7zm-2 2h2v2H7V9zm-2 2h2v2H5v-2zm-2 2h2v2H3v-2zm-2 2h2v2H1v-2zm12-4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2H9v-2z" />
          </svg>
        </div>
        <div>
          <div className="text-xs font-extrabold text-[#1F1914] flex items-center gap-1.5">
            <span>Activate Fighting & Enemy Ninjas</span>
            <span
              style={{ clipPath: PIXEL_CLIP_SM }}
              className={clsx(
                'text-[9px] px-2 py-0.5 border border-black shadow-[1px_1px_0_rgba(0,0,0,1)] font-mono font-bold uppercase tracking-wider',
                isCombatActive ? 'bg-[#DC2626] text-white' : 'bg-[#4B5563] text-white'
              )}
            >
              {isCombatActive ? 'Active' : 'Disabled'}
            </span>
          </div>
          <p className="text-[10px] text-[#635547]">
            {isCombatActive
              ? 'Enemy shadow ninjas will spawn periodically in the wild to challenge you!'
              : 'Peaceful exploration mode (default: no enemies will spawn).'}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsCombatActive(!isCombatActive)}
        style={{ clipPath: PIXEL_CLIP_SM }}
        className={clsx(
          'relative w-14 h-7 transition-colors duration-200 cursor-pointer p-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]',
          isCombatActive ? 'bg-[#DC2626]' : 'bg-[#4B5563]'
        )}
      >
        <div className={clsx('w-5 h-5 bg-white border border-black transition-transform duration-200', isCombatActive ? 'translate-x-7' : 'translate-x-0')} />
      </button>
    </div>
  );
};
