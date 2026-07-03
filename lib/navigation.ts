// Single source of truth for all nav + footer links.
// Edit menus HERE only — Header, mobile drawer and Footer all read from this.

export const SITE = {
  name: "Healthy Pets",
  domain: "healthypets.co.nz",
  // Canonical host is www — apex 308-redirects to www, and Google indexed www.
  // All metadata (sitemap, robots, schema, metadataBase) derives from this.
  url: "https://www.healthypets.co.nz",
  tagline: "Honest pet-health advice for Kiwi cat & dog owners",
  description:
    "Independent, vet-informed New Zealand guides and product comparisons for flea & worming, supplements, food and pet health — with the best NZ buys.",
};

export type NavItem = { label: string; href: string };

// Primary nav (header + mobile drawer)
export const NAV: NavItem[] = [
  { label: "Cats", href: "/cats" },
  { label: "Dogs", href: "/dogs" },
  { label: "Flea & Worming", href: "/flea-and-worming" },
  { label: "Supplements", href: "/supplements" },
  { label: "Food", href: "/food" },
  { label: "Tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
];

// Free tools. Single source of truth — the /tools hub, nav and footer all read from this.
export type Tool = NavItem & { blurb: string };
export const TOOLS: Tool[] = [
  {
    label: "Dog Registration Fee Calculator",
    href: "/tools/dog-registration-fees",
    blurb:
      "Pick your NZ council and see the dog rego fee payable today, your due date, and any discounts you can claim.",
  },
];

// Content territories (used for category hubs + homepage grid)
export const TERRITORIES: NavItem[] = [
  { label: "Flea & Worming", href: "/flea-and-worming" },
  { label: "Joint & Mobility", href: "/joint-and-mobility" },
  { label: "Gut Health", href: "/gut-health" },
  { label: "Skin & Coat", href: "/skin-and-coat" },
  { label: "Dental", href: "/dental" },
  { label: "Calming & Anxiety", href: "/calming" },
  { label: "Supplements", href: "/supplements" },
  { label: "Food", href: "/food" },
];

export const FOOTER = {
  territories: TERRITORIES,
  tools: [
    { label: "All tools", href: "/tools" },
    ...TOOLS.map((t) => ({ label: t.label, href: t.href })),
  ],
  site: [
    { label: "About", href: "/about" },
    { label: "Editorial policy", href: "/editorial-policy" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
  ],
};
