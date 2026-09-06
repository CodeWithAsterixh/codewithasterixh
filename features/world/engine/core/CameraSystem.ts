import { WORLD_BOUNDS } from '../../data/mapLayout';

export class CameraSystem {
  public cameraX: number = 0;
  public cameraTargetX: number = 0;
  public cameraFollows: boolean = true;
  public shakeIntensity: number = 0;

  public zoom: number = 1.0;
  public targetZoom: number = 1.0;
  public minZoom: number = 0.55;
  public maxZoom: number = 1.45;
  public isDragging: boolean = false;
  private prevX: number = 0;
  private prevY: number = 0;
  private touchDist: number = 0;

  public triggerShake(intensity: number = 6): void {
    this.shakeIntensity = intensity;
  }

  public dragBy(dx: number, effectiveZoom: number): void {
    this.cameraFollows = false;
    const delta = (dx * 1.25) / effectiveZoom;
    this.cameraTargetX -= delta;
    this.cameraX -= delta;
  }

  public adjustZoom(factor: number): void {
    this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom * factor));
  }

  public onMousePressed(x: number, y: number): void {
    this.isDragging = true;
    this.prevX = x;
    this.prevY = y;
  }

  public onMouseDragged(x: number, y: number): void {
    if (!this.isDragging) return;
    const dx = x - this.prevX;
    this.dragBy(dx, this.zoom);
    this.prevX = x;
    this.prevY = y;
  }

  public onMouseReleased(): void {
    this.isDragging = false;
  }

  public onTouchStarted(touches: Array<{ x: number; y: number }>): void {
    if (touches.length === 1) {
      this.isDragging = true;
      this.prevX = touches[0].x;
      this.prevY = touches[0].y;
    } else if (touches.length === 2) {
      this.touchDist = Math.hypot(touches[0].x - touches[1].x, touches[0].y - touches[1].y);
    }
  }

  public onTouchMoved(touches: Array<{ x: number; y: number }>): void {
    if (touches.length === 1 && this.isDragging) {
      const dx = touches[0].x - this.prevX;
      this.dragBy(dx, this.zoom);
      this.prevX = touches[0].x;
      this.prevY = touches[0].y;
    } else if (touches.length === 2) {
      const dist = Math.hypot(touches[0].x - touches[1].x, touches[0].y - touches[1].y);
      if (this.touchDist > 0) this.adjustZoom(dist / this.touchDist);
      this.touchDist = dist;
    }
  }

  public onTouchEnded(): void {
    this.isDragging = false;
    this.touchDist = 0;
  }

  public onWheel(deltaY: number): void {
    this.adjustZoom(deltaY < 0 ? 1.08 : 0.92);
  }

  public update(playerX: number, viewWidth: number, isMoving: boolean = false): void {
    if (this.cameraFollows) {
      this.cameraTargetX = playerX;
    }
    const halfW = viewWidth / 2;
    const minCamX = WORLD_BOUNDS.minX + halfW;
    const maxCamX = WORLD_BOUNDS.maxX - halfW;
    const clampedTargetX = Math.max(minCamX, Math.min(maxCamX, this.cameraTargetX));
    const lerpSpeed = isMoving ? 0.35 : 0.22;
    this.cameraX += (clampedTargetX - this.cameraX) * lerpSpeed;
    if (this.shakeIntensity > 0) {
      this.shakeIntensity *= 0.88;
      if (this.shakeIntensity < 0.2) this.shakeIntensity = 0;
    }
  }

  public getShakeOffset(): number {
    return this.shakeIntensity > 0 ? (Math.random() - 0.5) * this.shakeIntensity * 2 : 0;
  }

  public teleportTo(x: number, viewWidth: number): void {
    this.cameraTargetX = x;
    const halfW = viewWidth / 2;
    this.cameraX = Math.max(WORLD_BOUNDS.minX + halfW, Math.min(WORLD_BOUNDS.maxX - halfW, x));
    this.cameraFollows = true;
  }
}
