import { Gender, CharacterId, CharacterAction } from '../../types';
import { DEFAULT_GENDER, DEFAULT_CHARACTER } from '../../data/characterData';
import { WORLD_BOUNDS } from '../../data/mapLayout';
import { INTERACTIVE_OBJECTS } from '../../data/mapObjects';
import { WORLD_LAMP_POSTS } from '../renderers/sceneryConstants';
import { PhysicsBody2D } from '../physicsEngine';

export class PlayerEntity {
  public body: PhysicsBody2D;
  public gender: Gender = DEFAULT_GENDER;
  public characterId: CharacterId = DEFAULT_CHARACTER;
  public facing: 'left' | 'right' = 'right';
  public action: CharacterAction = 'idle';
  public isAttacking: boolean = false;
  public attackTimer: number = 0;
  public attackPhase: number = 0;
  public isDead: boolean = false;
  public hitFlashTimer: number = 0;
  public isSprinting: boolean = false;
  public jumpOffset: number = 0;
  public jumpVelocity: number = 0;
  public jumpPhase: number = 0;
  public walkPhase: number = 0;
  public deadPhase: number = 0;

  constructor(initialY: number = 74) {
    this.body = new PhysicsBody2D(0, initialY);
  }

  public update(deltaTime: number): void {
    if (this.hitFlashTimer > 0) this.hitFlashTimer = Math.max(0, this.hitFlashTimer - deltaTime);
    if (this.isAttacking) {
      this.attackTimer += deltaTime;
      this.attackPhase += 0.45;
      if (this.attackTimer > 0.45) {
        this.isAttacking = false;
        this.attackTimer = 0;
        this.attackPhase = 0;
      }
    }

    if (this.jumpOffset < 0 || this.jumpVelocity !== 0) {
      this.jumpOffset += this.jumpVelocity;
      this.jumpVelocity += 0.95;
      const normalizedJumpProgress = ((this.jumpVelocity - (-10.2)) / 20.4) * 8;
      this.jumpPhase = Math.max(0, Math.min(8, normalizedJumpProgress));
      if (this.jumpOffset >= 0) {
        this.jumpOffset = 0;
        this.jumpVelocity = 0;
        this.jumpPhase = 0;
        this.body.isGrounded = true;
      }
    } else {
      this.body.isGrounded = true;
    }

    if (this.isDead) {
      this.deadPhase += deltaTime * 5.0;
    }

    this.body.x += this.body.vx;
    this.body.y += this.body.vy;
    this.resolveObstacles();

    const speed = Math.hypot(this.body.vx, this.body.vy);
    if (speed > 0.15) this.walkPhase += speed * (this.isSprinting ? 0.09 : 0.075);

    if (this.body.x < WORLD_BOUNDS.minX + 40) { this.body.x = WORLD_BOUNDS.minX + 40; this.body.vx = 0; }
    else if (this.body.x > WORLD_BOUNDS.maxX - 40) { this.body.x = WORLD_BOUNDS.maxX - 40; this.body.vx = 0; }
    this.updateAction();
  }

  public move(dx: number, dy: number, isSprinting: boolean): void {
    this.isSprinting = isSprinting;
    if (dx !== 0) this.facing = dx > 0 ? 'right' : 'left';
    const maxX = isSprinting ? 11.0 : 6.8, maxY = isSprinting ? 5.5 : 3.6;
    if (dx !== 0) {
      if ((dx > 0 && this.body.vx < 0) || (dx < 0 && this.body.vx > 0)) this.body.vx = 0;
      this.body.vx = Math.max(-maxX, Math.min(maxX, this.body.vx + dx * (isSprinting ? 3.5 : 2.4)));
    } else {
      this.body.vx *= 0.45;
      if (Math.abs(this.body.vx) < 0.1) this.body.vx = 0;
    }
    if (dy !== 0) {
      if ((dy > 0 && this.body.vy < 0) || (dy < 0 && this.body.vy > 0)) this.body.vy = 0;
      this.body.vy = Math.max(-maxY, Math.min(maxY, this.body.vy + dy * (isSprinting ? 2.2 : 1.5)));
    } else {
      this.body.vy *= 0.45;
      if (Math.abs(this.body.vy) < 0.1) this.body.vy = 0;
    }
  }

  private resolveObstacleEllipse(ox: number, oy: number, rx: number, ry: number): void {
    const prx = 16;
    const pry = 10;
    const Rx = rx + prx;
    const Ry = ry + pry;
    const dx = this.body.x - ox;
    const dy = this.body.y - oy;
    const u = dx / Rx;
    const v = dy / Ry;
    const dNormSq = u * u + v * v;
    if (dNormSq < 1.0) {
      const dist = Math.sqrt(dNormSq);
      if (dist > 0.001) {
        const un = u / dist;
        const vn = v / dist;
        this.body.x = ox + un * Rx;
        this.body.y = oy + vn * Ry;
      } else {
        this.body.y = oy + Ry;
      }
    }
  }

  public resolveObstacles(): void {
    this.body.y = Math.max(0, Math.min(110, this.body.y));
    // Solid front wall of House Base and Garage: x: -680 to +360
    if (this.body.x >= -680 && this.body.x <= 360) {
      if (this.body.y < 70) {
        this.body.y = 70;
        if (this.body.vy < 0) this.body.vy = 0;
      }
    }
    // Mailbox post collision at x = 220
    if (Math.abs(this.body.x - 220) < 30) {
      this.resolveObstacleEllipse(220, 64, 14, 8);
    }
    // Interactive Landmark Objects (Chest, Briefcase, Vault, Chamber, Bag)
    for (const obj of INTERACTIVE_OBJECTS) {
      if (Math.abs(this.body.x - obj.x) < 70) {
        this.resolveObstacleEllipse(obj.x, 68 + (obj.yOffset || 0), (obj.size || 140) * 0.24, 14);
      }
    }
    // Street Lamp Posts
    for (const lp of WORLD_LAMP_POSTS) {
      if (Math.abs(this.body.x - lp.x) < 25) {
        this.resolveObstacleEllipse(lp.x, lp.yOffset, 12, 6);
      }
    }
  }

  private updateAction(): void {
    if (this.isDead) { this.action = 'dead'; return; }
    if (this.isAttacking) return;
    if (this.jumpOffset < 0) this.action = 'jump';
    else if (Math.hypot(this.body.vx, this.body.vy) > 0.25) this.action = this.isSprinting ? 'run' : 'walk';
    else this.action = 'idle';
  }

  public triggerJump(): void {
    if (this.isDead || this.jumpOffset !== 0) return;
    this.jumpVelocity = -10.2; this.jumpOffset = -1; this.body.isGrounded = false; this.action = 'jump';
  }

  public triggerAttack(type: 'attack1' | 'attack2' | 'attack3' | 'attack4'): void {
    if (this.isDead) return;
    this.isAttacking = true;
    this.attackTimer = 0;
    this.attackPhase = 0;
    this.action = type;
  }

  public takeHit(): void {
    this.hitFlashTimer = 0.3;
    if (!this.isDead) this.action = 'hurt';
  }
}
