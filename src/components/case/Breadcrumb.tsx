import Link from "next/link";
import { CtaPair } from "@/components/CtaPair";

/** Sticky Home / Work / <case study> bar with the portfolio's two CTAs on the right (hidden on phones, where the bottom bar has them). */
export function Breadcrumb({ current }: { current: string }) {
  const link = "rounded-sm text-[#5C4928] underline-offset-4 transition-colors hover:text-[#9E5B3C] hover:underline focus-visible:text-[#9E5B3C]";
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb sticky top-0 z-40 border-b border-[#7A5C32]/25 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75 lg:-ml-16 lg:pl-16">
      <div className="cs-bar mx-auto flex items-center justify-between gap-4 px-5 lg:px-8">
        <ol className="flex min-w-0 flex-1 items-center gap-x-2 py-3 text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-[#5C4928]/80 sm:text-xs sm:tracking-[0.16em]">
          <li className="shrink-0"><Link href="/" className={link}>Home</Link></li>
          <li aria-hidden className="shrink-0 text-[#7A5C32]/50">/</li>
          <li className="shrink-0"><Link href="/#work" className={link}>Work</Link></li>
          <li aria-hidden className="shrink-0 text-[#7A5C32]/50">/</li>
          <li aria-current="page" className="min-w-0 truncate font-semibold text-ink">{current}</li>
        </ol>
        <CtaPair compact className="hidden shrink-0 items-center gap-2.5 py-2 sm:flex" />
      </div>
    </nav>
  );
}
