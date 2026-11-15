"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/site";
import { Envelope } from "./Envelope";

/**
 * Three copies of the row drift left in a seamless loop (animate-marquee, 28s linear). Every copy responds to
 * hover / tap (the visible envelopes are a different copy as the track drifts); only the first copy is in the
 * keyboard and screen-reader order, so nothing is announced three times.
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
    <div className="marquee-wrap mt-6 overflow-x-clip pb-12 pt-14">
      <div className="marquee-track flex w-max animate-marquee">
        {[0, 1, 2].map((copy) => (
          <div key={copy} className={`flex ${copy ? "marquee-dup" : ""}`} aria-hidden={copy ? true : undefined}>
            {items.map((t, i) => (
              <Envelope
                key={t.name}
                t={t}
                copy={copy}
                interactive
                primary={copy === 0}
                open={openEnvelopeIndex === `${copy}-${i}`}
                onOpen={() => setOpenEnvelopeIndex(`${copy}-${i}`)}
                onClose={() => setOpenEnvelopeIndex((cur) => (cur === `${copy}-${i}` ? null : cur))}
                onToggle={() => setOpenEnvelopeIndex((cur) => (cur === `${copy}-${i}` ? null : `${copy}-${i}`))}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Hover, tap, or press Enter on a letter to read it.</span>
    </div>
  );
}
