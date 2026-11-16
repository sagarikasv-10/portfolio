"use client";

import { useEffect, useState } from "react";

/**
 * The single hero <h1>. Exactly one wording is in the DOM at a time: Daylight on the server / first paint,
 * then it follows <html data-theme="magic"> so crawlers and screen readers never see both headlines concatenated.
 */
export function HeroHeading() {
  const [magic, setMagic] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setMagic(root.getAttribute("data-theme") === "magic");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return (
    <h1 className="display max-w-[62%] text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:max-w-none sm:text-[clamp(1.95rem,1rem+4.7vw,2.7rem)] sm:leading-[1.08] md:whitespace-nowrap md:[text-wrap:nowrap] md:text-[clamp(2.3rem,1.25rem+2.4vw,3.5rem)] md:leading-[1.04]">
      {magic ? (
        <span className="h-magic">
          Welcome to my{" "}
          <span className="relative inline-block">
            <em className="font-normal italic">magical space.</em>
          </span>
          <span aria-hidden className="ml-1.5 inline-block align-[0.12em] text-[0.62em] font-normal text-ochre">&#10022;</span>
        </span>
      ) : (
        <span className="h-day">
          Welcome to my{" "}
          <span className="relative inline-block">
            safe space.
            <svg aria-hidden className="absolute -bottom-1 left-0 h-[0.28em] w-full text-ochre" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none">
              <path d="M3 9C60 3 118 11 190 6S270 8 297 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </span>
      )}
    </h1>
  );
}
