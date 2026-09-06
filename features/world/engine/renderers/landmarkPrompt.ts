import type p5 from 'p5';

export function renderLandmarkPrompt(p: p5, x: number, y: number, text: string) {
  p.push();
  (p as any).textFont('Pixelify Sans');
  p.textSize(12);
  const textW = (p as any).textWidth(text);
  const padX = 24;
  const boxW = Math.max(130, Math.round(textW + padX));
  const boxH = 28;

  p.noStroke();
  p.fill(0, 0, 0, 90);
  p.rectMode(p.CENTER);
  p.rect(x, y + 2, boxW, boxH, 6);

  p.fill('#0F141F');
  p.stroke('#EADBCC');
  p.strokeWeight(1.5);
  p.rect(x, y, boxW, boxH, 6);

  p.noStroke();
  p.fill('#EADBCC');
  p.textAlign(p.CENTER, p.CENTER);
  p.text(text, x, y);
  p.pop();
}
