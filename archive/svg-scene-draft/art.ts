/**
 * ART SLOTS — replace any illustrated layer with your own final artwork.
 * Put a transparent PNG/WebP/SVG in /public/art and set its path + placement here.
 * While a slot is null, the built-in draft SVG illustration is shown.
 * See README.md → "Replacing artwork".
 */
export type ArtOverride = { src: string; x: number; y: number; width: number; height: number } | null;

export const ART_OVERRIDES: Record<
  "character" | "laptop" | "tree" | "catLap" | "catPersian" | "catGinger" | "catBlack" | "dogA" | "dogB",
  ArtOverride
> = {
  character: null,
  laptop: null,
  tree: null,
  catLap: null,
  catPersian: null,
  catGinger: null,
  catBlack: null,
  dogA: null,
  dogB: null,
};
