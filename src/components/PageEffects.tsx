"use client";

import { useEffect } from "react";
import { initMagic } from "@/lib/magic";
import { initActiveNav, initRail, initScrollTop } from "@/lib/pageNav";

/** Floating scroll-to-top button + the behaviour that keeps the navbar underline on the visible section. */
export function PageEffects({ subpage = false }: { subpage?: boolean }) {
  useEffect(() => {
    // sub-pages (case studies) have no hero / sections / Magic toggle, so only the rail and scroll-to-top apply
    const a = subpage ? () => {} : initActiveNav();
    const b = initScrollTop();
    const c = subpage ? () => {} : initMagic();
    const d = initRail();
    return () => { a(); b(); c(); d(); };
  }, [subpage]);
  return (
    <button
      type="button"
      data-scroll-top
      data-visible="false"
      aria-label="Scroll to top"
      aria-hidden="true"
      tabIndex={-1}
      className="fixed bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+16px)] right-6 z-40 flex h-11 w-11 translate-y-4 items-center justify-center rounded-full border border-[#8C6D3F]/30 bg-[#1A1A1A] text-[#F4EFE6] opacity-0 shadow-md transition-all duration-300 pointer-events-none hover:-translate-y-0.5 hover:bg-[#9E5B3C] data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 data-[visible=true]:hover:-translate-y-0.5 lg:bottom-6"
    >
      <span aria-hidden className="text-lg leading-none">&uarr;</span>
    </button>
  );
}
