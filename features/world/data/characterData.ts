import { Gender, CharacterId, CharacterDef } from '../types';

export const CHARACTER_DEFS: Record<CharacterId, CharacterDef> = {
  // Male Characters
  Fighter: {
    id: 'Fighter',
    name: 'Fighter',
    gender: 'male',
    folderPath: '/characters/male/Fighter',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      shield: 'Shield.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 75,
      walkForce: 520,
      runForce: 950,
      jumpImpulse: -2160, // 103.7 km/h Peak Takeoff Velocity
      maxJumpHeight: 30, // Max jump height capped at 30m
      restitution: 0.0,
      dragCoefficient: 0.35,
    },
  },
  Samurai: {
    id: 'Samurai',
    name: 'Samurai',
    gender: 'male',
    folderPath: '/characters/male/Samurai',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      shield: 'Shield.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 82,
      walkForce: 560,
      runForce: 990,
      jumpImpulse: -2360, // 103.6 km/h
      maxJumpHeight: 30, // 30m
      restitution: 0.0,
      dragCoefficient: 0.38,
    },
  },
  Shinobi: {
    id: 'Shinobi',
    name: 'Shinobi',
    gender: 'male',
    folderPath: '/characters/male/Shinobi',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      shield: 'Shield.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 58,
      walkForce: 450,
      runForce: 850,
      jumpImpulse: -1670, // 103.6 km/h
      maxJumpHeight: 35, // 35m agile jump
      restitution: 0.0,
      dragCoefficient: 0.30,
    },
  },

  // Female Characters
  Girl_1: {
    id: 'Girl_1',
    name: 'Girl 1',
    gender: 'female',
    folderPath: '/characters/female/Girl_1',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack.png',
      shield: 'Protection.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 54,
      walkForce: 440,
      runForce: 840,
      jumpImpulse: -1555, // 103.7 km/h
      maxJumpHeight: 30, // 30m
      restitution: 0.0,
      dragCoefficient: 0.32,
    },
  },
  Girl_2: {
    id: 'Girl_2',
    name: 'Girl 2',
    gender: 'female',
    folderPath: '/characters/female/Girl_2',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack.png',
      shield: 'Protection.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 52,
      walkForce: 430,
      runForce: 820,
      jumpImpulse: -1498, // 103.7 km/h
      maxJumpHeight: 30, // 30m
      restitution: 0.0,
      dragCoefficient: 0.30,
    },
  },
  Girl_3: {
    id: 'Girl_3',
    name: 'Girl 3',
    gender: 'female',
    folderPath: '/characters/female/Girl_3',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack.png',
      shield: 'Protection.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 50,
      walkForce: 420,
      runForce: 800,
      jumpImpulse: -1440, // 103.7 km/h
      maxJumpHeight: 30, // 30m
      restitution: 0.0,
      dragCoefficient: 0.28,
    },
  },
};

export const GENDER_CHARACTERS: Record<Gender, CharacterId[]> = {
  male: ['Fighter', 'Samurai', 'Shinobi'],
  female: ['Girl_1', 'Girl_2', 'Girl_3'],
};

export const DEFAULT_GENDER: Gender = 'male';
export const DEFAULT_CHARACTER: CharacterId = 'Fighter';
