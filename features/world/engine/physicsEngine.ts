import { PhysicsAttributes, PhysicsWorldConfig } from '../types';

export const DEFAULT_WORLD_PHYSICS: PhysicsWorldConfig = {
  gravity: 4.5, // High-gravity platformer curve for 100+ km/h jumps with 30m apex
  airDensity: 0.001,
  frictionGround: 0.80,
  terminalVelocity: 35.0, // High terminal velocity
  groundY: 0,
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

export class PhysicsBody2D {
  public x: number = 0;
  public y: number = 0;
  public vx: number = 0;
  public vy: number = 0;
  public ax: number = 0;
  public ay: number = 0;

  public mass: number = 70;
  public width: number = 60;
  public height: number = 120;
  public maxJumpHeight: number = 30; // Customizable max jump height in meters/pixels
  public restitution: number = 0.0;
  public dragCoefficient: number = 0.35;

  public isGrounded: boolean = true;
  public facing: 'left' | 'right' = 'right';

  private fxAccum: number = 0;
  private fyAccum: number = 0;

  constructor(x: number = 0, y: number = 0, attrs?: Partial<PhysicsAttributes>) {
    this.x = x;
    this.y = y;
    if (attrs) {
      this.setAttributes(attrs);
    }
  }

  public setAttributes(attrs: Partial<PhysicsAttributes>) {
    if (attrs.mass !== undefined) this.mass = attrs.mass;
    if (attrs.maxJumpHeight !== undefined) this.maxJumpHeight = attrs.maxJumpHeight;
    if (attrs.restitution !== undefined) this.restitution = attrs.restitution;
    if (attrs.dragCoefficient !== undefined) this.dragCoefficient = attrs.dragCoefficient;
  }

  public applyForce(fx: number, fy: number) {
    this.fxAccum += fx;
    this.fyAccum += fy;
  }

  // 100+ km/h jump impulse (vy = -28.8 px/frame => ~103.7 km/h)
  public applyImpulse(ix: number, iy: number) {
    this.vx += ix / this.mass;
    this.vy = iy / this.mass;
    this.isGrounded = false;
  }

  public update(
    dt: number = 1.0,
    world: PhysicsWorldConfig = DEFAULT_WORLD_PHYSICS,
    onLandImpact?: (impactVelocity: number) => void
  ) {
    const effectiveGravity = this.vy > 0 ? world.gravity * 1.35 : world.gravity;
    const fgY = this.mass * effectiveGravity;
    this.fyAccum += fgY;

    // Air resistance
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > 0.001) {
      const dragMag = 0.5 * world.airDensity * this.dragCoefficient * (speed * speed) * 15;
      const dragFx = -dragMag * (this.vx / speed);
      const dragFy = -dragMag * (this.vy / speed);
      this.fxAccum += dragFx;
      this.fyAccum += dragFy;
    }

    this.ax = this.fxAccum / this.mass;
    this.ay = this.fyAccum / this.mass;

    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

    // Ground Friction & Air Horizontal Damping
    if (this.isGrounded) {
      this.vx *= world.frictionGround;
    } else {
      this.vx *= 0.90; // Smooth air horizontal damping
    }
    if (Math.abs(this.vx) < 0.1) {
      this.vx = 0;
    }

    this.vy = Math.min(this.vy, world.terminalVelocity);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Max Jump Height Cap (30m customizable ceiling per character)
    const jumpCeiling = world.groundY - this.maxJumpHeight;
    if (this.y < jumpCeiling) {
      this.y = jumpCeiling;
      if (this.vy < 0) {
        this.vy = 0; // Turn downward immediately at apex
      }
    }

    // Ground Collision
    if (this.y >= world.groundY) {
      const impactSpeed = this.vy;
      this.y = world.groundY;

      if (!this.isGrounded && impactSpeed > 4.0) {
        onLandImpact?.(impactSpeed);
      }

      this.vy = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }

    this.fxAccum = 0;
    this.fyAccum = 0;
  }
}
