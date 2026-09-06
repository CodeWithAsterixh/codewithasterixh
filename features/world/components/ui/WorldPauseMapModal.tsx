import React from 'react';
import clsx from 'clsx';
import { PlayIcon, XIcon, CompassIcon, SignOutIcon } from '@phosphor-icons/react';
import { FastTravelPanel } from './map/FastTravelPanel';
import { ControlsSettingsPanel } from './map/ControlsSettingsPanel';
import { CharacterSelectPanel } from './map/CharacterSelectPanel';
import { QuickActionsPanel } from './map/QuickActionsPanel';
import { useModalContext } from '../../context/ModalStateContext';

export const WorldPauseMapModal: React.FC = () => {
  const { isPauseModalOpen, setIsPauseModalOpen, handleExitWorld } = useModalContext();

  if (!isPauseModalOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[180] flex items-center justify-center bg-[#080B12]/90 p-3 sm:p-5 backdrop-blur-sm font-mono select-none'
      )}
    >
      <div
        style={{
          clipPath:
            'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        }}
        className={clsx(
          'relative w-full max-w-5xl max-h-[94vh] overflow-hidden flex flex-col bg-[#20252D] border-4 border-[#384252] shadow-[8px_8px_0px_rgba(0,0,0,1)]'
        )}
      >
        <div className="absolute inset-x-0 top-0 z-30 h-px bg-white/20" />

        {/* HEADER */}
        <header className="relative z-20 flex items-center justify-between gap-4 px-4 py-3 sm:px-5 bg-[#292F38] border-b-2 border-black">
          <div className="flex min-w-0 items-center gap-3">
            <div
              style={{
                clipPath:
                  'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#D9A441] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[#1A1D21]"
            >
              <CompassIcon size={20} weight="fill" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm sm:text-base font-black uppercase tracking-tight text-white">
                Game Menu
              </h2>
              <p className="truncate text-[9px] sm:text-[10px] font-bold text-[#9BA3AE]">
                Controls, character selection & fast travel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPauseModalOpen(false)}
            title="Resume Game"
            style={{
              clipPath:
                'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#2C3440] hover:bg-[#3E4856] text-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <XIcon size={16} weight="bold" />
          </button>
        </header>

        {/* BODY */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-[#171B21] p-3 sm:p-4">
          <FastTravelPanel />
          <div className="mt-3">
            <ControlsSettingsPanel />
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <CharacterSelectPanel />
            <QuickActionsPanel />
          </div>

          <div className="mt-3 flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsPauseModalOpen(false)}
              style={{
                clipPath:
                  'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#D9A441] hover:bg-[#E5B152] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] px-4 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#1A1D21] cursor-pointer"
            >
              <PlayIcon size={17} weight="fill" />
              <span>Resume Exploring</span>
            </button>

            <button
              type="button"
              onClick={handleExitWorld}
              style={{
                clipPath:
                  'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
              }}
              className="flex items-center justify-center gap-1.5 bg-[#C84B31] hover:bg-[#D95338] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] px-4 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-[#F4EADA] cursor-pointer shrink-0"
              title="Exit World and Return to Splash Screen"
            >
              <SignOutIcon size={17} weight="duotone" />
              <span>Exit World</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
