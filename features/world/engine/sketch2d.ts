import type p5 from 'p5';
import { Gender, CharacterId, CharacterAction, LocationCategory, NinjaType, ControlMode } from '../types';
import { DEFAULT_GENDER, DEFAULT_CHARACTER, CHARACTER_DEFS, NINJA_DEFS, NINJA_TYPES } from '../data/characterData';
import {
  WORLD_BOUNDS,
  WORLD_LOCATIONS,
  DEFAULT_ATMOSPHERE,
  WORLD_DECORATIONS,
  MapLocationEntry,
  getActiveMapLocation,
  getNearbyStationKiosk,
} from '../data/mapLayout';
import { INTERACTIVE_OBJECTS, getNearbyWorldObject, InteractiveWorldObject } from '../data/mapObjects';
import { drawCharacterFrame, drawNinjaFrame, characterSpriteManager } from './characterAnimator';
import { PhysicsBody2D, PhysicsDustParticle, DEFAULT_WORLD_PHYSICS } from './physicsEngine';

export interface PhysicsTelemetry {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  isMoving: boolean;
  action: CharacterAction;
  facing: 'left' | 'right';
  cameraFollows: boolean;
  controlMode: ControlMode;
}


export interface CurrentBiomeInfo {
  id: string;
  category: LocationCategory;
  name: string;
  tag: string;
  featureType: string;
  featureTitle: string;
  description: string;
  x: number;
  actionLabel?: string;
  isNearbyKiosk: boolean;
  nearbyObject?: InteractiveWorldObject | null;
}

export interface Sketch2DCallbacks {
  onPlayerPositionChange?: (x: number, y: number) => void;
  onPlayerHealthChange?: (hp: number, maxHp: number) => void;
  onRespawnCountdownChange?: (seconds: number | null) => void;
  onCharacterStateChange?: (gender: Gender, characterId: CharacterId, action: CharacterAction) => void;
  onPhysicsTelemetryChange?: (telemetry: PhysicsTelemetry) => void;
  onBiomeChange?: (biome: CurrentBiomeInfo) => void;
  onInspectStation?: (location: MapLocationEntry) => void;
  onInspectObject?: (object: InteractiveWorldObject) => void;
}

const textureCache = new Map<string, HTMLImageElement>();
function getTexture(src: string): HTMLImageElement {
  if (textureCache.has(src)) {
    return textureCache.get(src)!;
  }
  const img = new Image();
  // Route all world asset images through our image-proxy API to reduce asset quality & graphics memory load
  const proxiedUrl = (src.startsWith('/') || src.startsWith('http'))
    ? `/api/image-proxy?url=${encodeURIComponent(src)}&q=35&w=480`
    : src;
  img.src = proxiedUrl;
  textureCache.set(src, img);
  return img;
}



interface FlatSceneryItem {
  x: number;
  src: string;
  size: number;
  yOffset: number;
}

const ALL_WORLD_TREES: FlatSceneryItem[] = [];
const ALL_WORLD_BUSHES: FlatSceneryItem[] = [];
const BACKGROUND_TREES: FlatSceneryItem[] = [];
const FOREGROUND_TREES: FlatSceneryItem[] = [];
const BACKGROUND_BUSHES: FlatSceneryItem[] = [];
const FOREGROUND_BUSHES: FlatSceneryItem[] = [];

// Deterministic 32-bit Seeded PRNG (Mulberry32) for unique, consistent plant distribution
function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function nextFloat(): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUSH_ASSETS = [
  '/locations/world/Bush3_1.png',
  '/locations/world/Bush3_2.png',
  '/locations/world/Bush3_3.png',
  '/locations/world/Bush3_4.png',
  '/locations/world/Bush4_1.png',
  '/locations/world/Bush4_2.png',
  '/locations/world/Bush4_3.png',
  '/locations/world/Bush4_4.png',
];

// Street Lamp Posts across the world (providing ambient lighting in dark mode)
const WORLD_LAMP_POSTS: Array<{ x: number; yOffset: number }> = [
  // Western World Region
  { x: -4700, yOffset: 46 },
  { x: -4350, yOffset: 42 },
  { x: -4000, yOffset: 48 }, // Near Skills Station
  { x: -3650, yOffset: 44 },
  { x: -3300, yOffset: 46 },
  { x: -2950, yOffset: 42 },
  { x: -2600, yOffset: 48 }, // Near Quizeen
  { x: -2250, yOffset: 44 },
  { x: -1900, yOffset: 46 }, // Near Projects Station
  { x: -1550, yOffset: 42 }, // Near WorkUp
  { x: -1200, yOffset: 46 },
  { x: -950, yOffset: 44 },  // Near AnonFly

  // House Complex (3 dedicated lamps: 1 beside garage, 2 beside house left & right)
  { x: -800, yOffset: 70 }, // 1. Beside garage on the left
  { x: -200, yOffset: 70 }, // 2. Beside house on the left (between garage and porch)
  { x: 350, yOffset: 72 },  // 3. Beside house on the right (by mailbox)

  // Eastern World Region
  { x: 650, yOffset: 46 },
  { x: 950, yOffset: 42 },  // Near WorldTimeSage
  { x: 1300, yOffset: 46 },
  { x: 1650, yOffset: 44 },
  { x: 1950, yOffset: 48 }, // Near School Portal
  { x: 2300, yOffset: 44 },
  { x: 2650, yOffset: 46 },
  { x: 3000, yOffset: 42 },
  { x: 3350, yOffset: 48 }, // Near AsterMail
  { x: 3700, yOffset: 44 },
  { x: 4050, yOffset: 46 },
  { x: 4400, yOffset: 42 },
  { x: 4750, yOffset: 46 },
];

// 1. Procedural Tree Distribution across entire map (from WEST to EAST boundary)
const treeRng = createSeededRandom(104729);
for (let x = WORLD_BOUNDS.minX + 80; x <= WORLD_BOUNDS.maxX - 80; x += 190) {
  const jx = Math.round(x + (treeRng() - 0.5) * 100);
  const isHouseZone = jx >= -680 && jx <= 520;
  const isNearInteractive = INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 170);
  const isNearLamp = WORLD_LAMP_POSTS.some((lp) => Math.abs(jx - lp.x) < 55);

  if (isNearLamp && !isHouseZone) {
    continue;
  }

  if (isHouseZone) {
    // Only spawn trees BEHIND the house and garage (firmly rooted on meadow ground behind the building)
    if (treeRng() > 0.40) {
      const backTree: FlatSceneryItem = {
        x: jx,
        src: '/locations/world/tree1.png',
        size: Math.round(410 + treeRng() * 60),
        yOffset: Math.round(18 + treeRng() * 14), // Roots grounded at y = 18-32 behind the house
      };
      ALL_WORLD_TREES.push(backTree);
      BACKGROUND_TREES.push(backTree);
    }
  } else if (isNearInteractive) {
    // Keep clear open space right around interactive landmark objects
    if (!INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 100)) {
      const backTree: FlatSceneryItem = {
        x: jx,
        src: '/locations/world/tree1.png',
        size: 360,
        yOffset: 12,
      };
      ALL_WORLD_TREES.push(backTree);
      BACKGROUND_TREES.push(backTree);
    }
  } else {
    const isFront = treeRng() > 0.58;
    const treeSize = Math.round(360 + treeRng() * 140);
    const treeYOffset = isFront
      ? Math.round(55 + treeRng() * 25)
      : Math.round(8 + treeRng() * 16);

    const treeItem: FlatSceneryItem = {
      x: jx,
      src: '/locations/world/tree1.png',
      size: treeSize,
      yOffset: treeYOffset,
    };
    ALL_WORLD_TREES.push(treeItem);
    if (isFront) {
      FOREGROUND_TREES.push(treeItem);
    } else {
      BACKGROUND_TREES.push(treeItem);
    }
  }
}

// 2. Front-Yard Landscaped Bushes for House, Garage, and Mailbox
const HOUSE_FRONT_BUSHES = [
  { x: -540, src: '/locations/world/Bush3_3.png', size: 90, yOffset: 74 },
  { x: -380, src: '/locations/world/Bush3_1.png', size: 85, yOffset: 72 },
  { x: -280, src: '/locations/world/Bush3_2.png', size: 95, yOffset: 74 },
  { x: -120, src: '/locations/world/Bush3_3.png', size: 80, yOffset: 72 },
  { x: 120, src: '/locations/world/Bush3_4.png', size: 80, yOffset: 72 },
  { x: 270, src: '/locations/world/Bush3_1.png', size: 90, yOffset: 74 },
  { x: 440, src: '/locations/world/Bush3_2.png', size: 80, yOffset: 72 },
];
HOUSE_FRONT_BUSHES.forEach((b) => {
  ALL_WORLD_BUSHES.push(b);
  FOREGROUND_BUSHES.push(b);
});

// 3. Small Flanking Accent Bushes for Interactive Landmark Objects
INTERACTIVE_OBJECTS.forEach((obj, idx) => {
  const leftBush: FlatSceneryItem = {
    x: obj.x - 72,
    src: idx % 2 === 0 ? '/locations/world/Bush3_3.png' : '/locations/world/Bush3_4.png',
    size: 55,
    yOffset: (obj.yOffset || 0) + 16,
  };
  const rightBush: FlatSceneryItem = {
    x: obj.x + 75,
    src: idx % 2 === 0 ? '/locations/world/Bush3_4.png' : '/locations/world/Bush3_1.png',
    size: 58,
    yOffset: (obj.yOffset || 0) + 18,
  };
  ALL_WORLD_BUSHES.push(leftBush, rightBush);
  FOREGROUND_BUSHES.push(leftBush, rightBush);
});

// 4. Procedural Bush Scatter across entire world (from WEST to EAST boundary)
const bushRng = createSeededRandom(7919);
for (let x = WORLD_BOUNDS.minX + 50; x <= WORLD_BOUNDS.maxX - 50; x += 120) {
  const jx = Math.round(x + (bushRng() - 0.5) * 60);
  const isHouseZone = jx >= -680 && jx <= 520;
  const isNearInteractive = INTERACTIVE_OBJECTS.some((obj) => Math.abs(jx - obj.x) < 75);
  const isNearTreeTrunk = ALL_WORLD_TREES.some((t) => Math.abs(jx - t.x) < 45);
  const isNearLamp = WORLD_LAMP_POSTS.some((lp) => Math.abs(jx - lp.x) < 35);

  if (isHouseZone || isNearInteractive || isNearTreeTrunk || isNearLamp) {
    continue;
  }

  const assetIdx = Math.floor(bushRng() * BUSH_ASSETS.length);
  const isFront = bushRng() > 0.42;
  const bushSize = Math.round(65 + bushRng() * 50);
  const bushYOffset = isFront
    ? Math.round(45 + bushRng() * 25)
    : Math.round(8 + bushRng() * 16);

  const bushItem: FlatSceneryItem = {
    x: jx,
    src: BUSH_ASSETS[assetIdx],
    size: bushSize,
    yOffset: bushYOffset,
  };
  ALL_WORLD_BUSHES.push(bushItem);
  if (isFront) {
    FOREGROUND_BUSHES.push(bushItem);
  } else {
    BACKGROUND_BUSHES.push(bushItem);
  }
}

export function create2DSideViewSketch(callbacks?: Sketch2DCallbacks) {
  return (p: p5) => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    let playerGender: Gender = DEFAULT_GENDER;

    let playerCharacter: CharacterId = DEFAULT_CHARACTER;
    let playerAction: CharacterAction = 'idle';
    let attackTimer = 0;

    let currentThemeMode: 'light' | 'dark' = 'light';
    let activeMoonSrc = '/locations/world/beige_moon.png';
    let isCombatActive = false;
    let controlMode: ControlMode = 'arrow';


    let playerHp = 100;
    const maxPlayerHp = 100;
    let lastPlayerDamageTime = 0;
    let playerRespawnCountdown = 0;
    let playerDeadPhase = 0;

    interface EnemyNinjaState {
      id: string;
      type: NinjaType;
      x: number;
      y: number;
      vx: number;
      vy: number;
      facing: 'left' | 'right';
      action: 'idle' | 'walk' | 'run' | 'jump' | 'attack' | 'hurt' | 'dead';
      walkPhase: number;
      attackPhase: number;
      hurtPhase: number;
      deadPhase: number;
      hasHitPlayer: boolean;
      animTimer: number;
      hp: number;
      maxHp: number;
      state: 'approach' | 'attack' | 'retreat' | 'hurt' | 'dead';
      stateTimer: number;
      attackCooldown: number;
      hurtTimer: number;
      deadTimer: number;
    }

    let activeEnemy: EnemyNinjaState | null = null;
    let lastEnemySpawnTime = 0;

    interface CombatParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }

    interface FloatingCombatText {
      x: number;
      y: number;
      vy: number;
      text: string;
      color: string;
      life: number;
      maxLife: number;
    }

    const combatParticles: CombatParticle[] = [];
    const floatingCombatTexts: FloatingCombatText[] = [];

    function spawnCombatParticles(x: number, y: number, color: string, count: number = 8) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        combatParticles.push({
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

    function spawnFloatingText(x: number, y: number, text: string, color: string = '#FFD700') {
      floatingCombatTexts.push({
        x,
        y,
        vy: -1.4,
        text,
        color,
        life: 0,
        maxLife: 38,
      });
    }

    function checkPlayerAttackHit(attackType: string = 'attack1') {
      if (!isCombatActive || !activeEnemy || activeEnemy.state === 'dead') {
        return;
      }

      const enemy = activeEnemy;
      const distX = enemy.x - playerBody.x;
      const distY = Math.abs(enemy.y - playerBody.y);

      const isFacingEnemy =
        (playerBody.facing === 'right' && distX >= -15 && distX <= 95) ||
        (playerBody.facing === 'left' && distX <= 15 && distX >= -95);

      if (isFacingEnemy && distY <= 40) {
        let baseDamage = 35;
        let knockback = 5.5;
        let particleColor = '#FFD700';

        if (attackType === 'attack2') {
          baseDamage = 40;
          knockback = 6.2;
          particleColor = '#60A5FA';
        } else if (attackType === 'attack3') {
          baseDamage = 45;
          knockback = 7.0;
          particleColor = '#A855F7';
        } else if (attackType === 'attack4') {
          baseDamage = 52;
          knockback = 8.0;
          particleColor = '#EF4444';
        }

        const damage = Math.floor(Math.random() * 8 + baseDamage);
        enemy.hp -= damage;
        const pushDir = playerBody.facing === 'right' ? 1 : -1;
        enemy.vx = pushDir * knockback;

        spawnCombatParticles(enemy.x, GROUND_Y + enemy.y - 30, particleColor, 12);
        spawnFloatingText(enemy.x, GROUND_Y + enemy.y - 80, `-${damage}`, particleColor);

        if (enemy.hp <= 0) {
          enemy.hp = 0;
          enemy.state = 'dead';
          enemy.action = 'dead';
          enemy.deadTimer = 0;
          enemy.deadPhase = 0;
          enemy.animTimer = 0;
          spawnCombatParticles(enemy.x, GROUND_Y + enemy.y - 30, '#FF4B4B', 16);
          spawnFloatingText(enemy.x, GROUND_Y + enemy.y - 95, 'DEFEATED!', '#FF3B30');
        } else {
          enemy.state = 'hurt';
          enemy.action = 'hurt';
          enemy.hurtTimer = 0.32;
          enemy.hurtPhase = 0;
          enemy.animTimer = 0;
        }
      }
    }

    function triggerPlayerAttack(attackType: 'attack' | 'attack1' | 'attack2' | 'attack3' | 'attack4' = 'attack1') {
      if (isModalActive || playerRespawnCountdown > 0 || attackTimer > 0) return;
      playerAction = attackType;
      attackTimer = 18;
      attackPhase = 0;
      checkPlayerAttackHit(attackType);
      callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, playerAction);
    }

    function updateEnemyNinja(dt: number) {
      if (isModalActive) return;
      if (!isCombatActive) {
        activeEnemy = null;
        return;
      }

      const now = performance.now();

      // Only 1 enemy spawned at a time.
      // A new one will not spawn until 10 secs after the old one was spawned.
      if (!activeEnemy) {
        if (now - lastEnemySpawnTime >= 10000) {
          const side = Math.random() < 0.5 ? -1 : 1;
          const dist = 100 + Math.random() * 400; // random between 100 and 500
          const rawX = playerBody.x + side * dist;
          const spawnX = p.constrain(rawX, WORLD_BOUNDS.minX + 200, WORLD_BOUNDS.maxX - 200);
          const spawnY = p.constrain(playerBody.y + (Math.random() * 30 - 15), 25, 95);
          const ninjaType = NINJA_TYPES[Math.floor(Math.random() * NINJA_TYPES.length)];

          activeEnemy = {
            id: `ninja_${Date.now()}`,
            type: ninjaType,
            x: spawnX,
            y: spawnY,
            vx: 0,
            vy: 0,
            facing: spawnX < playerBody.x ? 'right' : 'left',
            action: 'run',
            walkPhase: 0,
            attackPhase: 0,
            hurtPhase: 0,
            deadPhase: 0,
            hasHitPlayer: false,
            animTimer: 0,
            hp: 100,
            maxHp: 100,
            state: 'approach',
            stateTimer: 0,
            attackCooldown: 1.0,
            hurtTimer: 0,
            deadTimer: 0,
          };
          lastEnemySpawnTime = now;
          characterSpriteManager.preloadNinja(ninjaType);
          spawnFloatingText(spawnX, GROUND_Y + spawnY - 80, '⚠️ ENEMY SPAWNED!', '#FF4B4B');
        }
        return;
      }

      const enemy = activeEnemy;
      enemy.animTimer += dt;
      if (enemy.attackCooldown > 0) enemy.attackCooldown -= dt;

      const distX = playerBody.x - enemy.x;
      const distY = playerBody.y - enemy.y;
      const distSq = distX * distX + distY * distY;

      if (enemy.state === 'dead') {
        enemy.action = 'dead';
        enemy.vx = 0;
        enemy.vy = 0;
        enemy.deadPhase += dt * 5.0;
        enemy.deadTimer += dt;
        if (enemy.deadTimer >= 2.6) {
          activeEnemy = null;
        }
        return;
      }

      if (enemy.state === 'hurt') {
        enemy.action = 'hurt';
        enemy.hurtPhase += dt * 6.0;
        enemy.hurtTimer -= dt;
        enemy.vx *= 0.85;
        enemy.vy *= 0.85;
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        if (Math.abs(enemy.vx) > 0.2) {
          enemy.facing = enemy.vx > 0 ? 'right' : 'left';
        }
        if (enemy.hurtTimer <= 0) {
          enemy.state = 'approach';
        }
        return;
      }

      // If player is currently in death state / 5s countdown, enemy runs towards player's location
      if (playerRespawnCountdown > 0) {
        if (distSq > 1225) { // 35^2
          const dist = Math.sqrt(distSq);
          enemy.state = 'approach';
          enemy.action = 'run';
          const speed = 4.2;
          enemy.vx = (distX / dist) * speed;
          enemy.vy = (distY / dist) * (speed * 0.4);
          if (Math.abs(enemy.vx) > 0.08) {
            enemy.facing = enemy.vx > 0 ? 'right' : 'left';
          }
          enemy.walkPhase += Math.sqrt(enemy.vx * enemy.vx + enemy.vy * enemy.vy) * 0.07;
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;
          enemy.x = p.constrain(enemy.x, WORLD_BOUNDS.minX + 50, WORLD_BOUNDS.maxX - 50);
          enemy.y = p.constrain(enemy.y, 20, 100);
        } else {
          enemy.action = 'idle';
          enemy.facing = distX >= 0 ? 'right' : 'left';
          enemy.vx = 0;
          enemy.vy = 0;
        }
        return;
      }

      if (enemy.state === 'attack') {
        enemy.action = 'attack';
        enemy.attackPhase += 0.45;
        enemy.facing = distX >= 0 ? 'right' : 'left';
        enemy.vx = 0;
        enemy.vy = 0;
        enemy.stateTimer -= dt;

        // Check if attack hits player at mid animation (EXACTLY ONCE per swing)
        if (!enemy.hasHitPlayer && enemy.stateTimer <= 0.40 && enemy.stateTimer > 0.15) {
          if (distSq <= 5625 && Math.abs(distY) <= 35) { // 75^2 = 5625
            enemy.hasHitPlayer = true;
            const pushDir = enemy.facing === 'right' ? 1 : -1;
            playerBody.applyImpulse(pushDir * 280, 0);

            const damage = Math.floor(Math.random() * 5 + 14); // 14-18 damage per hit
            playerHp = Math.max(0, playerHp - damage);
            lastPlayerDamageTime = performance.now();
            callbacks?.onPlayerHealthChange?.(playerHp, maxPlayerHp);

            spawnCombatParticles(playerBody.x, GROUND_Y + playerBody.y - 25, '#FF4B4B', 8);
            spawnFloatingText(playerBody.x, GROUND_Y + playerBody.y - 65, `-${damage}`, '#FF3B30');

            if (playerHp <= 0) {
              // Player defeat: initiate 5s countdown & death animation
              playerHp = 0;
              playerAction = 'dead';
              playerDeadPhase = 0;
              playerRespawnCountdown = 5.0;
              callbacks?.onPlayerHealthChange?.(0, maxPlayerHp);
              callbacks?.onRespawnCountdownChange?.(5);
              callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, 'dead');
              spawnCombatParticles(playerBody.x, GROUND_Y + playerBody.y - 25, '#FF4B4B', 16);
              spawnFloatingText(playerBody.x, GROUND_Y + playerBody.y - 65, 'DEFEATED!', '#FF3B30');
            }
          }
        }

        if (enemy.stateTimer <= 0) {
          enemy.state = 'retreat';
          enemy.stateTimer = 0.8;
          enemy.attackCooldown = 1.8;
          enemy.attackPhase = 0;
          enemy.hasHitPlayer = false;
        }
        return;
      }

      if (enemy.state === 'retreat') {
        enemy.action = 'walk';
        enemy.stateTimer -= dt;
        // Move away from player and face in the exact direction of travel (never moonwalk)
        const retreatDir = distX >= 0 ? -1 : 1;
        enemy.vx = retreatDir * 2.2;
        enemy.vy = 0;
        enemy.facing = enemy.vx > 0 ? 'right' : 'left';
        enemy.walkPhase += Math.sqrt(enemy.vx * enemy.vx + enemy.vy * enemy.vy) * 0.07;
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        if (enemy.stateTimer <= 0) {
          enemy.state = 'approach';
        }
        return;
      }

      if (enemy.state === 'approach') {
        if (distSq > 4225) { // 65^2 = 4225
          const dist = Math.sqrt(distSq);
          const isFar = distSq > 32400; // 180^2 = 32400
          enemy.action = isFar ? 'run' : 'walk';
          const speed = isFar ? 3.8 : 2.2;
          enemy.vx = (distX / dist) * speed;
          enemy.vy = (distY / dist) * (speed * 0.4);
          if (Math.abs(enemy.vx) > 0.08) {
            enemy.facing = enemy.vx > 0 ? 'right' : 'left';
          }
          enemy.walkPhase += Math.sqrt(enemy.vx * enemy.vx + enemy.vy * enemy.vy) * 0.07;
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;

          enemy.x = p.constrain(enemy.x, WORLD_BOUNDS.minX + 50, WORLD_BOUNDS.maxX - 50);
          enemy.y = p.constrain(enemy.y, 20, 100);
        } else {
          if (enemy.attackCooldown <= 0) {
            enemy.state = 'attack';
            enemy.action = 'attack';
            enemy.facing = distX >= 0 ? 'right' : 'left';
            enemy.stateTimer = 0.65;
            enemy.attackPhase = 0;
            enemy.hasHitPlayer = false;
            enemy.vx = 0;
            enemy.vy = 0;
          } else {
            enemy.action = 'idle';
            enemy.facing = distX >= 0 ? 'right' : 'left';
            enemy.vx = 0;
            enemy.vy = 0;
          }
        }
      }

      // Out-of-combat Player Health Regeneration (after 4s without taking damage)
      if (playerHp < maxPlayerHp && performance.now() - lastPlayerDamageTime > 4000) {
        playerHp = Math.min(maxPlayerHp, playerHp + dt * 3.5);
        callbacks?.onPlayerHealthChange?.(Math.round(playerHp), maxPlayerHp);
      }
    }

    function renderEnemyNinja(enemy: EnemyNinjaState) {
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
      const groundY = GROUND_Y + enemy.y;
      const currentTimeSec = (typeof performance !== 'undefined' ? performance.now() : (p as any).millis()) / 1000;

      let enemyProgress = currentTimeSec;
      if (enemy.action === 'walk' || enemy.action === 'run') {
        enemyProgress = enemy.walkPhase;
      } else if (enemy.action === 'attack') {
        enemyProgress = enemy.attackPhase;
      } else if (enemy.action === 'hurt') {
        enemyProgress = enemy.hurtPhase;
      } else if (enemy.action === 'dead') {
        enemyProgress = enemy.deadPhase;
      }

      // Contact shadow
      p.push();
      p.noStroke();
      p.fill(0, 0, 0, currentThemeMode === 'dark' ? 100 : 75);
      p.ellipse(enemy.x, groundY, 40, 10);
      p.pop();

      // Enemy Sprite
      drawNinjaFrame(
        ctx,
        enemy.type,
        enemy.action,
        enemy.x,
        groundY,
        enemy.facing,
        enemyProgress,
        undefined,
        enemy.state === 'hurt'
      );

      // Floating HP Bar & Title Tag (while alive)
      if (enemy.state !== 'dead') {
        const barW = 82;
        const barH = 7;
        const barX = enemy.x;
        const barY = groundY - 105;

        p.push();
        p.rectMode((p as any).CENTER);

        // Background card
        p.fill(10, 13, 20, 220);
        p.stroke('#D5C49B');
        p.strokeWeight(1.2);
        p.rect(barX, barY, barW + 4, barH + 4, 3);

        // Health Fill
        p.noStroke();
        const hpPct = p.constrain(enemy.hp / enemy.maxHp, 0, 1);
        const fillW = barW * hpPct;
        p.fill(255, 75, 75);
        p.rectMode((p as any).CORNER);
        p.rect(barX - barW / 2, barY - barH / 2, fillW, barH, 2);

        // Text Tag
        p.fill('#FFFFFF');
        p.noStroke();
        p.textAlign((p as any).CENTER, (p as any).BOTTOM);
        (p as any).textFont('Pixelify Sans');
        p.textSize(9);
        const ninjaDef = NINJA_DEFS[enemy.type];
        p.text(`⚔️ ${ninjaDef.name}`, barX, barY - 5);
        p.pop();
      }
    }

    function renderCombatParticlesAndTexts() {
      // In-place single-pass compaction for Combat Particles (0 allocations, 0 splice shifts)
      let pWrite = 0;
      for (let i = 0; i < combatParticles.length; i++) {
        const cp = combatParticles[i];
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vy += 0.12;
        cp.life++;

        if (cp.life < cp.maxLife) {
          combatParticles[pWrite++] = cp;
          p.noStroke();
          p.fill(cp.color);
          p.ellipse(cp.x, cp.y, cp.size, cp.size);
        }
      }
      combatParticles.length = pWrite;

      // In-place single-pass compaction for Floating Texts (0 allocations, 0 splice shifts)
      let tWrite = 0;
      for (let i = 0; i < floatingCombatTexts.length; i++) {
        const ft = floatingCombatTexts[i];
        ft.y += ft.vy;
        ft.life++;

        if (ft.life < ft.maxLife) {
          floatingCombatTexts[tWrite++] = ft;
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
      floatingCombatTexts.length = tWrite;
    }

    function renderOffscreenEnemyIndicator() {
      if (!isCombatActive || !activeEnemy || activeEnemy.state === 'dead') return;

      const screenW = p.width;
      const screenH = p.height;
      const enemyScreenX = activeEnemy.x * zoom + camX;

      if (enemyScreenX < 40 || enemyScreenX > screenW - 40) {
        const isLeft = enemyScreenX < 40;
        const indX = isLeft ? 35 : screenW - 35;
        const indY = screenH / 2;
        const distMeters = Math.round(Math.abs(activeEnemy.x - playerBody.x));

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

    let lastReportedLocId = '';
    let lastNearbyState = false;
    let lastNearbyObjectId = '';

    let walkPhase = 0;
    let jumpPhase = 0;
    let attackPhase = 0;

    const initialCharDef = CHARACTER_DEFS[DEFAULT_CHARACTER];
    const playerBody = new PhysicsBody2D(WORLD_BOUNDS.spawnX, WORLD_BOUNDS.spawnY, initialCharDef.physics);
    let jumpOffset = 0;
    let jumpVelocity = 0;

    const dustParticles: PhysicsDustParticle[] = [];

    let camX = 0;
    let camY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    let zoom = 1.0;
    let targetZoom = 1.0;
    const MIN_ZOOM = 0.85;
    const MAX_ZOOM = 1.25;

    const GROUND_Y = 0;

    let windTimer = 0;

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let cameraFollowsPlayer = true;
    let isModalActive = false;

    const keys: Record<string, boolean> = {};

    // Clear stuck keys when browser loses focus
    if (typeof window !== 'undefined') {
      window.addEventListener('blur', () => {
        for (const k in keys) {
          keys[k] = false;
        }
        isDragging = false;
      });
    }

    // Preload world assets exclusively from public/locations/world
    if (typeof window !== 'undefined') {
      characterSpriteManager.preloadCharacter(DEFAULT_CHARACTER);

      if (DEFAULT_ATMOSPHERE.background) getTexture(DEFAULT_ATMOSPHERE.background);
      DEFAULT_ATMOSPHERE.clouds.forEach((c) => getTexture(c.src));
      if (DEFAULT_ATMOSPHERE.floor?.image) getTexture(DEFAULT_ATMOSPHERE.floor.image);

      WORLD_LOCATIONS.forEach((loc) => {
        if (loc.background) getTexture(loc.background);
        loc.clouds?.forEach((c) => getTexture(c.src));
        if (loc.floor?.image) getTexture(loc.floor.image);
        loc.layers?.forEach((layerSrc) => getTexture(layerSrc));
      });

      // Preload Night Mode assets
      getTexture('/locations/world/bg_night.png');
      getTexture('/locations/world/normal_moon.png');
      getTexture('/locations/world/beige_moon.png');
      getTexture('/locations/world/red_moon.png');

      // Preload tree and bush decorations
      WORLD_DECORATIONS.trees.forEach((t) => getTexture(t.src));
      WORLD_DECORATIONS.bushes.forEach((b) => getTexture(b.src));

      // Preload interactive work objects and home base
      INTERACTIVE_OBJECTS.forEach((obj) => getTexture(obj.image));
      getTexture('/objects/home.png');
      getTexture('/objects/garage.png');
      getTexture('/objects/mailbox.png');
      getTexture('/objects/light_on.png');
      getTexture('/objects/light_off.png');
    }

    function spawnDust(x: number, y: number, count: number = 2, maxSpeed: number = 1.5) {
      for (let i = 0; i < count; i++) {
        dustParticles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y - 2 + Math.random() * 2,
          vx: (Math.random() - 0.5) * maxSpeed,
          vy: -Math.random() * 1.8 - 0.2,
          size: Math.random() * 5 + 3,
          alpha: 0.6,
          life: 0,
          maxLife: Math.floor(Math.random() * 15 + 12),
          color: Math.random() > 0.4 ? '#68B35A' : '#3E8335',
        });
      }
    }

    (p as any).setThemeMode = (mode: 'light' | 'dark') => {
      currentThemeMode = mode;
    };

    (p as any).setMoonType = (type: 'beige' | 'normal' | 'red') => {
      if (type === 'normal') activeMoonSrc = '/locations/world/normal_moon.png';
      else if (type === 'red') activeMoonSrc = '/locations/world/red_moon.png';
      else activeMoonSrc = '/locations/world/beige_moon.png';
    };

    (p as any).setCombatActive = (active: boolean) => {
      isCombatActive = active;
      if (!active) {
        activeEnemy = null;
      } else {
        lastEnemySpawnTime = performance.now() - 7000; // spawn shortly after activation
      }
    };

    (p as any).setGender = (gender: Gender) => {
      playerGender = gender;
      playerCharacter = gender === 'male' ? 'Fighter' : 'Countess_claire';
      playerBody.setAttributes(CHARACTER_DEFS[playerCharacter].physics);
      characterSpriteManager.preloadCharacter(playerCharacter);
      callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, playerAction);
    };

    (p as any).setCharacter = (charId: CharacterId) => {
      playerCharacter = charId;
      playerGender = CHARACTER_DEFS[charId]?.gender || 'male';
      playerBody.setAttributes(CHARACTER_DEFS[charId].physics);
      characterSpriteManager.preloadCharacter(playerCharacter);
      callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, playerAction);
    };

    (p as any).teleportTo = (x: number) => {
      const playerCollisionRadius = 40;
      playerBody.x = Math.max(WORLD_BOUNDS.minX + playerCollisionRadius, Math.min(WORLD_BOUNDS.maxX - playerCollisionRadius, x));
      playerBody.vx = 0;
      playerBody.vy = 0;
      targetCamX = p.width / 2 - playerBody.x * zoom;
      const minCamX = p.width - WORLD_BOUNDS.maxX * zoom;
      const maxCamX = -WORLD_BOUNDS.minX * zoom;
      targetCamX = p.constrain(targetCamX, minCamX, maxCamX);
      camX = targetCamX;
      callbacks?.onPlayerPositionChange?.(playerBody.x, playerBody.y);
    };

    (p as any).triggerAction = (action: CharacterAction) => {
      const charPhys = CHARACTER_DEFS[playerCharacter].physics;
      if (
        action === 'attack' ||
        action === 'attack1' ||
        action === 'attack2' ||
        action === 'attack3' ||
        action === 'attack4'
      ) {
        triggerPlayerAttack(action as any);
      } else if (action === 'jump' && playerBody.isGrounded) {
        playerBody.applyImpulse(0, charPhys.jumpImpulse);
        spawnDust(playerBody.x, playerBody.y, 5, 2.5);
        playerAction = 'jump';
      } else {
        playerAction = action;
      }
      callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, playerAction);
    };

    (p as any).inspectNearbyStation = () => {
      const nearbyObj = getNearbyWorldObject(playerBody.x);
      if (nearbyObj) {
        callbacks?.onInspectObject?.(nearbyObj);
        return;
      }
      const nearbyKiosk = getNearbyStationKiosk(playerBody.x);
      if (nearbyKiosk) {
        callbacks?.onInspectStation?.(nearbyKiosk);
      }
    };

    (p as any).setModalActive = (active: boolean) => {
      isModalActive = active;
      if (active) {
        // Clear all movement keys, joystick and drag state immediately when a modal opens
        for (const k in keys) {
          keys[k] = false;
        }
        joystickVector = { x: 0, y: 0 };
        isDragging = false;
        playerBody.vx = 0;
        playerBody.vy = 0;
        if (playerRespawnCountdown <= 0 && playerBody.isGrounded && attackTimer <= 0) {
          playerAction = 'idle';
          callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, 'idle');
        }
        if (activeEnemy && activeEnemy.hp > 0 && activeEnemy.state !== 'dead') {
          activeEnemy.vx = 0;
          activeEnemy.vy = 0;
          if (activeEnemy.state !== 'hurt') {
            activeEnemy.action = 'idle';
          }
        }
      }
    };

    let joystickVector = { x: 0, y: 0 };

    (p as any).handleVirtualInput = (action: string, payload?: any) => {
      if (isModalActive) return;

      if (action === 'joystick_vector' && payload) {
        joystickVector = { x: payload.x || 0, y: payload.y || 0 };
        if (Math.hypot(joystickVector.x, joystickVector.y) > 0.05) {
          cameraFollowsPlayer = true;
        }
      } else if (action === 'sprint_start') {
        keys['virtual_sprint'] = true;
      } else if (action === 'sprint_stop') {
        keys['virtual_sprint'] = false;
      } else if (action === 'sprint_toggle') {
        keys['virtual_sprint'] = !keys['virtual_sprint'];
      } else if (action === 'left' || action === 'left_start') {
        keys['virtual_left'] = true;
        cameraFollowsPlayer = true;
      } else if (action === 'left_stop') {
        keys['virtual_left'] = false;
      } else if (action === 'right' || action === 'right_start') {
        keys['virtual_right'] = true;
        cameraFollowsPlayer = true;
      } else if (action === 'right_stop') {
        keys['virtual_right'] = false;
      } else if (action === 'up' || action === 'up_start') {
        keys['virtual_up'] = true;
        cameraFollowsPlayer = true;
      } else if (action === 'up_stop') {
        keys['virtual_up'] = false;
      } else if (action === 'down' || action === 'down_start') {
        keys['virtual_down'] = true;
        cameraFollowsPlayer = true;
      } else if (action === 'down_stop') {
        keys['virtual_down'] = false;
      } else if (action === 'jump' || action === 'jump_start') {
        keys['virtual_jump'] = true;
      } else if (action === 'jump_stop') {
        keys['virtual_jump'] = false;
      } else if (
        action === 'attack' ||
        action === 'attack1' ||
        action === 'attack2' ||
        action === 'attack3' ||
        action === 'attack4'
      ) {
        triggerPlayerAttack(action as any);
      } else if (action === 'stop') {
        joystickVector = { x: 0, y: 0 };
        keys['virtual_left'] = false;
        keys['virtual_right'] = false;
        keys['virtual_up'] = false;
        keys['virtual_down'] = false;
        keys['virtual_jump'] = false;
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
        keys['ArrowUp'] = false;
        keys['ArrowDown'] = false;
        keys['KeyA'] = false;
        keys['KeyD'] = false;
        keys['KeyW'] = false;
        keys['KeyS'] = false;
        keys['a'] = false;
        keys['A'] = false;
        keys['d'] = false;
        keys['D'] = false;
        keys['w'] = false;
        keys['W'] = false;
        keys['s'] = false;
        keys['S'] = false;
        keys['Space'] = false;
        keys[' '] = false;
      };

      const updateAdaptiveZoom = () => {
        if (p.width >= 1600) {
          targetZoom = 1.35;
        } else if (p.width >= 1200) {
          targetZoom = 1.20;
        } else {
          targetZoom = 1.0;
        }
      };


      let isSetupCalled = false;

      p.setup = () => {
        if (isSetupCalled) return;
        isSetupCalled = true;

        (p as any).pixelDensity(1);
        const initialW = typeof window !== 'undefined' && window.innerWidth > 200 ? window.innerWidth : (p.windowWidth > 200 ? p.windowWidth : 1200);
        const initialH = typeof window !== 'undefined' && window.innerHeight > 200 ? window.innerHeight : (p.windowHeight > 200 ? p.windowHeight : 800);
        p.createCanvas(initialW, initialH);
        p.frameRate(60);

        if (typeof (p as any).noSmooth === 'function') (p as any).noSmooth();
        p.textAlign(p.CENTER, p.CENTER);
        (p as any).textFont('Pixelify Sans');

        const ctx = (p as any).drawingContext;
        if (ctx) ctx.imageSmoothingEnabled = false;

        const canvasElt = (p as any).canvas;
        if (canvasElt) {
          canvasElt.style.setProperty('width', '100vw', 'important');
          canvasElt.style.setProperty('height', '100vh', 'important');
          canvasElt.style.setProperty('position', 'fixed', 'important');
          canvasElt.style.setProperty('top', '0px', 'important');
          canvasElt.style.setProperty('left', '0px', 'important');
          canvasElt.style.setProperty('display', 'block', 'important');
        }

        updateAdaptiveZoom();
        zoom = targetZoom;
        camX = p.width / 2 - playerBody.x * zoom;
        camY = p.height * 0.72;
        targetCamX = camX;
        targetCamY = camY;
      };

      // Force p.setup and p5 internal _start execution immediately on mount
      setTimeout(() => {
        if (typeof (p as any)._start === 'function') {
          try { (p as any)._start(); } catch (e) { }
        }
        if (!isSetupCalled && typeof p.setup === 'function') {
          p.setup();
        }
      }, 0);



      p.windowResized = () => {
        const realW = typeof window !== 'undefined' && window.innerWidth > 200 ? window.innerWidth : (p.windowWidth > 200 ? p.windowWidth : 1200);
        const realH = typeof window !== 'undefined' && window.innerHeight > 200 ? window.innerHeight : (p.windowHeight > 200 ? p.windowHeight : 800);
        p.resizeCanvas(realW, realH);
        if (typeof (p as any).noSmooth === 'function') (p as any).noSmooth();
        const ctx = (p as any).drawingContext;
        if (ctx) ctx.imageSmoothingEnabled = false;

        const canvasElt = (p as any).canvas;
        if (canvasElt) {
          canvasElt.style.setProperty('width', '100vw', 'important');
          canvasElt.style.setProperty('height', '100vh', 'important');
          canvasElt.style.setProperty('position', 'fixed', 'important');
          canvasElt.style.setProperty('top', '0px', 'important');
          canvasElt.style.setProperty('left', '0px', 'important');
          canvasElt.style.setProperty('display', 'block', 'important');
        }

        updateAdaptiveZoom();
        targetCamY = p.height * 0.72;
      };


      p.draw = () => {
        // Auto-heal canvas size if p5 initialized at 200x200 or 0x0 during early React mount
        if (p.width <= 300 || p.height <= 300) {
          const realW = typeof window !== 'undefined' && window.innerWidth > 200 ? window.innerWidth : (p.windowWidth > 200 ? p.windowWidth : 1200);
          const realH = typeof window !== 'undefined' && window.innerHeight > 200 ? window.innerHeight : (p.windowHeight > 200 ? p.windowHeight : 800);
          if (realW > 300 && realH > 300) {
            p.resizeCanvas(realW, realH);
            const canvasElt = (p as any).canvas;
            if (canvasElt) {
              canvasElt.style.setProperty('width', '100vw', 'important');
              canvasElt.style.setProperty('height', '100vh', 'important');
            }
            updateAdaptiveZoom();
            targetCamY = p.height * 0.72;
          }
        }



        // 1. Meadow Base Fill (Night deep forest green in dark mode, vibrant meadow in light mode)


        if (currentThemeMode === 'dark') {
          p.background(24, 52, 38);
        } else {
          p.background(78, 160, 89);
        }
        windTimer += 0.4;

        // 2. Physics & Combat Simulation (Paused when any modal is open)
        if (!isModalActive) {
          simulatePhysics();
          updateEnemyNinja(1 / 60);
        }

        // 2.5. Telemetry callback

        if (typeof callbacks?.onPhysicsTelemetryChange === 'function') {
          callbacks.onPhysicsTelemetryChange({
            x: Math.round(playerBody.x),
            y: Math.round(playerBody.y),
            vx: Math.round(playerBody.vx * 10) / 10,
            vy: Math.round(playerBody.vy * 10) / 10,
            isGrounded: playerBody.isGrounded,
            isMoving: Math.abs(playerBody.vx) > 0.1 || Math.abs(playerBody.vy) > 0.1,
            action: playerAction,
            facing: playerBody.facing,
            cameraFollows: cameraFollowsPlayer,
            controlMode,
          });
        }

        // 3. Update Camera Position & Zoom
        if ((p as any).mouseIsPressed && !isModalActive) {

          if (p.mouseX < 150 && p.mouseY > p.height - 150) {
            cameraFollowsPlayer = true;
            isDragging = false;
          }
        }

        if (cameraFollowsPlayer) {
          targetCamX = p.width / 2 - playerBody.x * zoom;
        }

        // Strict viewport edge clamping: Left and right screen edges NEVER cross boundaries
        const minCamX = p.width - WORLD_BOUNDS.maxX * zoom;
        const maxCamX = -WORLD_BOUNDS.minX * zoom;
        targetCamX = p.constrain(targetCamX, minCamX, maxCamX);

        // Fast, responsive camera tracking for desktop & larger screens (no camera drag lag)
        const cameraLerpSpeed = (Math.abs(playerBody.vx) > 0.1 || Math.abs(playerBody.vy) > 0.1) ? 0.35 : 0.22;
        camX = p.lerp(camX, targetCamX, cameraLerpSpeed);
        camY = p.lerp(camY, targetCamY, cameraLerpSpeed);
        zoom = p.lerp(zoom, targetZoom, 0.20);

        // Hard clamp current camX as well to avoid any lerp overshoot past boundaries
        camX = p.constrain(camX, minCamX, maxCamX);

        // 4. Render New Blue Sky & 3 Cloud Layers (from public/locations/world)
        renderSkyAndClouds();

        // 5. Apply 2D Camera Transformation for World Space
        p.push();
        p.translate(camX, camY);
        p.scale(zoom);

        // 6. Render Ground Floor & Meadow (from public/locations/world/ground.png)
        renderMapSceneryAndFloor();

        // 7. Render 2.5D Depth-Sorted World Entities (Back-to-Front Y-Sorting)
        renderDepthSortedEntities();

        // 7.5 Render Combat Particles & Floating Damage Texts
        renderCombatParticlesAndTexts();

        // 8. Render Boundary Walls
        renderMapBoundaries();

        p.pop();

        // 9. Screen-Space Overlays (Off-screen Enemy Indicator)
        renderOffscreenEnemyIndicator();
      };

      function resolveSolidObstacleCollisions() {
        // 1. Home Base building & Garage (stops player from walking into or through the building)
        // Garage (-520) + House (0) span x: -680 to +360 with front porch at y = 70
        if (playerBody.x >= -680 && playerBody.x <= 360) {
          if (playerBody.y < 70) {
            playerBody.y = 70;
            if (playerBody.vy < 0) playerBody.vy = 0;
          }
        }

        // 2. Mailbox post collision at x = 220 (front right garden lawn)
        if (Math.abs(playerBody.x - 220) < 30) {
          resolveObstacleEllipse(220, 74, 14, 8);
        }

        // 3. Interactive Landmark Objects (Chest, Briefcase, Vault, Chamber, Bag)
        for (let i = 0; i < INTERACTIVE_OBJECTS.length; i++) {
          const obj = INTERACTIVE_OBJECTS[i];
          if (Math.abs(playerBody.x - obj.x) < 70) {
            resolveObstacleEllipse(obj.x, obj.yOffset || 0, 34, 15);
          }
        }

        // 4. Street Lamp Posts
        for (let i = 0; i < WORLD_LAMP_POSTS.length; i++) {
          const lamp = WORLD_LAMP_POSTS[i];
          if (Math.abs(playerBody.x - lamp.x) < 25) {
            resolveObstacleEllipse(lamp.x, lamp.yOffset, 12, 6);
          }
        }
      }

      function resolveObstacleEllipse(ox: number, oy: number, rx: number, ry: number) {
        const prx = 16;
        const pry = 10;
        const Rx = rx + prx;
        const Ry = ry + pry;
        const dx = playerBody.x - ox;
        const dy = playerBody.y - oy;
        const u = dx / Rx;
        const v = dy / Ry;
        const dNormSq = u * u + v * v;
        if (dNormSq < 1.0) {
          const dist = Math.sqrt(dNormSq);
          if (dist > 0.001) {
            const un = u / dist;
            const vn = v / dist;
            playerBody.x = ox + un * Rx;
            playerBody.y = oy + vn * Ry;
            // Silky smooth sliding: cancel velocity pointing into the obstacle
            const nx = un / Rx;
            const ny = vn / Ry;
            const nLen = Math.hypot(nx, ny);
            const nnx = nx / nLen;
            const nny = ny / nLen;
            const dot = playerBody.vx * nnx + playerBody.vy * nny;
            if (dot < 0) {
              playerBody.vx -= dot * nnx;
              playerBody.vy -= dot * nny;
            }
          } else {
            playerBody.y = oy + Ry;
          }
        }
      }

      function simulatePhysics() {
        if (isModalActive) return;

        if (playerRespawnCountdown > 0) {
          const dtSec = 1 / 60;
          playerRespawnCountdown -= dtSec;
          playerDeadPhase += dtSec * 5.0;
          playerAction = 'dead';
          playerBody.vx *= 0.85;
          playerBody.vy *= 0.85;
          playerBody.x += playerBody.vx;
          playerBody.y += playerBody.vy;
          callbacks?.onRespawnCountdownChange?.(Math.max(1, Math.ceil(playerRespawnCountdown)));

          if (playerRespawnCountdown <= 0) {
            playerRespawnCountdown = 0;
            playerHp = maxPlayerHp;
            playerAction = 'idle';
            playerDeadPhase = 0;
            playerBody.x = 0;
            playerBody.y = 80;
            playerBody.vx = 0;
            playerBody.vy = 0;
            spawnFloatingText(0, GROUND_Y + 50, 'RESPAWNED AT HOME BASE!', '#5B9BF3');
            callbacks?.onPlayerHealthChange?.(maxPlayerHp, maxPlayerHp);
            callbacks?.onRespawnCountdownChange?.(null);
            callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, 'idle');
          }
          return;
        }

        if (isModalActive) {
          if (playerBody.isGrounded && attackTimer <= 0 && Math.hypot(playerBody.vx, playerBody.vy) < 0.2) {
            playerAction = 'idle';
          }
          return;
        }

        const charPhys = CHARACTER_DEFS[playerCharacter].physics;

        const isLeft = !!(keys['KeyA'] || keys['ArrowLeft'] || keys['a'] || keys['A'] || keys['virtual_left']);
        const isRight = !!(keys['KeyD'] || keys['ArrowRight'] || keys['d'] || keys['D'] || keys['virtual_right']);
        const isUp = !!(keys['KeyW'] || keys['ArrowUp'] || keys['w'] || keys['W'] || keys['virtual_up']);
        const isDown = !!(keys['KeyS'] || keys['ArrowDown'] || keys['s'] || keys['S'] || keys['virtual_down']);
        const isJump = !!(keys['Space'] || keys['virtual_jump']);
        const isSprint = !!(keys['ShiftLeft'] || keys['ShiftRight'] || keys['virtual_sprint']);

        const stickDist = Math.hypot(joystickVector.x, joystickVector.y);
        const isUsingJoystick = stickDist > 0.06;

        let moveDirX = 0;
        let moveDirY = 0;

        if (isUsingJoystick) {
          moveDirX = joystickVector.x;
          moveDirY = joystickVector.y;
          playerBody.facing = moveDirX >= 0 ? 'right' : 'left';
        } else {
          if (isLeft && !isRight) moveDirX = -1;
          else if (isRight && !isLeft) moveDirX = 1;

          if (isUp && !isDown) moveDirY = -1;
          else if (isDown && !isUp) moveDirY = 1;

          if (moveDirX !== 0) {
            playerBody.facing = moveDirX > 0 ? 'right' : 'left';
          }
        }

        const isRunning = isSprint && moveDirX !== 0;
        const forceMag = isRunning ? charPhys.runForce : charPhys.walkForce;

        // X Movement & Speed Scaling
        if (moveDirX !== 0) {
          if ((moveDirX > 0 && playerBody.vx < 0) || (moveDirX < 0 && playerBody.vx > 0)) {
            playerBody.vx = 0;
          }
          playerBody.vx += moveDirX * (forceMag / playerBody.mass) * 0.85;
        } else {
          playerBody.vx *= 0.35;
          if (Math.abs(playerBody.vx) < 0.1) playerBody.vx = 0;
        }

        // Dynamic speed scaling: If using joystick, maxSpeed scales with distance from center
        const speedScaleX = isUsingJoystick ? Math.min(1.0, Math.max(0.20, Math.abs(moveDirX))) : 1.0;
        const maxSpeedX = (isRunning ? 8.5 : 5.2) * speedScaleX;
        playerBody.vx = p.constrain(playerBody.vx, -maxSpeedX, maxSpeedX);

        // Y Movement & Speed Scaling (Up / Down depth axis)
        if (moveDirY !== 0) {
          if ((moveDirY > 0 && playerBody.vy < 0) || (moveDirY < 0 && playerBody.vy > 0)) {
            playerBody.vy = 0;
          }
          playerBody.vy += moveDirY * (forceMag / playerBody.mass) * 0.55;
        } else {
          playerBody.vy *= 0.35;
          if (Math.abs(playerBody.vy) < 0.1) playerBody.vy = 0;
        }

        const speedScaleY = isUsingJoystick ? Math.min(1.0, Math.max(0.20, Math.abs(moveDirY))) : 1.0;
        const maxSpeedY = (isRunning ? 3.8 : 2.4) * speedScaleY;
        playerBody.vy = p.constrain(playerBody.vy, -maxSpeedY, maxSpeedY);


        // Jump Offset Simulation (Space bar / Jump button)
        if (isJump && jumpOffset === 0) {
          jumpVelocity = -10.2;
          playerBody.isGrounded = false;
          playerAction = 'jump';
          spawnDust(playerBody.x, playerBody.y, 4, 2.0);
          // Consume jump triggers immediately so single press = single jump
          keys['Space'] = false;
          keys['virtual_jump'] = false;
        }

        if (jumpOffset < 0 || jumpVelocity !== 0) {
          jumpOffset += jumpVelocity;
          jumpVelocity += 0.95; // Smooth natural gravity
          if (jumpOffset >= 0) {
            jumpOffset = 0;
            jumpVelocity = 0;
            playerBody.isGrounded = true;
            spawnDust(playerBody.x, playerBody.y, 4, 1.8);
          }
        } else {
          playerBody.isGrounded = true;
        }

        // Apply displacement
        playerBody.x += playerBody.vx;
        playerBody.y += playerBody.vy;

        // Resolve solid obstacle collisions (trees, bushes, items, home base)
        resolveSolidObstacleCollisions();

        // Clamp player within ground walking corridor
        playerBody.y = p.constrain(playerBody.y, 0, 110);
        const playerCollisionRadius = 40;
        if (playerBody.x <= WORLD_BOUNDS.minX + playerCollisionRadius) {
          playerBody.x = WORLD_BOUNDS.minX + playerCollisionRadius;
          if (playerBody.vx < 0) playerBody.vx = 0;
        }
        if (playerBody.x >= WORLD_BOUNDS.maxX - playerCollisionRadius) {
          playerBody.x = WORLD_BOUNDS.maxX - playerCollisionRadius;
          if (playerBody.vx > 0) playerBody.vx = 0;
        }

        // 4 Attack Triggers
        if (attackTimer <= 0) {
          if (keys['Digit1'] || keys['1'] || keys['KeyJ'] || keys['j'] || keys['J'] || keys['KeyF'] || keys['f'] || keys['F']) {
            triggerPlayerAttack('attack1');
          } else if (keys['Digit2'] || keys['2'] || keys['KeyK'] || keys['k'] || keys['K'] || keys['KeyG'] || keys['g'] || keys['G']) {
            triggerPlayerAttack('attack2');
          } else if (keys['Digit3'] || keys['3'] || keys['KeyL'] || keys['l'] || keys['L'] || keys['KeyH'] || keys['h'] || keys['H']) {
            triggerPlayerAttack('attack3');
          } else if (keys['Digit4'] || keys['4'] || keys['Semicolon'] || keys[';'] || keys['KeyU'] || keys['u'] || keys['U'] || keys['KeyY'] || keys['y'] || keys['Y']) {
            triggerPlayerAttack('attack4');
          }
        }

        if (keys['KeyE'] || keys['e'] || keys['Enter']) {
          const nearbyObj = getNearbyWorldObject(playerBody.x);
          if (nearbyObj) {
            callbacks?.onInspectObject?.(nearbyObj);
            keys['KeyE'] = false;
            keys['e'] = false;
            keys['Enter'] = false;
          } else {
            const nearbyKiosk = getNearbyStationKiosk(playerBody.x);
            if (nearbyKiosk) {
              callbacks?.onInspectStation?.(nearbyKiosk);
              keys['KeyE'] = false;
              keys['e'] = false;
              keys['Enter'] = false;
            }
          }
        }

        if (attackTimer > 0) {
          attackTimer--;
          attackPhase += 0.45;
          if (attackTimer === 0 && playerBody.isGrounded) {
            const spd = Math.hypot(playerBody.vx, playerBody.vy);
            playerAction = spd > 0.3 ? 'walk' : 'idle';
          }
        }

        // Animation phase updates
        const currentSpeed = Math.hypot(playerBody.vx, playerBody.vy);
        if (jumpOffset < 0) {
          playerAction = 'jump';
          const normalizedJumpProgress = p.map(jumpVelocity, -17.5, 17.5, 0, 8);
          jumpPhase = p.constrain(normalizedJumpProgress, 0, 8);
        } else if (attackTimer <= 0) {
          if (currentSpeed > 0.2) {
            playerAction = isRunning ? 'run' : 'walk';
            walkPhase += currentSpeed * 0.07;

            const stepCycle = Math.floor(walkPhase);
            if (stepCycle % 4 === 0 && (walkPhase - stepCycle) < 0.25) {
              spawnDust(playerBody.x - (playerBody.facing === 'right' ? 14 : -14), playerBody.y, 1, 1.2);
            }
          } else {
            playerAction = 'idle';
          }
        }

        const activeLoc = getActiveMapLocation(playerBody.x);
        const nearbyStation = getNearbyStationKiosk(playerBody.x);
        const nearbyObject = getNearbyWorldObject(playerBody.x);
        const isNearbyKiosk = !!nearbyStation || !!nearbyObject;
        const currentObjId = nearbyObject?.id || '';

        if (activeLoc.id !== lastReportedLocId || isNearbyKiosk !== lastNearbyState || currentObjId !== lastNearbyObjectId) {
          lastReportedLocId = activeLoc.id;
          lastNearbyState = isNearbyKiosk;
          lastNearbyObjectId = currentObjId;

          callbacks?.onBiomeChange?.({
            id: activeLoc.id,
            category: activeLoc.category,
            name: activeLoc.name,
            tag: nearbyObject ? 'Interactive Object' : activeLoc.tag,
            featureType: activeLoc.featureType,
            featureTitle: activeLoc.featureTitle,
            description: activeLoc.description,
            x: activeLoc.x,
            actionLabel: nearbyObject ? nearbyObject.actionLabel : activeLoc.actionLabel,
            isNearbyKiosk,
            nearbyObject,
          });
        }

        if (callbacks?.onPlayerPositionChange) {
          callbacks.onPlayerPositionChange(playerBody.x, playerBody.y);
        }
      }

      function renderDustParticles() {
        let dWrite = 0;
        for (let i = 0; i < dustParticles.length; i++) {
          const pArt = dustParticles[i];
          pArt.x += pArt.vx;
          pArt.y += pArt.vy;
          pArt.vy += 0.08;
          pArt.life++;

          if (pArt.life < pArt.maxLife && dWrite < 12) {
            pArt.alpha = 1 - pArt.life / pArt.maxLife;
            dustParticles[dWrite++] = pArt;

            p.noStroke();
            p.fill(104, 179, 90, pArt.alpha * 180);
            p.ellipse(pArt.x, pArt.y, pArt.size / zoom, pArt.size / zoom);
          }
        }
        dustParticles.length = dWrite;
      }

      function renderPlayerCharacter() {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const currentTimeSec = (typeof performance !== 'undefined' ? performance.now() : (p as any).millis()) / 1000;

        let activeProgress = currentTimeSec;
        if (playerAction === 'walk' || playerAction === 'run') {
          activeProgress = walkPhase;
        } else if (playerAction === 'jump') {
          activeProgress = jumpPhase;
        } else if (playerAction === 'dead') {
          activeProgress = playerDeadPhase;
        } else if (
          playerAction === 'attack' ||
          playerAction === 'attack1' ||
          playerAction === 'attack2' ||
          playerAction === 'attack3' ||
          playerAction === 'attack4'
        ) {
          activeProgress = attackPhase;
        }

        const activeLoc = getActiveMapLocation(playerBody.x);
        const standingOffset = activeLoc.floor?.standingOffsetY || DEFAULT_ATMOSPHERE.floor?.standingOffsetY || 0;

        // Dynamic Contact Shadow on Ground Floor
        p.push();
        p.noStroke();
        const shadowAlpha = Math.max(25, 75 + jumpOffset * 0.8);
        p.fill(0, 0, 0, shadowAlpha);
        const shadowW = Math.max(16, (44 + jumpOffset * 0.22) / zoom);
        const shadowH = Math.max(6, (14 + jumpOffset * 0.08) / zoom);
        p.ellipse(playerBody.x, playerBody.y + standingOffset + 4, shadowW, shadowH);
        p.pop();

        // Render Character Sprite
        drawCharacterFrame(
          ctx,
          playerCharacter,
          playerAction,
          playerBody.x,
          playerBody.y + standingOffset + jumpOffset,
          playerBody.facing,
          activeProgress
        );
      }

      // Render Sky Gradient (bg.png or bg_night.png), Moon, and Cloud Layers
      function renderSkyAndClouds() {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const screenW = p.width;
        const groundScreenY = camY;
        const skyHeight = Math.max(200, groundScreenY + 20);

        const activeLoc = getActiveMapLocation(playerBody.x);
        const skyBgSrc = currentThemeMode === 'dark'
          ? '/locations/world/bg_night.png'
          : (activeLoc.background || DEFAULT_ATMOSPHERE.background);
        const cloudLayers = activeLoc.clouds || DEFAULT_ATMOSPHERE.clouds;

        // 1. Draw Sky Background Texture (bg.png or bg_night.png)
        if (skyBgSrc) {
          const bgImg = getTexture(skyBgSrc);
          if (bgImg.complete && bgImg.naturalWidth > 0) {
            const aspect = bgImg.naturalWidth / bgImg.naturalHeight;
            let targetH = skyHeight;
            let targetW = targetH * aspect;
            if (targetW < screenW) {
              targetW = screenW;
              targetH = targetW / aspect;
            }

            const parallaxOffset = (camX * 0.03);
            let startX = (parallaxOffset % targetW);
            if (startX > 0) startX -= targetW;

            const targetY = groundScreenY - targetH;
            let drawX = startX;
            while (drawX < screenW) {
              ctx.drawImage(bgImg, drawX, targetY, targetW + 1, targetH + 1);
              drawX += targetW;
            }
          }
        }

        // 1.5 Draw Glowing Moon in Dark Mode
        if (currentThemeMode === 'dark') {
          const moonImg = getTexture(activeMoonSrc);
          if (moonImg.complete && moonImg.naturalWidth > 0) {
            const aspect = moonImg.naturalWidth / moonImg.naturalHeight;
            let targetH = skyHeight;
            let targetW = targetH * aspect;
            if (targetW < screenW) {
              targetW = screenW;
              targetH = targetW / aspect;
            }

            const parallaxOffset = (camX * 0.015);
            let startX = (parallaxOffset % targetW);
            if (startX > 0) startX -= targetW;

            const targetY = groundScreenY - targetH;
            let drawX = startX;
            while (drawX < screenW) {
              ctx.drawImage(moonImg, drawX, targetY, targetW + 1, targetH + 1);
              drawX += targetW;
            }
          }
        }

        // 2. Draw Cloud Layers (with subtle night tint in dark mode)
        p.push();
        if (currentThemeMode === 'dark') {
          ctx.globalAlpha = 0.50;
        }
        for (let i = 0; i < cloudLayers.length; i++) {
          const cloud = cloudLayers[i];
          const cloudImg = getTexture(cloud.src);
          if (!cloudImg.complete || cloudImg.naturalWidth === 0) continue;

          const aspect = cloudImg.naturalWidth / cloudImg.naturalHeight;
          let targetH = skyHeight * 0.88;
          let targetW = targetH * aspect;
          if (targetW < screenW) {
            targetW = screenW;
            targetH = targetW / aspect;
          }

          const parallaxOffset = (camX * cloud.parallax) + (windTimer * cloud.speed);
          let startX = (parallaxOffset % targetW);
          if (startX > 0) startX -= targetW;

          const yOffset = cloud.yOffset !== undefined ? cloud.yOffset : -140;
          const targetY = groundScreenY - targetH + yOffset;

          let drawX = startX;
          while (drawX < screenW) {
            ctx.drawImage(cloudImg, drawX, targetY, targetW + 1, targetH + 1);
            drawX += targetW;
          }
        }
        p.pop();
      }

      // Render Ground Floor & Meadow (from public/locations/world/ground.png) - Stretches to bottom
      function renderMapSceneryAndFloor() {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;

        const viewLeft = (-camX) / zoom - 300;
        const viewRight = (p.width - camX) / zoom + 300;
        const viewBottom = (p.height - camY) / zoom + 400;

        const groundImg = getTexture(DEFAULT_ATMOSPHERE.floor?.image || '/locations/world/ground.png');
        if (!groundImg.complete || groundImg.naturalWidth === 0) return;

        const targetH = DEFAULT_ATMOSPHERE.floor?.height || 520;
        const aspect = 576 / 324;
        const layerW = targetH * aspect;

        // Ground path ratio in 576x324 ground.png
        const groundSurfaceRatio = 265 / 324;
        const drawY = GROUND_Y - targetH * groundSurfaceRatio;


        if (currentThemeMode === 'dark') {
          ctx.filter = 'brightness(0.65) saturate(0.90)';
        }

        let layerX = Math.floor(viewLeft / layerW) * layerW;
        while (layerX < viewRight + layerW) {
          // Draw top ground crest with textured grass tufts and paths
          ctx.drawImage(groundImg, layerX, drawY, layerW + 1, targetH + 1);

          // Seamlessly tile the textured lower meadow downwards to cover the entire screen bottom
          let tileY = drawY + targetH - 2;
          const subSliceH = 80;
          while (tileY < viewBottom + 300) {
            ctx.drawImage(groundImg, 0, 240, 576, 84, layerX, tileY, layerW + 1, subSliceH + 1);
            tileY += subSliceH - 1;
          }

          layerX += layerW - 1;
        }

        if (currentThemeMode === 'dark') {
          ctx.filter = 'none';
        }
      }




      interface PooledDepthItem {
        type: number; // 1: tree, 2: bush, 3: interactiveObj, 4: kiosk, 5: garage, 6: home, 7: mailbox, 8: lamp, 9: dust, 10: player, 11: enemy
        index: number;
        y: number;
      }
      const depthPool: PooledDepthItem[] = [];

      function renderDepthSortedEntities() {
        const viewLeft = (-camX) / zoom - 450;
        const viewRight = (p.width - camX) / zoom + 450;
        let count = 0;

        const pushEntity = (type: number, index: number, y: number) => {
          if (count < depthPool.length) {
            const item = depthPool[count];
            item.type = type;
            item.index = index;
            item.y = y;
          } else {
            depthPool.push({ type, index, y });
          }
          count++;
        };

        // 1. All Trees (rooted firmly in the grass meadow at tree.yOffset)
        for (let i = 0; i < ALL_WORLD_TREES.length; i++) {
          const tree = ALL_WORLD_TREES[i];
          if (tree.x < viewLeft || tree.x > viewRight) continue;
          pushEntity(1, i, tree.yOffset || 0);
        }

        // 2. All Bushes (rooted firmly in the grass meadow at bush.yOffset)
        for (let i = 0; i < ALL_WORLD_BUSHES.length; i++) {
          const bush = ALL_WORLD_BUSHES[i];
          if (bush.x < viewLeft || bush.x > viewRight) continue;
          pushEntity(2, i, bush.yOffset || 0);
        }

        // 3. Interactive Landmark Objects (Chest, Briefcase, Vault, Chamber, Bag)
        for (let i = 0; i < INTERACTIVE_OBJECTS.length; i++) {
          const obj = INTERACTIVE_OBJECTS[i];
          if (obj.x < viewLeft || obj.x > viewRight) continue;
          pushEntity(3, i, (obj.yOffset || 0) + 12);
        }

        // 4. Station Kiosks (only for outdoor field stations)
        for (let i = 0; i < WORLD_LOCATIONS.length; i++) {
          const loc = WORLD_LOCATIONS[i];
          if (loc.x < viewLeft || loc.x > viewRight || Math.abs(loc.x) <= 600) continue;
          pushEntity(4, i, 0);
        }

        // 5. Services Garage at X = -520 (beside house on the left)
        if (-520 >= viewLeft - 350 && -520 <= viewRight + 350) {
          pushEntity(5, 0, 68);
        }

        // 6. Home Base Building at X = 0 (center)
        if (0 >= viewLeft - 400 && 0 <= viewRight + 400) {
          pushEntity(6, 0, 68);
        }

        // 7. Contact Mailbox at X = 220 (front right garden lawn)
        if (220 >= viewLeft - 200 && 220 <= viewRight + 200) {
          pushEntity(7, 0, 74);
        }

        // 8. Street Lamp Posts (Sources of light illuminating the dark mode world)
        for (let i = 0; i < WORLD_LAMP_POSTS.length; i++) {
          const lamp = WORLD_LAMP_POSTS[i];
          if (lamp.x < viewLeft || lamp.x > viewRight) continue;
          pushEntity(8, i, lamp.yOffset);
        }

        // 9. Dust Particles
        if (dustParticles.length > 0) {
          pushEntity(9, 0, playerBody.y - 0.5);
        }

        // 10. Player Character
        pushEntity(10, 0, playerBody.y);

        // 11. Roaming Enemy Ninja
        if (activeEnemy) {
          pushEntity(11, 0, activeEnemy.y);
        }

        // Fast Sort for active items (numeric comparator)
        const activeSlice = depthPool.slice(0, count);
        activeSlice.sort((a, b) => a.y - b.y);

        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const isDark = currentThemeMode === 'dark';

        if (isDark) {
          ctx.filter = 'brightness(0.65) saturate(0.90)';
        }

        for (let i = 0; i < count; i++) {
          const ent = activeSlice[i];
          if (ent.type === 10 || ent.type === 11) {
            if (isDark) ctx.filter = 'none';
            if (ent.type === 10) renderPlayerCharacter();
            else if (activeEnemy) renderEnemyNinja(activeEnemy);
            if (isDark) ctx.filter = 'brightness(0.65) saturate(0.90)';
          } else {
            switch (ent.type) {
              case 1: drawSingleTree(ALL_WORLD_TREES[ent.index]); break;
              case 2: drawSingleBush(ALL_WORLD_BUSHES[ent.index]); break;
              case 3: drawSingleInteractiveObject(INTERACTIVE_OBJECTS[ent.index]); break;
              case 4: drawSingleStationKiosk(WORLD_LOCATIONS[ent.index]); break;
              case 5: renderServicesGarage(); break;
              case 6: renderHomeBeacon(); break;
              case 7: renderContactMailbox(); break;
              case 8: drawSingleLampPost(WORLD_LAMP_POSTS[ent.index]); break;
              case 9: renderDustParticles(); break;
            }
          }
        }

        if (isDark) {
          ctx.filter = 'none';
        }
      }




      function drawSingleTree(tree: FlatSceneryItem) {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const img = getTexture(tree.src);
        if (!img.complete || img.naturalWidth === 0) return;

        const aspect = img.naturalWidth / img.naturalHeight; // 576 / 324
        const treeH = tree.size;
        const treeW = treeH * aspect;
        const drawX = tree.x - treeW / 2;
        // Exact trunk base pixel in tree1.png is at y = 274 / 324 (84.57% height)
        const drawY = GROUND_Y + (tree.yOffset || 0) - treeH * (274 / 324);

        // Soft Ground Contact Shadow directly under base of trunk
        p.noStroke();
        p.fill(0, 0, 0, currentThemeMode === 'dark' ? 65 : 45);
        p.ellipse(tree.x, GROUND_Y + (tree.yOffset || 0) + 1, treeW * 0.20, 8);

        ctx.drawImage(img, drawX, drawY, treeW, treeH);
      }

      function drawSingleBush(bush: FlatSceneryItem) {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const img = getTexture(bush.src);
        if (!img.complete || img.naturalWidth === 0) return;

        const aspect = img.naturalWidth / img.naturalHeight;
        const bushH = bush.size;
        const bushW = bushH * aspect;
        const drawX = bush.x - bushW / 2;
        // Bush bottom pixel is at 95% height
        const drawY = GROUND_Y + (bush.yOffset || 0) - bushH * 0.95;

        // Soft Ground Contact Shadow directly under bush base
        p.noStroke();
        p.fill(0, 0, 0, currentThemeMode === 'dark' ? 55 : 35);
        p.ellipse(bush.x, GROUND_Y + (bush.yOffset || 0) + 1, bushW * 0.45, 6);

        ctx.drawImage(img, drawX, drawY, bushW, bushH);
      }

      function drawSingleInteractiveObject(obj: InteractiveWorldObject) {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const img = getTexture(obj.image);
        const objSize = obj.size || 140;
        const isPlayerNearby = Math.abs(playerBody.x - obj.x) <= 110;
        const hoverBob = Math.sin(windTimer * 0.08 + obj.x * 0.01) * 3;
        const baseY = GROUND_Y + (obj.yOffset || 0);

        p.push();
        // 1. Soft Ground Contact Shadow
        p.noStroke();
        p.fill(0, 0, 0, 75);
        p.ellipse(obj.x, baseY + 2, objSize * 0.65, 18);

        // 2. Ambient Holographic Halo
        p.noFill();
        p.stroke(obj.glowColor || '#00e599');
        p.strokeWeight(1.8);
        p.ellipse(obj.x, baseY, objSize * 0.75, 22);

        // 3. Draw Object Image
        if (img.complete && img.naturalWidth > 0) {
          const destX = obj.x - objSize / 2;
          const destY = baseY - objSize * 0.88 + hoverBob;
          ctx.drawImage(img, destX, destY, objSize, objSize);
        }

        // 4. Interactive Floating Prompt Banner when Player is nearby
        if (isPlayerNearby) {
          const promptY = baseY - objSize - 20;
          p.fill('#0F0F0F');
          p.stroke('#EADBCC');
          p.strokeWeight(1.8);
          p.rectMode(p.CENTER);
          p.rect(obj.x, promptY, 200, 30, 8);

          p.noStroke();
          p.fill('#EADBCC');
          (p as any).textFont('Pixelify Sans');
          p.textSize(11);
          p.text(`[ E ] ${obj.actionLabel}`, obj.x, promptY);
        }
        p.pop();
      }

      function drawSingleStationKiosk(loc: MapLocationEntry) {
        const proximityRadius = 140;
        const isPlayerNearby = Math.abs(playerBody.x - loc.x) <= proximityRadius;
        const color = '#00e599';
        const pulse = Math.sin((p as any).frameCount * 0.08) * 3;

        p.push();
        // 1. Ground Holo Base Disc
        p.noFill();
        p.stroke(color);
        p.strokeWeight(2);
        p.ellipse(loc.x, GROUND_Y - 4, 48 + pulse, 16 + pulse * 0.5);

        // 2. Vertical Holo Projection Beam
        p.stroke('rgba(0, 229, 153, 0.4)');
        p.strokeWeight(2);
        p.line(loc.x, GROUND_Y - 4, loc.x, GROUND_Y - 80);

        // 3. Rotating Holographic Diamond
        p.push();
        p.translate(loc.x, GROUND_Y - 80);
        p.rotate((p as any).frameCount * 0.04);
        p.fill(color);
        p.noStroke();
        p.rectMode(p.CENTER);
        p.rect(0, 0, 14, 14);
        p.pop();

        // 4. Interactive Prompt Banner when nearby
        if (isPlayerNearby) {
          p.fill('#0F0F0F');
          p.stroke('#EADBCC');
          p.strokeWeight(1.8);
          p.rectMode(p.CENTER);
          p.rect(loc.x, GROUND_Y - 120, 210, 32, 8);

          p.noStroke();
          p.fill('#EADBCC');
          (p as any).textFont('Pixelify Sans');
          p.textSize(11);
          p.text(`[ E ] ${loc.actionLabel || 'Inspect Station'}`, loc.x, GROUND_Y - 120);
        }
        p.pop();
      }

      // Render Street Lamp Posts (Sources of light illuminating the dark mode environment)
      function drawSingleLampPost(lamp: { x: number; yOffset: number }) {
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const isNight = currentThemeMode === 'dark';
        const img = getTexture(isNight ? '/objects/light_on.png' : '/objects/light_off.png');
        if (!img.complete || img.naturalWidth === 0) return;

        const lampWidth = 430;
        const aspect = 2752 / 1536;
        const drawW = lampWidth;
        const drawH = lampWidth / aspect;
        const destX = lamp.x - drawW / 2;
        const baseY = GROUND_Y + lamp.yOffset;
        const destY = baseY - drawH * (1534 / 1536);

        p.push();

        // 1. In Dark Mode: Soft lantern glow at the top of the lamp (no muddy ground discs)
        if (isNight) {
          const lanternHeadX = lamp.x;
          const lanternHeadY = destY + drawH * (110 / 1536);
          const flicker = Math.sin(windTimer * 0.15 + lamp.x * 0.05) * 0.02;

          const haloGrad = ctx.createRadialGradient(
            lanternHeadX, lanternHeadY, 2,
            lanternHeadX, lanternHeadY, 115
          );
          haloGrad.addColorStop(0, `rgba(255, 255, 230, ${0.72 + flicker})`);
          haloGrad.addColorStop(0.25, `rgba(255, 230, 150, ${0.32 + flicker * 0.5})`);
          haloGrad.addColorStop(0.65, `rgba(255, 205, 100, ${0.09 + flicker * 0.2})`);
          haloGrad.addColorStop(1, 'rgba(255, 190, 80, 0)');

          ctx.save();
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(lanternHeadX, lanternHeadY, 115, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // 2. Clean Ground Contact Shadow under post base
        p.noStroke();
        p.fill(0, 0, 0, isNight ? 80 : 60);
        p.ellipse(lamp.x, baseY + 1, 46, 10);

        // 3. Draw Lamp Post Image (Explicitly UNFILTERED: 100% full radiant brightness in dark mode!)
        ctx.filter = 'none';
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, destX, destY, drawW, drawH);

        p.pop();
      }

      // Render Boundary Walls
      function renderMapBoundaries() {
        renderSingleBoundary(WORLD_BOUNDS.minX, 'MAP START • WESTERN BOUNDARY', true);
        renderSingleBoundary(WORLD_BOUNDS.maxX, 'MAP END • EASTERN BOUNDARY', false);
      }

      function renderSingleBoundary(barrierX: number, label: string, isLeft: boolean) {
        p.push();
        const barrierHeight = 520;

        p.stroke(91, 155, 243, 220);
        p.strokeWeight(3);
        p.line(barrierX, GROUND_Y - barrierHeight + 80, barrierX, GROUND_Y + 40);

        p.stroke(91, 155, 243, 45);
        p.strokeWeight(1.5);
        const fieldWidth = 160;
        const step = 25;

        for (let y = GROUND_Y + 40; y >= GROUND_Y - barrierHeight + 80; y -= step) {
          const xOffset = isLeft ? -fieldWidth : fieldWidth;
          p.line(barrierX, y, barrierX + xOffset, y - 25);
        }

        p.fill('#0F0F0F');
        p.stroke(234, 219, 204);
        p.strokeWeight(2);
        p.rectMode(p.CENTER);
        const badgeX = barrierX + (isLeft ? -100 : 100);
        p.rect(badgeX, GROUND_Y - barrierHeight / 2, 190, 32, 8);

        p.noStroke();
        p.fill('#EADBCC');
        (p as any).textFont('Pixelify Sans');
        p.textSize(10);
        p.text(label, badgeX, GROUND_Y - barrierHeight / 2);

        p.pop();
      }

      // Render Services Garage at X = -520 (left of house)
      function renderServicesGarage() {
        const garageImg = getTexture('/objects/garage.png');
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const garageWidth = 650;
        const garageX = -520;
        const isPlayerNearby = Math.abs(playerBody.x - garageX) <= 120;

        p.push();

        if (garageImg.complete && garageImg.naturalWidth > 0) {
          const aspect = garageImg.naturalWidth / garageImg.naturalHeight; // 2752 / 1536
          const drawW = garageWidth;
          const drawH = garageWidth / aspect;
          const destX = garageX - drawW / 2;
          // Foundation baseline in garage.png is at y = 1304 / 1536 (84.9% height)
          const destY = GROUND_Y + 68 - drawH * (1304 / 1536);

          // Ground Contact Shadow directly under base foundation
          p.noStroke();
          p.fill(0, 0, 0, currentThemeMode === 'dark' ? 120 : 95);
          p.ellipse(garageX, GROUND_Y + 68, 340, 24);

          ctx.drawImage(garageImg, destX, destY, drawW, drawH);
        }

        // Interactive Floating Prompt Banner when Player is nearby
        if (isPlayerNearby) {
          const promptY = GROUND_Y - 45;
          p.fill('#0F0F0F');
          p.stroke('#EADBCC');
          p.strokeWeight(1.8);
          p.rectMode(p.CENTER);
          p.rect(garageX, promptY, 175, 26, 6);

          p.noStroke();
          p.fill('#EADBCC');
          (p as any).textFont('Pixelify Sans');
          p.textSize(11);
          p.text('[ E ] Inspect Services', garageX, promptY);
        }

        p.pop();
      }


      // Render Home Base Building at X = 0m (center)
      function renderHomeBeacon() {
        const homeImg = getTexture('/objects/home.png');
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const homeWidth = 780;
        const isPlayerNearby = Math.abs(playerBody.x) <= 80;

        p.push();

        if (homeImg.complete && homeImg.naturalWidth > 0) {
          const aspect = homeImg.naturalWidth / homeImg.naturalHeight;
          const drawW = homeWidth;
          const drawH = homeWidth / aspect;
          const destX = 0 - drawW / 2;
          // Foundation baseline in home.png is at 87.1% height
          const destY = GROUND_Y + 68 - drawH * (1338 / 1536);

          // Ground Contact Shadow directly under base foundation
          p.noStroke();
          p.fill(0, 0, 0, currentThemeMode === 'dark' ? 120 : 95);
          p.ellipse(0, GROUND_Y + 68, homeWidth * 0.78, 28);

          ctx.drawImage(homeImg, destX, destY, drawW, drawH);
        } else {
          p.stroke(91, 155, 243, 160);
          p.strokeWeight(1.5);
          p.line(0, -180, 0, GROUND_Y);
        }

        // Interactive Floating Prompt Banner when Player is at Home Base front door
        if (isPlayerNearby) {
          const doorX = -90;
          const promptY = GROUND_Y - 45;
          p.fill('#0F0F0F');
          p.stroke('#EADBCC');
          p.strokeWeight(1.8);
          p.rectMode(p.CENTER);
          p.rect(doorX, promptY, 165, 26, 6);

          p.noStroke();
          p.fill('#EADBCC');
          (p as any).textFont('Pixelify Sans');
          p.textSize(11);
          p.text('[ E ] Inspect Home', doorX, promptY);
        }

        p.pop();
      }


      // Render Contact Mailbox at X = 220 (front right garden lawn)
      function renderContactMailbox() {
        const mailboxImg = getTexture('/objects/mailbox.png');
        const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
        const mailboxWidth = 260;
        const mailboxX = 220;
        const isPlayerNearby = Math.abs(playerBody.x - mailboxX) <= 70;

        p.push();

        if (mailboxImg.complete && mailboxImg.naturalWidth > 0) {
          const aspect = mailboxImg.naturalWidth / mailboxImg.naturalHeight; // 2752 / 1536
          const drawW = mailboxWidth;
          const drawH = mailboxWidth / aspect;
          const destX = mailboxX - drawW / 2;
          // Post base in mailbox.png reaches the bottom (1535 / 1536)
          const destY = GROUND_Y + 74 - drawH * (1535 / 1536);

          // Ground Contact Shadow under post
          p.noStroke();
          p.fill(0, 0, 0, currentThemeMode === 'dark' ? 100 : 85);
          p.ellipse(mailboxX, GROUND_Y + 74, 75, 12);

          ctx.drawImage(mailboxImg, destX, destY, drawW, drawH);
        }

        // Interactive Floating Prompt Banner when Player is nearby
        if (isPlayerNearby) {
          const promptY = GROUND_Y - 35;
          p.fill('#0F0F0F');
          p.stroke('#EADBCC');
          p.strokeWeight(1.8);
          p.rectMode(p.CENTER);
          p.rect(mailboxX, promptY, 220, 28, 6);

          p.noStroke();
          p.fill('#EADBCC');
          (p as any).textFont('Pixelify Sans');
          p.textSize(11);
          p.text('[ E ] Contact Asterixh', mailboxX, promptY);
        }

        p.pop();
      }



      const GAME_KEYS = [
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space',
        'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE',
        'KeyJ', 'KeyK', 'KeyL', 'KeyU', 'KeyI', 'Semicolon',
        'Digit1', 'Digit2', 'Digit3', 'Digit4'
      ];
      const GAME_KEY_CHARS = [
        ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'e', 'E',
        'j', 'J', 'k', 'K', 'l', 'L', 'u', 'U', 'i', 'I', ';',
        '1', '2', '3', '4'
      ];

      const handleNativeKeyDown = (e: KeyboardEvent) => {
        if (isModalActive) return;
        if (GAME_KEYS.includes(e.code) || GAME_KEY_CHARS.includes(e.key) || e.key === 'Shift') {
          e.preventDefault();
        }
        if (e.repeat) return; // Prevent browser key-repeat cluttering

        const keyLower = e.key ? e.key.toLowerCase() : '';

        if (e.code === 'KeyA' || e.code === 'ArrowLeft' || keyLower === 'a') {
          keys['virtual_left'] = true;
          cameraFollowsPlayer = true;
        }
        if (e.code === 'KeyD' || e.code === 'ArrowRight' || keyLower === 'd') {
          keys['virtual_right'] = true;
          cameraFollowsPlayer = true;
        }
        if (e.code === 'KeyW' || e.code === 'ArrowUp' || keyLower === 'w') {
          keys['virtual_up'] = true;
          cameraFollowsPlayer = true;
        }
        if (e.code === 'KeyS' || e.code === 'ArrowDown' || keyLower === 's') {
          keys['virtual_down'] = true;
          cameraFollowsPlayer = true;
        }
        if (e.code === 'Space' || e.key === ' ') {
          keys['virtual_jump'] = true;
        }
        if (e.key === 'Shift' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          keys['virtual_sprint'] = true;
        }
        if (e.code === 'KeyE' || keyLower === 'e') {
          (p as any).inspectNearbyStation?.();
        }

        // Direct, instantaneous attack trigger on keypress
        if (playerRespawnCountdown <= 0 && attackTimer <= 0) {
          if (e.code === 'KeyJ' || keyLower === 'j' || e.code === 'Digit1' || e.key === '1') {
            triggerPlayerAttack('attack1');
          } else if (e.code === 'KeyK' || keyLower === 'k' || e.code === 'Digit2' || e.key === '2') {
            triggerPlayerAttack('attack2');
          } else if (e.code === 'KeyL' || keyLower === 'l' || e.code === 'Digit3' || e.key === '3') {
            triggerPlayerAttack('attack3');
          } else if (e.code === 'KeyU' || keyLower === 'u' || e.code === 'KeyI' || keyLower === 'i' || e.code === 'Semicolon' || e.key === ';' || e.code === 'Digit4' || e.key === '4') {
            triggerPlayerAttack('attack4');
          }
        }
      };

      const handleNativeKeyUp = (e: KeyboardEvent) => {
        if (GAME_KEYS.includes(e.code) || GAME_KEY_CHARS.includes(e.key) || e.key === 'Shift') {
          e.preventDefault();
        }

        const keyLower = e.key ? e.key.toLowerCase() : '';

        if (e.code === 'KeyA' || e.code === 'ArrowLeft' || keyLower === 'a') {
          keys['virtual_left'] = false;
          keys['KeyA'] = false;
          keys['ArrowLeft'] = false;
          keys['a'] = false;
          keys['A'] = false;
        }
        if (e.code === 'KeyD' || e.code === 'ArrowRight' || keyLower === 'd') {
          keys['virtual_right'] = false;
          keys['KeyD'] = false;
          keys['ArrowRight'] = false;
          keys['d'] = false;
          keys['D'] = false;
        }
        if (e.code === 'KeyW' || e.code === 'ArrowUp' || keyLower === 'w') {
          keys['virtual_up'] = false;
          keys['KeyW'] = false;
          keys['ArrowUp'] = false;
          keys['w'] = false;
          keys['W'] = false;
        }
        if (e.code === 'KeyS' || e.code === 'ArrowDown' || keyLower === 's') {
          keys['virtual_down'] = false;
          keys['KeyS'] = false;
          keys['ArrowDown'] = false;
          keys['s'] = false;
          keys['S'] = false;
        }
        if (e.code === 'Space' || e.key === ' ') {
          keys['virtual_jump'] = false;
          keys['Space'] = false;
          keys[' '] = false;
        }
        if (e.key === 'Shift' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          keys['virtual_sprint'] = false;
        }
      };


      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleNativeKeyDown);
        window.addEventListener('keyup', handleNativeKeyUp);
      }

      (p as any).cleanup = () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('keydown', handleNativeKeyDown);
          window.removeEventListener('keyup', handleNativeKeyUp);
        }
      };

      p.mousePressed = (e?: MouseEvent | TouchEvent) => {
        if (isModalActive) return;
        if (e && (e as any).target && (e as any).target !== (p as any).canvas) {
          return;
        }
        isDragging = true;
        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
      };

      p.mouseDragged = (e?: MouseEvent | TouchEvent) => {
        if (isModalActive || !isDragging) return;
        if (e && (e as any).target && (e as any).target !== (p as any).canvas) {
          return;
        }
        if (
          Math.abs(playerBody.vx) > 0.08 ||
          Math.abs(playerBody.vy) > 0.08 ||
          Math.hypot(joystickVector.x, joystickVector.y) > 0.05 ||
          keys['virtual_left'] ||
          keys['virtual_right'] ||
          keys['virtual_up'] ||
          keys['virtual_down']
        ) {
          cameraFollowsPlayer = true;
          return;
        }

        const dx = p.mouseX - prevMouseX;
        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;

        cameraFollowsPlayer = false;
        targetCamX += dx * 0.85;

        const minCamX = p.width / 2 - WORLD_BOUNDS.maxX * zoom;
        const maxCamX = p.width / 2 - WORLD_BOUNDS.minX * zoom;
        targetCamX = p.constrain(targetCamX, minCamX, maxCamX);
      };

      p.mouseReleased = () => {
        isDragging = false;
      };

      (p as any).mouseWheel = (e: WheelEvent) => {
        if (isModalActive) {
          return true;
        }

        const zoomFactor = e.deltaY < 0 ? 1.04 : 0.96;
        const newTargetZoom = p.constrain(targetZoom * zoomFactor, MIN_ZOOM, MAX_ZOOM);

        if (newTargetZoom !== targetZoom) {
          const mouseWorldX = (p.mouseX - targetCamX) / targetZoom;
          targetCamX = p.mouseX - mouseWorldX * newTargetZoom;
          targetZoom = newTargetZoom;
        }

        return false;
      };
    };
  }
}


