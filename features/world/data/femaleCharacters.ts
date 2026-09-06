import { CharacterDef } from '../types';

export const FEMALE_CHARACTERS: Record<string, CharacterDef> = {
  Countess_claire: {
    id: 'Countess_claire',
    name: 'Countess Claire',
    gender: 'female',
    folderPath: '/characters/female/Countess_claire',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_4.png', shield: 'Idle.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 52, walkForce: 460, runForce: 870, jumpImpulse: -1550,
      maxJumpHeight: 30, restitution: 0.0, dragCoefficient: 0.30,
    },
  },
  bridget: {
    id: 'bridget',
    name: 'Bridget',
    gender: 'female',
    folderPath: '/characters/female/bridget',
    actions: {
      idle: 'Idle.png', walk: 'Walk.png', run: 'Run.png', jump: 'Jump.png',
      attack: 'Attack_1.png', attack1: 'Attack_1.png', attack2: 'Attack_2.png',
      attack3: 'Attack_3.png', attack4: 'Attack_4.png', shield: 'Idle.png',
      hurt: 'Hurt.png', dead: 'Dead.png',
    },
    physics: {
      mass: 54, walkForce: 470, runForce: 880, jumpImpulse: -1580,
      maxJumpHeight: 30, restitution: 0.0, dragCoefficient: 0.30,
    },
  },
};
