import { HERO } from "@/content/site";

const FADE = "linear-gradient(to bottom, transparent 0%, black 32%, black 100%)";
const imgCls = "block h-[190px] w-full select-none object-cover object-bottom sm:h-[250px] lg:h-[320px]";
const maskStyle = { maskImage: FADE, WebkitMaskImage: FADE };

/** Colophon line on the parchment, then the panoramic illustration flush to the bottom of the page.
 *  Daylight shows the mountain-and-meadow painting; Magic Mode crossfades to the night panorama. */
export function Footer() {
  return (
    <footer className="w-full bg-paper lg:-ml-16 lg:w-auto">
      <p className="relative z-10 mb-0 mt-8 px-6 text-center text-[11px] tracking-wide text-[#5C4928]/80">
        &copy; {new Date().getFullYear()} {HERO.wordmark} &middot; Crafted with curiosity
      </p>
      <div className="relative -mt-10 w-full overflow-hidden sm:-mt-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/footer-mountains.webp"
          srcSet="/art/footer-mountains-1100.webp 1100w, /art/footer-mountains.webp 2000w"
          sizes="100vw"
          alt=""
          aria-hidden
          width={2000}
          height={667}
          loading="lazy"
          decoding="async"
          className={`footer-img-day ${imgCls}`}
          style={maskStyle}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/footer-night.webp"
          srcSet="/art/footer-night-1100.webp 1100w, /art/footer-night.webp 2000w"
          sizes="100vw"
          alt=""
          aria-hidden
          width={2000}
          height={667}
          loading="lazy"
          decoding="async"
          className={`footer-img-night absolute inset-0 ${imgCls}`}
          style={maskStyle}
        />
      </div>
      <div aria-hidden className="footer-pad" />
    </footer>
  );
}
