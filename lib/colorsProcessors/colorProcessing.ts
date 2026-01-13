import { hexToRgbObj, hslToRgb, rgbToHexObj, rgbToHsl } from "./colorConverter";

export function getContrastingTextColor(color: string): string {
    // Remove any hash from the beginning
    let hex = color.replace('#', '');
  
    // Expand shorthand (e.g., "03F") to full form (e.g., "0033FF")
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
  
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color provided");
    }
  
    // Convert hex to RGB values
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
  
    // Calculate luminance using the YIQ formula:
    // (r*299 + g*587 + b*114) / 1000
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
    // If luminance is high, return black; otherwise, return white
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }
  
  export function getShade(color: string, shade: number): string {
    if (shade < 10 || shade > 100) {
      throw new Error('Shade value must be between 10 and 100');
    }
  
    // Convert hex to RGB, then to HSL
    const { r, g, b } = hexToRgbObj(color);
    const { h, s } = rgbToHsl(r, g, b);
  
    // Replace the lightness (l) with the provided shade percentage.
    // Convert shade (0-100) to a fraction (0-1)
    const newL = shade / 100;
  
    // Convert back to RGB and then to hex.
    const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL);
    return rgbToHexObj(newR, newG, newB);
  }