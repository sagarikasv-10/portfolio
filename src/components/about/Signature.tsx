import { HERO } from "@/content/site";

const MAGIC = "my kind of magic.";
const signature = HERO.supporting.endsWith(MAGIC)
  ? { lead: HERO.supporting.slice(0, -MAGIC.length), magic: MAGIC }
  : { lead: HERO.supporting, magic: "" };

/** Poetic breather after About Me: the signature line with twinkling stars and a shimmering "my kind of magic." */
export function Signature() {
  return (
    <section aria-label="A closing note" className="w-full bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-10 text-center">
        <p className="signature display text-xl font-normal italic leading-relaxed text-[#1A1A1A] sm:text-2xl md:text-[26px]">
          <span aria-hidden className="star mr-2">&#10022;</span>
          {signature.lead}
          <span className="magic-shimmer">{signature.magic}</span>
          <span aria-hidden className="star star-end ml-2">&#10022;</span>
        </p>
      </div>
    </section>
  );
}
