import { NinjaType } from '../types';

export interface NinjaDef {
  type: NinjaType;
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

export const NINJA_DEFS: Record<NinjaType, NinjaDef> = {
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

export const NINJA_TYPES: NinjaType[] = ['Kunoichi', 'Ninja_Monk', 'Ninja_Peasant'];
