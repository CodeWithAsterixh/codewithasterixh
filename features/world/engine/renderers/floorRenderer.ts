import type p5 from 'p5';
import { DEFAULT_ATMOSPHERE } from '../../data/mapLayout';

export function renderMapSceneryAndFloor(
  p: p5,
  viewLeft: number,
  viewRight: number,
  viewBottom: number,
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;

  const groundImg = getTexture(DEFAULT_ATMOSPHERE.floor?.image || '/locations/world/ground.png');
  if (!groundImg.complete || groundImg.naturalWidth === 0) return;

  const targetH = DEFAULT_ATMOSPHERE.floor?.height || 520;
  const aspect = 576 / 324;
  const layerW = targetH * aspect;
  const groundSurfaceRatio = 265 / 324;
  const drawY = 0 - targetH * groundSurfaceRatio;

  // Solid Meadow Underlay to prevent any transparent canvas seams
  p.push();
  p.noStroke();
  p.fill('#426829');
  p.rect(viewLeft - 600, drawY + targetH - 120, (viewRight - viewLeft) + 1200, viewBottom + 800);
  p.pop();

  let layerX = Math.floor((viewLeft - 400) / layerW) * layerW;
  const maxRight = viewRight + 400;

  while (layerX < maxRight) {
    ctx.drawImage(groundImg, layerX, drawY, layerW + 1, targetH + 1);

    let tileY = drawY + targetH - 12;
    const subSliceH = 110;
    while (tileY < viewBottom + 500) {
      ctx.drawImage(groundImg, 0, 274, 576, 50, layerX, tileY, layerW + 1, subSliceH + 2);
      tileY += subSliceH;
    }

    layerX += layerW - 1;
  }
}
