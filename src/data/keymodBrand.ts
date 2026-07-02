/** KeyMod / KeyCmd wordmarks — mask SVGs in public/keymod/logo/. */

export const keymodBrand = {
  keymodWordmark: '/keymod/logo/keymod-wordmark.svg',
  keycmdWordmark: '/keymod/logo/keycmd-wordmark.svg',
} as const;

/** Cap-height fill within each wordmark SVG viewBox (measured from path ink). */
const WORDMARK_INK_FILL = {
  keymod: 82.9 / 150,
  keycmd: 82.9 / 113.76,
} as const;

/**
 * Inline/paired wordmarks share `--km-wordmark-inline-height`.
 * Optical factors normalize cap height when SVG viewBox padding differs.
 */
export const keymodWordmarkInline = {
  cssVar: '--km-wordmark-inline-height',
  defaultHeight: '1.125em',
  opticalFactor: {
    keymod: 1,
    keycmd: WORDMARK_INK_FILL.keymod / WORDMARK_INK_FILL.keycmd,
  },
} as const;

export type KeymodWordmarkBrand = keyof typeof keymodWordmarkInline.opticalFactor;

export function keymodWordmarkInlineStyle(brand: KeymodWordmarkBrand): string {
  return `--km-wordmark-optical-factor: ${keymodWordmarkInline.opticalFactor[brand]}`;
}
