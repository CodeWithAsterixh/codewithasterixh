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
  SunIcon,
  MoonIcon,
  CompassIcon,
} from '@phosphor-icons/react';
import { ControlMode, VirtualInputAction, CharacterId } from '../../types';
import { CHARACTER_DEFS } from '../../data/characterData';
import { VirtualJoystick } from './VirtualJoystick';

interface CharacterSelectorHUDProps {
  currentBiome?: CurrentBiomeInfo;
  controlMode?: ControlMode;
  themeMode?: 'light' | 'dark';
  characterId?: CharacterId;
  playerHp?: number;
  maxPlayerHp?: number;
  respawnCountdown?: number | null;
  isCombatActive?: boolean;
  onThemeModeChange?: (mode: 'light' | 'dark') => void;
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
  themeMode = 'dark',
  characterId = 'Fighter',
  playerHp = 100,
  maxPlayerHp = 100,
  respawnCountdown = null,
  isCombatActive = false,
  onThemeModeChange,
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
    if ('setPointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).setPointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('left_start');
  };
  const handleStopLeft = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('releasePointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).releasePointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('left_stop');
  };

  const handleStartRight = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('setPointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).setPointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('right_start');
  };
  const handleStopRight = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('releasePointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).releasePointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('right_stop');
  };

  const handleStartUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('setPointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).setPointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('up_start');
  };
  const handleStopUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('releasePointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).releasePointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('up_stop');
  };

  const handleStartDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('setPointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).setPointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('down_start');
  };
  const handleStopDown = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ('releasePointerCapture' in e.target && (e as any).pointerId !== undefined) {
      try { (e.target as HTMLElement).releasePointerCapture((e as any).pointerId); } catch {}
    }
    onVirtualInput('down_stop');
  };

  const handleJump = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('jump');
  };

  const handleAttack1 = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('attack1');
  };

  const handleAttack2 = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('attack2');
  };

  const handleAttack3 = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('attack3');
  };

  const handleAttack4 = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onVirtualInput('attack4');
  };

  const characterName = CHARACTER_DEFS[characterId]?.name || 'Player';
  const healthPercent = Math.max(0, Math.min(100, (playerHp / maxPlayerHp) * 100));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 font-pixelify select-none">

      {/* ========================================================================= */}
      {/* 1. TOP BAR: MAP (LEFT), THEME (RIGHT), HEALTH & PROXIMITY BADGE          */}
      {/* ========================================================================= */}
      <div className="pointer-events-auto flex flex-col gap-2.5 w-full">
        {/* Top Control Bar: Left Map Button + Right Theme Toggle */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Pixelated Pause / Map Button */}
          <button
            onClick={onOpenPauseMenu}
            style={{
              clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
            }}
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-[#D9A441] hover:bg-[#E5B152] active:translate-y-[2px] active:translate-x-[2px] text-[#1A1D24] font-black uppercase text-xs sm:text-sm flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform shrink-0 cursor-pointer"
            title="Open Map & Controls [ESC]"
          >
            <CompassIcon size={18} weight="fill" />
            <span className="hidden sm:inline">Pause / Map</span>
            <span className="sm:hidden">Map</span>
          </button>

          {/* Right: Pixelated 2-Button Light / Dark Mode Toggle */}
          <div
            className="flex items-center p-0.5 sm:p-1 bg-[#0F141F] border-2 border-[#384252] shadow-[2px_2px_0px_rgba(0,0,0,1)] shrink-0"
            style={{
              clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
            }}
          >
            <button
              onClick={() => onThemeModeChange?.('light')}
              className={`px-2 sm:px-3 py-1 text-xs font-black uppercase flex items-center gap-1 cursor-pointer transition-all ${themeMode === 'light'
                  ? 'bg-[#E5A93C] text-[#1A1D24] border border-black shadow-[inset_1px_1px_0_rgba(255,255,255,0.4)]'
                  : 'text-white/60 hover:text-white'
                }`}
              title="Light Mode"
            >
              <SunIcon size={14} weight={themeMode === 'light' ? 'fill' : 'bold'} />
              <span className="text-[10px] font-bold">Light</span>
            </button>
            <button
              onClick={() => onThemeModeChange?.('dark')}
              className={`px-2 sm:px-3 py-1 text-xs font-black uppercase flex items-center gap-1 cursor-pointer transition-all ${themeMode === 'dark'
                  ? 'bg-[#5B9BF3] text-[#1A1D24] border border-black shadow-[inset_1px_1px_0_rgba(255,255,255,0.4)]'
                  : 'text-white/60 hover:text-white'
                }`}
              title="Dark Mode"
            >
              <MoonIcon size={14} weight={themeMode === 'dark' ? 'fill' : 'bold'} />
              <span className="text-[10px] font-bold">Dark</span>
            </button>
          </div>
        </div>

        {/* Second Row: Health Bar (Center) & Proximity Inspect Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 w-full">
          {/* Health Bar */}
          <div className="flex flex-col items-center gap-2 font-mono uppercase mx-auto sm:mx-0">
            <div
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0F141F] border-4 border-[#384252] shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              style={{
                clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
              }}
            >
              {/* Pixelated Health Icon Wrapper */}
              <div className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border-2 border-black shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.3)] ${playerHp <= 30
                ? 'bg-[#DC2626]'
                : 'bg-[#10B981]'
                }`}>
                {playerHp <= 0 ? (
                  <span className="text-lg">☠️</span>
                ) : (
                  <svg viewBox="0 0 9 9" className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current" style={{ shapeRendering: 'crispEdges' }}>
                    <rect x="1" y="1" width="2" height="2" />
                    <rect x="6" y="1" width="2" height="2" />
                    <rect x="0" y="3" width="9" height="2" />
                    <rect x="1" y="5" width="7" height="1" />
                    <rect x="2" y="6" width="5" height="1" />
                    <rect x="3" y="7" width="3" height="1" />
                    <rect x="4" y="8" width="1" height="1" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {/* Top Text Row: Name + HP Count */}
                <div className="flex items-end justify-between gap-3 text-[10px] sm:text-xs font-bold tracking-wider text-white shadow-black drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                  <span className="text-[#60A5FA]">
                    {characterName}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] ${playerHp > 50 ? 'text-[#34D399]' : playerHp > 25 ? 'text-[#FBBF24]' : 'text-[#F87171] animate-pulse'
                    }`}>
                    {Math.round(playerHp)}/{maxPlayerHp}
                  </span>
                </div>

                {/* Chunky Health Bar Track */}
                <div className="w-32 sm:w-52 h-3 sm:h-3.5 bg-black border-2 border-[#384252] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative p-[2px]">
                  <div
                    className={`h-full transition-all duration-200 shadow-[inset_0_2px_0_rgba(255,255,255,0.4)] ${playerHp > 50
                      ? 'bg-[#10B981]'
                      : playerHp > 25
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#DC2626] animate-pulse'
                      }`}
                    style={{ width: `${healthPercent}%` }}
                  />
                </div>
              </div>

              {/* Blocky Quick Attack Key Hints */}
              {isCombatActive && (
                <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l-2 border-[#384252] text-[10px] text-white">
                  <span className="text-red-400 font-bold mr-1 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">ATK</span>
                  {['J', 'K', 'L', 'U'].map((key, index) => {
                    const colors = ['text-amber-300', 'text-blue-300', 'text-purple-300', 'text-rose-300'];
                    return (
                      <span
                        key={key}
                        className={`px-2 py-1 bg-[#2C3440] border-t-2 border-l-2 border-t-white/30 border-l-white/30 border-b-2 border-r-2 border-b-black border-r-black ${colors[index]}`}
                      >
                        {key}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Retro Respawning Countdown */}
            {respawnCountdown !== null && respawnCountdown > 0 && (
              <div
                className="flex items-center justify-center gap-2 px-4 py-1.5 bg-[#1A0505] border-4 border-red-500 shadow-[4px_4px_0px_#7F1D1D] animate-pulse"
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
              >
                <span className="text-xs">⚠️</span>
                <span className="text-[10px] sm:text-xs font-bold text-red-200 tracking-widest drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                  RESPAWNING IN <span className="text-white ml-1">{respawnCountdown}</span>
                </span>
              </div>
            )}
          </div>

          {/* Minimal Nearby Object Inspect Button */}
          {currentBiome?.isNearbyKiosk && (
            <button
              onClick={onInspectStation}
              style={{
                clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
              }}
              className="px-3.5 py-1.5 sm:py-2 bg-[#D9A441] hover:bg-[#E5B152] text-[#1A1D24] font-black uppercase text-xs flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] animate-pulse shrink-0 cursor-pointer mx-auto sm:mx-0"
            >
              <EyeIcon size={15} weight="bold" />
              <span>{currentBiome.actionLabel ? `[E] ${currentBiome.actionLabel}` : 'Inspect [E]'}</span>
            </button>
          )}
        </div>
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
              {/* Pixelated 4-Direction Cross D-Pad */}
              <div
                className="relative w-32 h-32 bg-[#0F141F] border-4 border-[#384252] shadow-[4px_4px_0px_rgba(0,0,0,1)] p-1.5 grid grid-cols-3 grid-rows-3 gap-1 touch-none select-none"
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
              >
                {/* Top: UP */}
                <div />
                <button
                  onPointerDown={handleStartUp}
                  onPointerUp={handleStopUp}
                  onPointerCancel={handleStopUp}
                  onTouchStart={handleStartUp}
                  onTouchEnd={handleStopUp}
                  onTouchCancel={handleStopUp}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#1E242D] text-white font-bold flex items-center justify-center border-t-2 border-l-2 border-t-white/30 border-l-white/30 border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white/30 active:border-r-white/30 cursor-pointer select-none touch-none"
                >
                  <ArrowUpIcon size={18} weight="bold" />
                </button>
                <div />

                {/* Middle: LEFT, CENTER, RIGHT */}
                <button
                  onPointerDown={handleStartLeft}
                  onPointerUp={handleStopLeft}
                  onPointerCancel={handleStopLeft}
                  onTouchStart={handleStartLeft}
                  onTouchEnd={handleStopLeft}
                  onTouchCancel={handleStopLeft}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#1E242D] text-white font-bold flex items-center justify-center border-t-2 border-l-2 border-t-white/30 border-l-white/30 border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white/30 active:border-r-white/30 cursor-pointer select-none touch-none"
                >
                  <ArrowLeftIcon size={18} weight="bold" />
                </button>
                <div className="w-full h-full bg-[#1A1D24] border border-[#384252] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#D9A441]" />
                </div>
                <button
                  onPointerDown={handleStartRight}
                  onPointerUp={handleStopRight}
                  onPointerCancel={handleStopRight}
                  onTouchStart={handleStartRight}
                  onTouchEnd={handleStopRight}
                  onTouchCancel={handleStopRight}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#1E242D] text-white font-bold flex items-center justify-center border-t-2 border-l-2 border-t-white/30 border-l-white/30 border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white/30 active:border-r-white/30 cursor-pointer select-none touch-none"
                >
                  <ArrowRightIcon size={18} weight="bold" />
                </button>

                {/* Bottom: DOWN */}
                <div />
                <button
                  onPointerDown={handleStartDown}
                  onPointerUp={handleStopDown}
                  onPointerCancel={handleStopDown}
                  onTouchStart={handleStartDown}
                  onTouchEnd={handleStopDown}
                  onTouchCancel={handleStopDown}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full bg-[#2C3440] hover:bg-[#374151] active:bg-[#1E242D] text-white font-bold flex items-center justify-center border-t-2 border-l-2 border-t-white/30 border-l-white/30 border-b-2 border-r-2 border-b-black border-r-black active:border-t-black active:border-l-black active:border-b-white/30 active:border-r-white/30 cursor-pointer select-none touch-none"
                >
                  <ArrowDownIcon size={18} weight="bold" />
                </button>

                <div />
              </div>

              {/* Pixelated Sprint Toggle Button */}
              <button
                onClick={handleToggleSprint}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))'
                }}
                className={`w-14 h-14 font-black uppercase text-xs flex flex-col items-center justify-center gap-0.5 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer touch-none transition-all ${isSprintActive
                    ? 'bg-[#E5A93C] text-[#1A1D24] shadow-[4px_4px_0px_#8A6322]'
                    : 'bg-[#1E242D] text-white/80 border-[#384252] hover:bg-[#2C3440]'
                  }`}
                title="Toggle Sprint Mode"
              >
                <LightningIcon size={20} weight={isSprintActive ? 'fill' : 'bold'} />
                <span className="text-[9px] tracking-wider font-mono">{isSprintActive ? 'RUN' : 'SPRINT'}</span>
              </button>
            </div>
          )}

          {/* Right Side Action Buttons — single vertical column */}
          <div className="flex flex-col gap-1.5">
            {/* Attack 1 */}
            {isCombatActive && (
              <>
                <button
                  onPointerDown={handleAttack1}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="w-14 h-10 bg-[#DC2626] hover:bg-[#EF4444] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer touch-none"
                  title="Attack 1 [J]"
                >
                  <span>⚔️</span>
                  <span>ATK1</span>
                </button>

                <button
                  onPointerDown={handleAttack2}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="w-14 h-10 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer touch-none"
                  title="Attack 2 [K]"
                >
                  <span>🗡️</span>
                  <span>ATK2</span>
                </button>

                <button
                  onPointerDown={handleAttack3}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="w-14 h-10 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer touch-none"
                  title="Attack 3 [L]"
                >
                  <span>⚡</span>
                  <span>ATK3</span>
                </button>

                <button
                  onPointerDown={handleAttack4}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="w-14 h-10 bg-[#EA580C] hover:bg-[#F97316] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer touch-none"
                  title="Attack 4 [U]"
                >
                  <span>🔥</span>
                  <span>ATK4</span>
                </button>
              </>
            )}

            {/* Jump Button */}
            <button
              onPointerDown={handleJump}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
              }}
              className="w-14 h-10 bg-[#6366F1] hover:bg-[#818CF8] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer touch-none"
              title="Jump [Space]"
            >
              <ArrowFatUpIcon size={14} weight="fill" />
              <span>JUMP</span>
            </button>

            {/* Inspect Button */}
            <button
              onClick={onInspectStation}
              style={{
                clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))'
              }}
              className="w-14 h-10 bg-[#0D9488] hover:bg-[#14B8A6] text-white font-black uppercase text-[9px] flex items-center justify-center gap-1 border-t-2 border-l-2 border-t-white/40 border-l-white/40 border-b-2 border-r-2 border-b-black border-r-black active:translate-x-[2px] active:translate-y-[2px] shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
            >
              <EyeIcon size={14} weight="bold" />
              <span>INSP</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
