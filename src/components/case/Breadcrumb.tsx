import Link from "next/link";

/** Home / Work / <case study>. Sits right under the page top, aligned with the case study content. */
export function Breadcrumb({ current }: { current: string }) {
  const link = "rounded-sm text-[#5C4928] underline-offset-4 transition-colors hover:text-[#9E5B3C] hover:underline focus-visible:text-[#9E5B3C]";
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb border-b border-[#7A5C32]/25 bg-paper lg:-ml-16 lg:pl-16">
      <ol className="mx-auto flex max-w-[calc(1272px+4rem)] flex-wrap items-center gap-x-2 gap-y-1 px-5 py-4 text-[11px] font-medium uppercase leading-snug tracking-[0.16em] text-[#5C4928]/80 sm:text-xs lg:px-8">
        <li><Link href="/" className={link}>Home</Link></li>
        <li aria-hidden className="text-[#7A5C32]/50">/</li>
        <li><Link href="/#work" className={link}>Work</Link></li>
        <li aria-hidden className="text-[#7A5C32]/50">/</li>
        <li aria-current="page" className="min-w-0 font-semibold text-ink">{current}</li>
      </ol>
    </nav>
  );
}
