"use client";
import Link from "next/link";
import { ACTIVE_NAV, type NavItem } from "@/content/site";
import { useNote } from "./useNavAction";

/** Real link when href exists; otherwise a button that gently says it's coming soon. */
export function NavLink({ item, className, children }: { item: Omit<NavItem, "icon">; className: string; children: React.ReactNode }) {
  const { say } = useNote();
  const active = item.id === ACTIVE_NAV;
  const common = { className, "data-nav": item.id, "aria-current": active ? ("page" as const) : undefined };
  if (item.href && (item.href.startsWith("#") || item.href.startsWith("mailto:"))) return <a href={item.href} {...common}>{children}</a>;
  if (item.href && item.external) return <a href={item.href} target="_blank" rel="noopener noreferrer" {...common}>{children}</a>;
  if (item.href) return <Link href={item.href} {...common}>{children}</Link>;
  return (
    <button type="button" {...common} onClick={() => say(`${item.label} is still being drawn. Coming soon.`)}>
      {children}
    </button>
  );
}
