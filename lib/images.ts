// CENTRAL image manifest. Same idea as lib/affiliate-links.ts: one source of truth.
//
// Real photos are sourced from Openverse (CC-licensed / public-domain, commercial-use
// only) by `scripts/fetch-images.mjs`, downloaded into /public/images, and written to
// `images.generated.json`. Articles + templates reference an image by its `id`; the
// <Figure> component resolves it here. Missing ids fall back to an on-brand gradient
// placeholder, so the layout never breaks — every spot still shows *something*.
//
// To swap to higher-quality sources later (Pexels/Unsplash with an API key), only the
// fetch script changes — the manifest shape and every <Figure id="..."> stay identical.

import generated from "./images.generated.json";

export type ImageCredit = {
  author?: string;
  sourceUrl?: string;
  license?: string; // e.g. "CC BY 2.0", "CC0", "Public Domain"
  licenseUrl?: string;
};

export type ImageMeta = {
  src: string; // path under /public, e.g. "/images/cat-flea-hero.jpg"
  alt: string;
  credit?: ImageCredit;
};

const IMAGES = generated as Record<string, ImageMeta>;

export function getImage(id: string): ImageMeta | undefined {
  return IMAGES[id];
}
