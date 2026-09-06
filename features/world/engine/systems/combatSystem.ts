import type p5 from 'p5';
import { CombatParticle, FloatingCombatText } from './combatTypes';
import { renderCombatParticles, renderFloatingTexts, renderOffscreenIndicator } from './combatRenderers';

export type { CombatParticle, FloatingCombatText };

export class CombatSystem {
  public combatParticles: CombatParticle[] = [];
  public floatingCombatTexts: FloatingCombatText[] = [];

  spawnCombatParticles(x: number, y: number, color: string, count: number = 8) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      this.combatParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        life: 0,
        maxLife: Math.floor(Math.random() * 14 + 10),
        color,
        size: Math.random() * 4 + 2,
      });
    }
  }

  spawnFloatingText(x: number, y: number, text: string, color: string = '#FFD700') {
    this.floatingCombatTexts.push({
      x,
      y,
      vy: -1.4,
      text,
      color,
      life: 0,
      maxLife: 38,
    });
  }

  renderCombatParticlesAndTexts(p: p5) {
    renderCombatParticles(p, this.combatParticles);
    renderFloatingTexts(p, this.floatingCombatTexts);
  }

  renderOffscreenEnemyIndicator(
    p: p5,
    isCombatActive: boolean,
    activeEnemy: { x: number; state: string } | null,
    playerX: number,
    zoom: number,
    camX: number
  ) {
    renderOffscreenIndicator(p, isCombatActive, activeEnemy, playerX, zoom, camX);
  }
}
