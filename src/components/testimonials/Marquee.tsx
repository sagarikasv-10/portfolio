"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/site";
import { Envelope } from "./Envelope";

/**
 * Kind Words row: a plain, user-controlled horizontal scroll track (no auto-sliding). Touch / trackpad / shift-wheel
 * scroll it, soft scroll-snap settles on an envelope, and the next envelope always peeks in from the right edge.
 * Hover (desktop) or tap (touch) opens a letter; only one is open at a time.
 */
export function Marquee({ items }: { items: Testimonial[] }) {
  const [openEnvelopeIndex, setOpenEnvelopeIndex] = useState<string | null>(null);

  // tapping anywhere outside an envelope closes it again
  useEffect(() => {
    if (openEnvelopeIndex === null) return;
    const close = (e: Event) => { if (!(e.target as Element).closest?.(".env.is-open")) setOpenEnvelopeIndex(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenEnvelopeIndex(null); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [openEnvelopeIndex]);

  return (
    <div className="env-scroller" role="group" aria-label="Kind words from colleagues. Scroll sideways to see more letters.">
      <div className="env-track flex w-max">
        {items.map((t, i) => (
          <Envelope
            key={t.name}
            t={t}
            copy={0}
            interactive
            primary
            open={openEnvelopeIndex === `0-${i}`}
            onOpen={() => setOpenEnvelopeIndex(`0-${i}`)}
            onClose={() => setOpenEnvelopeIndex((cur) => (cur === `0-${i}` ? null : cur))}
            onToggle={() => setOpenEnvelopeIndex((cur) => (cur === `0-${i}` ? null : `0-${i}`))}
          />
        ))}
      </div>
      <span className="sr-only">Hover, tap, or press Enter on a letter to read it.</span>
    </div>
  );
}
