'use client';

import { CharacterId, CharacterAction } from '../types';
import { CHARACTER_DEFS } from '../data/characterData';

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

  public preloadCharacter(characterId: CharacterId) {
    const actions: CharacterAction[] = ['idle', 'walk', 'run', 'jump', 'attack'];
    actions.forEach((act) => this.getSprite(characterId, act));
  }
}

export const characterSpriteManager = new CharacterSpriteManager();

// Target exact 700ms (0.7s) duration for 1 complete idle animation loop
const IDLE_CYCLE_DURATION_SEC = 0.70;

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
  size: number = 140
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

  let frameIndex = 0;

  if (action === 'idle') {
    const loopProgress = (animProgress / IDLE_CYCLE_DURATION_SEC) % 1.0;
    frameIndex = Math.floor(loopProgress * totalFrames) % totalFrames;
  } else {
    frameIndex = Math.floor(animProgress) % totalFrames;
  }

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

  const drawW = size;
  const drawH = size;
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
  targetHeight: number = 135 // Pixel height of character on screen
) {
  const spriteItem = characterSpriteManager.getSprite(characterId, 'idle');
  if (!spriteItem || !spriteItem.isLoaded || !spriteItem.img.naturalWidth) {
    return;
  }

  const img = spriteItem.img;
  const frameSize = img.naturalHeight || 128;
  const totalFrames = spriteItem.totalFrames || Math.max(1, Math.floor(img.naturalWidth / frameSize));

  const loopProgress = (animProgress / IDLE_CYCLE_DURATION_SEC) % 1.0;
  const frameIndex = Math.floor(loopProgress * totalFrames) % totalFrames;
  const srcX = frameIndex * frameSize;

  // Average sprite character height in the 128x128 frame is ~76px
  // Frame scale factor = targetHeight / 76
  const scale = targetHeight / 76;
  const drawSize = frameSize * scale;

  const groundY = canvasHeight - 16;
  const centerX = canvasWidth / 2;

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // Contact shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(centerX, groundY + 2, 24 * scale, 7 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Character sprite positioning
  // In 128x128 frame: feet are at Y = 127, center is at X = 64
  const destX = centerX - (64 * scale);
  const destY = groundY - (127 * scale);

  ctx.drawImage(
    img,
    srcX,
    0,
    frameSize,
    frameSize,
    destX,
    destY,
    drawSize,
    drawSize
  );

  ctx.restore();
}
