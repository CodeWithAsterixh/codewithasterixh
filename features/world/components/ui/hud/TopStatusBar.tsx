'use client';

import React from 'react';
import { CHARACTER_DEFS } from '../../../data/characterData';
import { CompassIcon, SignOutIcon, SunIcon, MoonIcon, EyeIcon } from '@phosphor-icons/react';
import { useCharacterContext } from '../../../context/CharacterStateContext';
import { useWorldContext } from '../../../context/WorldStateContext';
import { useModalContext } from '../../../context/ModalStateContext';

export const TopStatusBar: React.FC = () => {
  const { characterId, playerHp, maxPlayerHp, respawnCountdown, isCombatActive } = useCharacterContext();
  const { currentBiome, themeMode, handleThemeModeChange } = useWorldContext();
  const { handleOpenPauseMenu, handleExitWorld, handleInspectStation } = useModalContext();

  const characterName = CHARACTER_DEFS[characterId]?.name || 'Player';
  const healthPercent = Math.max(0, Math.min(100, (playerHp / maxPlayerHp) * 100));

  return (
    <div className="pointer-events-auto flex flex-col gap-2.5 w-full">
      <div className="flex items-center justify-between w-full">
        {/* Left Pause / Exit Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleOpenPauseMenu}
            style={{
              clipPath:
                'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
            }}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs sm:text-sm flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <CompassIcon size={18} weight="fill" />
            <span className="hidden sm:inline">Pause / Map</span>
            <span className="sm:hidden">Map</span>
          </button>

          <button
            onClick={handleExitWorld}
            style={{
              clipPath:
                'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
            }}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#C84B31] hover:bg-[#D95338] text-[#F4EADA] font-black uppercase text-xs sm:text-sm flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <SignOutIcon size={18} weight="duotone" />
            <span>Exit</span>
          </button>
        </div>

        {/* Right Light / Dark Mode Toggle */}
        <div
          className="flex items-center p-0.5 sm:p-1 bg-[#0F141F] border-2 border-[#384252] shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          style={{
            clipPath:
              'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
          }}
        >
          <button
            onClick={() => handleThemeModeChange('light')}
            className={`px-2 sm:px-3 py-1 text-xs font-black uppercase flex items-center gap-1 cursor-pointer ${
              themeMode === 'light' ? 'bg-[#E5A93C] text-[#1A1D24]' : 'text-white/60'
            }`}
          >
            <SunIcon size={14} weight="fill" />
            <span className="text-[10px] font-bold">Light</span>
          </button>
          <button
            onClick={() => handleThemeModeChange('dark')}
            className={`px-2 sm:px-3 py-1 text-xs font-black uppercase flex items-center gap-1 cursor-pointer ${
              themeMode === 'dark' ? 'bg-[#5B9BF3] text-[#1A1D24]' : 'text-white/60'
            }`}
          >
            <MoonIcon size={14} weight="fill" />
            <span className="text-[10px] font-bold">Dark</span>
          </button>
        </div>
      </div>

      {/* Health Bar & Inspect Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 bg-[#0F141F] border-4 border-[#384252] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-bold text-white">
              <span className="text-[#60A5FA]">{characterName}</span>
              <span>{Math.round(playerHp)}/{maxPlayerHp}</span>
            </div>
            <div className="w-32 sm:w-52 h-3 bg-black border-2 border-[#384252] p-[2px]">
              <div
                className={`h-full ${playerHp > 50 ? 'bg-[#10B981]' : playerHp > 25 ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'}`}
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>
        </div>

        {currentBiome?.isNearbyKiosk && (
          <button
            onClick={() => handleInspectStation()}
            className="px-3.5 py-1.5 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] animate-pulse cursor-pointer"
          >
            <EyeIcon size={15} weight="bold" />
            <span>{currentBiome.actionLabel ? `[E] ${currentBiome.actionLabel}` : 'Inspect [E]'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
