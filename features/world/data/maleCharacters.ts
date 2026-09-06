import { CharacterDef } from '../types';

export const MALE_CHARACTERS: Record<string, CharacterDef> = {
  Fighter: {
    id: 'Fighter',
    name: 'Fighter',
    gender: 'male',
    folderPath: '/characters/male/Fighter',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_1.png', shield: 'Shield.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 75, walkForce: 520, runForce: 950, jumpImpulse: -2160,
      maxJumpHeight: 30, restitution: 0.0, dragCoefficient: 0.35,
    },
  },
  Samurai: {
    id: 'Samurai',
    name: 'Samurai',
    gender: 'male',
    folderPath: '/characters/male/Samurai',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_2.png', shield: 'Shield.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 82, walkForce: 560, runForce: 990, jumpImpulse: -2360,
      maxJumpHeight: 30, restitution: 0.0, dragCoefficient: 0.38,
    },
  },
  Shinobi: {
    id: 'Shinobi',
    name: 'Shinobi',
    gender: 'male',
    folderPath: '/characters/male/Shinobi',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_3.png', shield: 'Shield.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 58, walkForce: 450, runForce: 850, jumpImpulse: -1670,
      maxJumpHeight: 35, restitution: 0.0, dragCoefficient: 0.30,
    },
  },
  Xavier: {
    id: 'Xavier',
    name: 'Xavier',
    gender: 'male',
    folderPath: '/characters/male/Xavier',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_1.png', shield: 'Protect.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 70, walkForce: 500, runForce: 920, jumpImpulse: -2000,
      maxJumpHeight: 32, restitution: 0.0, dragCoefficient: 0.33,
    },
  },
};
