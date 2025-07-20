import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts utility classes from a Tailwind CSS string.
 * @param classString - The full class string.
 * @param utility - The utility prefix (e.g. "hover:", "active:").
 * @returns An object with utilityActive, utilityNotActive, and className.
 */
export function extractUtilityClasses(classString: string, utility: string) {
  const classes = classString.split(" ").filter(Boolean);

  const utilityActive: string[] = [];
  const utilityNotActive: string[] = [];
  const base: string[] = [];

  // Find all utility-prefixed classes and their property (e.g. "bg")
  const utilityRegex = new RegExp(`^${utility}([^:]+)`);
  const utilityProps = new Set<string>();

  classes.forEach(cl => {
    const match = cl.match(utilityRegex);
    if (match) {
      utilityActive.push(cl.replace(utility, ""));
      // Extract property before first dash or slash
      const prop = match[1].split(/[-/]/)[0];
      utilityProps.add(prop);
    }
  });

  classes.forEach(cl => {
    // Skip utility-prefixed classes
    if (cl.startsWith(utility)) return;
    // Extract property before first dash or slash
    const prop = cl.split(/[-/]/)[0];
    if (utilityProps.has(prop)) {
      utilityNotActive.push(cl);
    } else {
      base.push(cl);
    }
  });

  return {
    utilityActive: utilityActive.join(" "),
    utilityNotActive: utilityNotActive.join(" "),
    base: base.join(" ")
  };
}

export function arrayChunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
