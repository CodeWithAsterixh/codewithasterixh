import type { ColorFrequency, ImageColors } from "./types";
import { rgbToHex } from "./colorConverter";

  
  export async function getImageColors(imageUrl: string): Promise<ImageColors> {
    return new Promise<ImageColors>((resolve, reject) => {
      const img = new Image();
      // Enable CORS to avoid tainted canvas issues
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;
  
      img.onload = () => {
        // Create an offscreen canvas and draw the image
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D context'));
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
  
        // Retrieve pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const totalPixels = data.length / 4;
  
        // Calculate average color for background (bgColor)
        let rTotal = 0, gTotal = 0, bTotal = 0;
        for (let i = 0; i < data.length; i += 4) {
          rTotal += data[i];
          gTotal += data[i + 1];
          bTotal += data[i + 2];
        }
        const avgR = Math.floor(rTotal / totalPixels);
        const avgG = Math.floor(gTotal / totalPixels);
        const avgB = Math.floor(bTotal / totalPixels);
        const bgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
  
        // Build a frequency map for colors, quantizing each channel to reduce variations
        const colorMap: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 4) {
          // Quantize by rounding each channel down to the nearest 16
          const r = Math.floor(data[i] / 16) * 16;
          const g = Math.floor(data[i + 1] / 16) * 16;
          const b = Math.floor(data[i + 2] / 16) * 16;
          const key = `${r},${g},${b}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }
  
       
        const sortedColors: ColorFrequency[] = Object.keys(colorMap)
          .map(key => ({ color: key, count: colorMap[key] }))
          .sort((a, b) => b.count - a.count);
  
        // Helper to convert a key to an rgb string
        const toRgbString = (key: string): string => {
          const [r, g, b] = key.split(',').map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        };
  
        // Pick primary and secondary colors from the sorted array.
        // Fallback to background color if not enough data is available.
        const primaryColor = sortedColors.length > 0 ? toRgbString(sortedColors[0].color) : bgColor;
        const secondaryColor = sortedColors.length > 1 ? toRgbString(sortedColors[1].color) : primaryColor;
  
        resolve({ bgColor:rgbToHex(bgColor), primaryColor:rgbToHex(primaryColor), secondaryColor:rgbToHex(secondaryColor) });
      };
  
      img.onerror = (err) => {
        const errorMessage = err instanceof ErrorEvent ? err.message : 'Unknown error';
        reject(new Error(`Failed to load image from ${imageUrl}: ${errorMessage}`));
      };
    });
  }
  