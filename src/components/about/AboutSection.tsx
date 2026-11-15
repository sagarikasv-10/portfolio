import { CtaPair } from "@/components/CtaPair";
import { ABOUT, aboutCardsData } from "@/content/site";
import { AboutCard } from "./AboutCard";

/** About Me: illustration on the left (dissolving into the page), editorial text and a 6-card grid on the right. */
export function AboutSection() {
  return (
    <section id={ABOUT.id} aria-labelledby="about-title" className="w-full scroll-mt-24 bg-paper">
      <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-16 lg:px-12">
      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="w-full overflow-hidden rounded-2xl border border-[#7A5C32]/25 shadow-sm lg:w-[42%]">
          <img
            src={ABOUT.art.src}
            srcSet={`${ABOUT.art.small} 409w, ${ABOUT.art.src} 660w`}
            sizes="(min-width: 1024px) 40vw, 448px"
            alt={ABOUT.art.alt}
            width={660}
            height={1024}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full select-none lg:h-full lg:object-cover lg:object-left"
          />
        </div>

        <div className="w-full lg:w-[58%]">
          <div className="flex items-center gap-4">
            <span className="eyebrow whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C4928]">{ABOUT.eyebrow}</span>
            <span aria-hidden className="h-px flex-1 bg-[#7A5C32]/40" />
          </div>
          <h2 id="about-title" className="display mb-4 mt-3 text-3xl font-medium leading-tight text-[#1A1A1A] sm:text-5xl">
            {ABOUT.heading}
          </h2>
          <p className="mb-3 text-base leading-relaxed text-[#1A1A1A]/80">{ABOUT.intro}</p>
          <p className="display mb-8 text-[15px] font-light italic text-[#1A1A1A]/85">
            <span aria-hidden className="mr-2 not-italic text-[#B48A3E]">&#10022;</span>
            {ABOUT.signature}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {aboutCardsData.map((c) => (
              <AboutCard key={c.id} card={c} />
            ))}
          </div>
        </div>
      </div>
      <CtaPair />
      </div>
    </section>
  );
}
