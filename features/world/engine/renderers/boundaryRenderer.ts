import type p5 from 'p5';
import { WORLD_BOUNDS } from '../../data/mapLayout';

export function renderMapBoundaries(p: p5) {
  renderSingleBoundary(p, WORLD_BOUNDS.minX, 'MAP START • WESTERN BOUNDARY', true);
  renderSingleBoundary(p, WORLD_BOUNDS.maxX, 'MAP END • EASTERN BOUNDARY', false);
}

function renderSingleBoundary(p: p5, barrierX: number, label: string, isLeft: boolean) {
  p.push();
  const barrierHeight = 520;
  p.stroke(91, 155, 243, 220);
  p.strokeWeight(3);
  p.line(barrierX, -barrierHeight + 80, barrierX, 40);

  p.stroke(91, 155, 243, 45);
  p.strokeWeight(1.5);
  const fieldWidth = 160;
  const step = 25;

  for (let y = 40; y >= -barrierHeight + 80; y -= step) {
    const xOffset = isLeft ? -fieldWidth : fieldWidth;
    p.line(barrierX, y, barrierX + xOffset, y - 25);
  }

  p.fill('#0F0F0F');
  p.stroke(234, 219, 204);
  p.strokeWeight(2);
  p.rectMode(p.CENTER);
  const badgeX = barrierX + (isLeft ? -100 : 100);
  p.rect(badgeX, -barrierHeight / 2, 190, 32, 8);

  p.noStroke();
  p.fill('#EADBCC');
  (p as any).textFont('Pixelify Sans');
  p.textSize(10);
  p.text(label, badgeX, -barrierHeight / 2);
  p.pop();
}
