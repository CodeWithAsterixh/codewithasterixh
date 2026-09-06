import type p5 from 'p5';
import { AssetManager } from './AssetManager';
import { CameraSystem } from './CameraSystem';
import { DepthEngine } from './DepthEngine';
import { InputManager } from './InputManager';
import { PlayerEntity } from '../entities/PlayerEntity';
import { CombatManager } from '../entities/CombatManager';
import { EnvironmentSystem } from '../systems/EnvironmentSystem';
import { ScenerySystem } from '../systems/ScenerySystem';
import { StationSystem } from '../systems/StationSystem';
import { drawCharacterFrame } from '../characterAnimator';
import { Sketch2DCallbacks } from '../sketch2d';

function drawPlayerEntity(p: p5, ctx: CanvasRenderingContext2D, _mgr: AssetManager, data: { pl: PlayerEntity; phase: number }) {
  const pl = data.pl;
  p.push();
  p.noStroke();
  p.fill(0, 0, 0, Math.max(25, 75 + pl.jumpOffset * 0.8));
  p.ellipse(pl.body.x, pl.body.y + 4, Math.max(16, 44 + pl.jumpOffset * 0.22), Math.max(6, 14 + pl.jumpOffset * 0.08));
  p.pop();
  drawCharacterFrame(ctx, pl.characterId, pl.action, pl.body.x, pl.body.y + pl.jumpOffset, pl.facing, data.phase, 140);
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
    p.background(this.assetMgr.currentThemeMode === 'dark' ? '#0F141F' : '#7AB5E8');
    const now = performance.now();
    const deltaTime = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.windTimer += deltaTime * 60;

    const groundY = p.height * 0.82;
    const baseZoom = Math.min(1.0, Math.max(0.75, p.width / 1440));
    this.camera.zoom += (this.camera.targetZoom * baseZoom - this.camera.zoom) * 0.20;
    const zoom = this.camera.zoom;

    if (!this.isModalActive) {
      this.handleInput();
      this.player.update(deltaTime);
      this.combat.update(deltaTime, this.player, this.camera, this.callbacks?.onPlayerHealthChange, this.callbacks?.onRespawnCountdownChange);
    }

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

    const animPhase = this.player.action === 'idle' ? (now / 1000) : this.player.walkPhase;
    this.depthEngine.add(this.player.body.y, drawPlayerEntity, { pl: this.player, phase: animPhase });

    this.depthEngine.render(p, this.assetMgr);
    this.stations.renderBoundaries(p);
    p.pop();

    this.combat.render(p, zoom, camScreenX, this.player.body.x);
    this.dispatchCallbacks();
  }

  private handleInput(): void {
    const vec = this.input.getMoveVector();
    if (vec.dx !== 0 || vec.dy !== 0 || this.input.pendingAction || this.input.isJumping()) this.camera.cameraFollows = true;
    this.player.move(vec.dx, vec.dy, this.input.isSprinting());

    if (this.input.pendingAction === 'jump' || this.input.isJumping()) {
      this.player.triggerJump();
      this.input.pendingAction = null;
    } else if (this.input.pendingAction && ['attack1', 'attack2', 'attack3', 'attack4'].includes(this.input.pendingAction)) {
      this.player.triggerAttack(this.input.pendingAction as any);
      this.input.pendingAction = null;
    }
  }

  private dispatchCallbacks(): void {
    this.callbacks?.onPlayerPositionChange?.(this.player.body.x, this.player.body.y);
    const biome = this.scenery.calculateBiome(this.player.body.x);
    if (biome) this.callbacks?.onBiomeChange?.(biome);
    this.callbacks?.onCharacterStateChange?.(this.player.gender, this.player.characterId, this.player.action);
    this.callbacks?.onPhysicsTelemetryChange?.({
      x: this.player.body.x, y: this.player.body.y, vx: this.player.body.vx, vy: this.player.body.vy,
      isGrounded: this.player.body.isGrounded, isMoving: Math.hypot(this.player.body.vx, this.player.body.vy) > 0.25,
      action: this.player.action, facing: this.player.facing, cameraFollows: this.camera.cameraFollows, controlMode: 'arrow',
    });
  }
}
