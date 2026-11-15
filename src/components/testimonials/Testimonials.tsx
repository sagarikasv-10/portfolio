import { TESTIMONIALS } from "@/content/site";
import { Marquee } from "./Marquee";

/** Kind Words: left-aligned poetic heading, then the drifting envelopes (full-bleed, so the section ignores the rail padding). */
export function Testimonials() {
  return (
    <section id={TESTIMONIALS.id} aria-labelledby="kind-words-title" className="w-full scroll-mt-24 bg-paper pt-10 lg:-ml-16 lg:w-auto">
      <div className="lg:pl-16">
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 text-left lg:px-12">
          <h2 id="kind-words-title" className="display max-w-2xl text-3xl font-medium leading-snug text-[#1A1A1A] sm:text-4xl">
            {TESTIMONIALS.heading}
          </h2>
        </div>
      </div>
      <Marquee items={TESTIMONIALS.items} />
    </section>
  );
}
