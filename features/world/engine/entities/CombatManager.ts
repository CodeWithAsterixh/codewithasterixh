import type p5 from 'p5';
import { CombatSystem } from '../systems/combatSystem';
import { PlayerEntity } from './PlayerEntity';
import { CameraSystem } from '../core/CameraSystem';

export interface ActiveEnemy {
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  state: 'patrol' | 'chase' | 'attack' | 'hurt' | 'dead';
  facing: 'left' | 'right';
  type: string;
}

export class CombatManager {
  public combatSystem: CombatSystem = new CombatSystem();
  public isCombatActive: boolean = false;
  public playerHp: number = 100;
  public maxPlayerHp: number = 100;
  public respawnCountdown: number | null = null;
  public activeEnemy: ActiveEnemy | null = null;
  private respawnTimer: number = 0;

  public update(
    deltaTime: number,
    player: PlayerEntity,
    camera: CameraSystem,
    onPlayerHealthChange?: (hp: number, max: number) => void,
    onRespawnCountdownChange?: (countdown: number | null) => void
  ): void {
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

    if (!this.isCombatActive) return;

    // Player attack detection on active enemy
    if (player.isAttacking && player.attackTimer < 0.1 && this.activeEnemy && this.activeEnemy.state !== 'dead') {
      const dist = Math.abs(player.body.x - this.activeEnemy.x);
      if (dist < 90) {
        const damage = Math.floor(Math.random() * 15 + 20);
        this.activeEnemy.hp = Math.max(0, this.activeEnemy.hp - damage);
        this.combatSystem.spawnFloatingText(this.activeEnemy.x, this.activeEnemy.y - 40, `-${damage}`, '#FFD700');
        this.combatSystem.spawnCombatParticles(this.activeEnemy.x, this.activeEnemy.y, '#EF4444', 10);
        camera.triggerShake(4);
        if (this.activeEnemy.hp <= 0) {
          this.activeEnemy.state = 'dead';
        }
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
    this.respawnCountdown = null;
    onPlayerHealthChange?.(this.playerHp, this.maxPlayerHp);
  }

  public render(p: p5, zoom: number, camX: number, playerX: number): void {
    this.combatSystem.renderCombatParticlesAndTexts(p);
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
