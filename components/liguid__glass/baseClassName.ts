import { GlassVarOptions } from "./types";

export const glassVarClasses = [
  "[--shadow-offset:0]",
  "[--shadow-blur:20px]",
  "[--shadow-spread:-5px]",
  "[--shadow-color:rgba(255,255,255,0.1)]",
  "[--tint:rgba(255,255,255,0.1)]",
  "[--frost-blur:2px]",
  "[--noise-frequency:0.008]",
  "[--distortion-strength:100]",
  "[--outer-shadow-blur:24px]",
] as const;

// 1) Extract CSS var name / default value pairs
const defaultVarsMap = Object.fromEntries(
  glassVarClasses.map((cls) => {
    const [, name, value] = cls.match(/^\[--([^:]+):(.+)\]$/)!;
    return [name, value];
  })
) as Record<string, string>;

// 2) Other fixed classes for the glass effect
export const glassBaseClasses = [
  "absolute",
  "w-[var(--width)]",
  "h-[var(--height)]",
  "rounded-[28px]",
  "isolate",
  "touch-none",
  "shadow-[0_6px_var(--outer-shadow-blur)_rgba(0,0,0,0.2)]",
  'before:content-[""]',
  "before:absolute",
  "before:inset-0",
  "before:z-[-10]",
  "before:rounded-[28px]",
  "before:shadow-[inset_var(--shadow-offset)_var(--shadow-offset)_var(--shadow-blur)_var(--shadow-spread)_var(--shadow-color)]",
  "before:bg-[var(--tint)]",
  'after:content-[""]',
  "after:absolute",
  "after:inset-0",
  "after:z-[-11]",
  "after:rounded-[28px]",
  "after:isolate",
  "after:backdrop-blur-[var(--frost-blur)]",
  "after:filter-[url(#glass-distortion)]",
  "after:[-webkit-backdrop-filter:blur(var(--frost-blur))]",
  'after:[-webkit-filter:url("#glass-distortion")]',
] as const;

/**
 * Build the full className string for a glass div, with optional overrides.
 *
 * @param opts Partial overrides for any CSS variable, e.g. { "shadow-blur": "30px" }
 * @returns A space‑delimited string of Tailwind classes including updated CSS vars
 */
export function getGlassStructures(opts: GlassVarOptions = {}) {
  const varClasses = (Object.keys(defaultVarsMap) as []).map((name) => {
    const val: string = opts[name] ?? defaultVarsMap[name];
    return `--${name}:${val}`;
  });

  // convert it to object
  const varClassesObj = Object.fromEntries(
    varClasses.map((cls) => {
      const [name, value] = cls.split(":");
      return [name, value];
    })
  );
  return varClassesObj
}
