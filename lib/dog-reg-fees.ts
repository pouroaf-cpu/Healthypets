// Dog registration fee data + calculator logic. Data: data/dog-registration-fees.json
// (one entry per NZ territorial authority; see data/dog-registration-fees.md for provenance).
import data from "@/data/dog-registration-fees.json";

export type Selection = {
  workingDog?: boolean;
  desexed?: boolean;
  responsibleOwner?: boolean;
  disabilityAssist?: boolean;
};

export type FeeCategory = {
  id: string;
  label: string;
  requires: Partial<Record<keyof Selection, boolean>>;
  onTime: number;
  afterDue?: number;
  late: number;
  note?: string;
};

export type Extra = { label: string; amount?: number; note?: string };

export type Council = {
  slug: string;
  name: string;
  type: string;
  sourceUrl: string;
  lastVerified: string;
  year: string;
  dueDate: string;
  cutoffs: { afterDueFrom?: string; lateFrom: string };
  supports: { desexedDiscount: boolean; workingRate: boolean; responsibleOwner: boolean };
  categories: FeeCategory[];
  extras: Extra[];
  notes?: string;
  responsibleOwnerScheme?: { name: string; applicationFee: number | null; url: string };
};

// Generic "how to qualify" for a council good-owner scheme — the specifics vary by council,
// so we keep this general and link to the council. (Per-council criteria to be added later.)
export const RESPONSIBLE_OWNER_CRITERIA =
  "Typically you must apply and qualify: no recent dog infringements or convictions, your dog microchipped (and often desexed), a securely fenced property, and a history of on-time registration. Criteria vary by council — check yours.";

// National "menacing by breed" list under the Dog Control Act 1996 (same for every council).
export const MENACING_BREEDS = [
  "American Pit Bull Terrier",
  "Dogo Argentino",
  "Brazilian Fila (Fila Brasileiro)",
  "Japanese Tosa",
  "Perro de Presa Canario",
];

const COUNCILS = (data.councils as Council[]).slice().sort((a, b) => a.name.localeCompare(b.name));
export const META = data._meta as { year: string; yearRuns: string; lastBulkVerified: string; note: string };

export function listCouncils(): { slug: string; name: string }[] {
  return COUNCILS.map((c) => ({ slug: c.slug, name: c.name }));
}
export function getCouncil(slug: string): Council | undefined {
  return COUNCILS.find((c) => c.slug === slug);
}

export type Tier = "onTime" | "afterDue" | "late";

// Which fee tier applies on a given date. Registration year is 1 July–30 June.
// Two-tier councils: pay in July = on time, otherwise late. Three-tier (e.g. Hamilton):
// before 1 July = on time, 1–31 July = after-due, 1 Aug onward = late.
export function tierForDate(c: Council, d: Date): Tier {
  const t = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  if (c.cutoffs.afterDueFrom) {
    if (t < c.cutoffs.afterDueFrom) return "onTime";
    if (t < c.cutoffs.lateFrom) return "afterDue";
    return "late";
  }
  return t >= "07-01" && t < c.cutoffs.lateFrom ? "onTime" : "late";
}

// Pick the best-matching fee category: every `requires` flag must be selected; prefer the
// most specific (most requirements), then the cheapest. Empty-requires = the fallback.
export function matchCategory(c: Council, sel: Selection): FeeCategory {
  const qualified = c.categories.filter((cat) =>
    Object.entries(cat.requires || {}).every(([k, v]) => (sel as Record<string, boolean>)[k] === v),
  );
  qualified.sort(
    (a, b) => Object.keys(b.requires || {}).length - Object.keys(a.requires || {}).length || a.onTime - b.onTime,
  );
  return qualified[0] ?? c.categories[c.categories.length - 1];
}

export function amountForTier(cat: FeeCategory, tier: Tier): number {
  if (tier === "afterDue") return cat.afterDue ?? cat.late;
  return cat[tier];
}

export const fmt = (n: number): string => (n === 0 ? "Free" : `$${n.toFixed(2).replace(/\.00$/, "")}`);

export const TIER_LABEL: Record<Tier, string> = {
  onTime: "On-time fee",
  afterDue: "After due date",
  late: "Late / penalty fee",
};
