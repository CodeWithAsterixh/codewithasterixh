'use client';

import React, { useEffect, useRef, useState } from 'react';
import { create2DSideViewSketch, Sketch2DCallbacks, PhysicsTelemetry, CurrentBiomeInfo } from '../engine/sketch2d';
import { Gender, CharacterId, CharacterAction } from '../types';
import { MapLocationEntry } from '../data/mapLayout';
import { InteractiveWorldObject } from '../data/mapObjects';

interface World2DCanvasProps {
  isModalActive?: boolean;
  themeMode?: 'light' | 'dark';
  moonType?: 'beige' | 'normal' | 'red';
  isCombatActive?: boolean;
  onSketchReady?: (instance: any) => void;
  onPlayerPositionChange?: (x: number, y: number) => void;
  onPlayerHealthChange?: (hp: number, maxHp: number) => void;
  onRespawnCountdownChange?: (seconds: number | null) => void;
  onCharacterStateChange?: (gender: Gender, characterId: CharacterId, action: CharacterAction) => void;
  onPhysicsTelemetryChange?: (telemetry: PhysicsTelemetry) => void;
  onBiomeChange?: (biome: CurrentBiomeInfo) => void;
  onInspectStation?: (location: MapLocationEntry) => void;
  onInspectObject?: (object: InteractiveWorldObject) => void;
}

export const World2DCanvas: React.FC<World2DCanvasProps> = ({
  isModalActive = false,
  themeMode = 'dark',
  moonType = 'beige',
  isCombatActive = false,
  onSketchReady,
  onPlayerPositionChange,
  onPlayerHealthChange,
  onRespawnCountdownChange,
  onCharacterStateChange,
  onPhysicsTelemetryChange,
  onBiomeChange,
  onInspectStation,
  onInspectObject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Stable mutable ref for callbacks to avoid re-initializing sketch on parent re-renders
  const callbacksRef = useRef<Sketch2DCallbacks>({
    onPlayerPositionChange,
    onPlayerHealthChange,
    onRespawnCountdownChange,
    onCharacterStateChange,
    onPhysicsTelemetryChange,
    onBiomeChange,
    onInspectStation,
    onInspectObject,
  });

  // Always keep ref up-to-date with latest handlers without triggering unmounts
  useEffect(() => {
    callbacksRef.current = {
      onPlayerPositionChange,
      onPlayerHealthChange,
      onRespawnCountdownChange,
      onCharacterStateChange,
      onPhysicsTelemetryChange,
      onBiomeChange,
      onInspectStation,
      onInspectObject,
    };
  });

  // Sync modal state to p5 sketch instance to disable internal zoom/scroll/drag/keys
  useEffect(() => {
    if (p5InstanceRef.current && typeof p5InstanceRef.current.setModalActive === 'function') {
      p5InstanceRef.current.setModalActive(isModalActive);
    }
  }, [isModalActive]);

  // Sync theme mode (light vs dark)
  useEffect(() => {
    if (p5InstanceRef.current && typeof p5InstanceRef.current.setThemeMode === 'function') {
      p5InstanceRef.current.setThemeMode(themeMode);
    }
  }, [themeMode]);

  // Sync moon type
  useEffect(() => {
    if (p5InstanceRef.current && typeof p5InstanceRef.current.setMoonType === 'function') {
      p5InstanceRef.current.setMoonType(moonType);
    }
  }, [moonType]);

  // Sync combat active mode
  useEffect(() => {
    if (p5InstanceRef.current && typeof p5InstanceRef.current.setCombatActive === 'function') {
      p5InstanceRef.current.setCombatActive(isCombatActive);
    }
  }, [isCombatActive]);

  useEffect(() => {
    let isMounted = true;

    async function getP5Constructor(): Promise<any> {
      try {
        const p5Mod = await import('p5');
        return p5Mod.default || p5Mod;
      } catch (e) {}

      if (typeof window !== 'undefined' && (window as any).p5) {
        return (window as any).p5;
      }

      return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') return reject('No window');
        const existingScript = document.getElementById('p5-cdn-script');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve((window as any).p5));
          if ((window as any).p5) resolve((window as any).p5);
          return;
        }

        const script = document.createElement('script');
        script.id = 'p5-cdn-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js';
        script.async = true;
        script.onload = () => {
          if ((window as any).p5) {
            resolve((window as any).p5);
          } else {
            reject('p5 failed to load');
          }
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    async function initSketch() {
      if (!containerRef.current || typeof window === 'undefined') return;

      try {
        const P5 = await getP5Constructor();
        if (!isMounted || !containerRef.current || !P5) return;

        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }

        // Forward sketch events to the stable mutable callback ref
        const stableCallbacks: Sketch2DCallbacks = {
          onPlayerPositionChange: (x, y) => callbacksRef.current.onPlayerPositionChange?.(x, y),
          onPlayerHealthChange: (hp, max) => callbacksRef.current.onPlayerHealthChange?.(hp, max),
          onCharacterStateChange: (g, c, a) => callbacksRef.current.onCharacterStateChange?.(g, c, a),
          onPhysicsTelemetryChange: (t) => callbacksRef.current.onPhysicsTelemetryChange?.(t),
          onBiomeChange: (b) => callbacksRef.current.onBiomeChange?.(b),
          onInspectStation: (loc) => callbacksRef.current.onInspectStation?.(loc),
          onInspectObject: (obj) => callbacksRef.current.onInspectObject?.(obj),
        };

        const sketch = create2DSideViewSketch(stableCallbacks);
        const p5Instance = new P5(sketch, containerRef.current);
        p5InstanceRef.current = p5Instance;
        
        if (typeof p5Instance.setModalActive === 'function') {
          p5Instance.setModalActive(isModalActive);
        }

        setIsReady(true);

        if (onSketchReady) {
          onSketchReady(p5Instance);
        }
      } catch (err) {
        console.error('2D p5 initialization error:', err);
      }
    }

    initSketch();

    return () => {
      isMounted = false;
      if (p5InstanceRef.current) {
        if (typeof p5InstanceRef.current.cleanup === 'function') {
          p5InstanceRef.current.cleanup();
        }
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#0F0F0F]">
      {!isReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0F0F0F] text-[#EADBCC] font-pixelify gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#5B9BF3] border-t-transparent animate-spin" />
          <div className="text-xs font-bold tracking-widest uppercase animate-pulse">
            Loading 2D Portfolio World...
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className={`w-full h-full min-h-screen overflow-hidden select-none ${
          isModalActive ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'
        }`}
      />
    </div>
  );
};
