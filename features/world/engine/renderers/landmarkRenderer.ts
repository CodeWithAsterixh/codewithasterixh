import type p5 from 'p5';
import { renderLandmarkPrompt } from './landmarkPrompt';

export function renderServicesGarage(
  p: p5,
  playerX: number,
  currentThemeMode: 'light' | 'dark',
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const garageImg = getTexture('/objects/garage.png');
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
  const garageWidth = 650;
  const garageX = -520;
  const isPlayerNearby = Math.abs(playerX - garageX) <= 120;

  p.push();
  if (garageImg.complete && garageImg.naturalWidth > 0) {
    const aspect = garageImg.naturalWidth / garageImg.naturalHeight;
    const drawW = garageWidth;
    const drawH = garageWidth / aspect;
    p.noStroke();
    p.fill(0, 0, 0, currentThemeMode === 'dark' ? 120 : 95);
    p.ellipse(garageX, 48, 340, 24);
    ctx.drawImage(garageImg, garageX - drawW / 2, 48 - drawH * (1304 / 1536), drawW, drawH);
  }

  if (isPlayerNearby) {
    renderLandmarkPrompt(p, garageX, -80, '[ E ] Inspect Services');
  }
  p.pop();
}

export function renderHomeBeacon(
  p: p5,
  playerX: number,
  currentThemeMode: 'light' | 'dark',
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const homeImg = getTexture('/objects/home.png');
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
  const homeWidth = 780;
  const isPlayerNearby = Math.abs(playerX) <= 80;

  p.push();
  if (homeImg.complete && homeImg.naturalWidth > 0) {
    const aspect = homeImg.naturalWidth / homeImg.naturalHeight;
    const drawW = homeWidth;
    const drawH = homeWidth / aspect;
    p.noStroke();
    p.fill(0, 0, 0, currentThemeMode === 'dark' ? 120 : 95);
    p.ellipse(0, 48, homeWidth * 0.78, 28);
    ctx.drawImage(homeImg, -drawW / 2, 48 - drawH * (1338 / 1536), drawW, drawH);
  } else {
    p.stroke(91, 155, 243, 160);
    p.strokeWeight(1.5);
    p.line(0, -180, 0, 0);
  }

  if (isPlayerNearby) {
    renderLandmarkPrompt(p, -90, -90, '[ E ] Inspect Home');
  }
  p.pop();
}

export function renderContactMailbox(
  p: p5,
  playerX: number,
  currentThemeMode: 'light' | 'dark',
  getTexture: (src: string, mode?: 'light' | 'dark') => HTMLImageElement
) {
  const mailboxImg = getTexture('/objects/mailbox.png');
  const ctx: CanvasRenderingContext2D = (p as any).drawingContext;
  const mailboxWidth = 260;
  const mailboxX = 220;
  const isPlayerNearby = Math.abs(playerX - mailboxX) <= 70;

  p.push();
  if (mailboxImg.complete && mailboxImg.naturalWidth > 0) {
    const aspect = mailboxImg.naturalWidth / mailboxImg.naturalHeight;
    const drawW = mailboxWidth;
    const drawH = mailboxWidth / aspect;
    p.noStroke();
    p.fill(0, 0, 0, currentThemeMode === 'dark' ? 100 : 85);
    p.ellipse(mailboxX, 64, 75, 12);
    ctx.drawImage(mailboxImg, mailboxX - drawW / 2, 64 - drawH * (1535 / 1536), drawW, drawH);
  }

  if (isPlayerNearby) {
    renderLandmarkPrompt(p, mailboxX, -60, '[ E ] Contact Asterixh');
  }
  p.pop();
}
