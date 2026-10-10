import { Gender, CharacterId, CharacterAction } from '../types';
import { MapLocationEntry } from '../data/mapLayout';
import { InteractiveWorldObject } from '../data/mapObjects';
import { PhysicsTelemetry, CurrentBiomeInfo } from '../engine/sketch2d';

export interface World2DCanvasProps {
  isModalActive?: boolean;
  themeMode?: 'light' | 'dark';
  moonType?: 'beige' | 'normal' | 'red';
  isCombatActive?: boolean;
  characterId?: CharacterId;
  gender?: Gender;
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
