export const TOTAL_FRAMES = 12;
export const COLS = 4;
export const FRAME_SIZE = 272;
export const FRAME_DURATION = 30; // ms per frame

export function drawSpriteFrame(
  canvas: HTMLCanvasElement | null,
  img: HTMLImageElement | null,
  frame: number
): boolean {
  if (!canvas || !img || !img.complete) return false;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);

  const col = frame % COLS;
  const row = Math.floor(frame / COLS);
  const sx = col * FRAME_SIZE;
  const sy = row * FRAME_SIZE;

  ctx.drawImage(img, sx, sy, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);
  return true;
}
