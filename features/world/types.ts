export type Gender = 'male' | 'female';
export type ControlMode = 'arrow' | 'joystick';

export type VirtualInputAction =
  | 'left_start'
  | 'left_stop'
  | 'right_start'
  | 'right_stop'
  | 'up_start'
  | 'up_stop'
  | 'down_start'
  | 'down_stop'
  | 'sprint_start'
  | 'sprint_stop'
  | 'sprint_toggle'
  | 'joystick_vector'
  | 'jump'
  | 'jump_start'
  | 'jump_stop'
  | 'attack'
  | 'stop';

export type MaleCharacter = 'Fighter' | 'Samurai' | 'Shinobi';
export type FemaleCharacter = 'Girl_1' | 'Girl_2' | 'Girl_3';
export type CharacterId = MaleCharacter | FemaleCharacter;

export type CharacterAction = 'idle' | 'walk' | 'run' | 'jump' | 'attack' | 'shield' | 'dead';

export type LocationCategory = 'city' | 'nature';

export interface LocationState {
  category: LocationCategory;
  variantId: number;
}

export interface PhysicsAttributes {
  mass: number;
  walkForce: number;
  runForce: number;
  jumpImpulse: number;
  maxJumpHeight?: number; // Customizable max jump height in units/meters (e.g. 30m)
  restitution: number;
  dragCoefficient: number;
}

export interface CharacterDef {
  id: CharacterId;
  name: string;
  gender: Gender;
  folderPath: string;
  actions: Record<CharacterAction, string>;
  physics: PhysicsAttributes;
}

export interface PhysicsWorldConfig {
  gravity: number;
  airDensity: number;
  frictionGround: number;
  terminalVelocity: number;
  groundY: number;
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

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 'left' | 'right' | 'up' | 'down';
  action: CharacterAction;
}


