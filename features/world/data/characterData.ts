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
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_1.png',
      shield: 'Shield.png',
      hurt: 'Hurt.png',
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
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_2.png',
      shield: 'Shield.png',
      hurt: 'Hurt.png',
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
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_3.png',
      shield: 'Shield.png',
      hurt: 'Hurt.png',
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
  Xavier: {
    id: 'Xavier',
    name: 'Xavier',
    gender: 'male',
    folderPath: '/characters/male/Xavier',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_1.png',
      shield: 'Protect.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 70,
      walkForce: 500,
      runForce: 920,
      jumpImpulse: -2000,
      maxJumpHeight: 32,
      restitution: 0.0,
      dragCoefficient: 0.33,
    },
  },

  // Female Characters
  Countess_claire: {
    id: 'Countess_claire',
    name: 'Countess Claire',
    gender: 'female',
    folderPath: '/characters/female/Countess_claire',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_4.png',
      shield: 'Idle.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 52,
      walkForce: 460,
      runForce: 870,
      jumpImpulse: -1550,
      maxJumpHeight: 30,
      restitution: 0.0,
      dragCoefficient: 0.30,
    },
  },
  bridget: {
    id: 'bridget',
    name: 'Bridget',
    gender: 'female',
    folderPath: '/characters/female/bridget',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      attack3: 'Attack_3.png',
      attack4: 'Attack_4.png',
      shield: 'Idle.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
    physics: {
      mass: 54,
      walkForce: 470,
      runForce: 880,
      jumpImpulse: -1580,
      maxJumpHeight: 30,
      restitution: 0.0,
      dragCoefficient: 0.30,
    },
  },
};

export const GENDER_CHARACTERS: Record<Gender, CharacterId[]> = {
  male: ['Fighter', 'Samurai', 'Shinobi', 'Xavier'],
  female: ['Countess_claire', 'bridget'],
};

export const DEFAULT_GENDER: Gender = 'male';
export const DEFAULT_CHARACTER: CharacterId = 'Fighter';

export interface NinjaDef {
  type: import('../types').NinjaType;
  name: string;
  folderPath: string;
  actions: {
    idle: string;
    walk: string;
    run: string;
    jump: string;
    attack: string;
    attack1: string;
    attack2: string;
    hurt: string;
    dead: string;
  };
}

export const NINJA_DEFS: Record<import('../types').NinjaType, NinjaDef> = {
  Kunoichi: {
    type: 'Kunoichi',
    name: 'Shadow Kunoichi',
    folderPath: '/characters/ninja/Kunoichi',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
  },
  Ninja_Monk: {
    type: 'Ninja_Monk',
    name: 'Iron Monk',
    folderPath: '/characters/ninja/Ninja_Monk',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
  },
  Ninja_Peasant: {
    type: 'Ninja_Peasant',
    name: 'Rogue Peasant',
    folderPath: '/characters/ninja/Ninja_Peasant',
    actions: {
      idle: 'Idle.png',
      walk: 'Walk.png',
      run: 'Run.png',
      jump: 'Jump.png',
      attack: 'Attack_1.png',
      attack1: 'Attack_1.png',
      attack2: 'Attack_2.png',
      hurt: 'Hurt.png',
      dead: 'Dead.png',
    },
  },
};

export const NINJA_TYPES: import('../types').NinjaType[] = ['Kunoichi', 'Ninja_Monk', 'Ninja_Peasant'];
