/**
 * Plain-DOM page behaviour shared by the app and the published preview.
 *  - initActiveNav: an IntersectionObserver watches #hero, #work, #experience, #testimonials and #about and keeps
 *    aria-current="page" on the right nav link (Home / My Work / About Me). Clicking a link updates it immediately.
 *  - initScrollTop: shows the floating button after 400px of scroll and scrolls to the top on click.
 */
const SECTION_TO_NAV: Record<string, string> = { hero: "home", work: "work", experience: "work", about: "about" };

export function initActiveNav(): () => void {
  const links = Array.prototype.slice.call(document.querySelectorAll("nav[aria-label=Primary] [data-nav]")) as HTMLElement[];
  let current = "home";
  let lockUntil = 0;

  const set = (id: string) => {
    current = id;
    links.forEach((l) => {
      if (l.getAttribute("data-nav") === id) l.setAttribute("aria-current", "page");
      else l.removeAttribute("aria-current");
    });
  };

  const visible: Record<string, boolean> = {};
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => { visible[(e.target as HTMLElement).id] = e.isIntersecting; });
      if (Date.now() < lockUntil) return;
      // sections never overlap the reading line, so at most one matches; #testimonials (no nav item) keeps the previous state
      for (const id in SECTION_TO_NAV) if (visible[id]) { set(SECTION_TO_NAV[id]); return; }
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );
  ["hero", "work", "experience", "testimonials", "about"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  const onClick = (ev: Event) => {
    const l = ev.currentTarget as HTMLElement;
    const id = l.getAttribute("data-nav") || "";
    if (id === "home") {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (id === "home" || id === "work" || id === "about") {
      set(id);
      lockUntil = Date.now() + 1200; // ignore the observer while the smooth scroll passes other sections
    }
  };
  links.forEach((l) => l.addEventListener("click", onClick));
  set(current);
  return () => { io.disconnect(); links.forEach((l) => l.removeEventListener("click", onClick)); };
}

export function initScrollTop(): () => void {
  const btn = document.querySelector("[data-scroll-top]") as HTMLButtonElement | null;
  if (!btn) return () => {};
  const update = () => {
    const show = window.scrollY > 400;
    btn.setAttribute("data-visible", String(show));
    btn.tabIndex = show ? 0 : -1;
    btn.setAttribute("aria-hidden", String(!show));
  };
  const click = () => window.scrollTo({ top: 0, behavior: "smooth" });
  btn.addEventListener("click", click);
  window.addEventListener("scroll", update, { passive: true });
  update();
  return () => { btn.removeEventListener("click", click); window.removeEventListener("scroll", update); };
}

/**
 * Desktop left rail: expands while the pointer is over it (or keyboard focus is inside it) and collapses reliably
 * when the pointer leaves. Clicking an item blurs it and collapses the rail at once (and ignores hover for the
 * length of the smooth scroll), so it can never stay stuck open after the page moves underneath it.
 */
export function initRail(): () => void {
  const nav = document.querySelector("nav.rail") as HTMLElement | null;
  if (!nav) return () => {};
  const links = Array.prototype.slice.call(nav.querySelectorAll("a")) as HTMLElement[];
  let quietUntil = 0;
  const expanded = () => nav.getAttribute("data-expanded") === "true";
  const set = (on: boolean) => nav.setAttribute("data-expanded", on ? "true" : "false");

  const enter = () => { if (Date.now() >= quietUntil) set(true); };
  const leave = () => set(false);
  const onClick = (ev: Event) => {
    (ev.currentTarget as HTMLElement).blur();
    set(false);
    quietUntil = Date.now() + 900;
  };
  const focusIn = (ev: Event) => {
    const t = ev.target as HTMLElement;
    if (t.matches && t.matches(":focus-visible")) set(true);
  };
  const focusOut = (ev: FocusEvent) => {
    if (!ev.relatedTarget || !nav.contains(ev.relatedTarget as Node)) set(false);
  };
  // safety net: if the page scrolls while the pointer is no longer over the rail, never leave it open
  const onScroll = () => { if (expanded() && !nav.matches(":hover") && !nav.matches(":focus-within")) set(false); };

  nav.addEventListener("mouseenter", enter);
  nav.addEventListener("mousemove", enter);
  nav.addEventListener("mouseleave", leave);
  nav.addEventListener("focusin", focusIn);
  nav.addEventListener("focusout", focusOut);
  window.addEventListener("scroll", onScroll, { passive: true });
  links.forEach((l) => l.addEventListener("click", onClick));
  return () => {
    nav.removeEventListener("mouseenter", enter);
    nav.removeEventListener("mousemove", enter);
    nav.removeEventListener("mouseleave", leave);
    nav.removeEventListener("focusin", focusIn);
    nav.removeEventListener("focusout", focusOut);
    window.removeEventListener("scroll", onScroll);
    links.forEach((l) => l.removeEventListener("click", onClick));
  };
}
