/**
 * Magic Mode (plain DOM, shared by the app and the published preview).
 * The theme lives on <html data-theme="magic">; every colour change is CSS. This module only flips that attribute
 * (cross-fading through the View Transitions API where available, ~0.7s), keeps the toggle buttons' labels in sync,
 * and starts/stops an optional night video in the hero.
 */
export function initMagic(): () => void {
  const root = document.documentElement;
  const buttons = Array.prototype.slice.call(document.querySelectorAll("[data-magic-toggle]")) as HTMLElement[];
  const videos = Array.prototype.slice.call(document.querySelectorAll("video[data-night-video]")) as HTMLVideoElement[];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const paint = (on: boolean) => {
    if (on) root.setAttribute("data-theme", "magic");
    else root.removeAttribute("data-theme");
    buttons.forEach((b) => {
      b.setAttribute("aria-pressed", String(on));
      b.setAttribute("aria-label", on ? "Switch to daylight" : "Switch to magic mode");
    });
    // the night video only plays in Magic Mode, and never for reduced-motion / data-saver visitors (the painting stays)
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const allowed = !reduce.matches && !(nav.connection && nav.connection.saveData);
    videos.forEach((v) => {
      if (on && allowed) { const p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
    });
  };

  const toggle = () => {
    const on = root.getAttribute("data-theme") !== "magic";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!reduce.matches && typeof doc.startViewTransition === "function") doc.startViewTransition(() => paint(on));
    else paint(on);
  };

  buttons.forEach((b) => b.addEventListener("click", toggle));
  paint(root.getAttribute("data-theme") === "magic");
  return () => buttons.forEach((b) => b.removeEventListener("click", toggle));
}
