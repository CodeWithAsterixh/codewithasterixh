import { CharacterId, CharacterAction, NinjaType } from '../types';
import { CHARACTER_DEFS, NINJA_DEFS, NINJA_TYPES } from '../data/characterData';

interface SpriteCacheItem {
  img: HTMLImageElement;
  isLoaded: boolean;
  totalFrames: number;
}

class CharacterSpriteManager {
  private cache: Map<string, SpriteCacheItem> = new Map();

  public getSprite(characterId: CharacterId, action: CharacterAction): SpriteCacheItem | null {
    const def = CHARACTER_DEFS[characterId];
    if (!def) return null;

    const actionFile = def.actions[action] || def.actions.idle;
    const fullPath = `${def.folderPath}/${actionFile}`;
    const key = `${characterId}_${action}`;

    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const img = new Image();
    const cacheItem: SpriteCacheItem = {
      img,
      isLoaded: false,
      totalFrames: 1,
    };

    img.onload = () => {
      cacheItem.isLoaded = true;
      const frameHeight = img.naturalHeight || 128;
      cacheItem.totalFrames = Math.max(1, Math.floor(img.naturalWidth / frameHeight));
    };

    img.src = fullPath;
    this.cache.set(key, cacheItem);
    return cacheItem;
  }

  public getNinjaSprite(type: NinjaType, action: string): SpriteCacheItem | null {
    const def = NINJA_DEFS[type];
    if (!def) return null;

    const actionFile = (def.actions as any)[action] || def.actions.idle;
    const fullPath = `${def.folderPath}/${actionFile}`;
    const key = `ninja_${type}_${action}`;

    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const img = new Image();
    const cacheItem: SpriteCacheItem = {
      img,
      isLoaded: false,
      totalFrames: 1,
    };

    img.onload = () => {
      cacheItem.isLoaded = true;
      const frameHeight = img.naturalHeight || 128;
      cacheItem.totalFrames = Math.max(1, Math.floor(img.naturalWidth / frameHeight));
    };

    img.src = fullPath;
    this.cache.set(key, cacheItem);
    return cacheItem;
  }

  public preloadCharacter(characterId: CharacterId) {
    const actions: CharacterAction[] = [
      'idle',
      'walk',
      'run',
      'jump',
      'attack',
      'attack1',
      'attack2',
      'attack3',
      'attack4',
      'hurt',
      'dead',
    ];
    actions.forEach((act) => this.getSprite(characterId, act));
  }

  public preloadNinja(type: NinjaType) {
    const actions = ['idle', 'walk', 'run', 'jump', 'attack', 'attack1', 'attack2', 'hurt', 'dead'];
    actions.forEach((act) => this.getNinjaSprite(type, act));
  }

  public preloadAllNinjas() {
    NINJA_TYPES.forEach((type) => this.preloadNinja(type));
  }
}

export const characterSpriteManager = new CharacterSpriteManager();

// Target exact 700ms (0.7s) duration for 1 complete idle animation loop
const IDLE_CYCLE_DURATION_SEC = 0.70;

export function getUniformFrameIndex(
  action: string,
  animProgress: number,
  totalFrames: number
): number {
  if (totalFrames <= 1) return 0;
  if (action === 'idle') {
    const loopProgress = (animProgress / IDLE_CYCLE_DURATION_SEC) % 1.0;
    return Math.floor(loopProgress * totalFrames) % totalFrames;
  }
  if (action === 'dead') {
    return Math.min(totalFrames - 1, Math.floor(animProgress));
  }
  return Math.floor(animProgress) % totalFrames;
}

/**
 * Standard World Character Frame Renderer (used in 2D World Sketch)
 */
export function drawCharacterFrame(
  ctx: CanvasRenderingContext2D,
  characterId: CharacterId,
  action: CharacterAction,
  x: number, // Ground center X
  y: number, // Ground line Y
  facing: 'left' | 'right',
  animProgress: number, // Synchronized animation phase / time in sec
  size?: number
) {
  const spriteItem = characterSpriteManager.getSprite(characterId, action);
  if (!spriteItem || !spriteItem.isLoaded || !spriteItem.img.naturalWidth) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const img = spriteItem.img;
  const frameHeight = img.naturalHeight || 128;
  const frameWidth = frameHeight;
  const totalFrames = spriteItem.totalFrames || Math.max(1, Math.floor(img.naturalWidth / frameHeight));

  const frameIndex = getUniformFrameIndex(action, animProgress, totalFrames);
  const srcX = frameIndex * frameWidth;

  ctx.save();
  ctx.translate(x, y);

  if (facing === 'left') {
    ctx.scale(-1, 1);
  }

  // Soft contact shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawSize = size ?? CHARACTER_VISUAL_SCALE[characterId] ?? 140;
  const drawW = drawSize;
  const drawH = drawSize;
  const destX = -drawW / 2;
  const destY = -drawH + 12;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    img,
    srcX,
    0,
    frameWidth,
    frameHeight,
    destX,
    destY,
    drawW,
    drawH
  );

  ctx.restore();
}

/**
 * High-Resolution Character Portrait Renderer (used in UI Selection Cards)
 * Scales the character body to fill 75-85% of the portrait canvas height.
 */
export function drawCharacterPortrait(
  ctx: CanvasRenderingContext2D,
  characterId: CharacterId,
  canvasWidth: number,
  canvasHeight: number,
  animProgress: number,
  targetHeight: number = 135
) {
  const spriteItem = characterSpriteManager.getSprite(characterId, 'idle');
  if (!spriteItem || !spriteItem.isLoaded || !spriteItem.img.naturalWidth) {
    return;
  }

  const img = spriteItem.img;
  const frameHeight = img.naturalHeight || 128;
  const frameWidth = frameHeight;
  const totalFrames = spriteItem.totalFrames || Math.max(1, Math.floor(img.naturalWidth / frameHeight));

  const frameIndex = getUniformFrameIndex('idle', animProgress, totalFrames);
  const srcX = frameIndex * frameWidth;

  const scale = targetHeight / 76;
  const drawSize = frameHeight * scale;

  const groundY = canvasHeight - 16;
  const centerX = canvasWidth / 2;

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // Contact shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(centerX, groundY + 2, 24 * scale, 7 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  const destX = centerX - (64 * scale);
  const destY = groundY - (127 * scale);

  ctx.drawImage(
    img,
    srcX,
    0,
    frameWidth,
    frameHeight,
    destX,
    destY,
    drawSize,
    drawSize
  );

  ctx.restore();
}

export const CHARACTER_VISUAL_SCALE: Record<CharacterId, number> = {
  Fighter: 140,
  Samurai: 140,
  Shinobi: 144,
  Xavier: 148,
  Countess_claire: 160,
  bridget: 160,
};

export const NINJA_VISUAL_SCALE: Record<NinjaType, number> = {
  Kunoichi: 175,
  Ninja_Monk: 120,
  Ninja_Peasant: 125,
};

/**
 * Standard World Ninja Enemy Frame Renderer (used for roaming enemy ninjas in World 2D Sketch)
 */
export function drawNinjaFrame(
  ctx: CanvasRenderingContext2D,
  type: NinjaType,
  action: string,
  x: number, // Ground center X
  y: number, // Ground line Y
  facing: 'left' | 'right',
  animProgress: number,
  size?: number,
  isHurt: boolean = false
) {
  const spriteItem = characterSpriteManager.getNinjaSprite(type, action);
  if (!spriteItem || !spriteItem.isLoaded || !spriteItem.img.naturalWidth) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(x, y, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  const img = spriteItem.img;
  const frameHeight = img.naturalHeight || 128;
  const frameWidth = frameHeight;
  const totalFrames = spriteItem.totalFrames || Math.max(1, Math.floor(img.naturalWidth / frameHeight));

  const frameIndex = getUniformFrameIndex(action, animProgress, totalFrames);
  const srcX = frameIndex * frameWidth;

  ctx.save();
  ctx.translate(x, y);

  if (facing === 'left') {
    ctx.scale(-1, 1);
  }

  // Soft contact shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawSize = size ?? NINJA_VISUAL_SCALE[type] ?? 140;
  const drawW = drawSize;
  const drawH = drawSize;
  const destX = -drawW / 2;
  const destY = -drawH + 12;

  if (isHurt) {
    ctx.filter = 'brightness(2.2) saturate(0.4)';
  }

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    img,
    srcX,
    0,
    frameWidth,
    frameHeight,
    destX,
    destY,
    drawW,
    drawH
  );

  ctx.restore();
}
