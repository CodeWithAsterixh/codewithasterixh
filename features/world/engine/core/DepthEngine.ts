import type p5 from 'p5';
import { AssetManager } from './AssetManager';

export interface DepthItem {
  y: number;
  render: (p: p5, ctx: CanvasRenderingContext2D, mgr: AssetManager, data?: any) => void;
  data?: any;
}

export class DepthEngine {
  private pool: DepthItem[] = [];
  private count: number = 0;

  public clear(): void {
    this.count = 0;
  }

  public add(
    y: number,
    render: (p: p5, ctx: CanvasRenderingContext2D, mgr: AssetManager, data?: any) => void,
    data?: any
  ): void {
    if (this.count < this.pool.length) {
      const item = this.pool[this.count];
      item.y = y;
      item.render = render;
      item.data = data;
    } else {
      this.pool.push({ y, render, data });
    }
    this.count++;
  }

  public render(p: p5, assetMgr: AssetManager): void {
    if (this.count === 0) return;
    const active = this.pool.slice(0, this.count);
    active.sort((a, b) => a.y - b.y);
    const ctx = (p as any).drawingContext as CanvasRenderingContext2D;
    for (let i = 0; i < this.count; i++) {
      active[i].render(p, ctx, assetMgr, active[i].data);
    }
  }
}
