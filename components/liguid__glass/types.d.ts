import { glassVarClasses } from "./baseClassName";

/**
 * A union type of all CSS variable class strings in `glassVarClasses`.
 * 
 * Each string must follow the format: `[--<variable-name>:<value>]`
 * For example: `[--shadow-blur:20px]`
 */
type GlassVarClass = (typeof glassVarClasses)[number];

/**
 * Creates a mapping of CSS variable names (extracted from `glassVarClasses`)
 * to their corresponding string values.
 * 
 * @example
 * {
 *   "shadow-blur": "20px",
 *   "tint-color": "255,255,255",
 *   "frost-blur": "2px"
 * }
 */
export type GlassVarDefaults = {
  [C in GlassVarClass as C extends `[--${infer Name}:${string}]`
    ? Name
    : never]: string;
};

/**
 * Optional overrides for the default CSS variables used in the glass effect.
 *
 * You can pass in partial updates to tweak the glass style.
 *
 * ✅ Acceptable values include:
 * - CSS units: `"20px"`, `"2rem"`, `"100vw"`
 * - Color functions: `"rgba(255,255,255,0.1)"`, `"hsl(0, 100%, 50%)"`
 * - Hex or named colors: `"#fff"`, `"black"`
 * - Keywords and CSS functions: `"fit-content"`, `"min-content"`
 *
 * ❌ Avoid:
 * - Malformed CSS values: `"blur20px"`, `"255,255,255"` (if not in `rgb(...)`)
 */
export type GlassVarOptions = Partial<GlassVarDefaults>;
