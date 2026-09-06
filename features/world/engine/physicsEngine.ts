import { PhysicsAttributes, PhysicsWorldConfig } from '../types';
import { DEFAULT_WORLD_PHYSICS, PhysicsDustParticle } from './physicsConfig';

export { DEFAULT_WORLD_PHYSICS };
export type { PhysicsDustParticle };

export class PhysicsBody2D {
  public x: number = 0;
  public y: number = 0;
  public vx: number = 0;
  public vy: number = 0;

  public mass: number = 70;
  public width: number = 60;
  public height: number = 120;
  public maxJumpHeight: number = 30;
  public isGrounded: boolean = true;
  public facing: 'left' | 'right' = 'right';

  constructor(x: number = 0, y: number = 0, attrs?: Partial<PhysicsAttributes>) {
    this.x = x;
    this.y = y;
  }

  public setAttributes(attrs: Partial<PhysicsAttributes>) {
    if (attrs.mass !== undefined) this.mass = attrs.mass;
    if (attrs.maxJumpHeight !== undefined) this.maxJumpHeight = attrs.maxJumpHeight;
  }

  public applyForce(fx: number, _fy: number) {
    this.vx = fx;
  }

  public applyImpulse(_ix: number, iy: number) {
    this.vy = iy;
    this.isGrounded = false;
  }

  public update(
    dt: number = 1.0,
    world: PhysicsWorldConfig = DEFAULT_WORLD_PHYSICS,
    onLandImpact?: (impactVelocity: number) => void
  ) {
    // Apply gravity when in the air
    if (!this.isGrounded) {
      this.vy += 980 * dt;
      if (this.vy > 600) this.vy = 600;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.y >= world.groundY) {
      const impactSpeed = this.vy;
      this.y = world.groundY;
      if (!this.isGrounded && impactSpeed > 100) onLandImpact?.(impactSpeed);
      this.vy = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }

    // Natural deceleration when no key is held
    this.vx *= 0.80;
    if (Math.abs(this.vx) < 5) this.vx = 0;
  }
}
