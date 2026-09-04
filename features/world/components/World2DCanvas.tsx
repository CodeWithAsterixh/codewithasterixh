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
    async function initSketch() {
      if (!containerRef.current || typeof window === 'undefined') return;
      console.log('[World2DCanvas] initSketch started');

      try {
        const P5 = await getP5Constructor();
        // Verify container ref is still present in DOM after async P5 module loading
        if (!containerRef.current || !P5 || !document.body.contains(containerRef.current)) {
          console.warn('[World2DCanvas] initSketch cancelled: container containerRef no longer attached to DOM');
          return;
        }

        if (p5InstanceRef.current) {
          console.log('[World2DCanvas] Removing previous p5 instance');
          p5InstanceRef.current.remove();
          p5InstanceRef.current = null;
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

        console.log('[World2DCanvas] Instantiating new P5 sketch instance');
        const sketch = create2DSideViewSketch(stableCallbacks);
        const p5Instance = new P5(sketch, containerRef.current);
        p5InstanceRef.current = p5Instance;
        
        if (typeof p5Instance.setModalActive === 'function') {
          p5Instance.setModalActive(isModalActive);
        }

        console.log('[World2DCanvas] Sketch ready, setting isReady = true');
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
      if (p5InstanceRef.current) {
        if (typeof p5InstanceRef.current.cleanup === 'function') {
          p5InstanceRef.current.cleanup();
        }
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  // Enforce 100% width and height on canvas DOM element
  useEffect(() => {
    const enforceCanvasStyles = () => {
      if (containerRef.current) {
        const canvasElt = containerRef.current.querySelector('canvas');
        if (canvasElt) {
          canvasElt.style.cssText = 'width: 100% !important; height: 100% !important; position: absolute !important; top: 0px !important; left: 0px !important; display: block !important; z-index: 0 !important;';
        }
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    };

    enforceCanvasStyles();
    const timer1 = setTimeout(enforceCanvasStyles, 30);
    const timer2 = setTimeout(enforceCanvasStyles, 100);
    const timer3 = setTimeout(enforceCanvasStyles, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isReady]);


  return (
    <div className="fixed inset-0 z-0 w-full h-full min-h-screen overflow-hidden">
      <div
        ref={containerRef}
        className={`absolute inset-0 z-0 w-full h-full min-h-screen overflow-hidden select-none [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:block ${
          isModalActive ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'
        }`}
      />
    </div>
  );
};


