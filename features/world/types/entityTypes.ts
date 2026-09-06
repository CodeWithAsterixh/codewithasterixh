import { CharacterAction } from '../types';

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
  maxJumpHeight?: number;
  restitution: number;
  dragCoefficient: number;
}

export interface PhysicsWorldConfig {
  gravity: number;
  airDensity: number;
  frictionGround: number;
  terminalVelocity: number;
  groundY: number;
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
