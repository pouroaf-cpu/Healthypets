// CENTRAL affiliate link map. Every buy button points at /go/<key>.
// To update a tracking URL, switch a program, or fix link rot: edit ONE line here
// and every page that uses that key updates instantly. Never hard-code prices —
// the CTA sends users to the retailer where the live price lives.
//
// Programs aren't approved yet, so every key currently resolves to the retailer's
// homepage. Once Linkshop (Pet Direct) / Commission Factory (Petstock) are live,
// replace a retailer's base — or a single product line — with the real tracking URL.

const RETAILERS = {
  petdirect: "https://www.petdirect.co.nz/",
  petstock: "https://www.petstock.co.nz/",
  animates: "https://www.animates.co.nz/",
  vetpost: "https://www.vetpost.co.nz/",
} as const;

type Retailer = keyof typeof RETAILERS;

// product key -> retailer. The key's retailer prefix also drives the CTA label
// ("Check price at Pet Direct"), so keep the prefix in sync with the retailer.
const PRODUCTS: Record<string, Retailer> = {
  // ── Flea / parasite — cats ──
  "petdirect-revolution-plus": "petdirect",
  "petdirect-advocate-cat": "petdirect",
  "petdirect-advantage-cat": "petdirect",
  "petstock-bravecto-plus-cat": "petstock",
  "petstock-seresto-cat": "petstock",
  "animates-frontline-plus-cat": "animates",
  "vetpost-broadline-cat": "vetpost",
  // ── Flea / parasite — dogs ──
  "petdirect-nexgard-spectra": "petdirect",
  "petdirect-simparica-trio": "petdirect",
  "petdirect-advocate-dog": "petdirect",
  "petdirect-advantage-dog": "petdirect",
  "petstock-bravecto-chew-dog": "petstock",
  "petstock-seresto-dog": "petstock",
  "animates-frontline-plus-dog": "animates",
  // ── Worming — dogs ──
  "petdirect-drontal-dog": "petdirect",
  "petstock-milbemax-dog": "petstock",
  "vetpost-endogard-dog": "vetpost",
  "animates-canex-dog": "animates",
  "animates-exelpet-dog": "animates",
  // ── Worming — cats ──
  "petdirect-drontal-cat": "petdirect",
  "petstock-milbemax-cat": "petstock",
  "vetpost-profender-cat": "vetpost",
  "animates-felex-cat": "animates",
  // ── Joint / mobility — dogs ──
  "petdirect-antinol-rapid": "petdirect",
  "petdirect-4cyte-canine": "petdirect",
  "petstock-sashas-blend": "petstock",
  "animates-yumove-dog": "animates",
  "vetpost-glyde-mobility": "vetpost",
  "animates-blackmores-paw-osteocare": "animates",
  // ── Gut / digestive ──
  "vetpost-protexin-pro-kolin": "vetpost",
  "animates-paw-digesticare": "animates",
  "petdirect-zesty-paws-probiotic": "petdirect",
  // ── Skin / allergies / ears ──
  "animates-paw-dermega": "animates",
  "vetpost-aloveen-shampoo": "vetpost",
  "vetpost-malaseb-shampoo": "vetpost",
  "animates-paw-mediderm-shampoo": "animates",
  "vetpost-epi-otic-ear-cleaner": "vetpost",
  "animates-paw-gentle-ear-cleaner": "animates",
  // ── Dental ──
  "petdirect-greenies-dog": "petdirect",
  "petdirect-greenies-cat": "petdirect",
  "petstock-whimzees": "petstock",
  "vetpost-oravet-chews": "vetpost",
  "vetpost-virbac-cet-chews": "vetpost",
  "vetpost-virbac-toothpaste": "vetpost",
  "animates-plaqueoff": "animates",
  "petdirect-royal-canin-dental-cat": "petdirect",
  // ── Calming / anxiety ──
  "petdirect-adaptil-diffuser": "petdirect",
  "petstock-adaptil-collar": "petstock",
  "vetpost-zylkene-dog": "vetpost",
  "vetpost-zylkene-cat": "vetpost",
  "animates-paw-complete-calm": "animates",
  "animates-thundershirt": "animates",
  "petdirect-feliway-diffuser": "petdirect",
  "petstock-feliway-spray": "petstock",
  // ── Supplements ──
  "animates-blackmores-paw-fish-oil": "animates",
  "petdirect-vetplus-aktivait": "petdirect",
  // ── Food — cats ──
  "petdirect-royal-canin-cat": "petdirect",
  "petdirect-hills-science-diet-cat": "petdirect",
  "petstock-ziwi-peak-cat": "petstock",
  "animates-black-hawk-cat": "animates",
  "animates-purina-pro-plan-cat": "animates",
  // ── Food — dogs ──
  "petdirect-royal-canin-dog": "petdirect",
  "petdirect-hills-science-diet-dog": "petdirect",
  "petstock-ziwi-peak-dog": "petstock",
  "petstock-k9-natural-dog": "petstock",
  "animates-black-hawk-dog": "animates",
  "animates-purina-pro-plan-dog": "animates",
};

export const AFFILIATE_LINKS: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCTS).map(([key, retailer]) => [key, RETAILERS[retailer]]),
);

export function resolveLink(key: string): string | null {
  return AFFILIATE_LINKS[key] ?? null;
}
