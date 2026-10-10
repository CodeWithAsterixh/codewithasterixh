import { CharacterId, CharacterAction, NinjaType } from '../types';
import { CHARACTER_DEFS, NINJA_DEFS, NINJA_TYPES } from '../data/characterData';
import { getOptimizedImageUrl } from '../utils/imageProxy';

export interface SpriteCacheItem {
  img: HTMLImageElement;
  isLoaded: boolean;
  totalFrames: number;
}

export class CharacterSpriteManager {
  private cache: Map<string, SpriteCacheItem> = new Map();

  public getSprite(characterId: CharacterId, action: CharacterAction): SpriteCacheItem | null {
    const def = CHARACTER_DEFS[characterId];
    if (!def) return null;

    const actionFile = def.actions[action] || def.actions.idle;
    const fullPath = `${def.folderPath}/${actionFile}`;
    const key = `${characterId}_${action}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const img = new Image();
    const item: SpriteCacheItem = { img, isLoaded: false, totalFrames: 1 };
    img.onload = () => {
      item.isLoaded = true;
      const fh = img.naturalHeight || 128;
      item.totalFrames = Math.max(1, Math.floor(img.naturalWidth / fh));
    };
    img.src = fullPath;
    this.cache.set(key, item);
    return item;
  }

  public getNinjaSprite(type: NinjaType, action: string): SpriteCacheItem | null {
    const def = NINJA_DEFS[type];
    if (!def) return null;

    const actionFile = (def.actions as any)[action] || def.actions.idle;
    const fullPath = `${def.folderPath}/${actionFile}`;
    const key = `ninja_${type}_${action}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const img = new Image();
    const item: SpriteCacheItem = { img, isLoaded: false, totalFrames: 1 };
    img.onload = () => {
      item.isLoaded = true;
      const fh = img.naturalHeight || 128;
      item.totalFrames = Math.max(1, Math.floor(img.naturalWidth / fh));
    };
    img.src = fullPath;
    this.cache.set(key, item);
    return item;
  }

  public preloadCharacter(characterId: CharacterId) {
    const actions: CharacterAction[] = [
      'idle', 'walk', 'run', 'jump', 'attack', 'attack1', 'attack2', 'attack3', 'attack4', 'hurt', 'dead',
    ];
    actions.forEach((act) => this.getSprite(characterId, act));
  }

  public preloadNinja(type: NinjaType) {
    const actions = ['idle', 'walk', 'run', 'jump', 'attack', 'attack1', 'attack2', 'hurt', 'dead'];
    actions.forEach((act) => this.getNinjaSprite(type, act));
  }

  public preloadAllNinjas() {
    NINJA_TYPES.forEach((type) => this.preloadNinja(type));
  }
}

export const characterSpriteManager = new CharacterSpriteManager();
