import { NAV_ITEMS, type NavItem } from "@/content/site";

/** On pages other than the homepage, in-page anchors ("#work") must point back at the homepage ("/#work"). */
export function withBase(base: string): NavItem[] {
  if (!base) return NAV_ITEMS;
  return NAV_ITEMS.map((i) => (i.href && i.href.startsWith("#") ? { ...i, href: `${base}${i.href}` } : i));
}
