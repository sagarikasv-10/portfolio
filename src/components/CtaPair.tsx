import { LINKS } from "@/content/site";

const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300";

/** Matching primary + secondary buttons placed under Selected Work and About Me. */
export function CtaPair() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
      <a
        href={LINKS.email}
        className={`${base} bg-[#1A1A1A] text-[#F4EFE6] hover:bg-[#9E5B3C]`}
      >
        Contact Me <span aria-hidden>&rarr;</span>
      </a>
      <a
        href={LINKS.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-[#1A1A1A]/30 bg-transparent text-[#1A1A1A] hover:border-[#8C6D3F] hover:bg-[#EFE4CE]/60`}
      >
        View Resume <span aria-hidden>&#8599;</span>
      </a>
    </div>
  );
}
