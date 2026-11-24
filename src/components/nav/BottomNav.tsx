import type { NavItem } from "@/content/site";
import { NavLink } from "./NavLink";
import { withBase } from "./withBase";

/** Mobile/tablet: fixed bottom bar, all six items in six equal columns. */
export function BottomNav({ base = "", active }: { base?: string; active?: NavItem["id"] }) {
  return (
    <nav aria-label="Primary" className="bottom-nav fixed inset-x-0 bottom-0 left-0 right-0 z-50 border-t border-ink/70 lg:hidden">
      <ul className="mx-auto grid max-w-[640px] grid-cols-6" style={{ height: "var(--bottom-nav-h)" }}>
        {withBase(base).map((item) => {
          const Icon = item.icon;
          const { icon: _icon, ...link } = item;
          void _icon;
          return (
            <li key={item.id} className="min-w-0">
              <NavLink
                item={link}
                activeId={active}
                className={`relative flex h-full w-full min-w-0 flex-col items-center justify-center gap-[3px] px-0.5 text-[0.6rem] font-medium leading-none tracking-tight text-ink/75 aria-[current=page]:text-ink`}
              >
                <span aria-hidden className="nav-underline absolute inset-x-3 top-0 h-[2px] bg-[#9E5B3C]" />
                <Icon aria-hidden size={19} strokeWidth={1.5} />
                <span className="w-full truncate text-center">{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
