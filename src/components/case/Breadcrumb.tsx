import Link from "next/link";
import { CtaPair } from "@/components/CtaPair";

/** Sticky Home / Work / <case study> bar with the portfolio's two CTAs on the right. On phones it collapses to a "← Work" back link plus both buttons on one row (the page title is right below). */
export function Breadcrumb({ current }: { current: string }) {
  const link = "rounded-sm text-[#5C4928] underline-offset-4 transition-colors hover:text-[#9E5B3C] hover:underline focus-visible:text-[#9E5B3C]";
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb sticky top-0 z-40 border-b border-[#7A5C32]/25 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75 lg:-ml-16 lg:pl-16">
      <div className="cs-bar mx-auto flex items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5 lg:px-8">
        <ol className="flex min-w-0 flex-1 items-center gap-x-2 py-2.5 text-[10px] font-medium uppercase leading-snug tracking-[0.1em] sm:py-3 sm:text-[11px] sm:tracking-[0.14em] text-[#5C4928]/80 sm:text-xs sm:tracking-[0.16em]">
          <li className="hidden shrink-0 sm:block"><Link href="/" className={link}>Home</Link></li>
          <li aria-hidden className="hidden shrink-0 text-[#7A5C32]/50 sm:block">/</li>
          <li className="shrink-0"><Link href="/#work" className={link}><span aria-hidden className="sm:hidden">&larr; </span>Work</Link></li>
          <li aria-hidden className="hidden shrink-0 text-[#7A5C32]/50 sm:block">/</li>
          <li aria-current="page" className="hidden min-w-0 truncate font-semibold text-ink sm:block">{current}</li>
        </ol>
        <CtaPair compact className="flex shrink-0 items-center gap-1.5 py-1.5 sm:gap-2.5 sm:py-2" />
      </div>
    </nav>
  );
}
