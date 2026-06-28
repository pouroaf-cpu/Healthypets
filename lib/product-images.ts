// Resolver for scraped product packshots, keyed by affiliate linkKey.
// Populated by scripts/fetch-product-images.mjs into product-images.generated.json.
// Separate from the editorial image system (lib/images.ts) on purpose — different
// source, licence basis (retailer product imagery), and lifecycle.
import generated from "./product-images.generated.json";

export type ProductImage = { src: string; alt: string; sourceUrl?: string };

const MAP = generated as Record<string, ProductImage>;

export function getProductImage(linkKey?: string): ProductImage | undefined {
  return linkKey ? MAP[linkKey] : undefined;
}
