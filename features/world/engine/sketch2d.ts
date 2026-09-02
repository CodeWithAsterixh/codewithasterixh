import type p5 from 'p5';
import { Gender, CharacterId, CharacterAction, LocationCategory } from '../types';
import { DEFAULT_GENDER, DEFAULT_CHARACTER, CHARACTER_DEFS } from '../data/characterData';
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
import { drawCharacterFrame, characterSpriteManager } from './characterAnimator';
import { PhysicsBody2D, PhysicsDustParticle, DEFAULT_WORLD_PHYSICS } from './physicsEngine';

export interface PhysicsTelemetry {
  mass: number;
  speed: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  isGrounded: boolean;
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
  img.src = src;
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

WORLD_LOCATIONS.forEach((loc) => {
  WORLD_DECORATIONS.trees.forEach((tree) => {
    const treeX = loc.x + tree.relX;
    if (Math.abs(treeX) >= 380) {
      const item: FlatSceneryItem = {
        x: treeX,
        src: tree.src,
        size: tree.size || 380,
        yOffset: tree.yOffset || 0,
      };
      ALL_WORLD_TREES.push(item);
      if (tree.depth === 'front') {
        FOREGROUND_TREES.push(item);
      } else {
        BACKGROUND_TREES.push(item);
      }
    }
  });

  WORLD_DECORATIONS.bushes.forEach((bush) => {
    const bushX = loc.x + bush.relX;
    if (Math.abs(bushX) >= 380) {
      const item: FlatSceneryItem = {
        x: bushX,
        src: bush.src,
        size: bush.size || 80,
        yOffset: bush.yOffset || 0,
      };
      ALL_WORLD_BUSHES.push(item);
      if (bush.depth === 'front') {
        FOREGROUND_BUSHES.push(item);
      } else {
        BACKGROUND_BUSHES.push(item);
      }
    }
  });
});

export function create2DSideViewSketch(callbacks?: Sketch2DCallbacks) {
  return (p: p5) => {
    let playerGender: Gender = DEFAULT_GENDER;
    let playerCharacter: CharacterId = DEFAULT_CHARACTER;
    let playerAction: CharacterAction = 'idle';
    let attackTimer = 0;

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

    // Preload new world assets exclusively from public/locations/world
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

      // Preload tree and bush decorations
      WORLD_DECORATIONS.trees.forEach((t) => getTexture(t.src));
      WORLD_DECORATIONS.bushes.forEach((b) => getTexture(b.src));

      // Preload interactive work objects and home base
      INTERACTIVE_OBJECTS.forEach((obj) => getTexture(obj.image));
      getTexture('/objects/home.png');
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

    (p as any).setGender = (gender: Gender) => {
      playerGender = gender;
      playerCharacter = gender === 'male' ? 'Fighter' : 'Girl_1';
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
      if (action === 'attack') {
        playerAction = 'attack';
        attackTimer = 18;
        attackPhase = 0;
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
        // Clear all movement keys and drag state immediately when a modal opens
        for (const k in keys) {
          keys[k] = false;
        }
        isDragging = false;
        if (playerBody.isGrounded && attackTimer <= 0) {
          playerAction = 'idle';
          callbacks?.onCharacterStateChange?.(playerGender, playerCharacter, 'idle');
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
      } else if (action === 'attack') {
        if (attackTimer <= 0) {
          playerAction = 'attack';
          attackTimer = 18;
          attackPhase = 0;
        }
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
      }
    };

    p.setup = () => {
      (p as any).pixelDensity(1);
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.frameRate(60);
      p.textAlign(p.CENTER, p.CENTER);
      (p as any).textFont('Pixelify Sans');
      
      const ctx = (p as any).drawingContext;
      if (ctx) ctx.imageSmoothingEnabled = false;

      camX = p.width / 2;
      camY = p.height * 0.72;
      targetCamX = p.width / 2;
      targetCamY = p.height * 0.72;
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      targetCamY = p.height * 0.72;
    };

    p.draw = () => {
      // 1. Lush Green Base Meadow Fill
      p.background(78, 160, 89);
      windTimer += 0.4;

      // 2. Physics Simulation
      simulatePhysics();

      // 3. Camera Smooth Follow with strict viewport screen boundary clamping
      targetCamY = p.height * 0.72;

      const isPlayerActivelyMoving =
        Math.abs(playerBody.vx) > 0.05 ||
        Math.abs(playerBody.vy) > 0.05 ||
        Math.hypot(joystickVector.x, joystickVector.y) > 0.05 ||
        keys['virtual_left'] ||
        keys['virtual_right'] ||
        keys['virtual_up'] ||
        keys['virtual_down'];

      if (isPlayerActivelyMoving) {
        cameraFollowsPlayer = true;
        isDragging = false;
      }

      if (cameraFollowsPlayer) {
        targetCamX = p.width / 2 - playerBody.x * zoom;
      }

      // Strict viewport edge clamping: Left and right screen edges NEVER cross boundaries
      const minCamX = p.width - WORLD_BOUNDS.maxX * zoom;
      const maxCamX = -WORLD_BOUNDS.minX * zoom;
      targetCamX = p.constrain(targetCamX, minCamX, maxCamX);

      camX = p.lerp(camX, targetCamX, 0.10);
      camY = p.lerp(camY, targetCamY, 0.10);
      zoom = p.lerp(zoom, targetZoom, 0.10);

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

      // 8. Render Boundary Walls
      renderMapBoundaries();

      p.pop();
    };

    function resolveSolidObstacleCollisions() {
      // 1. Home Base building (stops player from walking into the building in the background)
      if (Math.abs(playerBody.x) < 380) {
        if (playerBody.y < -12) {
          playerBody.y = -12;
          if (playerBody.vy < 0) playerBody.vy = 0;
        }
      }

      // 2. Interactive Landmark Objects (Chest, Briefcase, Vault, Chamber, Bag)
      for (let i = 0; i < INTERACTIVE_OBJECTS.length; i++) {
        const obj = INTERACTIVE_OBJECTS[i];
        if (Math.abs(playerBody.x - obj.x) < 70) {
          resolveObstacleEllipse(obj.x, obj.yOffset || 0, 34, 15);
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
      const isJump = !!(keys['Space'] || keys['KeyK'] || keys['k'] || keys['K'] || keys['virtual_jump']);
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
        if ((moveDirX > 0 && playerBody.vx < -0.3) || (moveDirX < 0 && playerBody.vx > 0.3)) {
          playerBody.vx *= 0.2;
        }
        playerBody.vx += moveDirX * (forceMag / playerBody.mass) * 0.22;
      } else {
        playerBody.vx *= 0.80;
        if (Math.abs(playerBody.vx) < 0.05) playerBody.vx = 0;
      }

      // Dynamic speed scaling: If using joystick, maxSpeed scales with distance from center
      const speedScaleX = isUsingJoystick ? Math.min(1.0, Math.max(0.20, Math.abs(moveDirX))) : 1.0;
      const maxSpeedX = (isRunning ? 6.2 : 3.6) * speedScaleX;
      playerBody.vx = p.constrain(playerBody.vx, -maxSpeedX, maxSpeedX);

      // Y Movement & Speed Scaling (Up / Down depth axis)
      if (moveDirY !== 0) {
        if ((moveDirY > 0 && playerBody.vy < -0.3) || (moveDirY < 0 && playerBody.vy > 0.3)) {
          playerBody.vy *= 0.2;
        }
        playerBody.vy += moveDirY * (forceMag / playerBody.mass) * 0.12;
      } else {
        playerBody.vy *= 0.80;
        if (Math.abs(playerBody.vy) < 0.05) playerBody.vy = 0;
      }

      const speedScaleY = isUsingJoystick ? Math.min(1.0, Math.max(0.20, Math.abs(moveDirY))) : 1.0;
      const maxSpeedY = (isRunning ? 2.6 : 1.7) * speedScaleY;
      playerBody.vy = p.constrain(playerBody.vy, -maxSpeedY, maxSpeedY);

      // Jump Offset Simulation (Space bar / Jump button)
      if (isJump && jumpOffset === 0) {
        jumpVelocity = -10.2;
        playerBody.isGrounded = false;
        playerAction = 'jump';
        spawnDust(playerBody.x, playerBody.y, 4, 2.0);
        // Consume jump triggers immediately so single press = single jump
        keys['Space'] = false;
        keys['KeyK'] = false;
        keys['k'] = false;
        keys['K'] = false;
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
      playerBody.y = p.constrain(playerBody.y, -18, 30);
      const playerCollisionRadius = 40;
      if (playerBody.x <= WORLD_BOUNDS.minX + playerCollisionRadius) {
        playerBody.x = WORLD_BOUNDS.minX + playerCollisionRadius;
        if (playerBody.vx < 0) playerBody.vx = 0;
      }
      if (playerBody.x >= WORLD_BOUNDS.maxX - playerCollisionRadius) {
        playerBody.x = WORLD_BOUNDS.maxX - playerCollisionRadius;
        if (playerBody.vx > 0) playerBody.vx = 0;
      }

      // Attack trigger
      if ((keys['KeyJ'] || keys['KeyF'] || keys['j']) && attackTimer <= 0) {
        playerAction = 'attack';
        attackTimer = 18;
        attackPhase = 0;
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
          const strideSpeedFactor = playerAction === 'run' ? 0.15 : 0.11;
          walkPhase += currentSpeed * strideSpeedFactor;

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
      if (dustParticles.length > 10) {
        dustParticles.splice(0, dustParticles.length - 10);
      }

      for (let i = dustParticles.length - 1; i >= 0; i--) {
        const pArt = dustParticles[i];
        pArt.x += pArt.vx;
        pArt.y += pArt.vy;
        pArt.vy += 0.08;
        pArt.life++;
        pArt.alpha = 1 - pArt.life / pArt.maxLife;

        if (pArt.life >= pArt.maxLife) {
          dustParticles.splice(i, 1);
          continue;
        }

        p.noStroke();
        p.fill(104, 179, 90, pArt.alpha * 180);
        p.ellipse(pArt.x, pArt.y, pArt.size / zoom, pArt.size / zoom);
      }
    }

    function renderPlayerCharacter() {
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
      const currentTimeSec = (typeof performance !== 'undefined' ? performance.now() : (p as any).millis()) / 1000;

      let activeProgress = currentTimeSec;
      if (playerAction === 'walk' || playerAction === 'run') {
        activeProgress = walkPhase;
      } else if (playerAction === 'jump') {
        activeProgress = jumpPhase;
      } else if (playerAction === 'attack') {
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
        activeProgress,
        140
      );
    }

    // Render Sky Gradient (bg.png) and Cloud Layers from public/locations/world
    function renderSkyAndClouds() {
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
      const screenW = p.width;
      const groundScreenY = camY;
      const skyHeight = Math.max(200, groundScreenY + 20);

      const activeLoc = getActiveMapLocation(playerBody.x);
      const skyBgSrc = activeLoc.background || DEFAULT_ATMOSPHERE.background;
      const cloudLayers = activeLoc.clouds || DEFAULT_ATMOSPHERE.clouds;

      // 1. Draw Sky Background Texture (bg.png)
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

      // 2. Draw Cloud Layers (only active visible clouds)
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
    }

    // Render Ground Floor & Meadow (from public/locations/world/ground.png) - Fast Culled
    function renderMapSceneryAndFloor() {
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;

      const viewLeft = (-camX) / zoom - 300;
      const viewRight = (p.width - camX) / zoom + 300;
      const viewBottom = (p.height - camY) / zoom + 200;

      // 1. Solid Nature Meadow Fill below ground line (matches ground.png palette)
      p.noStroke();
      p.fill(62, 131, 53);
      p.rect(viewLeft - 100, GROUND_Y - 2, viewRight - viewLeft + 200, Math.max(400, viewBottom - GROUND_Y + 200));

      const groundImg = getTexture(DEFAULT_ATMOSPHERE.floor?.image || '/locations/world/ground.png');
      if (!groundImg.complete || groundImg.naturalWidth === 0) return;

      const targetH = DEFAULT_ATMOSPHERE.floor?.height || 520;
      const aspect = 576 / 324;
      const layerW = targetH * aspect;

      // Ground path ratio in 576x324 ground.png
      const groundSurfaceRatio = 265 / 324;
      const drawY = GROUND_Y - targetH * groundSurfaceRatio;

      let layerX = Math.floor(viewLeft / layerW) * layerW;
      while (layerX < viewRight + layerW) {
        ctx.drawImage(groundImg, layerX, drawY, layerW + 1, targetH + 1);
        layerX += layerW - 1;
      }
    }

    interface DepthEntity {
      y: number;
      draw: () => void;
    }

    function renderDepthSortedEntities() {
      const viewLeft = (-camX) / zoom - 450;
      const viewRight = (p.width - camX) / zoom + 450;
      const entities: DepthEntity[] = [];

      // 1. All Trees (rooted firmly in the grass meadow)
      for (let i = 0; i < ALL_WORLD_TREES.length; i++) {
        const tree = ALL_WORLD_TREES[i];
        if (tree.x < viewLeft || tree.x > viewRight) continue;
        const treeBaseY = (tree.yOffset || 0) + (tree.size > 450 ? 25 : -10);
        entities.push({
          y: treeBaseY,
          draw: () => drawSingleTree(tree),
        });
      }

      // 2. All Bushes (rooted in the grass meadow)
      for (let i = 0; i < ALL_WORLD_BUSHES.length; i++) {
        const bush = ALL_WORLD_BUSHES[i];
        if (bush.x < viewLeft || bush.x > viewRight) continue;
        const bushBaseY = (bush.yOffset || 0) + (bush.size > 90 ? 20 : -8);
        entities.push({
          y: bushBaseY,
          draw: () => drawSingleBush(bush),
        });
      }

      // 3. Interactive Landmark Objects (Chest, Briefcase, Vault, Chamber, Bag)
      for (let i = 0; i < INTERACTIVE_OBJECTS.length; i++) {
        const obj = INTERACTIVE_OBJECTS[i];
        if (obj.x < viewLeft || obj.x > viewRight) continue;
        entities.push({
          y: (obj.yOffset || 0) + 12,
          draw: () => drawSingleInteractiveObject(obj),
        });
      }

      // 4. Station Kiosks
      for (let i = 0; i < WORLD_LOCATIONS.length; i++) {
        const loc = WORLD_LOCATIONS[i];
        if (loc.x < viewLeft || loc.x > viewRight || loc.x === 0 || loc.id === 'station_home') continue;
        entities.push({
          y: -4,
          draw: () => drawSingleStationKiosk(loc),
        });
      }

      // 5. Home Base Building at X = 0 (baseline at y = -6)
      if (0 >= viewLeft && 0 <= viewRight) {
        entities.push({
          y: -6,
          draw: () => renderHomeBeacon(),
        });
      }

      // 6. Dust Particles
      if (dustParticles.length > 0) {
        entities.push({
          y: playerBody.y - 0.5,
          draw: () => renderDustParticles(),
        });
      }

      // 7. Player Character
      entities.push({
        y: playerBody.y,
        draw: () => renderPlayerCharacter(),
      });

      // Sort entities ascending by Y coordinate (back-to-front rendering)
      entities.sort((a, b) => a.y - b.y);

      // Render each entity in sorted order
      for (let i = 0; i < entities.length; i++) {
        entities[i].draw();
      }
    }

    function drawSingleTree(tree: FlatSceneryItem) {
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
      const img = getTexture(tree.src);
      if (!img.complete || img.naturalWidth === 0) return;

      const aspect = img.naturalWidth / img.naturalHeight;
      const treeH = tree.size;
      const treeW = treeH * aspect;
      const drawX = tree.x - treeW / 2;
      // Trunk base firmly planted in the grass meadow
      const drawY = GROUND_Y - treeH * 0.74 + (tree.yOffset || 0);

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
      const drawY = GROUND_Y - bushH * 0.78 + (bush.yOffset || 0);

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

    // Render Home Base Building at X = 0m
    function renderHomeBeacon() {
      const homeImg = getTexture('/objects/home.png');
      const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
      const homeWidth = 780;

      p.push();

      if (homeImg.complete && homeImg.naturalWidth > 0) {
        const aspect = homeImg.naturalWidth / homeImg.naturalHeight;
        const drawW = homeWidth;
        const drawH = homeWidth / aspect;
        const destX = 0 - drawW / 2;
        // Foundation baseline in home.png is at 87.1% height
        const destY = GROUND_Y - drawH * (1338 / 1536) + 4;

        // Ground Contact Shadow directly under base foundation
        p.noStroke();
        p.fill(0, 0, 0, 95);
        p.ellipse(0, GROUND_Y + 4, homeWidth * 0.78, 28);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(homeImg, destX, destY, drawW, drawH);
      } else {
        p.stroke(91, 155, 243, 160);
        p.strokeWeight(1.5);
        p.line(0, -180, 0, GROUND_Y);
      }

      p.pop();
    }

    const GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyJ', 'KeyF', 'KeyE'];
    const GAME_KEY_CHARS = [' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'e', 'E', 'j', 'J', 'f', 'F'];

    const handleNativeKeyDown = (e: KeyboardEvent) => {
      if (isModalActive) return;
      if (GAME_KEYS.includes(e.code) || GAME_KEY_CHARS.includes(e.key)) {
        e.preventDefault();
      }
      if (e.code) keys[e.code] = true;
      if (e.key) keys[e.key] = true;
      cameraFollowsPlayer = true;
    };

    const handleNativeKeyUp = (e: KeyboardEvent) => {
      if (GAME_KEYS.includes(e.code) || GAME_KEY_CHARS.includes(e.key)) {
        e.preventDefault();
      }
      if (e.code) keys[e.code] = false;
      if (e.key) keys[e.key] = false;

      if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.code === 'KeyA') {
        keys['ArrowLeft'] = false;
        keys['KeyA'] = false;
        keys['a'] = false;
        keys['A'] = false;
      }
      if (e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.code === 'KeyD') {
        keys['ArrowRight'] = false;
        keys['KeyD'] = false;
        keys['d'] = false;
        keys['D'] = false;
      }
      if (e.key === 'ArrowUp' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.code === 'KeyW') {
        keys['ArrowUp'] = false;
        keys['KeyW'] = false;
        keys['w'] = false;
        keys['W'] = false;
      }
      if (e.key === 'ArrowDown' || e.code === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.code === 'KeyS') {
        keys['ArrowDown'] = false;
        keys['KeyS'] = false;
        keys['s'] = false;
        keys['S'] = false;
      }
      if (e.code === 'Space' || e.key === ' ') {
        keys['Space'] = false;
        keys[' '] = false;
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
