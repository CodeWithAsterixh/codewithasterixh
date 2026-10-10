import type p5 from 'p5';
import { AssetManager } from './AssetManager';
import { CameraSystem } from './CameraSystem';
import { DepthEngine } from './DepthEngine';
import { InputManager } from './InputManager';
import { PlayerEntity } from '../entities/PlayerEntity';
import { CombatManager, EnemyNinjaState } from '../entities/CombatManager';
import { EnvironmentSystem } from '../systems/EnvironmentSystem';
import { ScenerySystem } from '../systems/ScenerySystem';
import { StationSystem } from '../systems/StationSystem';
import { drawCharacterFrame, drawNinjaFrame } from '../characterAnimator';
import { NINJA_DEFS } from '../../data/characterData';
import { getNearbyWorldObject } from '../../data/mapObjects';
import { getNearbyStationKiosk } from '../../data/mapLayout';
import { Sketch2DCallbacks } from '../sketch2d';

function drawPlayerEntity(
  p: p5,
  ctx: CanvasRenderingContext2D,
  _mgr: AssetManager,
  data: { pl: PlayerEntity; phase: number }
) {
  const pl = data.pl;
  p.push();
  p.noStroke();
  p.fill(0, 0, 0, Math.max(25, 75 + pl.jumpOffset * 0.8));
  p.ellipse(pl.body.x, pl.body.y + 4, Math.max(16, 44 + pl.jumpOffset * 0.22), Math.max(6, 14 + pl.jumpOffset * 0.08));
  p.pop();
  drawCharacterFrame(ctx, pl.characterId, pl.action, pl.body.x, pl.body.y + pl.jumpOffset, pl.facing, data.phase, 140);
}

function drawEnemyEntity(
  p: p5,
  ctx: CanvasRenderingContext2D,
  _mgr: AssetManager,
  enemy: EnemyNinjaState
) {
  const now = performance.now();
  let enemyProgress = now / 1000;
  if (enemy.action === 'walk' || enemy.action === 'run') {
    enemyProgress = enemy.walkPhase;
  } else if (enemy.action === 'attack') {
    enemyProgress = enemy.attackPhase;
  } else if (enemy.action === 'hurt') {
    enemyProgress = enemy.hurtPhase;
  } else if (enemy.action === 'dead') {
    enemyProgress = enemy.deadPhase;
  }

  // Soft contact shadow
  p.push();
  p.noStroke();
  p.fill(0, 0, 0, 75);
  p.ellipse(enemy.x, enemy.y, 40, 10);
  p.pop();

  // Enemy Ninja Sprite
  drawNinjaFrame(
    ctx,
    enemy.type,
    enemy.action,
    enemy.x,
    enemy.y,
    enemy.facing,
    enemyProgress,
    undefined,
    enemy.state === 'hurt'
  );

  // Floating HP Bar & Title Tag (while alive)
  if (enemy.state !== 'dead') {
    const barW = 82;
    const barH = 7;
    const barX = enemy.x;
    const barY = enemy.y - 105;

    p.push();
    p.rectMode(p.CENTER);

    // Background card
    p.fill(10, 13, 20, 220);
    p.stroke('#D5C49B');
    p.strokeWeight(1.2);
    p.rect(barX, barY, barW + 4, barH + 4, 3);

    // Health Fill
    p.noStroke();
    const hpPct = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
    const fillW = barW * hpPct;
    p.fill(255, 75, 75);
    p.rectMode(p.CORNER);
    p.rect(barX - barW / 2, barY - barH / 2, fillW, barH, 2);

    // Text Tag
    p.fill('#FFFFFF');
    p.noStroke();
    p.textAlign(p.CENTER, p.BOTTOM);
    (p as any).textFont('Pixelify Sans');
    p.textSize(9);
    const ninjaDef = NINJA_DEFS[enemy.type];
    p.text(ninjaDef ? ninjaDef.name : enemy.type, barX, barY - 5);
    p.pop();
  }
}

export class WorldEngine {
  public assetMgr: AssetManager;
  public camera: CameraSystem = new CameraSystem();
  public depthEngine: DepthEngine = new DepthEngine();
  public input: InputManager = new InputManager();
  public player: PlayerEntity = new PlayerEntity(74);
  public combat: CombatManager = new CombatManager();
  public environment: EnvironmentSystem = new EnvironmentSystem();
  public scenery: ScenerySystem = new ScenerySystem();
  public stations: StationSystem = new StationSystem();
  public isModalActive: boolean = false;
  private lastTime: number = 0;
  private windTimer: number = 0;

  constructor(private p: p5, private callbacks?: Sketch2DCallbacks) {
    this.assetMgr = new AssetManager(p);
    this.lastTime = performance.now();
  }

  public updateAndRender(): void {
    const p = this.p;
    const now = performance.now();

    // When modal is active: freeze game, clear canvas and do not draw anything in the background
    if (this.isModalActive) {
      this.lastTime = now;
      p.clear();
      return;
    }

    p.background(this.assetMgr.currentThemeMode === 'dark' ? '#0F141F' : '#7AB5E8');
    const deltaTime = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.windTimer += deltaTime * 60;

    const groundY = p.height * 0.82;
    const baseZoom = Math.min(1.0, Math.max(0.75, p.width / 1440));
    this.camera.zoom += (this.camera.targetZoom * baseZoom - this.camera.zoom) * 0.20;
    const zoom = this.camera.zoom;

    this.handleInput();
    this.player.update(deltaTime);
    this.combat.update(
      deltaTime,
      this.player,
      this.camera,
      this.callbacks?.onPlayerHealthChange,
      this.callbacks?.onRespawnCountdownChange
    );

    const isMoving = Math.hypot(this.player.body.vx, this.player.body.vy) > 0.1;
    this.camera.update(this.player.body.x, p.width / zoom, isMoving);
    this.environment.renderBackground(p, this.camera.cameraX, groundY, this.player.body.x, this.windTimer, this.assetMgr);

    p.push();
    const camScreenX = p.width / 2 - this.camera.cameraX * zoom;
    const camScreenY = groundY + this.camera.getShakeOffset();
    p.translate(camScreenX, camScreenY);
    p.scale(zoom);

    const viewLeft = -camScreenX / zoom - 200;
    const viewRight = (p.width - camScreenX) / zoom + 200;
    const viewBottom = (p.height - camScreenY) / zoom + 300;
    this.environment.renderFloor(p, viewLeft, viewRight, viewBottom, this.assetMgr);

    this.depthEngine.clear();
    this.scenery.populateDepth(this.depthEngine, viewLeft, viewRight, this.assetMgr);
    this.stations.populateDepth(this.depthEngine, this.player.body.x, this.windTimer, this.assetMgr, viewLeft, viewRight);

    // Calculate synchronized character animation phase based on current action
    let animPhase = now / 1000;
    if (this.player.action === 'walk' || this.player.action === 'run') {
      animPhase = this.player.walkPhase;
    } else if (this.player.action.startsWith('attack') || this.player.action === 'attack') {
      animPhase = this.player.attackPhase;
    } else if (this.player.action === 'jump') {
      animPhase = this.player.jumpPhase;
    } else if (this.player.action === 'dead') {
      animPhase = this.player.deadPhase;
    }

    // Add Player character to 2.5D depth queue
    this.depthEngine.add(this.player.body.y, drawPlayerEntity, { pl: this.player, phase: animPhase });

    // Add Roaming Enemy Ninja to 2.5D depth queue (if active)
    if (this.combat.activeEnemy) {
      this.depthEngine.add(this.combat.activeEnemy.y, drawEnemyEntity, this.combat.activeEnemy);
    }

    // Render depth-sorted entities back-to-front
    this.depthEngine.render(p, this.assetMgr);
    this.stations.renderBoundaries(p);

    // Render World-Space Combat Particles and Floating Numbers
    this.combat.renderWorldSpace(p);
    p.pop();

    // Render Screen-Space Overlays (Offscreen indicator)
    this.combat.renderScreenSpace(p, zoom, camScreenX, this.player.body.x);
    this.dispatchCallbacks();
  }

  private handleInput(): void {
    const vec = this.input.getMoveVector();
    if (vec.dx !== 0 || vec.dy !== 0 || this.input.pendingAction || this.input.isJumping()) {
      this.camera.cameraFollows = true;
    }
    this.player.move(vec.dx, vec.dy, this.input.isSprinting());

    if (this.input.isJumping() && this.player.jumpOffset === 0) {
      this.player.triggerJump();
    }
    const atk = this.input.getAttackAction();
    if (atk) {
      this.player.triggerAttack(atk);
    }

    // Inspect nearby object or station kiosk on [ E ] or Enter
    if (this.input.isInspectPressed()) {
      const nearbyObj = getNearbyWorldObject(this.player.body.x);
      if (nearbyObj) {
        this.callbacks?.onInspectObject?.(nearbyObj);
      } else {
        const nearbyKiosk = getNearbyStationKiosk(this.player.body.x);
        if (nearbyKiosk) {
          this.callbacks?.onInspectStation?.(nearbyKiosk);
        }
      }
    }
  }

  private dispatchCallbacks(): void {
    this.callbacks?.onPlayerPositionChange?.(this.player.body.x, this.player.body.y);
    const biome = this.scenery.calculateBiome(this.player.body.x);
    if (biome) this.callbacks?.onBiomeChange?.(biome);
    this.callbacks?.onCharacterStateChange?.(this.player.gender, this.player.characterId, this.player.action);
    this.callbacks?.onPhysicsTelemetryChange?.({
      x: this.player.body.x,
      y: this.player.body.y,
      vx: this.player.body.vx,
      vy: this.player.body.vy,
      isGrounded: this.player.body.isGrounded,
      isMoving: Math.hypot(this.player.body.vx, this.player.body.vy) > 0.25,
      action: this.player.action,
      facing: this.player.facing,
      cameraFollows: this.camera.cameraFollows,
      controlMode: 'arrow',
    });
  }
}
