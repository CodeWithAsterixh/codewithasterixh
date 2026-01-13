/**
 * Converts an RGB or RGBA string to a hex string.
 * Examples:
 *   rgbToHex("rgb(255, 0, 0)")        -> "#ff0000"
 *   rgbToHex("rgba(255, 0, 0, 0.5)")    -> "#ff000080"
 *
 * @param color - The RGB or RGBA string.
 * @returns The hex representation of the color.
 */
export function rgbToHex(color: string): string {
  // Regular expression to match rgb/rgba values
  const rgbRegex =
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/;
  const result = rgbRegex.exec(color);
  if (!result) {
    throw new Error("Invalid rgb/rgba color string");
  }

  const r = Number.parseInt(result[1], 10);
  const g = Number.parseInt(result[2], 10);
  const b = Number.parseInt(result[3], 10);

  // Ensure r, g, b are within 0-255
  if ([r, g, b].some((val) => val < 0 || val > 255)) {
    throw new Error("RGB values must be between 0 and 255");
  }

  // Convert r, g, b to hex and pad with leading zeros if needed
  let hex =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  // Check for an alpha value and append if present
  if (result[4] !== undefined) {
    const alpha = Number.parseFloat(result[4]);
    if (alpha < 0 || alpha > 1) {
      throw new Error("Alpha value must be between 0 and 1");
    }
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    hex += alphaHex;
  }

  return hex;
}

/**
 * Converts a hex color string to an RGB or RGBA string.
 * Examples:
 *   hexToRgb("#ff0000")       -> "rgb(255, 0, 0)"
 *   hexToRgb("#ff000080")     -> "rgba(255, 0, 0, 0.50)"
 *
 * Supports shorthand hex notation (#abc or #abcd).
 *
 * @param hex - The hex color string.
 * @returns The RGB(A) representation of the color.
 */
export function hexToRgb(hex: string): string {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  if (![3, 4, 6, 8].includes(hex.length)) {
    throw new Error("Invalid hex color");
  }

  // Expand shorthand notation (e.g. "abc" -> "aabbcc")
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  // Now hex is either 6 or 8 characters
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  if (hex.length === 6) {
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const a = Number.parseInt(hex.substring(6, 8), 16) / 255;
    // Limit alpha to 2 decimal places
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
}

/**
 * Converts a hex color string to an RGB object.
 * Supports shorthand hex (e.g., "#abc") and full hex (e.g., "#aabbcc").
 */
export function hexToRgbObj(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (hex.length !== 6) {
    throw new Error("Invalid hex color");
  }
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Converts an RGB color value to HSL.
 * r, g, b are in [0, 255]
 * Returns h, s, l where h ∈ [0, 1], s ∈ [0, 1], l ∈ [0, 1]
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

/**
 * Converts an HSL color value to RGB.
 * h, s, l are in [0, 1]
 * Returns r, g, b in [0, 255]
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converts an RGB color value to a hex string.
 */
export function rgbToHexObj(r: number, g: number, b: number): string {
  const toHex = (x: number) => x.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
