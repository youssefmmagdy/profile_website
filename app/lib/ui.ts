import type { CSSProperties } from "react";

/**
 * Stagger delay for `[data-reveal]` elements and CSS entrance animations.
 * Wraps the custom property in a cast so callers stay free of `as` noise.
 */
export function stagger(ms: number): CSSProperties {
  return { "--d": `${ms}ms`, animationDelay: `${ms}ms` } as CSSProperties;
}

/** Same as `stagger`, but only sets the reveal delay (no CSS animation). */
export function revealDelay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
