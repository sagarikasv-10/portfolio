"use client";

import type { AboutCard as Card } from "@/content/site";
import { useNote } from "@/components/nav/useNavAction";
import { CardIcon } from "./Icons";

/** Tea-stained parchment card with a bookplate hairline. `linkUrl` of "#" (the default) shows a gentle note until a real URL is set. */
export function AboutCard({ card }: { card: Card }) {
  const { say } = useNote();
  const url = card.linkUrl ?? "#";
  const placeholder = url === "#";
  return (
    <article className="group relative flex flex-col rounded-xl border border-[#7A5C32]/30 bg-gradient-to-b from-[#F4E9D5] to-[#EDE0C6] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardIcon id={card.id} />
      <h3 className="display mt-3 text-lg font-medium leading-snug text-[#1A1A1A]">{card.title}</h3>
      <p className="card-desc mt-1 text-xs leading-relaxed text-[#1A1A1A]/75 sm:text-[13px]">{card.description}</p>
      {card.linkText && (
        <a
          href={url}
          {...(placeholder ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          onClick={placeholder ? (e) => { e.preventDefault(); say("That link is coming soon."); } : undefined}
          className="mt-2 inline-flex items-center gap-1 self-start text-xs font-medium text-[#8C581A] hover:underline"
        >
          {card.linkText}
        </a>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-[4px] rounded-[10px] border border-[#7A5C32]/[0.18]" />
    </article>
  );
}
