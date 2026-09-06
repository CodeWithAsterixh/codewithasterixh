import type p5 from 'p5';
import { MapLocationEntry } from '../../data/mapLayout';
import { InteractiveWorldObject } from '../../data/mapObjects';
import { renderLandmarkPrompt } from './landmarkPrompt';

export function drawSingleInteractiveObject(
  p: p5,
  obj: InteractiveWorldObject,
  playerX: number,
  windTimer: number,
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
  const img = getTexture(obj.image);
  const objSize = obj.size || 140;
  const isPlayerNearby = Math.abs(playerX - obj.x) <= 110;
  const hoverBob = Math.sin(windTimer * 0.08 + obj.x * 0.01) * 3;
  const baseY = 68 + (obj.yOffset || 0);

  p.push();
  p.noStroke();
  p.fill(0, 0, 0, 75);
  p.ellipse(obj.x, baseY + 2, objSize * 0.65, 18);

  p.noFill();
  p.stroke(obj.glowColor || '#00e599');
  p.strokeWeight(1.8);
  p.ellipse(obj.x, baseY, objSize * 0.75, 22);

  if (img.complete && img.naturalWidth > 0) {
    const destX = obj.x - objSize / 2;
    const destY = baseY - objSize * 0.88 + hoverBob;
    ctx.drawImage(img, destX, destY, objSize, objSize);
  }

  if (isPlayerNearby) {
    renderLandmarkPrompt(p, obj.x, baseY - objSize - 20, `[ E ] ${obj.actionLabel}`);
  }
  p.pop();
}

export function drawSingleStationKiosk(p: p5, loc: MapLocationEntry, playerX: number) {
  const proximityRadius = 140;
  const isPlayerNearby = Math.abs(playerX - loc.x) <= proximityRadius;
  const color = '#00e599';
  const pulse = Math.sin((p as any).frameCount * 0.08) * 3;
  const baseY = 68;

  p.push();
  p.noFill();
  p.stroke(color);
  p.strokeWeight(2);
  p.ellipse(loc.x, baseY - 4, 48 + pulse, 16 + pulse * 0.5);

  p.stroke('rgba(0, 229, 153, 0.4)');
  p.strokeWeight(2);
  p.line(loc.x, baseY - 4, loc.x, baseY - 80);

  p.push();
  p.translate(loc.x, baseY - 80);
  p.rotate((p as any).frameCount * 0.04);
  p.fill(color);
  p.noStroke();
  p.rectMode(p.CENTER);
  p.rect(0, 0, 14, 14);
  p.pop();

  if (isPlayerNearby) {
    renderLandmarkPrompt(p, loc.x, baseY - 120, `[ E ] ${loc.actionLabel || 'Inspect Station'}`);
  }
  p.pop();
}
