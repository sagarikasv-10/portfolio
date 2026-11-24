import { LINKS } from "@/content/site";

const base = "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase transition-all duration-300";
const full = `${base} min-h-11 px-6 py-3 text-xs tracking-[0.14em]`;
const compactCls = `${base} min-h-8 whitespace-nowrap px-3 py-1.5 text-[10px] tracking-[0.08em] sm:min-h-9 sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[0.12em]`;

/** Matching primary + secondary buttons: under Selected Work and About Me, and (compact) in the case study bar. */
export function CtaPair({ compact = false, className }: { compact?: boolean; className?: string }) {
  const b = compact ? compactCls : full;
  return (
    <div className={className ?? "mt-12 flex flex-wrap items-center justify-center gap-4"}>
      <a
        href={LINKS.email}
        className={`${b} bg-[#1A1A1A] text-[#F4EFE6] hover:bg-[#9E5B3C]`}
      >
        Contact Me <span aria-hidden>&rarr;</span>
      </a>
      <a
        href={LINKS.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={`${b} border border-[#1A1A1A]/30 bg-transparent text-[#1A1A1A] hover:border-[#8C6D3F] hover:bg-[#EFE4CE]/60`}
      >
        View Resume <span aria-hidden>&#8599;</span>
      </a>
    </div>
  );
}
