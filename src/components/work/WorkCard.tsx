"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkItem } from "@/content/site";
import { Thumb } from "./Thumbs";

/** Hand-cut scallop path along x (0–400), deterministic so server and client match. Returns [top edge, filled shape]. */
function wavePaths(): [string, string] {
  let s = 11;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const step = 12.5;
  let d = "M0 15";
  let y = 15;
  for (let x = 0; x < 400; x += step) {
    const ny = 14 + (r() - 0.5) * 3 + Math.sin((x / 400) * Math.PI * 2.4) * 2.2;
    const lift = 5.2 + r() * 1.6;
    d += ` Q${(x + step / 2).toFixed(1)} ${(Math.min(y, ny) - lift).toFixed(1)} ${(x + step).toFixed(1)} ${ny.toFixed(1)}`;
    y = ny;
  }
  return [d, `${d} V28 H0Z`];
}
const [WAVE_EDGE, WAVE_FILL] = wavePaths();

/** Hand-cut scalloped wave along the bottom of the thumbnail: parchment fill with a fine sepia ink edge. */
function Wave() {
  return (
    <svg aria-hidden viewBox="0 0 400 28" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-7 w-full overflow-visible">
      <path d={WAVE_FILL} fill="#F4E9D5" />
      <path d={WAVE_EDGE} fill="none" stroke="#8C6D3F" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

/** Low-opacity paper grain over the whole card. */
function Grain({ id }: { id: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.04]">
      <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.12  0 0 0 1.4 -0.3" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
    </svg>
  );
}

/** Night-mode jewel tone for each category pill. */
const TONE: Record<WorkItem["id"], string> = { rhythms: "amber", access: "teal", system: "lavender" };

/**
 * Live card: the whole card opens the case study in a new tab (the "View case study" link is a real <a>).
 * Soon card: COMING SOON ribbon, muted, inert (no hover, no clicks, no link).
 */
export function WorkCard({ item }: { item: WorkItem }) {
  const soon = item.status === "soon";
  const linkRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // a cover image that is not in /public yet simply never "loads", so the placeholder sketch stays (no broken-image icon)
  useEffect(() => {
    const i = imgRef.current;
    if (i && i.complete && i.naturalWidth > 0) setLoaded(true);
  }, []);

  const openCard = (e: React.MouseEvent) => {
    if (soon || (e.target as Element).closest("a")) return;
    linkRef.current?.click();
  };

  return (
    <article
      data-href={!soon && item.href ? item.href : undefined}
      aria-disabled={soon || undefined}
      onClick={openCard}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#7A5C32]/35 bg-[#F2E6D0] transition-all duration-300 ${
        soon ? "is-soon pointer-events-none cursor-default select-none" : "cursor-pointer hover:-translate-y-1.5 hover:shadow-lg"
      }`}
    >
      <div className={`relative h-52 shrink-0 overflow-hidden bg-[#EFE4CE]${soon ? " soon-body" : ""}`}>
        <div className="thumb absolute inset-0 sepia-[.12]"><Thumb id={item.id} /></div>
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={item.image.src}
            alt={item.image.alt}
            decoding="async"
            data-cover
            onLoad={() => setLoaded(true)}
            className={`cover-img absolute inset-0 h-full w-full object-cover${loaded ? " is-loaded" : ""}`}
          />
        )}
        <Wave />
      </div>
      <div className={`flex flex-1 flex-col px-6 pb-6 pt-2 text-left${soon ? " soon-body" : ""}`}>
        <span data-tone={TONE[item.id]} className="pill mb-3 inline-block self-start rounded-full border border-[#8C6D3F]/25 bg-[#EFE4CE] px-3 py-1 text-xs font-medium text-[#5C4928]">{item.tag}</span>
        <h3 className="display mb-2.5 text-2xl font-medium text-[#1A1A1A]">{item.title}</h3>
        <p className="card-desc mb-4 text-sm leading-relaxed text-[#1A1A1A]/75">{item.description}</p>
        {soon ? (
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1A1A]/50">Case study coming soon</p>
        ) : (
          <a
            ref={linkRef}
            href={item.href ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-1.5 self-start text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8C581A] hover:underline"
          >
            View case study <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          </a>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#1A1A1A]/[0.12] pt-4">
          <span className="text-xs text-[#1A1A1A]/70">
            {item.company} &middot; <span className="display italic text-[#5C4928]">{item.skill}</span>
          </span>
        </div>
      </div>

      {soon && (
        <div data-ribbon={item.id === "rhythms" ? "coral" : "sage"} className="soon-ribbon absolute inset-x-0 top-0 z-20 w-full border-b py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em]">Coming soon</div>
      )}
      {/* vintage finish: grain, warm inner vignette, and a printed bookplate frame (all non-interactive) */}
      <Grain id={item.id} />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-2xl shadow-[inset_0_0_32px_rgba(122,92,50,0.16)]" />
      <div aria-hidden className="pointer-events-none absolute inset-[6px] z-10 rounded-[12px] border border-[#7A5C32]/[0.22]" />
    </article>
  );
}
