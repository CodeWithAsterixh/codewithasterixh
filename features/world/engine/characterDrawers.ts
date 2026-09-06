import { CharacterId, CharacterAction } from '../types';
import { characterSpriteManager } from './CharacterSpriteManager';

const IDLE_CYCLE_DURATION_SEC = 0.70;

export function getUniformFrameIndex(action: string, animProgress: number, totalFrames: number): number {
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

export const CHARACTER_VISUAL_SCALE: Record<CharacterId, number> = {
  Fighter: 140,
  Samurai: 140,
  Shinobi: 144,
  Xavier: 148,
  Countess_claire: 160,
  bridget: 160,
};

export function drawCharacterFrame(
  ctx: CanvasRenderingContext2D,
  characterId: CharacterId,
  action: CharacterAction,
  x: number,
  y: number,
  facing: 'left' | 'right',
  animProgress: number,
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
  if (facing === 'left') ctx.scale(-1, 1);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawSize = size ?? CHARACTER_VISUAL_SCALE[characterId] ?? 140;
  const destX = -drawSize / 2;
  const destY = -drawSize + 12;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, srcX, 0, frameWidth, frameHeight, destX, destY, drawSize, drawSize);
  ctx.restore();
}

export function drawCharacterPortrait(
  ctx: CanvasRenderingContext2D,
  characterId: CharacterId,
  canvasWidth: number,
  canvasHeight: number,
  animProgress: number,
  targetHeight: number = 135
) {
  const spriteItem = characterSpriteManager.getSprite(characterId, 'idle');
  if (!spriteItem || !spriteItem.isLoaded || !spriteItem.img.naturalWidth) return;

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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.ellipse(centerX, groundY + 2, 24 * scale, 7 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  const destX = centerX - (64 * scale);
  const destY = groundY - (127 * scale);
  ctx.drawImage(img, srcX, 0, frameWidth, frameHeight, destX, destY, drawSize, drawSize);
  ctx.restore();
}
