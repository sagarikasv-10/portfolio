"use client";

import { useEffect, useRef } from "react";

/**
 * Keyboard-only "Skip to content" link: parked off-screen and shown only when a keyboard user tabs onto it.
 * Router navigation (and some browsers on load) can move focus to the first focusable element, which is this
 * link, so a focus that does not follow a Tab key press is dropped immediately and the link never floats over the page.
 */
export function SkipLink() {
  const ref = useRef<HTMLAnchorElement>(null);
  const lastTab = useRef(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Tab") lastTab.current = Date.now(); };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);
  return (
    <a
      ref={ref}
      href="#main"
      className="skip-link"
      onFocus={(e) => { if (Date.now() - lastTab.current > 400) e.currentTarget.blur(); }}
    >
      Skip to content
    </a>
  );
}
