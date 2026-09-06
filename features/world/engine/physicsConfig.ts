import { PhysicsWorldConfig } from '../types';

export const DEFAULT_WORLD_PHYSICS: PhysicsWorldConfig = {
  gravity: 4.5,
  airDensity: 0.001,
  frictionGround: 0.80,
  terminalVelocity: 35.0,
  groundY: 68,
};

export interface PhysicsDustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}
