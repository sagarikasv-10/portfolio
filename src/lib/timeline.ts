/**
 * Work Experience timeline behaviour (plain DOM, no dependencies).
 *  - lg+ (and no reduced-motion): vertical page scroll drives the track sideways while the outer wrapper pins the row (CSS sticky).
 *  - otherwise: the track is a native horizontal scroller with scroll-snap (swipe / drag / trackpad).
 * Both modes fill a gold progress line, light up nodes as they are reached, and drive the ← / → buttons.
 */
export function initTimeline(root: HTMLElement): () => void {
  const q = <T extends HTMLElement>(sel: string) => root.querySelector(sel) as T;
  const outer = q<HTMLElement>(".exp-outer");
  const sticky = q<HTMLElement>(".exp-sticky");
  const scroller = q<HTMLElement>(".exp-scroller");
  const track = q<HTMLElement>(".exp-track");
  const line = q<HTMLElement>(".exp-line");
  const fill = q<HTMLElement>(".exp-fill");
  const prev = q<HTMLButtonElement>("[data-exp-prev]");
  const next = q<HTMLButtonElement>("[data-exp-next]");
  const items = Array.prototype.slice.call(track.querySelectorAll(".exp-item")) as HTMLElement[];
  const nodes = Array.prototype.slice.call(track.querySelectorAll(".exp-node")) as HTMLElement[];
  const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  let lineStart = 0, lineEnd = 1, maxShift = 0, raf = 0;
  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  const measure = () => {
    track.style.transform = mq.matches ? track.style.transform : "";
    lineStart = items[0].offsetLeft + 7;
    lineEnd = items[items.length - 1].offsetLeft + 7;
    line.style.left = lineStart + "px";
    line.style.width = Math.max(1, lineEnd - lineStart) + "px";
    maxShift = Math.max(0, track.scrollWidth - scroller.clientWidth);
  };

  /** Pixels the track is currently shifted left. */
  const progress = () => {
    if (mq.matches) {
      const rect = outer.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = Math.max(1, outer.offsetHeight - sticky.offsetHeight);
      return clamp((top - rect.top) / range);
    }
    return maxShift ? clamp(scroller.scrollLeft / maxShift) : 0;
  };

  const shiftFor = (i: number) => Math.min(maxShift, items[i].offsetLeft - items[0].offsetLeft);

  const update = () => {
    raf = 0;
    const p = progress();
    const offset = p * maxShift;
    if (mq.matches) track.style.transform = "translate3d(" + -offset + "px,0,0)";
    else track.style.transform = "";
    // the gold line fills in step with the scroll; node i lights up when the fill reaches it
    fill.style.transform = "scaleX(" + p + ")";
    nodes.forEach((n, i) => n.setAttribute("data-reached", String(i / Math.max(1, nodes.length - 1) <= p + 0.02)));
    prev.disabled = !items.some((_, i) => shiftFor(i) < offset - 4);
    next.disabled = !items.some((_, i) => shiftFor(i) > offset + 4);
  };
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  const step = (dir: number) => {
    const offset = progress() * maxShift;
    let target = -1;
    if (dir > 0) { for (let i = 0; i < items.length; i++) if (shiftFor(i) > offset + 4) { target = i; break; } }
    else { for (let i = items.length - 1; i >= 0; i--) if (shiftFor(i) < offset - 4) { target = i; break; } }
    if (target < 0) return;
    if (mq.matches) {
      const rect = outer.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = Math.max(1, outer.offsetHeight - sticky.offsetHeight);
      const p = maxShift ? shiftFor(target) / maxShift : 0;
      window.scrollTo({ top: window.scrollY + (rect.top - (top - p * range)), behavior: "smooth" });
    } else {
      scroller.scrollTo({ left: shiftFor(target), behavior: "smooth" });
    }
  };

  const onPrev = () => step(-1);
  const onNext = () => step(1);
  const onResize = () => { measure(); schedule(); };
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize);
  scroller.addEventListener("scroll", schedule, { passive: true });
  mq.addEventListener("change", onResize);
  measure();
  update();
  // fonts / images can change card widths after first paint
  const t = window.setTimeout(onResize, 400);
  return () => {
    window.clearTimeout(t);
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", onResize);
    scroller.removeEventListener("scroll", schedule);
    mq.removeEventListener("change", onResize);
  };
}
