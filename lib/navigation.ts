// Single source of truth for all nav + footer links.
// Edit menus HERE only — Header, mobile drawer and Footer all read from this.

export const SITE = {
  name: "Healthy Pets",
  domain: "healthypets.co.nz",
  url: "https://healthypets.co.nz",
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
  { label: "Guides", href: "/guides" },
];

// Content territories (used for category hubs + homepage grid)
export const TERRITORIES: NavItem[] = [
  { label: "Flea & Worming", href: "/flea-and-worming" },
  { label: "Joint & Mobility", href: "/joint-and-mobility" },
  { label: "Gut Health", href: "/gut-health" },
  { label: "Skin & Coat", href: "/skin-and-coat" },
  { label: "Dental", href: "/dental" },
  { label: "Food", href: "/food" },
];

export const FOOTER = {
  territories: TERRITORIES,
  site: [
    { label: "About", href: "/about" },
    { label: "Editorial policy", href: "/editorial-policy" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
    { label: "Privacy", href: "/privacy" },
  ],
};
