import { Gender, CharacterId, CharacterDef } from '../types';
import { MALE_CHARACTERS } from './maleCharacters';
import { FEMALE_CHARACTERS } from './femaleCharacters';
import { NinjaDef, NINJA_DEFS, NINJA_TYPES } from './enemyNinjaData';

export type { NinjaDef };
export { NINJA_DEFS, NINJA_TYPES };

export const CHARACTER_DEFS: Record<CharacterId, CharacterDef> = {
  ...MALE_CHARACTERS,
  ...FEMALE_CHARACTERS,
} as Record<CharacterId, CharacterDef>;

export const GENDER_CHARACTERS: Record<Gender, CharacterId[]> = {
  male: ['Fighter', 'Samurai', 'Shinobi', 'Xavier'],
  female: ['Countess_claire', 'bridget'],
};

export const DEFAULT_GENDER: Gender = 'male';
export const DEFAULT_CHARACTER: CharacterId = 'Fighter';
