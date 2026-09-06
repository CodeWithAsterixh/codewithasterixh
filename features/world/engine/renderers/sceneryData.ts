import { WORLD_BOUNDS } from '../../data/mapLayout';
import { INTERACTIVE_OBJECTS } from '../../data/mapObjects';
import {
  FlatSceneryItem,
  createSeededRandom,
  BUSH_ASSETS,
  WORLD_LAMP_POSTS,
} from './sceneryConstants';

export type { FlatSceneryItem };
export { BUSH_ASSETS, WORLD_LAMP_POSTS };

export const ALL_WORLD_TREES: FlatSceneryItem[] = [];
export const ALL_WORLD_BUSHES: FlatSceneryItem[] = [];
export const BACKGROUND_TREES: FlatSceneryItem[] = [];
export const FOREGROUND_TREES: FlatSceneryItem[] = [];
export const BACKGROUND_BUSHES: FlatSceneryItem[] = [];
export const FOREGROUND_BUSHES: FlatSceneryItem[] = [];

function initTrees() {
  const rng = createSeededRandom(104729);
  for (let x = WORLD_BOUNDS.minX + 80; x <= WORLD_BOUNDS.maxX - 80; x += 190) {
    const jx = Math.round(x + (rng() - 0.5) * 100);
    const isHouse = jx >= -680 && jx <= 520;
    const isNearObj = INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 170);
    const isNearLamp = WORLD_LAMP_POSTS.some((lp) => Math.abs(jx - lp.x) < 55);
    if (isNearLamp && !isHouse) continue;

    if (isHouse) {
      if (rng() > 0.4) {
        const t = { x: jx, src: '/locations/world/tree1.png', size: Math.round(410 + rng() * 60), yOffset: Math.round(18 + rng() * 14) };
        ALL_WORLD_TREES.push(t);
        BACKGROUND_TREES.push(t);
      }
    } else if (isNearObj) {
      if (!INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 100)) {
        const t = { x: jx, src: '/locations/world/tree1.png', size: 360, yOffset: 12 };
        ALL_WORLD_TREES.push(t);
        BACKGROUND_TREES.push(t);
      }
    } else {
      const t = {
        x: jx,
        src: '/locations/world/tree1.png',
        size: Math.round(360 + rng() * 120),
        yOffset: Math.round(8 + rng() * 16),
      };
      ALL_WORLD_TREES.push(t);
      BACKGROUND_TREES.push(t);
    }
  }
}

function initBushes() {
  const houseBushes = [
    { x: -540, src: '/locations/world/Bush3_3.png', size: 90, yOffset: 62 },
    { x: -380, src: '/locations/world/Bush3_1.png', size: 85, yOffset: 64 },
    { x: -280, src: '/locations/world/Bush3_2.png', size: 95, yOffset: 62 },
    { x: -120, src: '/locations/world/Bush3_3.png', size: 80, yOffset: 64 },
    { x: 120, src: '/locations/world/Bush3_4.png', size: 80, yOffset: 64 },
    { x: 270, src: '/locations/world/Bush3_1.png', size: 90, yOffset: 62 },
    { x: 440, src: '/locations/world/Bush3_2.png', size: 80, yOffset: 64 },
  ];
  houseBushes.forEach((b) => { ALL_WORLD_BUSHES.push(b); FOREGROUND_BUSHES.push(b); });

  INTERACTIVE_OBJECTS.forEach((obj, idx) => {
    const l = { x: obj.x - 72, src: idx % 2 === 0 ? '/locations/world/Bush3_3.png' : '/locations/world/Bush3_4.png', size: 55, yOffset: (obj.yOffset || 0) + 67 };
    const r = { x: obj.x + 75, src: idx % 2 === 0 ? '/locations/world/Bush3_4.png' : '/locations/world/Bush3_1.png', size: 58, yOffset: (obj.yOffset || 0) + 67 };
    ALL_WORLD_BUSHES.push(l, r);
    BACKGROUND_BUSHES.push(l, r);
  });

  const rng = createSeededRandom(7919);
  for (let x = WORLD_BOUNDS.minX + 50; x <= WORLD_BOUNDS.maxX - 50; x += 120) {
    const jx = Math.round(x + (rng() - 0.5) * 60);
    if (jx >= -680 && jx <= 520) continue;
    if (INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 75)) continue;
    if (ALL_WORLD_TREES.some((t) => Math.abs(jx - t.x) < 45)) continue;
    if (WORLD_LAMP_POSTS.some((lp) => Math.abs(jx - lp.x) < 35)) continue;

    const isForeground = rng() > 0.65;
    const b = {
      x: jx,
      src: BUSH_ASSETS[Math.floor(rng() * BUSH_ASSETS.length)],
      size: Math.round(55 + rng() * 40),
      yOffset: isForeground ? Math.round(112 + rng() * 8) : Math.round(8 + rng() * 16),
    };
    ALL_WORLD_BUSHES.push(b);
    (isForeground ? FOREGROUND_BUSHES : BACKGROUND_BUSHES).push(b);
  }
}

if (ALL_WORLD_TREES.length === 0) {
  initTrees();
  initBushes();
}
