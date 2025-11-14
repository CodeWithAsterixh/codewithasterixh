/**
 * Paints a solid-color square on a canvas and returns a PNG data-URL.
 *
 * @param color - any valid CSS color string (hex, rgb(a), named colors…)
 * @param size  - the width/height of the square in pixels (default: 32)
 * @param radius - border radius in pixels (default: 0)
 * @param label - optional text to render centered on the swatch
 * @param labelColor - optional text color (default: black)
 * @returns     - a `data:image/png;base64,…` string usable as an <img> src
 */
export function createColorSwatchDataUrl(
  color: string,
  size: number = 32,
  radius: number = 0,
  label?: string,
  labelColor: string = '#000'
): string {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get 2D context on canvas')
  }

  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  // draw white background
  drawRoundedRect(0, 0, size, size, radius)
  ctx.fillStyle = '#fff'
  ctx.fill()

  // Draw the swatch color
  drawRoundedRect(0, 0, size, size, radius)
  ctx.fillStyle = color
  ctx.fill()

  // Optionally add label
  if (label) {
    ctx.fillStyle = labelColor
    ctx.font = `${size * 0.4}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, size / 2, size / 2)
  }

  return canvas.toDataURL('image/png')
}
