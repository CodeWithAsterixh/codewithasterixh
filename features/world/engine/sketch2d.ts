import type p5 from 'p5';
import { Gender, CharacterId, CharacterAction, LocationCategory, ControlMode, VirtualInputAction } from '../types';
import { MapLocationEntry } from '../data/mapLayout';
import { InteractiveWorldObject } from '../data/mapObjects';
import { WorldEngine } from './core/WorldEngine';
import { characterSpriteManager } from './characterAnimator';

export interface PhysicsTelemetry {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  isMoving: boolean;
  action: CharacterAction;
  facing: 'left' | 'right';
  cameraFollows: boolean;
  controlMode: ControlMode;
}

export interface CurrentBiomeInfo {
  id: string;
  category: LocationCategory;
  name: string;
  tag: string;
  featureType: string;
  featureTitle: string;
  description: string;
  x: number;
  actionLabel?: string;
  isNearbyKiosk: boolean;
  nearbyObject?: InteractiveWorldObject | null;
}

export interface Sketch2DCallbacks {
  onPlayerPositionChange?: (x: number, y: number) => void;
  onPlayerHealthChange?: (hp: number, maxHp: number) => void;
  onRespawnCountdownChange?: (seconds: number | null) => void;
  onCharacterStateChange?: (gender: Gender, characterId: CharacterId, action: CharacterAction) => void;
  onPhysicsTelemetryChange?: (telemetry: PhysicsTelemetry) => void;
  onBiomeChange?: (biome: CurrentBiomeInfo) => void;
  onInspectStation?: (location: MapLocationEntry) => void;
  onInspectObject?: (object: InteractiveWorldObject) => void;
}

export function create2DSideViewSketch(callbacks?: Sketch2DCallbacks) {
  return (p: p5) => {
    let engine: WorldEngine;

    p.setup = () => {
      (p as any).pixelDensity?.(1);
      const container = (p as any).canvas?.parentElement;
      p.createCanvas(container ? container.clientWidth : window.innerWidth, container ? container.clientHeight : window.innerHeight);
      p.frameRate(60);
      (p as any).noSmooth?.();
      const ctx = (p as any).drawingContext;
      if (ctx) ctx.imageSmoothingEnabled = false;
      engine = new WorldEngine(p, callbacks);
      characterSpriteManager.preloadCharacter(engine.player.characterId);
    };

    p.draw = () => { if (engine) engine.updateAndRender(); };

    p.windowResized = () => {
      (p as any).pixelDensity?.(1);
      const container = (p as any).canvas?.parentElement;
      p.resizeCanvas(container ? container.clientWidth : window.innerWidth, container ? container.clientHeight : window.innerHeight);
      (p as any).noSmooth?.();
      const ctx = (p as any).drawingContext;
      if (ctx) ctx.imageSmoothingEnabled = false;
    };

    p.mousePressed = () => { if (!engine?.isModalActive) engine?.camera.onMousePressed(p.mouseX, p.mouseY); };
    p.mouseDragged = () => { if (!engine?.isModalActive) engine?.camera.onMouseDragged(p.mouseX, p.mouseY); };
    p.mouseReleased = () => { if (!engine?.isModalActive) engine?.camera.onMouseReleased(); };
    (p as any).mouseWheel = (e: any) => {
      if (engine?.isModalActive || (e?.target && e.target.tagName !== 'CANVAS')) return true;
      engine?.camera.onWheel(e.deltaY || e.delta || 0); return false;
    };
    (p as any).touchStarted = (e?: any) => { if (!engine?.isModalActive && (!e?.target || e.target.tagName === 'CANVAS')) engine?.camera.onTouchStarted(((p as any).touches || []).map((t: any) => ({ x: t.x, y: t.y }))); };
    (p as any).touchMoved = (e: any) => {
      if (engine?.isModalActive || (e?.target && e.target.tagName !== 'CANVAS')) return true;
      engine?.camera.onTouchMoved(((p as any).touches || []).map((t: any) => ({ x: t.x, y: t.y }))); return false;
    };
    (p as any).touchEnded = () => { if (!engine?.isModalActive) engine?.camera.onTouchEnded(); };

    const onBlur = () => { engine?.input.clearAll(); };
    if (typeof window !== 'undefined') window.addEventListener('blur', onBlur);

    p.keyPressed = (e?: any) => {
      if (!engine || engine.isModalActive) return;
      const k = e?.key || p.key;
      const c = e?.code;
      const kc = e?.keyCode || (p as any).keyCode;
      engine.input.onKeyDown(k, c, kc);
      if (k === ' ' || c === 'Space' || kc === 32) engine.input.pendingAction = 'jump';
    };

    p.keyReleased = (e?: any) => {
      if (!engine || engine.isModalActive) return;
      const k = e?.key || p.key;
      const c = e?.code;
      const kc = e?.keyCode || (p as any).keyCode;
      engine.input.onKeyUp(k, c, kc);
    };

    (p as any).cleanup = () => {
      if (typeof window !== 'undefined') window.removeEventListener('blur', onBlur);
    };
    (p as any).setCharacter = (id: CharacterId) => { if (engine) { engine.player.characterId = id; characterSpriteManager.preloadCharacter(id); } };
    (p as any).setGender = (g: Gender) => { if (engine) engine.player.gender = g; };
    (p as any).setCombatActive = (a: boolean) => { if (engine) engine.combat.isCombatActive = a; };
    (p as any).setThemeMode = (m: 'light' | 'dark') => { if (engine) engine.assetMgr.currentThemeMode = m; };
    (p as any).setMoonType = (t: 'beige' | 'normal' | 'red') => { if (engine) engine.environment.moonType = t; };
    (p as any).setModalActive = (a: boolean) => { if (engine) { engine.isModalActive = a; if (a) engine.input.clearAll(); } };
    (p as any).teleportTo = (x: number) => { if (engine) { engine.player.body.x = x; engine.player.body.vx = 0; engine.camera.teleportTo(x, p.width); } };
    (p as any).handleVirtualInput = (act: VirtualInputAction, pay?: any) => { engine?.input.handleVirtualInput(act, pay); };
  };
}
