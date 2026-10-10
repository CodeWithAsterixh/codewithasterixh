import {
  LocationCategory,
  LocationState,
  PhysicsAttributes,
  PhysicsWorldConfig,
  Particle,
  PlayerState,
} from './types/entityTypes';

export type {
  LocationCategory,
  LocationState,
  PhysicsAttributes,
  PhysicsWorldConfig,
  Particle,
  PlayerState,
};

export type Gender = 'male' | 'female';
export type ControlMode = 'arrow' | 'joystick';

export type VirtualInputAction =
  | 'left_start' | 'left_stop' | 'right_start' | 'right_stop'
  | 'up_start' | 'up_stop' | 'down_start' | 'down_stop'
  | 'sprint_start' | 'sprint_stop' | 'sprint_toggle' | 'joystick_vector'
  | 'jump' | 'jump_start' | 'jump_stop'
  | 'attack' | 'attack1' | 'attack2' | 'attack3' | 'attack4' | 'inspect' | 'stop';

export type MaleCharacter = 'Fighter' | 'Samurai' | 'Shinobi' | 'Xavier';
export type FemaleCharacter = 'Countess_claire' | 'bridget';
export type CharacterId = MaleCharacter | FemaleCharacter;
export type NinjaType = 'Kunoichi' | 'Ninja_Monk' | 'Ninja_Peasant';

export type CharacterAction =
  | 'idle' | 'walk' | 'run' | 'jump'
  | 'attack' | 'attack1' | 'attack2' | 'attack3' | 'attack4'
  | 'shield' | 'dead' | 'hurt';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  gender: Gender;
  folderPath: string;
  actions: Record<CharacterAction, string>;
  physics: PhysicsAttributes;
}

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  tools: string[];
  url?: string;
  github?: string;
  problem?: string;
  goal?: string;
  architecture?: string;
  outcome?: string;
  blueprintNumber?: string;
  cipherCode?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  pressure: number;
  vacuumGlow: string;
  level: string;
  description: string;
}

export interface WorldStation {
  id: string;
  type: 'bio' | 'project' | 'skills' | 'comms' | 'contact' | 'reactor' | 'spawn';
  title: string;
  subtitle: string;
  worldX: number;
  worldY: number;
  width: number;
  height: number;
  color: string;
  icon: string;
  badge?: string;
  data?: ProjectData;
}
