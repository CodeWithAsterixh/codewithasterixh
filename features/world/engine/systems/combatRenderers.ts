import type p5 from 'p5';
import { CombatParticle, FloatingCombatText } from './combatTypes';

export function renderCombatParticles(p: p5, particles: CombatParticle[]): CombatParticle[] {
  let pWrite = 0;
  for (let i = 0; i < particles.length; i++) {
    const cp = particles[i];
    cp.x += cp.vx;
    cp.y += cp.vy;
    cp.vy += 0.12;
    cp.life++;

    if (cp.life < cp.maxLife) {
      particles[pWrite++] = cp;
      p.noStroke();
      p.fill(cp.color);
      p.ellipse(cp.x, cp.y, cp.size, cp.size);
    }
  }
  particles.length = pWrite;
  return particles;
}

export function renderFloatingTexts(p: p5, texts: FloatingCombatText[]): FloatingCombatText[] {
  let tWrite = 0;
  for (let i = 0; i < texts.length; i++) {
    const ft = texts[i];
    ft.y += ft.vy;
    ft.life++;

    if (ft.life < ft.maxLife) {
      texts[tWrite++] = ft;
      const alpha = 1 - ft.life / ft.maxLife;

      p.push();
      p.textAlign(p.CENTER, p.CENTER);
      (p as any).textFont('Pixelify Sans');
      p.textSize(13);
      p.stroke(0, 0, 0, alpha * 255);
      p.strokeWeight(3);
      p.fill(ft.color);
      p.text(ft.text, ft.x, ft.y);
      p.pop();
    }
  }
  texts.length = tWrite;
  return texts;
}

export function renderOffscreenIndicator(
  p: p5,
  isCombatActive: boolean,
  activeEnemy: { x: number; state: string } | null,
  playerX: number,
  zoom: number,
  camX: number
) {
  if (!isCombatActive || !activeEnemy || activeEnemy.state === 'dead') return;

  const screenW = p.width;
  const screenH = p.height;
  const enemyScreenX = activeEnemy.x * zoom + camX;

  if (enemyScreenX < 40 || enemyScreenX > screenW - 40) {
    const isLeft = enemyScreenX < 40;
    const indX = isLeft ? 35 : screenW - 35;
    const indY = screenH / 2;
    const distMeters = Math.round(Math.abs(activeEnemy.x - playerX));

    p.push();
    p.fill('#0F0F0F');
    p.stroke('#FF4B4B');
    p.strokeWeight(1.5);
    p.rectMode(p.CENTER);
    p.rect(indX, indY, 50, 24, 6);

    p.noStroke();
    p.fill('#FF4B4B');
    (p as any).textFont('Pixelify Sans');
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isLeft ? `◀ ${distMeters}m` : `${distMeters}m ▶`, indX, indY);
    p.pop();
  }
}
