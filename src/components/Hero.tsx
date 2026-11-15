import { HERO, METRICS } from "@/content/site";
import { AvailabilityPill } from "./AvailabilityPill";

/** Top-left overlay inside the hero illustration: the headline, below the controls row that HeroArt places at the top. */
export function HeroOverlay() {
  return (
    <div className="hero-overlay">
      {/* the magic + sound controls (rendered by HeroArt) sit at the very top-left; this spacer reserves their row */}
      <div aria-hidden className="h-[60px]" />
      <h1 className="display max-w-[62%] text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:max-w-none sm:text-[clamp(1.95rem,1rem+4.7vw,2.7rem)] sm:leading-[1.08] md:whitespace-nowrap md:[text-wrap:nowrap] md:text-[clamp(2.3rem,1.25rem+2.4vw,3.5rem)] md:leading-[1.04]">
        {/* Daylight wording */}
        <span className="h-day">
          Welcome to my{" "}
          <span className="relative inline-block">
            safe space.
            <svg aria-hidden className="absolute -bottom-1 left-0 h-[0.28em] w-full text-ochre" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none">
              <path d="M3 9C60 3 118 11 190 6S270 8 297 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </span>
        {/* Magic Mode wording (CSS swaps the two; only the visible one is read) */}
        <span className="h-magic">
          Welcome to my{" "}
          <span className="relative inline-block">
            <em className="font-normal italic">magical space.</em>
          </span>
          <span aria-hidden className="ml-1.5 inline-block align-[0.12em] text-[0.62em] font-normal text-ochre">&#10022;</span>
        </span>
      </h1>
    </div>
  );
}

/** First fold under the illustration: intro (5 cols) + metrics (7 cols), then the centred primary CTA. */
export function FirstFold() {
  const href = HERO.cta.href ?? HERO.cta.fallbackAnchor;
  return (
    <section id="highlights" aria-label="Introduction and highlights" className="w-full bg-paper">
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:items-center lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="mb-4"><AvailabilityPill /></div>
            <p className="intro-copy text-[1.0625rem] leading-[1.72] text-ink/90 lg:text-[1.1rem] lg:leading-[1.7]">
              {HERO.intro.split("4+ years").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <strong className="font-semibold text-ink">4+ years</strong>}
                </span>
              ))}
            </p>
          </div>
          <div className="lg:col-span-7">
            <h2 id="metrics-title" className="eyebrow text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/85 sm:tracking-[0.2em]">{METRICS.title}</h2>
            <ul aria-labelledby="metrics-title" className="mt-3 grid grid-cols-3 gap-x-4 lg:gap-x-0">
              {METRICS.items.map((m) => (
                <li key={m.label} className="min-w-0 border-l border-ink/30 pl-3 lg:pl-5 lg:pr-6">
                  <p className="display metric-value text-[clamp(1.15rem,0.85rem+0.9vw,1.7rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-ink">{m.value}</p>
                  <p className="metric-cap mt-1 text-[0.78rem] leading-snug text-ink/75 sm:text-[0.82rem]">{m.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href={href} className="cta group w-full sm:w-auto">
            <span className="relative z-10">{HERO.cta.label}</span>
            <span aria-hidden className="cta-arrow relative z-10">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
