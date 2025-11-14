type ColorPairInput = {
  primary?: string
  text?: string
}

type ColorPairOutput = {
  primary: string
  text: string
}

/**
 * Generate a well-contrasted color pair (primary and text) meeting WCAG standards.
 */
export function generateAccessibleColorPair({primary, text}: ColorPairInput = {}): ColorPairOutput {
  const hexToRgb = (hex: string): [number, number, number] => {
    hex = hex.replace(/^#/, '')
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    const num = parseInt(hex, 16)
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
  }

  const parseColor = (color: string): [number, number, number] => {
    if (color.startsWith('#')) return hexToRgb(color)

    const match = color.match(/\d+(\.\d+)?/g)?.map(Number)
    if (!match || match.length < 3) return [0, 0, 0]
    return [match[0], match[1], match[2]]
  }

  const getRandomColor = (): string => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
  }

  const getLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
  }

  const contrastRatio = (
    rgb1: [number, number, number],
    rgb2: [number, number, number],
  ): number => {
    const L1 = getLuminance(...rgb1)
    const L2 = getLuminance(...rgb2)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
  }

  const black: [number, number, number] = [0, 0, 0]
  const white: [number, number, number] = [255, 255, 255]

  const isReadable = (fg: [number, number, number], bg: [number, number, number]) =>
    contrastRatio(fg, bg) >= 4.5

  // --- CASE: Both provided, ensure readability ---
  if (primary && text) {
    const p = parseColor(primary)
    const t = parseColor(text)
    if (isReadable(t, p)) return {primary, text}
    throw new Error('Provided primary and text colors do not meet WCAG contrast requirements.')
  }

  // --- CASE: Only primary provided ---
  if (primary) {
    const p = parseColor(primary)
    const t = isReadable(black, p) ? '#000000' : '#FFFFFF'
    return {primary, text: t}
  }

  // --- CASE: Only text provided ---
  if (text) {
    const t = parseColor(text)

    while (true) {
      const rand = getRandomColor()
      const rParsed = parseColor(rand)
      if (isReadable(t, rParsed)) return {primary: rand, text}
    }
  }

  // --- CASE: None provided ---
  while (true) {
    const rand = getRandomColor()
    const rParsed = parseColor(rand)
    if (isReadable(black, rParsed)) return {primary: rand, text: '#000000'}
    if (isReadable(white, rParsed)) return {primary: rand, text: '#FFFFFF'}
  }
}
