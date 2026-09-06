'use client';

import React, { useEffect, useRef, useState } from 'react';
import { create2DSideViewSketch, Sketch2DCallbacks } from '../engine/sketch2d';
import { getP5Constructor } from '../utils/p5Loader';
import { useWorldCanvasStyles } from './useWorldCanvasStyles';
import { World2DCanvasProps } from './worldCanvasTypes';

export type { World2DCanvasProps };

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

  const callbacksRef = useRef<Sketch2DCallbacks>({
    onPlayerPositionChange, onPlayerHealthChange, onRespawnCountdownChange,
    onCharacterStateChange, onPhysicsTelemetryChange, onBiomeChange,
    onInspectStation, onInspectObject,
  });

  useEffect(() => {
    callbacksRef.current = {
      onPlayerPositionChange, onPlayerHealthChange, onRespawnCountdownChange,
      onCharacterStateChange, onPhysicsTelemetryChange, onBiomeChange,
      onInspectStation, onInspectObject,
    };
  });

  useEffect(() => { p5InstanceRef.current?.setModalActive?.(isModalActive); }, [isModalActive]);
  useEffect(() => { p5InstanceRef.current?.setThemeMode?.(themeMode); }, [themeMode]);
  useEffect(() => { p5InstanceRef.current?.setMoonType?.(moonType); }, [moonType]);
  useEffect(() => { p5InstanceRef.current?.setCombatActive?.(isCombatActive); }, [isCombatActive]);

  useEffect(() => {
    async function initSketch() {
      if (!containerRef.current || typeof window === 'undefined') return;
      try {
        const P5 = await getP5Constructor();
        if (!containerRef.current || !P5 || !document.body.contains(containerRef.current)) return;
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
          p5InstanceRef.current = null;
        }

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
        p5Instance.setModalActive?.(isModalActive);
        setIsReady(true);
        onSketchReady?.(p5Instance);
      } catch (err) {
        console.error('2D p5 initialization error:', err);
      }
    }

    initSketch();
    return () => {
      p5InstanceRef.current?.cleanup?.();
      p5InstanceRef.current?.remove();
      p5InstanceRef.current = null;
    };
  }, []);

  useWorldCanvasStyles(containerRef, isReady);

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
