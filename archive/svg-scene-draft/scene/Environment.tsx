import { blades, furBlob, hatch, ridge, rng, smooth } from "@/lib/draw";
import { C, FINE, LINE } from "./palette";

/** Warm paper sky: cream wash, no gradient gloss. Rects overshoot so any aspect ratio stays filled. */
export function Sky() {
  return (
    <g>
      <defs>
        <linearGradient id="sky-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1E2B9" />
          <stop offset="1" stopColor="#F7EDD3" />
        </linearGradient>
      </defs>
      <rect x={-1500} y={-1200} width={4000} height={1760} fill="url(#sky-wash)" />
    </g>
  );
}

/** Pale blue cloud wash resting on the far ridge. */
export function CloudWash() {
  return (
    <g>
      <path d={furBlob(3, 330, 440, 190, 38, 30, 0.14)} fill="#D5E2EA" />
      <path d={furBlob(5, 300, 428, 120, 22, 22, 0.14)} fill="#EAF1F3" />
      <path d={furBlob(9, 120, 470, 150, 28, 26, 0.12)} fill="#D5E2EA" />
      <path d={furBlob(11, 700, 455, 160, 30, 28, 0.12)} fill="#DDE8EC" />
      <path d={hatch(4, 180, 420, 300, 40, 26, 12, -0.8)} stroke="#9DB6C3" strokeWidth={0.9} fill="none" opacity={0.5} strokeLinecap="round" />
    </g>
  );
}

/** Dusty blue → blue-green → olive hills with coloured-pencil hatching. */
export function Hills({ y }: { y: number }) {
  const far = ridge(11, -700, 1700, y - 80, 70, 90, y + 300);
  const mid = ridge(23, -700, 1700, y - 38, 62, 70, y + 300);
  const near = ridge(37, -700, 1700, y - 8, 26, 60, y + 300);
  const pencil = (pts: [number, number][], seed: number, color: string, op: number, h: number) =>
    pts.filter((_, i) => i % 2 === 0).map((p, i) => (
      <path key={i} d={hatch(seed + i, p[0], p[1] + 6, 70, h, 14, 13, 0.6)} stroke={color} strokeWidth={0.9} fill="none" opacity={op} strokeLinecap="round" />
    ));
  return (
    <g>
      <path d={far.fill} fill="#A8BEC7" />
      <path d={far.line} fill="none" stroke="#5E7A86" strokeWidth={1.2} opacity={0.7} />
      <g>{pencil(far.pts, 5, "#7C99A6", 0.6, 60)}</g>
      <path d={mid.fill} fill="#86A596" />
      <path d={mid.line} fill="none" stroke="#3F5D4F" strokeWidth={1.2} opacity={0.7} />
      <g>{pencil(mid.pts, 9, "#4F7160", 0.6, 46)}</g>
      <path d={near.fill} fill="#7E9A55" />
      <path d={near.line} fill="none" stroke="#3F5A2E" strokeWidth={1.2} opacity={0.7} />
    </g>
  );
}

/** Sunlit olive meadow, built from layered pencil strokes. */
export function Meadow({ y }: { y: number }) {
  const r = rng(5);
  const top: [number, number][] = [];
  for (let x = -700; x <= 1700; x += 140) top.push([x, y + Math.sin(x / 180) * 7 + r() * 4]);
  const d = smooth(top);
  return (
    <g>
      <path d={`${d}L1700,1500L-700,1500Z`} fill="#B2B658" />
      <path d={`M-700,${y + 80}C-300,${y + 52} 100,${y + 100} 500,${y + 70}S1200,${y + 64} 1700,${y + 90}L1700,1500L-700,1500Z`} fill="#A5AB4B" />
      <path d={`M-700,${y + 230}C-200,${y + 200} 300,${y + 250} 800,${y + 215}S1400,${y + 230} 1700,${y + 225}L1700,1500L-700,1500Z`} fill="#98A040" opacity={0.8} />
      <path d={d} fill="none" stroke="#5E6B33" strokeWidth={1.3} opacity={0.8} />
      <g fill="none" strokeLinecap="round">
        <path d={blades(21, -300, 1300, y + 6, y + 340, 520, 15)} stroke="#D6D77E" strokeWidth={1.2} opacity={0.85} />
        <path d={blades(22, -300, 1300, y + 8, y + 340, 520, 15)} stroke="#6F7B3C" strokeWidth={1.2} opacity={0.85} />
        <path d={blades(23, -300, 1300, y + 60, y + 340, 280, 17)} stroke="#E4C76A" strokeWidth={1.1} opacity={0.8} />
        <path d={blades(24, -300, 1300, y + 150, y + 360, 160, 20)} stroke="#4F6B3E" strokeWidth={1.3} opacity={0.8} />
      </g>
    </g>
  );
}

/** Warm sunlight patches on the grass under the tree. */
export function Sunlight({ cx, cy, w }: { cx: number; cy: number; w: number }) {
  const r = rng(31);
  return (
    <g opacity={0.55}>
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={furBlob(40 + i, cx + (r() - 0.5) * w, cy + r() * 90, 20 + r() * 40, 6 + r() * 9, 14, 0.2)} fill="#F2DC8A" />
      ))}
    </g>
  );
}

export function Rock({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-58,0 Q-66,-34 -30,-52 Q10,-70 46,-44 Q70,-22 62,0Z" fill="#9C918A" {...LINE} />
      <path d="M10,-60 Q50,-40 62,0 L26,0 Q34,-30 10,-60Z" fill="#7F746F" />
      <path d="M-44,-14 q16,-24 34,-30 M-20,-10 q10,-8 16,-22" stroke="#C9BFB4" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.7} />
      <path d={hatch(3, -40, -50, 80, 44, 14, 9, 0.6)} stroke={C.ink} strokeWidth={0.8} fill="none" opacity={0.5} />
    </g>
  );
}

/** Tiny wildflower: stem, leaf, 5 petals. */
export function Flower({ x, y, s = 1, color = "#E4B23A", i = 0 }: { x: number; y: number; s?: number; color?: string; i?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}><g className="anim sway-s" style={{ animationDelay: `${-(i % 5)}s` }}>
      <path d="M0,0Q-3,-14 0,-28" fill="none" stroke="#4F6B3E" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M0,-9q-7,-1 -9,-8q8,0 9,8Z" fill="#7E9A55" stroke={C.ink} strokeWidth={0.8} />
      <g transform="translate(0,-29)">
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cy={-4.4} rx={3} ry={4.6} fill={color} stroke={C.ink} strokeWidth={0.8} transform={`rotate(${a})`} />)}
        <circle r={2.2} fill={color === "#F7F1E2" ? "#E4B23A" : "#B8782A"} stroke={C.ink} strokeWidth={0.6} />
      </g>
    </g></g>
  );
}

export function Wildflowers({ x0, x1, y0, y1, seed, count, scale = 1 }: { x0: number; x1: number; y0: number; y1: number; seed: number; count: number; scale?: number }) {
  const r = rng(seed);
  const cols = ["#E4B23A", "#E4B23A", "#E4B23A", "#F7F1E2", "#EBC65A"];
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const y = y0 + r() * (y1 - y0);
        const s = scale * (0.55 + ((y - y0) / (y1 - y0 + 1)) * 0.8);
        return <Flower key={i} x={x0 + r() * (x1 - x0)} y={y} s={s} color={cols[i % cols.length]} i={i} />;
      })}
    </g>
  );
}

/** Tall foreground blades framing the lower corner. */
export function FrontGrass({ x, y, s = 1, flip = 1 }: { x: number; y: number; s?: number; flip?: number }) {
  const r = rng(Math.round(x) + 9);
  let d = "";
  for (let i = 0; i < 16; i++) {
    const bx = (r() - 0.3) * 70, h = 70 + r() * 110, lean = (r() - 0.35) * 60;
    d += `M${bx.toFixed(1)},0C${(bx + lean * 0.2).toFixed(1)},${(-h * 0.5).toFixed(1)} ${(bx + lean * 0.7).toFixed(1)},${(-h * 0.8).toFixed(1)} ${(bx + lean).toFixed(1)},${(-h).toFixed(1)}C${(bx + lean * 0.6 + 6).toFixed(1)},${(-h * 0.7).toFixed(1)} ${(bx + 8).toFixed(1)},${(-h * 0.35).toFixed(1)} ${(bx + 7).toFixed(1)},0Z`;
  }
  return (
    <g transform={`translate(${x},${y}) scale(${s * flip},${s})`}><g className="anim sway-s">
      <path d={d} fill="#5E7B3A" stroke={C.ink} strokeWidth={1} />
    </g></g>
  );
}
void FINE;
