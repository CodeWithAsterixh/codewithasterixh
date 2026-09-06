'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { ControlMode, VirtualInputAction } from '../types';
import { CurrentBiomeInfo } from '../engine/sketch2d';

export const MOON_TYPES = ['beige', 'normal', 'red'] as const;
export type MoonType = (typeof MOON_TYPES)[number];

interface WorldStateContextType {
  controlMode: ControlMode;
  setControlMode: (mode: ControlMode) => void;
  themeMode: 'light' | 'dark';
  setThemeMode: (mode: 'light' | 'dark') => void;
  moonType: MoonType;
  setMoonType: (type: MoonType) => void;
  currentBiome: CurrentBiomeInfo | undefined;
  setCurrentBiome: (biome: CurrentBiomeInfo | undefined) => void;
  playerX: number;
  setPlayerX: (x: number) => void;
  playerXRef: React.MutableRefObject<number>;
  p5SketchRef: React.MutableRefObject<any>;
  handleThemeModeChange: (newMode: 'light' | 'dark') => void;
  handleVirtualInput: (action: VirtualInputAction, payload?: any) => void;
  handleNavigateToLocation: (x: number) => void;
}

const WorldStateContext = createContext<WorldStateContextType | null>(null);

export const WorldStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [controlMode, setControlMode] = useState<ControlMode>('arrow');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [moonType, setMoonType] = useState<MoonType>('beige');
  const [currentBiome, setCurrentBiome] = useState<CurrentBiomeInfo | undefined>(undefined);
  const [playerX, setPlayerX] = useState<number>(0);

  const playerXRef = useRef<number>(0);
  const p5SketchRef = useRef<any>(null);

  const handleThemeModeChange = useCallback((newMode: 'light' | 'dark') => {
    if (newMode === 'dark') {
      const randomMoon = MOON_TYPES[Math.floor(Math.random() * MOON_TYPES.length)];
      setMoonType(randomMoon);
    }
    setThemeMode(newMode);
  }, []);

  const handleVirtualInput = useCallback((action: VirtualInputAction, payload?: any) => {
    if (p5SketchRef.current?.handleVirtualInput) {
      p5SketchRef.current.handleVirtualInput(action, payload);
    }
  }, []);

  const handleNavigateToLocation = useCallback((x: number) => {
    if (p5SketchRef.current?.teleportTo) {
      p5SketchRef.current.teleportTo(x);
    }
  }, []);

  return (
    <WorldStateContext.Provider
      value={{
        controlMode,
        setControlMode,
        themeMode,
        setThemeMode,
        moonType,
        setMoonType,
        currentBiome,
        setCurrentBiome,
        playerX,
        setPlayerX,
        playerXRef,
        p5SketchRef,
        handleThemeModeChange,
        handleVirtualInput,
        handleNavigateToLocation,
      }}
    >
      {children}
    </WorldStateContext.Provider>
  );
};

export function useWorldContext(): WorldStateContextType {
  const context = useContext(WorldStateContext);
  if (!context) {
    throw new Error('useWorldContext must be used within a WorldStateProvider');
  }
  return context;
}
