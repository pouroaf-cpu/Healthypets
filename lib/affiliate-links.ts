// CENTRAL affiliate link map. Every buy button points at /go/<key>.
// To update a tracking URL, switch a program, or fix link rot: edit ONE line here
// and every page that uses that key updates instantly. Never hard-code prices —
// the CTA sends users to the retailer where the live price lives.

export const AFFILIATE_LINKS: Record<string, string> = {
  // key: "https://<affiliate-tracking-url>"  ← fill in once programs are approved
  "petdirect-revolution-plus": "https://www.petdirect.co.nz/", // TODO: real tracking URL
  "petdirect-advantage": "https://www.petdirect.co.nz/",
  "petstock-bravecto": "https://www.petstock.co.nz/",
  "petstock-frontline": "https://www.petstock.co.nz/",
  // add more as content is written...
};

export function resolveLink(key: string): string | null {
  return AFFILIATE_LINKS[key] ?? null;
}
