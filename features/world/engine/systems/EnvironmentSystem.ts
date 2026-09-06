import type p5 from 'p5';
import { renderSkyAndClouds, renderMapSceneryAndFloor } from '../renderers/environmentRenderer';
import { AssetManager } from '../core/AssetManager';

export class EnvironmentSystem {
  public moonType: 'beige' | 'normal' | 'red' = 'beige';

  public renderBackground(
    p: p5,
    camX: number,
    camY: number,
    playerX: number,
    windTimer: number,
    assetMgr: AssetManager
  ): void {
    const moonSrc = `/locations/world/moon_${this.moonType}.png`;
    renderSkyAndClouds(
      p,
      camX,
      camY,
      playerX,
      assetMgr.currentThemeMode,
      moonSrc,
      windTimer,
      (src, mode) => assetMgr.getTexture(src, mode)
    );
  }

  public renderFloor(
    p: p5,
    viewLeft: number,
    viewRight: number,
    viewBottom: number,
    assetMgr: AssetManager
  ): void {
    renderMapSceneryAndFloor(
      p,
      viewLeft,
      viewRight,
      viewBottom,
      (src, mode) => assetMgr.getTexture(src, mode)
    );
  }
}
