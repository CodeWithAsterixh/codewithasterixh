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
      {/* 1. TOP BAR: PAUSE (LEFT) + PLAYER HEALTH BAR (CENTER) + THEME & PROXIMITY */}
      {/* ========================================================================= */}
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 w-full">

        {/* Left: Pause Button */}
        <button
          onClick={onOpenPauseMenu}
          style={{
            backgroundImage: 'url(/btns/button2_tight.png)',
            backgroundSize: '100% 100%',
          }}
          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-[#062c3f] font-extrabold text-xs sm:text-sm flex items-center gap-2 drop-shadow-xl transition-all cursor-pointer hover:brightness-110 active:translate-y-0.5 shrink-0"
          title="Open Map & Controls [ESC]"
        >
          <MapTrifoldIcon size={16} weight="duotone" />
          <span className="hidden sm:inline">Pause / Map</span>
          <span className="sm:hidden">Map</span>
        </button>

        {/* Center: TOP PLAYER HEALTH BAR & RESPAWN COUNTDOWN */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-[#0F141F]/90 border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* Heart Icon */}
            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center text-xs sm:text-sm ${
              playerHp <= 30
                ? 'bg-red-500/30 border border-red-500/60 animate-bounce'
                : 'bg-emerald-500/20 border border-emerald-500/40'
            }`}>
              {playerHp <= 0 ? '☠️' : '❤️'}
            </div>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              {/* Top Text Row: Name + HP Count */}
              <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-bold text-[#EADBCC]">
                <span className="text-[#60A5FA] font-extrabold truncate max-w-[100px] sm:max-w-[140px]">
                  {characterName}
                </span>
                <span className={`font-mono text-[9px] sm:text-[11px] font-extrabold ${
                  playerHp > 50 ? 'text-[#34D399]' : playerHp > 25 ? 'text-[#FBBF24]' : 'text-[#F87171] animate-pulse'
                }`}>
                  {Math.round(playerHp)} / {maxPlayerHp} HP
                </span>
              </div>

              {/* Health Bar Track & Animated Fill */}
              <div className="w-32 sm:w-52 h-2.5 sm:h-3 bg-black/70 rounded-full border border-white/10 overflow-hidden p-[1.5px]">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${
                    playerHp > 50
                      ? 'bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                      : playerHp > 25
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                      : 'bg-gradient-to-r from-[#DC2626] to-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-pulse'
                  }`}
                  style={{ width: `${healthPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Attack Key Hint on Desktop */}
            {isCombatActive && (
              <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-white/10 text-[10px] text-[#EADBCC] font-bold">
                <span className="text-red-400 font-extrabold">⚔️ ATK:</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-mono">[J]</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-mono">[K]</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-purple-300 font-mono">[L]</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-rose-300 font-mono">[U]</span>
              </div>
            )}
          </div>

          {/* Under Health Bar: Respawning in X Seconds Countdown */}
          {respawnCountdown !== null && respawnCountdown > 0 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 bg-[#1A0505]/95 border-2 border-red-500/80 rounded-full shadow-[0_0_24px_rgba(239,68,68,0.85)] animate-pulse backdrop-blur-md">
              <span className="text-xs">⚠️</span>
              <span className="text-[10px] sm:text-xs font-black text-red-200 uppercase tracking-wider">
                Respawning in <span className="text-white text-xs sm:text-sm font-mono font-black underline decoration-red-400">{respawnCountdown}s</span>
              </span>
            </div>
          )}
        </div>

        {/* Right: Proximity Badge + 2-Button Light / Dark Mode Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Minimal Nearby Object Inspect Button (Only visible when standing near an object) */}
          {currentBiome?.isNearbyKiosk && (
            <button
              onClick={onInspectStation}
              style={{
                backgroundImage: 'url(/btns/button2_tight.png)',
                backgroundSize: '100% 100%',
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[#062c3f] font-extrabold text-[11px] sm:text-xs flex items-center gap-1 shadow-lg animate-pulse transition-all cursor-pointer hover:brightness-110 active:translate-y-0.5"
            >
              <EyeIcon size={14} weight="duotone" />
              <span>{currentBiome.actionLabel ? `[E] ${currentBiome.actionLabel}` : 'Inspect [E]'}</span>
            </button>
          )}

          {/* 2-Button Light / Dark Mode Toggle */}
          <div className="flex items-center p-1 bg-[#141414]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
            <button
              onClick={() => onThemeModeChange?.('light')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                themeMode === 'light'
                  ? 'bg-[#E5A93C] text-[#241F1A] shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Light Mode"
            >
              <SunIcon size={15} weight={themeMode === 'light' ? 'fill' : 'duotone'} />
              <span className="text-[11px] font-bold hidden sm:inline">Light</span>
            </button>
            <button
              onClick={() => onThemeModeChange?.('dark')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-[#5B9BF3] text-black shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Dark Mode"
            >
              <MoonIcon size={15} weight={themeMode === 'dark' ? 'fill' : 'duotone'} />
              <span className="text-[11px] font-bold hidden sm:inline">Dark</span>
            </button>
          </div>
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

        {/* Right Side Action Buttons (4 Attacks + Jump + Inspect) */}
        <div className="flex items-center gap-2">
          {/* 4 Attack Combat Grid */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
            {/* Attack 1 */}
            <button
              onPointerDown={handleAttack1}
              onContextMenu={(e) => e.preventDefault()}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-[#EF4444] to-[#991B1B] text-white font-extrabold text-[10px] flex flex-col items-center justify-center gap-0 shadow-lg cursor-pointer hover:brightness-110 active:scale-95 touch-none border border-red-300/40"
              title="Attack 1 [J]"
            >
              <span className="text-sm leading-none">⚔️</span>
              <span className="text-[8px] uppercase font-bold">Atk 1</span>
            </button>

            {/* Attack 2 */}
            <button
              onPointerDown={handleAttack2}
              onContextMenu={(e) => e.preventDefault()}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white font-extrabold text-[10px] flex flex-col items-center justify-center gap-0 shadow-lg cursor-pointer hover:brightness-110 active:scale-95 touch-none border border-blue-300/40"
              title="Attack 2 [K]"
            >
              <span className="text-sm leading-none">🗡️</span>
              <span className="text-[8px] uppercase font-bold">Atk 2</span>
            </button>

            {/* Attack 3 */}
            <button
              onPointerDown={handleAttack3}
              onContextMenu={(e) => e.preventDefault()}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] text-white font-extrabold text-[10px] flex flex-col items-center justify-center gap-0 shadow-lg cursor-pointer hover:brightness-110 active:scale-95 touch-none border border-purple-300/40"
              title="Attack 3 [L]"
            >
              <span className="text-sm leading-none">⚡</span>
              <span className="text-[8px] uppercase font-bold">Atk 3</span>
            </button>

            {/* Attack 4 */}
            <button
              onPointerDown={handleAttack4}
              onContextMenu={(e) => e.preventDefault()}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-[#F97316] to-[#C2410C] text-white font-extrabold text-[10px] flex flex-col items-center justify-center gap-0 shadow-lg cursor-pointer hover:brightness-110 active:scale-95 touch-none border border-orange-300/40"
              title="Attack 4 [U]"
            >
              <span className="text-sm leading-none">🔥</span>
              <span className="text-[8px] uppercase font-bold">Atk 4</span>
            </button>
          </div>

          {/* Jump & Inspect Column */}
          <div className="flex flex-col gap-1.5">
            {/* Mobile Jump Button */}
            <button
              onPointerDown={handleJump}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                backgroundImage: 'url(/btns/button1_tight.png)',
                backgroundSize: '100% 100%',
              }}
              className="w-12 h-11 sm:w-14 sm:h-12 rounded-xl text-[#f5edf9] font-extrabold text-xs flex flex-col items-center justify-center gap-0 shadow-xl cursor-pointer hover:brightness-110 active:scale-95 touch-none"
              title="Jump [Space]"
            >
              <ArrowFatUpIcon size={16} weight="duotone" />
              <span className="text-[9px]">Jump</span>
            </button>

            {/* Inspect Button */}
            <button
              onClick={onInspectStation}
              style={{
                backgroundImage: 'url(/btns/button2_tight.png)',
                backgroundSize: '100% 100%',
              }}
              className="px-2.5 h-11 sm:h-12 rounded-xl text-[#062c3f] font-extrabold text-[10px] flex items-center justify-center gap-1 shadow-xl cursor-pointer hover:brightness-110 active:translate-y-0.5"
            >
              <EyeIcon size={15} weight="duotone" />
              <span>Inspect</span>
            </button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};
