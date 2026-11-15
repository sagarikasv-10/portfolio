import { NAV_ITEMS, type NavItem } from "@/content/site";
import { NavLink } from "./NavLink";

const label =
  "ml-0 w-0 overflow-hidden whitespace-nowrap text-xs font-medium uppercase tracking-wider opacity-0 transition-all duration-300 " +
  "group-data-[expanded=true]/rail:ml-3 group-data-[expanded=true]/rail:w-28 group-data-[expanded=true]/rail:opacity-100 " +
  "group-aria-[current=page]/link:underline group-aria-[current=page]/link:decoration-2 group-aria-[current=page]/link:underline-offset-4";

function RailItem({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const { icon: _icon, ...link } = item;
  void _icon;
  return (
    <li>
      <NavLink
        item={link}
        className="group/link flex items-center rounded-xl px-2.5 py-2 text-ink/70 transition-colors duration-300 hover:bg-ink/5 hover:text-ink aria-[current=page]:text-[#9E5B3C]"
      >
        <Icon aria-hidden size={20} strokeWidth={1.6} className="shrink-0" />
        <span className={label}>{item.label}</span>
      </NavLink>
    </li>
  );
}

/** Desktop (lg+): floating, collapsible icon rail on the left. Labels slide out while the pointer is over it (or a keyboard user is inside it); see initRail in lib/pageNav.ts. */
export function LeftRail() {
  return (
    <nav
      aria-label="Primary"
      data-expanded="false"
      className="rail group/rail fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 rounded-2xl border border-[#7A5C32]/30 bg-paper/80 p-2.5 shadow-md backdrop-blur-md transition-all duration-300 lg:block"
    >
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.slice(0, 3).map((i) => <RailItem key={i.id} item={i} />)}
        <li aria-hidden role="presentation" className="mx-2.5 my-1 h-px bg-ink/20" />
        {NAV_ITEMS.slice(3).map((i) => <RailItem key={i.id} item={i} />)}
      </ul>
    </nav>
  );
}
