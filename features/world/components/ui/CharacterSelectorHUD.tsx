'use client';

import React, { useEffect } from 'react';
import { CurrentBiomeInfo } from '../../engine/sketch2d';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  MapTrifoldIcon,
  ArrowFatUpIcon,
  LightningIcon,
} from '@phosphor-icons/react';
import { ControlMode, VirtualInputAction } from '../../types';
import { VirtualJoystick } from './VirtualJoystick';

interface CharacterSelectorHUDProps {
  currentBiome?: CurrentBiomeInfo;
  controlMode?: ControlMode;
  onOpenPauseMenu: () => void;
  onInspectStation: () => void;
  onVirtualInput: (action: VirtualInputAction) => void;
}

async function hasKeyboardLayout(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && 'keyboard' in navigator) {
    try {
      const layoutMap = await (navigator as any).keyboard.getLayoutMap();
      return layoutMap.size > 0; // Returns true if a layout map exists
    } catch {
      return false;
    }
  }
  return false;
}

export const CharacterSelectorHUD: React.FC<CharacterSelectorHUDProps> = ({
  currentBiome,
  controlMode = 'arrow',
  onOpenPauseMenu,
  onInspectStation,
  onVirtualInput,
}) => {
  const [showTouchControls, setShowTouchControls] = React.useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function checkControlsVisibility() {
      const hasKeyboard = await hasKeyboardLayout();
      const isTouchOrSmall =
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768 ||
          'ontouchstart' in window);

      if (isMounted) {
        // If no physical keyboard is available OR on a touch/small screen -> always display controls
        if (!hasKeyboard || isTouchOrSmall) {
          setShowTouchControls(true);
        } else {
          setShowTouchControls(false);
        }
      }
    }

    checkControlsVisibility();

    const handleResize = () => {
      checkControlsVisibility();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Safety blur release: if the window loses focus, clear movement
  useEffect(() => {
    const handleWindowBlur = () => {
      onVirtualInput('stop');
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [onVirtualInput]);

  const [isSprintActive, setIsSprintActive] = React.useState<boolean>(false);

  const handleToggleSprint = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSprintActive((prev) => {
      const next = !prev;
      onVirtualInput(next ? 'sprint_start' : 'sprint_stop');
      return next;
    });
  };

  const handleStartLeft = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('left_start');
  };
  const handleStopLeft = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('left_stop');
  };

  const handleStartRight = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('right_start');
  };
  const handleStopRight = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('right_stop');
  };

  const handleStartUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('up_start');
  };
  const handleStopUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('up_stop');
  };

  const handleStartDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('down_start');
  };
  const handleStopDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('down_stop');
  };

  const handleJump = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('jump');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 font-pixelify select-none">

      {/* ========================================================================= */}
      {/* 1. TOP BAR: SINGLE CLEAN PAUSE BUTTON & MINIMAL PROXIMITY BADGE           */}
      {/* ========================================================================= */}
      <div className="pointer-events-auto flex items-center justify-between gap-3 w-full">

        {/* Simple Single Pause Button */}
        <button
          onClick={onOpenPauseMenu}
          style={{
            backgroundImage: 'url(/btns/button2_tight.png)',
            backgroundSize: '100% 100%',
          }}
          className="px-5 py-2 sm:py-2.5 rounded-2xl text-[#062c3f] font-extrabold text-xs sm:text-sm flex items-center gap-2 drop-shadow-xl transition-all cursor-pointer hover:brightness-110 active:translate-y-0.5"
          title="Open Map & Controls [ESC]"
        >
          <MapTrifoldIcon size={16} weight="duotone" />
          <span>Pause / Map</span>
        </button>

        {/* Minimal Nearby Object Inspect Button (Only visible when standing near an object) */}
        {currentBiome?.isNearbyKiosk && (
          <button
            onClick={onInspectStation}
            style={{
              backgroundImage: 'url(/btns/button2_tight.png)',
              backgroundSize: '100% 100%',
            }}
            className="px-4 py-2 rounded-md text-[#062c3f] font-extrabold text-xs flex items-center gap-1.5 shadow-lg animate-pulse transition-all cursor-pointer hover:brightness-110 active:translate-y-0.5"
          >
            <EyeIcon size={15} weight="duotone" />
            <span>{currentBiome.actionLabel ? `[E] ${currentBiome.actionLabel}` : 'Inspect [E]'}</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM BAR: CONTROLS (SHOWN IF NO KEYBOARD OR ON TOUCH DEVICE)         */}
      {/* ========================================================================= */}
      {showTouchControls && (
        <div className="pointer-events-auto flex items-end justify-between gap-2">
        {controlMode === 'joystick' ? (
          <VirtualJoystick onVirtualInput={onVirtualInput} />
        ) : (
          <div className="flex items-center gap-2">
            {/* 4-Direction Cross D-Pad */}
            <div className="relative w-32 h-32 bg-[#1A1A1A]/90 rounded-3xl border border-white/10 shadow-2xl p-1.5 grid grid-cols-3 grid-rows-3 gap-1 touch-none select-none">
              {/* Top: UP */}
              <div />
              <button
                onPointerDown={handleStartUp}
                onPointerUp={handleStopUp}
                onPointerLeave={handleStopUp}
                onPointerCancel={handleStopUp}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  backgroundImage: 'url(/btns/button1_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full h-full text-[#f5edf9] font-bold rounded-lg flex items-center justify-center cursor-pointer active:brightness-90 select-none touch-none"
              >
                <ArrowUpIcon size={18} weight="duotone" />
              </button>
              <div />

              {/* Middle: LEFT, CENTER, RIGHT */}
              <button
                onPointerDown={handleStartLeft}
                onPointerUp={handleStopLeft}
                onPointerLeave={handleStopLeft}
                onPointerCancel={handleStopLeft}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  backgroundImage: 'url(/btns/button1_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full h-full text-[#f5edf9] font-bold rounded-lg flex items-center justify-center cursor-pointer active:brightness-90 select-none touch-none"
              >
                <ArrowLeftIcon size={18} weight="duotone" />
              </button>
              <div className="w-full h-full rounded-md bg-white/5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <button
                onPointerDown={handleStartRight}
                onPointerUp={handleStopRight}
                onPointerLeave={handleStopRight}
                onPointerCancel={handleStopRight}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  backgroundImage: 'url(/btns/button1_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full h-full text-[#f5edf9] font-bold rounded-lg flex items-center justify-center cursor-pointer active:brightness-90 select-none touch-none"
              >
                <ArrowRightIcon size={18} weight="duotone" />
              </button>

              {/* Bottom: DOWN */}
              <div />
              <button
                onPointerDown={handleStartDown}
                onPointerUp={handleStopDown}
                onPointerLeave={handleStopDown}
                onPointerCancel={handleStopDown}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  backgroundImage: 'url(/btns/button1_tight.png)',
                  backgroundSize: '100% 100%',
                }}
                className="w-full h-full text-[#f5edf9] font-bold rounded-lg flex items-center justify-center cursor-pointer active:brightness-90 select-none touch-none"
              >
                <ArrowDownIcon size={18} weight="duotone" />
              </button>
              <div />
            </div>

            {/* Dedicated Sprint Toggle Button */}
            <button
              onClick={handleToggleSprint}
              onContextMenu={(e) => e.preventDefault()}
              className={`w-14 h-14 rounded-2xl font-extrabold text-xs flex flex-col items-center justify-center gap-0.5 shadow-2xl cursor-pointer transition-all active:scale-95 touch-none ${
                isSprintActive
                  ? 'bg-[#E5A93C] text-[#241F1A] border-2 border-amber-300 shadow-[0_0_16px_rgba(229,169,60,0.6)] animate-pulse'
                  : 'bg-[#1A1A1A]/90 text-[#EADBCC]/80 border border-white/10 hover:bg-[#252525]'
              }`}
              title="Toggle Sprint Mode"
            >
              <LightningIcon size={20} weight={isSprintActive ? 'fill' : 'duotone'} />
              <span className="text-[9px] uppercase tracking-wider">{isSprintActive ? 'Sprint ON' : 'Sprint'}</span>
            </button>
          </div>
        )}

        {/* Right Side Action Buttons (Jump + Inspect) */}
        <div className="flex items-center gap-2">
          {/* Mobile Jump Button */}
          <button
            onPointerDown={handleJump}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              backgroundImage: 'url(/btns/button1_tight.png)',
              backgroundSize: '100% 100%',
            }}
            className="w-14 h-14 rounded-2xl text-[#f5edf9] font-extrabold text-xs flex flex-col items-center justify-center gap-0.5 shadow-2xl cursor-pointer hover:brightness-110 active:scale-95 touch-none"
            title="Jump [Space]"
          >
            <ArrowFatUpIcon size={20} weight="duotone" />
            <span className="text-[10px]">Jump</span>
          </button>

          {/* Inspect Button */}
          <button
            onClick={onInspectStation}
            style={{
              backgroundImage: 'url(/btns/button2_tight.png)',
              backgroundSize: '100% 100%',
            }}
            className="px-4 py-3 h-14 rounded-2xl text-[#062c3f] font-extrabold text-xs flex items-center gap-1.5 shadow-xl cursor-pointer hover:brightness-110 active:translate-y-0.5"
          >
            <EyeIcon size={18} weight="duotone" />
            <span>Inspect</span>
          </button>
        </div>
      </div>
      )}

    </div>
  );
};
