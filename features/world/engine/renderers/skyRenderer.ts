import type p5 from 'p5';
import { getActiveMapLocation, DEFAULT_ATMOSPHERE } from '../../data/mapLayout';

export function renderSkyAndClouds(
  p: p5,
  camX: number,
  camY: number,
  playerX: number,
  currentThemeMode: 'light' | 'dark',
  activeMoonSrc: string,
  windTimer: number,
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
  const screenW = p.width;
  const groundScreenY = camY;
  const skyHeight = Math.max(200, groundScreenY + 20);

  const activeLoc = getActiveMapLocation(playerX);
  const skyBgSrc =
    currentThemeMode === 'dark'
      ? '/locations/world/bg_night.png'
      : activeLoc.background || DEFAULT_ATMOSPHERE.background;
  const cloudLayers = activeLoc.clouds || DEFAULT_ATMOSPHERE.clouds;

  if (skyBgSrc) {
    const bgImg = getTexture(skyBgSrc);
    if (bgImg.complete && bgImg.naturalWidth > 0) {
      const aspect = bgImg.naturalWidth / bgImg.naturalHeight;
      let targetH = skyHeight;
      let targetW = targetH * aspect;
      if (targetW < screenW) {
        targetW = screenW;
        targetH = targetW / aspect;
      }
      const parallaxOffset = -camX * 0.02;
      let startX = parallaxOffset % targetW;
      if (startX > 0) startX -= targetW;
      const targetY = groundScreenY - targetH;
      let drawX = startX;
      while (drawX < screenW) {
        ctx.drawImage(bgImg, drawX, targetY, targetW + 1, targetH + 1);
        drawX += targetW;
      }
    }
  }

  if (currentThemeMode === 'dark') {
    const moonImg = getTexture(activeMoonSrc);
    if (moonImg.complete && moonImg.naturalWidth > 0) {
      const aspect = moonImg.naturalWidth / moonImg.naturalHeight;
      let targetH = skyHeight;
      let targetW = targetH * aspect;
      if (targetW < screenW) {
        targetW = screenW;
        targetH = targetW / aspect;
      }
      const parallaxOffset = -camX * 0.01;
      let startX = parallaxOffset % targetW;
      if (startX > 0) startX -= targetW;
      const targetY = groundScreenY - targetH;
      let drawX = startX;
      while (drawX < screenW) {
        ctx.drawImage(moonImg, drawX, targetY, targetW + 1, targetH + 1);
        drawX += targetW;
      }
    }
  }

  p.push();
  if (currentThemeMode === 'dark') ctx.globalAlpha = 0.5;
  for (let i = 0; i < cloudLayers.length; i++) {
    const cloud = cloudLayers[i];
    const cloudImg = getTexture(cloud.src);
    if (!cloudImg.complete || cloudImg.naturalWidth === 0) continue;

    const aspect = cloudImg.naturalWidth / cloudImg.naturalHeight;
    let targetH = skyHeight * 0.88;
    let targetW = targetH * aspect;
    if (targetW < screenW) {
      targetW = screenW;
      targetH = targetW / aspect;
    }
    const parallaxOffset = -camX * (cloud.parallax * 0.25) + windTimer * (cloud.speed * 0.85);
    let startX = parallaxOffset % targetW;
    if (startX > 0) startX -= targetW;
    const yOffset = cloud.yOffset !== undefined ? cloud.yOffset : -140;
    const targetY = groundScreenY - targetH + yOffset;

    let drawX = startX;
    while (drawX < screenW) {
      ctx.drawImage(cloudImg, drawX, targetY, targetW + 1, targetH + 1);
      drawX += targetW;
    }
  }
  p.pop();
}
