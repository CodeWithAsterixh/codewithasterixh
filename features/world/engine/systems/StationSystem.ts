import type p5 from 'p5';
import { WORLD_LOCATIONS, MapLocationEntry } from '../../data/mapLayout';
import { INTERACTIVE_OBJECTS, InteractiveWorldObject } from '../../data/mapObjects';
import { AssetManager } from '../core/AssetManager';
import { DepthEngine } from '../core/DepthEngine';
import {
  drawSingleInteractiveObject,
  drawSingleStationKiosk,
  renderServicesGarage,
  renderHomeBeacon,
  renderContactMailbox,
  renderMapBoundaries,
} from '../renderers/stationRenderer';

function drawGarageEntity(p: p5, _ctx: CanvasRenderingContext2D, mgr: AssetManager, playerX: number) {
  renderServicesGarage(p, playerX, mgr.currentThemeMode, (s, m) => mgr.getTexture(s, m));
}
function drawHomeEntity(p: p5, _ctx: CanvasRenderingContext2D, mgr: AssetManager, playerX: number) {
  renderHomeBeacon(p, playerX, mgr.currentThemeMode, (s, m) => mgr.getTexture(s, m));
}
function drawMailboxEntity(p: p5, _ctx: CanvasRenderingContext2D, mgr: AssetManager, playerX: number) {
  renderContactMailbox(p, playerX, mgr.currentThemeMode, (s, m) => mgr.getTexture(s, m));
}
function drawKioskEntity(p: p5, _ctx: CanvasRenderingContext2D, _mgr: AssetManager, data: { loc: MapLocationEntry; px: number }) {
  drawSingleStationKiosk(p, data.loc, data.px);
}
function drawObjEntity(p: p5, _ctx: CanvasRenderingContext2D, mgr: AssetManager, data: { obj: InteractiveWorldObject; px: number; wt: number }) {
  drawSingleInteractiveObject(p, data.obj, data.px, data.wt, (s, m) => mgr.getTexture(s, m));
}

export class StationSystem {
  public populateDepth(
    depthEngine: DepthEngine,
    playerX: number,
    windTimer: number,
    _assetMgr: AssetManager,
    viewLeft: number,
    viewRight: number
  ): void {
    if (-520 >= viewLeft - 400 && -520 <= viewRight + 400) depthEngine.add(48, drawGarageEntity, playerX);
    if (0 >= viewLeft - 450 && 0 <= viewRight + 450) depthEngine.add(48, drawHomeEntity, playerX);
    if (220 >= viewLeft - 200 && 220 <= viewRight + 200) depthEngine.add(64, drawMailboxEntity, playerX);

    for (const loc of WORLD_LOCATIONS) {
      if (Math.abs(loc.x) <= 600 || loc.x < viewLeft - 200 || loc.x > viewRight + 200) continue;
      depthEngine.add(68, drawKioskEntity, { loc, px: playerX });
    }

    for (const obj of INTERACTIVE_OBJECTS) {
      if (obj.x < viewLeft - 200 || obj.x > viewRight + 200) continue;
      depthEngine.add(68 + (obj.yOffset || 0), drawObjEntity, { obj, px: playerX, wt: windTimer });
    }
  }

  public renderBoundaries(p: p5): void {
    renderMapBoundaries(p);
  }
}
