export interface FlatSceneryItem {
  x: number;
  src: string;
  size: number;
  yOffset: number;
}

export function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function nextFloat(): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const BUSH_ASSETS = [
  '/locations/world/Bush3_1.png', '/locations/world/Bush3_2.png',
  '/locations/world/Bush3_3.png', '/locations/world/Bush3_4.png',
  '/locations/world/Bush4_1.png', '/locations/world/Bush4_2.png',
  '/locations/world/Bush4_3.png', '/locations/world/Bush4_4.png',
];

export const WORLD_LAMP_POSTS: Array<{ x: number; yOffset: number }> = [
  { x: -4700, yOffset: 46 }, { x: -4350, yOffset: 42 }, { x: -4000, yOffset: 48 },
  { x: -3650, yOffset: 44 }, { x: -3300, yOffset: 46 }, { x: -2950, yOffset: 42 },
  { x: -2600, yOffset: 48 }, { x: -2250, yOffset: 44 }, { x: -1900, yOffset: 46 },
  { x: -1550, yOffset: 42 }, { x: -1200, yOffset: 46 }, { x: -950, yOffset: 44 },
  { x: -800, yOffset: 52 }, { x: -200, yOffset: 56 }, { x: 350, yOffset: 56 },
  { x: 650, yOffset: 46 }, { x: 950, yOffset: 42 }, { x: 1300, yOffset: 46 },
  { x: 1650, yOffset: 44 }, { x: 1950, yOffset: 48 }, { x: 2300, yOffset: 44 },
  { x: 2650, yOffset: 46 }, { x: 3000, yOffset: 42 }, { x: 3350, yOffset: 48 },
  { x: 3700, yOffset: 44 }, { x: 4050, yOffset: 46 }, { x: 4400, yOffset: 42 },
  { x: 4750, yOffset: 46 },
];
