import { hatch, rng, OAK_LEAF, furBlob } from "@/lib/draw";
import { C, LINE } from "./palette";

/** Old oak trunk + limbs. Origin: base-centre on the ground. Warm brown bark with sunlit ochre patches. */
export function Trunk() {
  const bark = "#8A5A3C";
  return (
    <g>
      {/* limbs */}
      <path d="M-20,-330 C-110,-372 -210,-370 -330,-440" fill="none" stroke={C.ink} strokeWidth={36} strokeLinecap="round" />
      <path d="M-20,-330 C-110,-372 -210,-370 -330,-440" fill="none" stroke={bark} strokeWidth={32} strokeLinecap="round" />
      <path d="M30,-350 C100,-390 170,-410 250,-470" fill="none" stroke={C.ink} strokeWidth={30} strokeLinecap="round" />
      <path d="M30,-350 C100,-390 170,-410 250,-470" fill="none" stroke={bark} strokeWidth={26} strokeLinecap="round" />
      <path d="M-330,-440 C-380,-470 -410,-470 -440,-500 M-210,-392 C-230,-440 -250,-470 -270,-500" fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
      <path d="M-330,-440 C-380,-470 -410,-470 -440,-500 M-210,-392 C-230,-440 -250,-470 -270,-500" fill="none" stroke={bark} strokeWidth={14} strokeLinecap="round" />
      {/* trunk with big root flare */}
      <path d="M-150,6 C-90,-6 -92,-70 -82,-150 C-76,-240 -70,-310 -60,-400 L74,-400 C70,-310 80,-230 86,-150 C94,-70 90,-8 160,6 C70,22 -60,22 -150,6Z" fill={bark} {...LINE} strokeWidth={2} />
      {/* shaded right side */}
      <path d="M22,-398 C24,-300 40,-230 50,-140 C56,-70 50,-14 110,10 C130,4 148,0 160,6 C96,-8 94,-70 86,-150 C80,-230 70,-310 74,-398Z" fill="#6B4430" />
      {/* sunlit ochre patches on the lit side */}
      <g fill="#D3A046" opacity={0.9}>
        <path d={furBlob(61, -34, -110, 30, 60, 12, 0.25)} />
        <path d={furBlob(62, -40, -230, 22, 50, 12, 0.25)} />
        <path d={furBlob(63, -6, -320, 26, 38, 12, 0.25)} />
        <path d={furBlob(64, -52, -40, 20, 26, 12, 0.25)} />
      </g>
      {/* pencil bark: long dark strokes + light hatching */}
      <path d="M-56,-40 C-60,-140 -52,-240 -46,-380 M-26,-20 C-30,-130 -22,-250 -22,-390 M2,-30 C-2,-140 6,-250 6,-390 M34,-20 C30,-130 38,-240 38,-380 M62,-20 C58,-120 64,-220 62,-360" fill="none" stroke="#3E2A1E" strokeWidth={1.5} opacity={0.75} strokeLinecap="round" />
      <path d={hatch(21, -76, -390, 150, 380, 150, 16, 0.08)} stroke="#4C3324" strokeWidth={1} fill="none" opacity={0.55} />
      <path d={hatch(22, -70, -380, 70, 300, 70, 14, 0.1)} stroke="#E8C27A" strokeWidth={1} fill="none" opacity={0.6} />
      {/* roots */}
      <path d="M-130,4 C-180,6 -216,-4 -252,12 M140,4 C190,8 232,-2 268,14" fill="none" stroke={C.ink} strokeWidth={20} strokeLinecap="round" />
      <path d="M-130,4 C-180,6 -216,-4 -252,12 M140,4 C190,8 232,-2 268,14" fill="none" stroke={bark} strokeWidth={16} strokeLinecap="round" />
    </g>
  );
}

const GREENS = ["#7C8A3A", "#9AA845", "#B7B955", "#5E6B33", "#A3A94C"];
const rotJ = (n: number) => n;

/** Oak canopy: hundreds of lobed leaves in four olive tones, denser on top and toward the right. */
export function Canopy({ side = "back" }: { side?: "back" | "front" }) {
  const r = rng(side === "back" ? 17 : 91);
  const leaves: { x: number; y: number; a: number; s: number; c: string; hi: boolean }[] = [];
  const n = side === "back" ? 1150 : 330;
  for (let i = 0; i < n; i++) {
    const t = r();
    const x = -470 + Math.pow(r(), 0.85) * 900;
    const yTop = -700 + Math.abs(x + 60) * 0.2;
    const y = yTop + t * (side === "back" ? 330 : 230);
    leaves.push({ x, y, a: r() * 360, s: 0.75 + r() * 0.8, c: GREENS[Math.floor(r() * GREENS.length)], hi: r() > 0.8 });
  }
  return (
    <g>
      {leaves.map((l, i) => (
        <path key={i} d={OAK_LEAF} transform={`translate(${l.x.toFixed(0)},${l.y.toFixed(0)}) rotate(${rotJ(l.a).toFixed(0)}) scale(${(l.s * 0.7).toFixed(2)},${(l.s * 1.2).toFixed(2)})`} fill={l.hi ? "#D0CB62" : l.c} stroke={C.ink} strokeWidth={0.5} />
      ))}
    </g>
  );
}

/** Foliage that gently moves, as separate clusters. */
export function CanopyBack() {
  return (
    <g>
      <g className="anim sway-b"><Canopy side="back" /></g>
    </g>
  );
}
export function CanopyFront() {
  return <g className="anim sway"><Canopy side="front" /></g>;
}
