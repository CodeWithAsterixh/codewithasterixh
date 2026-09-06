import type p5 from 'p5';
import {
  ALL_WORLD_TREES,
  ALL_WORLD_BUSHES,
  WORLD_LAMP_POSTS,
  FlatSceneryItem,
} from '../renderers/sceneryRenderer';
import { AssetManager } from '../core/AssetManager';
import { DepthEngine } from '../core/DepthEngine';
import { CurrentBiomeInfo } from '../sketch2d';
import { getActiveMapLocation, getNearbyStationKiosk } from '../../data/mapLayout';
import { getNearbyWorldObject } from '../../data/mapObjects';

function drawTreeEntity(p: p5, ctx: CanvasRenderingContext2D, mgr: AssetManager, tree: FlatSceneryItem) {
  const img = mgr.getTexture(tree.src);
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const isNight = mgr.currentThemeMode === 'dark';
  const treeH = tree.size;
  const treeW = treeH * (img.naturalWidth / img.naturalHeight);
  p.noStroke();
  p.fill(0, 0, 0, isNight ? 65 : 45);
  p.ellipse(tree.x, (tree.yOffset || 0) + 1, treeW * 0.20, 8);
  ctx.drawImage(img, tree.x - treeW / 2, (tree.yOffset || 0) - treeH * (274 / 324), treeW, treeH);
}

function drawBushEntity(p: p5, ctx: CanvasRenderingContext2D, mgr: AssetManager, bush: FlatSceneryItem) {
  const img = mgr.getTexture(bush.src);
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const isNight = mgr.currentThemeMode === 'dark';
  const bushH = bush.size;
  const bushW = bushH * (img.naturalWidth / img.naturalHeight);
  p.noStroke();
  p.fill(0, 0, 0, isNight ? 55 : 35);
  p.ellipse(bush.x, (bush.yOffset || 0) + 1, bushW * 0.45, 6);
  ctx.drawImage(img, bush.x - bushW / 2, (bush.yOffset || 0) - bushH + 2, bushW, bushH);
}

function drawLampEntity(p: p5, ctx: CanvasRenderingContext2D, mgr: AssetManager, lp: { x: number; yOffset: number }) {
  const isNight = mgr.currentThemeMode === 'dark';
  const lampImg = mgr.getTexture(isNight ? '/objects/light_on.png' : '/objects/light_off.png');
  if (!lampImg || !lampImg.complete || lampImg.naturalWidth === 0) return;
  const drawW = 430;
  const drawH = drawW / (2752 / 1536);
  const destY = lp.yOffset - drawH * (1534 / 1536);
  if (isNight) {
    const headX = lp.x;
    const headY = destY + drawH * (110 / 1536);
    const flicker = Math.sin((p as any).frameCount * 0.15 + lp.x * 0.05) * 0.02;
    const halo = ctx.createRadialGradient(headX, headY, 2, headX, headY, 115);
    halo.addColorStop(0, `rgba(255, 255, 230, ${0.72 + flicker})`);
    halo.addColorStop(0.25, `rgba(255, 230, 150, ${0.32 + flicker * 0.5})`);
    halo.addColorStop(0.65, `rgba(255, 205, 100, ${0.09 + flicker * 0.2})`);
    halo.addColorStop(1, 'rgba(255, 190, 80, 0)');
    ctx.save();
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(headX, headY, 115, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  p.noStroke();
  p.fill(0, 0, 0, isNight ? 80 : 60);
  p.ellipse(lp.x, lp.yOffset + 1, 46, 10);
  ctx.drawImage(lampImg, lp.x - drawW / 2, destY, drawW, drawH);
}

export class ScenerySystem {
  private lastBiomeKey: string = '';
  private lastBiomeResult: CurrentBiomeInfo | null = null;

  public populateDepth(
    depthEngine: DepthEngine,
    viewLeft: number,
    viewRight: number,
    _assetMgr: AssetManager
  ): void {
    for (const tree of ALL_WORLD_TREES) {
      if (tree.x < viewLeft - 200 || tree.x > viewRight + 200) continue;
      depthEngine.add(tree.yOffset || 0, drawTreeEntity, tree);
    }
    for (const bush of ALL_WORLD_BUSHES) {
      if (bush.x < viewLeft - 200 || bush.x > viewRight + 200) continue;
      depthEngine.add(bush.yOffset || 0, drawBushEntity, bush);
    }
    for (const lp of WORLD_LAMP_POSTS) {
      if (lp.x < viewLeft - 200 || lp.x > viewRight + 200) continue;
      depthEngine.add(lp.yOffset, drawLampEntity, lp);
    }
  }

  public calculateBiome(playerX: number): CurrentBiomeInfo | null {
    const activeLoc = getActiveMapLocation(playerX);
    const nearbyKiosk = getNearbyStationKiosk(playerX);
    const nearbyObj = getNearbyWorldObject(playerX);

    const key = `${activeLoc.id}_${nearbyKiosk?.id || ''}_${nearbyObj?.id || ''}`;
    if (key === this.lastBiomeKey && this.lastBiomeResult) {
      return null;
    }
    this.lastBiomeKey = key;
    this.lastBiomeResult = {
      id: activeLoc.id,
      category: activeLoc.category,
      name: activeLoc.name,
      tag: activeLoc.tag,
      featureType: activeLoc.featureType,
      featureTitle: activeLoc.featureTitle,
      description: activeLoc.description,
      x: activeLoc.x,
      isNearbyKiosk: !!nearbyKiosk || !!nearbyObj,
      actionLabel: nearbyObj ? nearbyObj.actionLabel : nearbyKiosk ? nearbyKiosk.actionLabel : undefined,
      nearbyObject: nearbyObj || null,
    };
    return this.lastBiomeResult;
  }
}
