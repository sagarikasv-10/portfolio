import { AVAILABILITY, LINKS } from "@/content/site";

/** Open-to-work badge: sage-mint pill with a double-ring beacon. Plain mailto link (no target) so mobile mail apps open reliably. */
export function AvailabilityPill() {
  return (
    <a
      href={LINKS.email}
      title="Say hello"
      className="pill-open inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#2D6A4F]/50 bg-[#DFEDE3] px-2.5 py-1 text-[0.75rem] font-semibold tracking-wide text-[#1B4332] sm:px-3 sm:text-[0.8125rem] shadow-[0_1px_2px_rgba(27,67,50,0.18)] transition-all hover:-translate-y-px hover:bg-[#D1E5D7] hover:shadow-[0_3px_8px_rgba(27,67,50,0.2)]"
    >
      <span aria-hidden className="relative flex h-2.5 w-2.5">
        <span className="pill-ring absolute inline-flex h-full w-full animate-ping rounded-full bg-[#40916C]/60 motion-reduce:animate-none" style={{ animationDuration: "2.4s" }} />
        <span className="pill-ring absolute inline-flex h-full w-full animate-ping rounded-full bg-[#40916C]/40 motion-reduce:animate-none" style={{ animationDuration: "2.4s", animationDelay: "1.2s" }} />
        <span className="pill-dot relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2D6A4F]" />
      </span>
      {AVAILABILITY.label}
    </a>
  );
}
