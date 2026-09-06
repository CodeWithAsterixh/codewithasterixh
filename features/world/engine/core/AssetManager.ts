import type p5 from 'p5';
import { getOptimizedImageUrl } from '../../utils/imageProxy';

export class AssetManager {
  private textureCache = new Map<string, HTMLImageElement>();
  public currentThemeMode: 'light' | 'dark' = 'light';

  constructor(private p: p5) {}

  public resolveAssetPath(src: string, mode?: 'light' | 'dark'): string {
    if (!src) return src;
    if (src.startsWith('/dark/')) return getOptimizedImageUrl(src, 35, 480);
    const effectiveMode = mode || this.currentThemeMode;
    let target = src;
    if (effectiveMode === 'dark') {
      if (src.startsWith('/objects/') || src.startsWith('/locations/')) {
        target = '/dark' + src;
      }
    }
    return getOptimizedImageUrl(target, 35, 480);
  }

  public getTexture(src: string, mode?: 'light' | 'dark'): HTMLImageElement {
    const targetSrc = this.resolveAssetPath(src, mode);
    let img = this.textureCache.get(targetSrc);
    if (!img) {
      img = new Image();
      img.src = targetSrc;
      this.textureCache.set(targetSrc, img);
    }
    return img;
  }
}
