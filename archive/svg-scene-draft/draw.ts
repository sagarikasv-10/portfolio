/** Deterministic hand-drawn path helpers (seeded, so SSR and client match). */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Pt = [number, number];
const f = (n: number) => Math.round(n * 10) / 10;

/** Smooth closed/open path through points (Catmull-Rom → cubic Bézier). */
export function smooth(pts: Pt[], closed = false): string {
  if (pts.length < 3) return "";
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])},${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + (closed ? "Z" : "");
}

/** Wobbly ridgeline from x0..x1 with peaks; returns a closed filled shape down to `base`. */
export function ridge(seed: number, x0: number, x1: number, y: number, amp: number, step: number, base: number) {
  const r = rng(seed);
  const pts: Pt[] = [];
  for (let x = x0; x <= x1; x += step) {
    const t = (x - x0) / (x1 - x0);
    const y2 = y - Math.abs(Math.sin(t * 7 + seed)) * amp * (0.5 + r() * 0.7) - r() * amp * 0.25;
    pts.push([x, y2]);
  }
  const top = smooth(pts);
  return { fill: `${top}L${x1},${base}L${x0},${base}Z`, line: top, pts };
}

/** Scalloped leafy blob outline (bumpy cloud/foliage shape). */
export function blob(seed: number, cx: number, cy: number, rx: number, ry: number, bumps = 10) {
  const r = rng(seed);
  const pts: Pt[] = [];
  const n = bumps * 2;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = i % 2 === 0 ? 1 + r() * 0.12 : 0.86 + r() * 0.08;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  // scallops via quadratic arcs between outer points
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < n; i += 2) {
    const a = pts[i], m = pts[(i + 1) % n], b = pts[(i + 2) % n];
    const mx = cx + (m[0] - cx) * 1.16, my = cy + (m[1] - cy) * 1.16;
    d += `Q${f(mx)},${f(my)} ${f(b[0])},${f(b[1])}`;
    void a;
  }
  return d + "Z";
}

/** Hand-wobbled rectangle in percentage space for panel borders. */
export function wobbleRect(seed: number, inset: number, jitter: number, per = 6): string {
  const r = rng(seed);
  const pts: Pt[] = [];
  const j = () => (r() - 0.5) * jitter;
  for (let i = 0; i <= per; i++) pts.push([inset + ((100 - 2 * inset) * i) / per, inset + j()]);
  for (let i = 1; i <= per; i++) pts.push([100 - inset + j(), inset + ((100 - 2 * inset) * i) / per]);
  for (let i = per - 1; i >= 0; i--) pts.push([inset + ((100 - 2 * inset) * i) / per, 100 - inset + j()]);
  for (let i = per - 1; i >= 1; i--) pts.push([inset + j(), inset + ((100 - 2 * inset) * i) / per]);
  return pts.map((p, i) => `${i ? "L" : "M"}${f(p[0])},${f(p[1])}`).join("") + "Z";
}

/** Torn-paper clip-path polygon (percent coords). */
export function tornPolygon(seed: number, steps = 26, depth = 1.1): string {
  const r = rng(seed);
  const pts: string[] = [];
  const e = () => (r() * depth).toFixed(2);
  for (let i = 0; i <= steps; i++) pts.push(`${((i / steps) * 100).toFixed(2)}% ${e()}%`);
  for (let i = 1; i < steps / 2; i++) pts.push(`${(100 - Number(e())).toFixed(2)}% ${((i / (steps / 2)) * 100).toFixed(2)}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${((i / steps) * 100).toFixed(2)}% ${(100 - Number(e())).toFixed(2)}%`);
  for (let i = steps / 2 - 1; i >= 1; i--) pts.push(`${e()}% ${((i / (steps / 2)) * 100).toFixed(2)}%`);
  return `polygon(${pts.join(",")})`;
}


/** Short hand-inked hatch strokes scattered in a rectangle (shading). */
export function hatch(seed: number, x: number, y: number, w: number, h: number, count: number, len = 10, slant = 0.5): string {
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const px = x + r() * w, py = y + r() * h, l = len * (0.6 + r() * 0.8);
    d += `M${f(px)},${f(py)}l${f(-l * slant)},${f(l)}`;
  }
  return d;
}

/** Fur / grass edge: bumpy outline with fine tufts (low amplitude, many bumps). */
export function furBlob(seed: number, cx: number, cy: number, rx: number, ry: number, bumps = 26, amp = 0.07) {
  const r = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const k = 1 + (r() - 0.3) * amp * 2;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return smooth(pts, true);
}


/** Scatter of tiny hand-inked grass tick clusters (like "ııı") plus small tufts. */
export function ticks(seed: number, x0: number, x1: number, y0: number, y1: number, count: number): string {
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
    const k = (y - y0) / (y1 - y0 + 1) * 0.8 + 0.5; // bigger toward the viewer
    const t = r();
    if (t < 0.55) d += `M${f(x)},${f(y)}v${f(-5 * k)}M${f(x + 3.4 * k)},${f(y)}v${f(-7 * k)}M${f(x + 6.8 * k)},${f(y)}v${f(-4.5 * k)}`;
    else if (t < 0.8) d += `M${f(x)},${f(y)}q${f(2 * k)},${f(-7 * k)} ${f(4 * k)},0q${f(2 * k)},${f(-7 * k)} ${f(4 * k)},0`;
    else d += `M${f(x)},${f(y)}l${f(-4 * k)},${f(-6 * k)}M${f(x)},${f(y)}l${f(1 * k)},${f(-8 * k)}M${f(x)},${f(y)}l${f(5 * k)},${f(-6 * k)}`;
  }
  return d;
}

/** Stipple: small dots and tiny arcs for bush texture. */
export function stipple(seed: number, cx: number, cy: number, rx: number, ry: number, count: number): string {
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = r() * 6.283, m = Math.sqrt(r()) * 0.92;
    const x = cx + Math.cos(a) * rx * m, y = cy + Math.sin(a) * ry * m;
    d += r() < 0.6 ? `M${f(x)},${f(y)}h0.1` : `M${f(x - 3)},${f(y)}q3,-4 6,0`;
  }
  return d;
}


/** Pencil-style blades: short slightly curved strokes in a region (meadow texture). */
export function blades(seed: number, x0: number, x1: number, y0: number, y1: number, count: number, len = 14): string {
  const r = rng(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
    const k = 0.55 + ((y - y0) / (y1 - y0 + 1)) * 0.95;
    const l = len * k * (0.6 + r() * 0.8), lean = (r() - 0.5) * 7 * k;
    d += `M${f(x)},${f(y)}q${f(lean * 0.4)},${f(-l * 0.6)} ${f(lean)},${f(-l)}`;
  }
  return d;
}

/** Lobed oak leaf path at origin (about 18 long). */
export const OAK_LEAF = "M0,0C-5,-2 -8,-6 -4,-9C-7,-12 -3,-16 0,-13C2,-18 8,-15 5,-10C10,-9 8,-4 4,-4C6,-1 3,1 0,0Z";
