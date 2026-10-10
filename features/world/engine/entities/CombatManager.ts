import type p5 from 'p5';
import { NinjaType } from '../../types';
import { NINJA_DEFS, NINJA_TYPES } from '../../data/characterData';
import { WORLD_BOUNDS } from '../../data/mapLayout';
import { CombatSystem } from '../systems/combatSystem';
import { PlayerEntity } from './PlayerEntity';
import { CameraSystem } from '../core/CameraSystem';
import { characterSpriteManager } from '../CharacterSpriteManager';

export interface EnemyNinjaState {
  id: string;
  type: NinjaType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 'left' | 'right';
  action: string;
  walkPhase: number;
  attackPhase: number;
  hurtPhase: number;
  deadPhase: number;
  hasHitPlayer: boolean;
  animTimer: number;
  hp: number;
  maxHp: number;
  state: 'approach' | 'attack' | 'retreat' | 'hurt' | 'dead';
  stateTimer: number;
  attackCooldown: number;
  hurtTimer: number;
  deadTimer: number;
}

export class CombatManager {
  public combatSystem: CombatSystem = new CombatSystem();
  public isCombatActive: boolean = false;
  public playerHp: number = 100;
  public maxPlayerHp: number = 100;
  public respawnCountdown: number | null = null;
  public activeEnemy: EnemyNinjaState | null = null;
  private respawnTimer: number = 0;
  private lastEnemySpawnTime: number = 0;
  private lastPlayerDamageTime: number = 0;
  private playerHitGate: boolean = false;

  public setCombatActive(active: boolean): void {
    this.isCombatActive = active;
    if (!active) {
      this.activeEnemy = null;
    } else {
      this.lastEnemySpawnTime = performance.now() - 8000;
    }
  }

  public update(
    deltaTime: number,
    player: PlayerEntity,
    camera: CameraSystem,
    onPlayerHealthChange?: (hp: number, max: number) => void,
    onRespawnCountdownChange?: (countdown: number | null) => void
  ): void {
    const now = performance.now();

    // 1. Respawn timer
    if (this.respawnCountdown !== null) {
      this.respawnTimer -= deltaTime;
      const remainingSec = Math.ceil(this.respawnTimer);
      if (remainingSec !== this.respawnCountdown) {
        this.respawnCountdown = remainingSec > 0 ? remainingSec : null;
        onRespawnCountdownChange?.(this.respawnCountdown);
      }
      if (this.respawnTimer <= 0) {
        this.respawnPlayer(player, onPlayerHealthChange);
      }
    }

    if (!this.isCombatActive) {
      this.activeEnemy = null;
      return;
    }

    // 2. Enemy Spawning (1 enemy at a time, min 10s between spawns, or ~2s on activation)
    if (!this.activeEnemy) {
      if (this.lastEnemySpawnTime === 0 || now - this.lastEnemySpawnTime >= 10000) {
        const side = Math.random() < 0.5 ? -1 : 1;
        const dist = 120 + Math.random() * 380;
        const rawX = player.body.x + side * dist;
        const spawnX = Math.max(WORLD_BOUNDS.minX + 200, Math.min(WORLD_BOUNDS.maxX - 200, rawX));
        const spawnY = Math.max(25, Math.min(95, player.body.y + (Math.random() * 30 - 15)));
        const ninjaType = NINJA_TYPES[Math.floor(Math.random() * NINJA_TYPES.length)];

        this.activeEnemy = {
          id: `ninja_${Date.now()}`,
          type: ninjaType,
          x: spawnX,
          y: spawnY,
          vx: 0,
          vy: 0,
          facing: spawnX < player.body.x ? 'right' : 'left',
          action: 'run',
          walkPhase: 0,
          attackPhase: 0,
          hurtPhase: 0,
          deadPhase: 0,
          hasHitPlayer: false,
          animTimer: 0,
          hp: 100,
          maxHp: 100,
          state: 'approach',
          stateTimer: 0,
          attackCooldown: 1.0,
          hurtTimer: 0,
          deadTimer: 0,
        };
        this.lastEnemySpawnTime = now;
        characterSpriteManager.preloadNinja(ninjaType);
        this.combatSystem.spawnFloatingText(spawnX, spawnY - 80, 'ENEMY SPAWNED!', '#FF4B4B');
      }
      return;
    }

    const enemy = this.activeEnemy;
    enemy.animTimer += deltaTime;
    if (enemy.attackCooldown > 0) enemy.attackCooldown -= deltaTime;

    const distX = player.body.x - enemy.x;
    const distY = player.body.y - enemy.y;
    const distSq = distX * distX + distY * distY;

    // 3. Enemy State Machine
    if (enemy.state === 'dead') {
      enemy.action = 'dead';
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.deadPhase += deltaTime * 5.0;
      enemy.deadTimer += deltaTime;
      if (enemy.deadTimer >= 2.6) {
        this.activeEnemy = null;
      }
      return;
    }

    if (enemy.state === 'hurt') {
      enemy.action = 'hurt';
      enemy.hurtPhase += deltaTime * 6.0;
      enemy.hurtTimer -= deltaTime;
      enemy.vx *= 0.85;
      enemy.vy *= 0.85;
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;
      if (Math.abs(enemy.vx) > 0.2) {
        enemy.facing = enemy.vx > 0 ? 'right' : 'left';
      }
      if (enemy.hurtTimer <= 0) {
        enemy.state = 'approach';
      }
      return;
    }

    // If player is dead and respawning, enemy runs toward player defeat location
    if (this.respawnCountdown !== null || player.isDead) {
      if (distSq > 1225) {
        const dist = Math.sqrt(distSq);
        enemy.state = 'approach';
        enemy.action = 'run';
        const speed = 4.2;
        enemy.vx = (distX / dist) * speed;
        enemy.vy = (distY / dist) * (speed * 0.4);
        if (Math.abs(enemy.vx) > 0.08) {
          enemy.facing = enemy.vx > 0 ? 'right' : 'left';
        }
        enemy.walkPhase += Math.sqrt(enemy.vx * enemy.vx + enemy.vy * enemy.vy) * 0.07;
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        enemy.x = Math.max(WORLD_BOUNDS.minX + 50, Math.min(WORLD_BOUNDS.maxX - 50, enemy.x));
        enemy.y = Math.max(20, Math.min(100, enemy.y));
      } else {
        enemy.action = 'idle';
        enemy.facing = distX >= 0 ? 'right' : 'left';
        enemy.vx = 0;
        enemy.vy = 0;
      }
      return;
    }

    if (enemy.state === 'attack') {
      enemy.action = 'attack';
      enemy.attackPhase += 0.45;
      enemy.facing = distX >= 0 ? 'right' : 'left';
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.stateTimer -= deltaTime;

      // Mid-swing hit check (once per attack swing)
      if (!enemy.hasHitPlayer && enemy.stateTimer <= 0.40 && enemy.stateTimer > 0.15) {
        if (distSq <= 5625 && Math.abs(distY) <= 35) {
          enemy.hasHitPlayer = true;
          const pushDir = enemy.facing === 'right' ? 1 : -1;
          player.body.vx += pushDir * 6.5;

          const damage = Math.floor(Math.random() * 5 + 14);
          this.playerHp = Math.max(0, this.playerHp - damage);
          this.lastPlayerDamageTime = now;
          player.takeHit();
          camera.triggerShake(4);
          onPlayerHealthChange?.(this.playerHp, this.maxPlayerHp);

          this.combatSystem.spawnCombatParticles(player.body.x, player.body.y - 25, '#FF4B4B', 8);
          this.combatSystem.spawnFloatingText(player.body.x, player.body.y - 65, `-${damage}`, '#FF3B30');

          if (this.playerHp <= 0) {
            this.playerHp = 0;
            player.isDead = true;
            player.action = 'dead';
            player.deadPhase = 0;
            this.respawnTimer = 5.0;
            this.respawnCountdown = 5;
            onPlayerHealthChange?.(0, this.maxPlayerHp);
            onRespawnCountdownChange?.(5);
            this.combatSystem.spawnCombatParticles(player.body.x, player.body.y - 25, '#FF4B4B', 16);
            this.combatSystem.spawnFloatingText(player.body.x, player.body.y - 65, 'DEFEATED!', '#FF3B30');
          }
        }
      }

      if (enemy.stateTimer <= 0) {
        enemy.state = 'retreat';
        enemy.stateTimer = 0.8;
        enemy.attackCooldown = 1.8;
        enemy.attackPhase = 0;
        enemy.hasHitPlayer = false;
      }
      return;
    }

    if (enemy.state === 'retreat') {
      enemy.action = 'walk';
      enemy.stateTimer -= deltaTime;
      const retreatDir = distX >= 0 ? -1 : 1;
      enemy.vx = retreatDir * 2.2;
      enemy.vy = 0;
      enemy.facing = enemy.vx > 0 ? 'right' : 'left';
      enemy.walkPhase += Math.abs(enemy.vx) * 0.07;
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;
      if (enemy.stateTimer <= 0) {
        enemy.state = 'approach';
      }
      return;
    }

    if (enemy.state === 'approach') {
      if (distSq > 4225) {
        const dist = Math.sqrt(distSq);
        const isFar = distSq > 32400;
        enemy.action = isFar ? 'run' : 'walk';
        const speed = isFar ? 3.8 : 2.2;
        enemy.vx = (distX / dist) * speed;
        enemy.vy = (distY / dist) * (speed * 0.4);
        if (Math.abs(enemy.vx) > 0.08) {
          enemy.facing = enemy.vx > 0 ? 'right' : 'left';
        }
        enemy.walkPhase += Math.sqrt(enemy.vx * enemy.vx + enemy.vy * enemy.vy) * 0.07;
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        enemy.x = Math.max(WORLD_BOUNDS.minX + 50, Math.min(WORLD_BOUNDS.maxX - 50, enemy.x));
        enemy.y = Math.max(20, Math.min(100, enemy.y));
      } else {
        if (enemy.attackCooldown <= 0) {
          enemy.state = 'attack';
          enemy.action = 'attack';
          enemy.facing = distX >= 0 ? 'right' : 'left';
          enemy.stateTimer = 0.65;
          enemy.attackPhase = 0;
          enemy.hasHitPlayer = false;
          enemy.vx = 0;
          enemy.vy = 0;
        } else {
          enemy.action = 'idle';
          enemy.facing = distX >= 0 ? 'right' : 'left';
          enemy.vx = 0;
          enemy.vy = 0;
        }
      }
    }

    // 4. Player Out-of-Combat Health Regeneration (after 4s without damage)
    if (this.playerHp < this.maxPlayerHp && now - this.lastPlayerDamageTime > 4000 && !player.isDead) {
      this.playerHp = Math.min(this.maxPlayerHp, this.playerHp + deltaTime * 3.5);
      onPlayerHealthChange?.(Math.round(this.playerHp), this.maxPlayerHp);
    }

    // 5. Player Attack Detection on Active Enemy
    if (player.isAttacking && player.attackTimer < 0.15 && !this.playerHitGate) {
      this.playerHitGate = true;
      this.checkPlayerAttackHit(player, camera);
    } else if (!player.isAttacking) {
      this.playerHitGate = false;
    }
  }

  private checkPlayerAttackHit(player: PlayerEntity, camera: CameraSystem): void {
    if (!this.activeEnemy || this.activeEnemy.state === 'dead') return;

    const enemy = this.activeEnemy;
    const distX = enemy.x - player.body.x;
    const distY = Math.abs(enemy.y - player.body.y);

    const isFacingEnemy =
      (player.facing === 'right' && distX >= -15 && distX <= 95) ||
      (player.facing === 'left' && distX <= 15 && distX >= -95);

    if (isFacingEnemy && distY <= 40) {
      let baseDamage = 35;
      let knockback = 5.5;
      let particleColor = '#FFD700';

      if (player.action === 'attack2') {
        baseDamage = 40;
        knockback = 6.2;
        particleColor = '#60A5FA';
      } else if (player.action === 'attack3') {
        baseDamage = 45;
        knockback = 7.0;
        particleColor = '#A855F7';
      } else if (player.action === 'attack4') {
        baseDamage = 52;
        knockback = 8.0;
        particleColor = '#EF4444';
      }

      const damage = Math.floor(Math.random() * 8 + baseDamage);
      enemy.hp = Math.max(0, enemy.hp - damage);
      const pushDir = player.facing === 'right' ? 1 : -1;
      enemy.vx = pushDir * knockback;

      camera.triggerShake(4);
      this.combatSystem.spawnCombatParticles(enemy.x, enemy.y - 30, particleColor, 12);
      this.combatSystem.spawnFloatingText(enemy.x, enemy.y - 80, `-${damage}`, particleColor);

      if (enemy.hp <= 0) {
        enemy.hp = 0;
        enemy.state = 'dead';
        enemy.action = 'dead';
        enemy.deadTimer = 0;
        enemy.deadPhase = 0;
        enemy.animTimer = 0;
        this.combatSystem.spawnCombatParticles(enemy.x, enemy.y - 30, '#FF4B4B', 16);
        this.combatSystem.spawnFloatingText(enemy.x, enemy.y - 95, 'DEFEATED!', '#FF3B30');
      } else {
        enemy.state = 'hurt';
        enemy.action = 'hurt';
        enemy.hurtTimer = 0.32;
        enemy.hurtPhase = 0;
        enemy.animTimer = 0;
      }
    }
  }

  private respawnPlayer(
    player: PlayerEntity,
    onPlayerHealthChange?: (hp: number, max: number) => void
  ): void {
    this.playerHp = this.maxPlayerHp;
    player.isDead = false;
    player.action = 'idle';
    player.body.x = 0;
    player.body.vx = 0;
    player.body.vy = 0;
    player.deadPhase = 0;
    this.respawnCountdown = null;
    this.respawnTimer = 0;
    onPlayerHealthChange?.(this.playerHp, this.maxPlayerHp);
  }

  public renderWorldSpace(p: p5): void {
    this.combatSystem.renderCombatParticlesAndTexts(p);
  }

  public renderScreenSpace(p: p5, zoom: number, camX: number, playerX: number): void {
    this.combatSystem.renderOffscreenEnemyIndicator(
      p,
      this.isCombatActive,
      this.activeEnemy,
      playerX,
      zoom,
      camX
    );
  }
}
