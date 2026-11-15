"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EXPERIENCE, type Milestone } from "@/content/site";
import { initTimeline } from "@/lib/timeline";

/** Night-mode jewel tones, cycled across a card's tags so neighbouring pills differ. */
const TONES = ["amber", "teal", "lavender", "rose"];

function Card({ m }: { m: Milestone }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-[#7A5C32]/30 bg-gradient-to-b from-[#F4E9D5] to-[#EDE0C6] p-6 text-left shadow-[0_6px_16px_rgba(92,73,40,0.10)]">
      <h3 className="display text-xl font-medium leading-snug text-[#1A1A1A]">{m.role}</h3>
      <p className="mb-3 mt-1 text-xs font-medium uppercase tracking-wider text-[#8C581A]">{m.company} &middot; {m.location}</p>
      <ul className="space-y-1.5 text-[13px] leading-relaxed text-[#1A1A1A]/80">
        {m.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#B48A3E]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {m.tags.map((t, i) => (
          <span key={t} data-tone={TONES[i % TONES.length]} className="pill rounded-full border border-[#8C6D3F]/25 bg-[#EFE4CE]/70 px-2.5 py-0.5 text-[11px] font-medium text-[#5C4928]">{t}</span>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-[5px] rounded-[10px] border border-[#7A5C32]/[0.18]" />
    </article>
  );
}

const stepBtn = "grid h-9 w-9 place-items-center rounded-full border border-[#8C6D3F]/40 bg-transparent text-[#5C4928] transition-all hover:border-[#8C6D3F] hover:bg-[#EFE4CE]/60 disabled:pointer-events-none disabled:opacity-35";

/** Work Experience: a horizontal timeline that is driven by vertical scrolling on desktop and by swiping on touch. */
export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? initTimeline(ref.current) : undefined), []);
  return (
    <section ref={ref} id={EXPERIENCE.id} aria-labelledby="experience-title" className="w-full scroll-mt-24 bg-paper pb-10 pt-12 lg:-ml-16 lg:w-auto">
      <div className="exp-outer">
        <div className="exp-sticky">
          <div className="exp-inner">
          <div className="lg:pl-16">
          <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-6 pb-8 lg:px-12">
            <div className="min-w-0 flex-1">
              <p className="eyebrow whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C4928]">{EXPERIENCE.eyebrow}</p>
              <h2 id="experience-title" className="display mt-2 text-3xl font-medium text-[#1A1A1A] sm:text-4xl">{EXPERIENCE.heading}</h2>
            </div>
            <div className="flex shrink-0 gap-2" role="group" aria-label="Step through milestones">
              <button type="button" data-exp-prev aria-label="Previous milestone" className={stepBtn}><ArrowLeft aria-hidden size={16} /></button>
              <button type="button" data-exp-next aria-label="Next milestone" className={stepBtn}><ArrowRight aria-hidden size={16} /></button>
            </div>
          </div>
          </div>
          <div className="exp-scroller">
            <div className="exp-track" role="list">
              <div aria-hidden className="exp-line"><div className="exp-fill" /></div>
              {EXPERIENCE.items.map((m) => (
                <div key={m.dates} role="listitem" className="exp-item flex w-[340px] shrink-0 flex-col sm:w-[400px]">
                  <div className="mb-5 flex h-7 items-center">
                    <span className="exp-node relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-[#B48A3E] ring-4 ring-[#F4EFE6]" data-reached="false" />
                    <span className="eyebrow relative z-10 bg-[#F4EFE6] pl-3 pr-2 text-[11px] font-medium uppercase tracking-wider text-[#5C4928]">{m.dates}</span>
                  </div>
                  <div className="flex-1"><Card m={m} /></div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
