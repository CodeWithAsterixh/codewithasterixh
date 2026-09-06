import { NinjaType } from '../types';
import { characterSpriteManager } from './CharacterSpriteManager';
import { getUniformFrameIndex } from './characterDrawers';

export const NINJA_VISUAL_SCALE: Record<NinjaType, number> = {
  Kunoichi: 175,
  Ninja_Monk: 120,
  Ninja_Peasant: 125,
};

export function drawNinjaFrame(
  ctx: CanvasRenderingContext2D,
  type: NinjaType,
  action: string,
  x: number,
  y: number,
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
  if (facing === 'left') ctx.scale(-1, 1);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const drawSize = size ?? NINJA_VISUAL_SCALE[type] ?? 140;
  const destX = -drawSize / 2;
  const destY = -drawSize + 12;

  if (isHurt) ctx.filter = 'brightness(2.2) saturate(0.4)';

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, srcX, 0, frameWidth, frameHeight, destX, destY, drawSize, drawSize);
  ctx.restore();
}
