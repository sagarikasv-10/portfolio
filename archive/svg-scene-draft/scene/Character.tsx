import { furBlob, hatch, rng } from "@/lib/draw";
import { C, FINE, LINE } from "./palette";

/**
 * Sagarika — DRAFT illustration (replace via ART_OVERRIDES.character when final art is ready).
 * Origin: bottom-centre on the ground. ~185 tall, adult proportions, seated against the tree,
 * head tilted down toward the laptop. Sub-groups (Hair, Glasses, EarJewellery, Laptop) are separate.
 */

function Hair() {
  const r = rng(42);
  // dense curly mass: bumpy silhouette + inner curl strokes
  const curls: string[] = [];
  for (let i = 0; i < 70; i++) {
    const a = Math.PI * (1.0 + r() * 1.0);
    const rad = r() * 54;
    const x = Math.cos(a) * rad * 1.05;
    const y = -52 + Math.sin(a) * rad * 0.58;
    const s = 5 + r() * 6;
    curls.push(`M${x.toFixed(1)},${y.toFixed(1)}a${s.toFixed(1)},${(s * 0.9).toFixed(1)} 0 1 1 ${(s * 0.8).toFixed(1)},${(s * 0.7).toFixed(1)}a${(s * 0.5).toFixed(1)},${(s * 0.5).toFixed(1)} 0 1 1 ${(-s * 0.5).toFixed(1)},${(-s * 0.4).toFixed(1)}`);
  }
  return (
    <g>
      <path d={furBlob(3, 0, -54, 58, 40, 34, 0.16)} fill={C.hair} {...LINE} strokeWidth={2.2} />
      <path d={furBlob(8, -6, -64, 42, 24, 22, 0.14)} fill="#2F2825" stroke="none" />
      <path d={curls.join("")} fill="none" stroke={C.hairLight} strokeWidth={1.4} strokeLinecap="round" opacity={0.55} />
      <path d={curls.slice(0, 26).join("")} fill="none" stroke="#7A6A60" strokeWidth={1.1} strokeLinecap="round" opacity={0.35} />
    </g>
  );
}

function ForeheadCurls() {
  return (
    <g>
      {[[-26, -34, 9], [-12, -41, 8], [3, -42, 9], [19, -38, 8], [31, -31, 7], [-36, -26, 6]].map(([x, y, rr], i) => (
        <g key={i}>
          <path d={furBlob(20 + i, x, y, rr, rr * 0.9, 9, 0.18)} fill={C.hair} {...LINE} strokeWidth={1.6} />
          <path d={`M${x - 3},${y - 1}a3.2,3.2 0 1 1 4.6,2.8`} fill="none" stroke={C.hairLight} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Glasses() {
  const frame = "#1B1D1F";
  return (
    <g>
      {/* large black square frames, heavier on top, slightly tapering */}
      <path d="M-47,-17 L-6,-15 L-10,15 L-43,17Z" fill="#e3eaee" fillOpacity={0.12} stroke={frame} strokeWidth={3.6} strokeLinejoin="round" />
      <path d="M6,-15 L47,-17 L43,17 L10,15Z" fill="#e3eaee" fillOpacity={0.12} stroke={frame} strokeWidth={3.6} strokeLinejoin="round" />
      <path d="M-48,-19 L-5,-17 M5,-17 L48,-19" stroke={frame} strokeWidth={2.6} strokeLinecap="round" />
      <path d="M-6,-10 Q0,-13 6,-10" stroke={frame} strokeWidth={3.2} fill="none" strokeLinecap="round" />
      <path d="M-48,-14 L-52,-8 M48,-14 L52,-8" stroke={frame} strokeWidth={4} strokeLinecap="round" />
      <path d="M-37,-10 l6,-1 M16,-10 l6,-1" stroke="#fff" strokeWidth={1.4} opacity={0.55} strokeLinecap="round" />
    </g>
  );
}

function EarJewellery() {
  return (
    <g>
      <path d="M45,-9 Q55,-5 54,6" fill="none" stroke={C.silver} strokeWidth={2.8} strokeLinecap="round" />
      <path d="M54,4 Q57,19 50,34" fill="none" stroke={C.silver} strokeWidth={1.3} strokeDasharray="2 1.5" />
      <circle cx={49} cy={15} r={4} fill="none" stroke={C.silver} strokeWidth={1.5} />
      <path d="M50,20 L50,46" stroke={C.silver} strokeWidth={1.7} strokeLinecap="round" />
      <circle cx={50} cy={22} r={2} fill={C.silver} />
    </g>
  );
}

function Head() {
  return (
    <g>
      <ellipse cx={-41} cy={5} rx={5.5} ry={9.5} fill={C.skin} {...LINE} strokeWidth={2} />
      <ellipse cx={41} cy={5} rx={5.5} ry={9.5} fill={C.skin} {...LINE} strokeWidth={2} />
      <g transform="translate(-5,0)"><EarJewellery /></g>
      <Hair />
      {/* face: softer, less round than before */}
      <path
        d="M-39,-14 C-40,-40 -26,-54 0,-54 C26,-54 40,-40 39,-14 C38,10 34,30 20,44 C13,52 6,55 0,55 C-6,55 -13,52 -20,44 C-34,30 -38,10 -39,-14Z"
        fill={C.skin}
        {...LINE}
        strokeWidth={2}
      />
      {/* planes of shade */}
      <path d="M39,-14 C38,10 34,30 20,44 C13,52 6,55 0,55 C14,50 30,36 35,6Z" fill={C.skinShade} opacity={0.5} />
      <path d={hatch(7, 18, 6, 18, 36, 9, 9, 0.4)} stroke={C.skinShade} strokeWidth={1.2} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* faded sides + two shaved lines at viewer's right temple */}
      <path d="M-39,-14 C-41,-30 -36,-42 -29,-47 L-34,-12Z" fill="#4A3F3A" opacity={0.85} />
      <path d="M39,-14 C41,-30 36,-42 29,-47 L34,-12Z" fill="#4A3F3A" opacity={0.85} />
      <path d="M31,-27 L41,-33 M32,-19 L42,-25" stroke={C.skin} strokeWidth={2.4} strokeLinecap="round" />
      <ForeheadCurls />
      {/* brows: heavy, level */}
      <path d="M-46,-26 Q-27,-33 -7,-25 M7,-25 Q27,-33 46,-26" stroke={C.hair} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* eyes cast down toward the screen: heavy lids, no highlight */}
      <g className="anim blink">
        <path d="M-34,2 Q-27,-3 -20,2 Q-27,5 -34,2Z" fill="#241A18" />
        <path d="M20,2 Q27,-3 34,2 Q27,5 20,2Z" fill="#241A18" />
        <path d="M-36,0 Q-27,-5 -18,0 M18,0 Q27,-5 36,0" stroke={C.hair} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      </g>
      <Glasses />
      {/* nose, closed half-smile */}
      <path d="M-1,9 Q-6,21 -2,25 Q4,26 5,20" fill="none" stroke={C.skinShade} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M-12,36 Q2,40 17,31" fill="none" stroke="#6E3F36" strokeWidth={2} strokeLinecap="round" />
      <path d="M17,31 q3,-1 4,-4" fill="none" stroke={C.skinShade} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  );
}

export function Laptop() {
  return (
    <g>
      <path d="M-26,-62 L26,-62 L31,-53 L-31,-53Z" fill="#8D959B" {...LINE} />
      <rect x={-24} y={-102} width={48} height={41} rx={3} fill="#B2B8BD" {...LINE} />
      <path d="M-19,-97 h26" stroke="#fff" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
      {/* a quiet mark on the lid */}
      <circle cx={0} cy={-82} r={4.5} fill="none" stroke={C.ink} strokeWidth={0.8} opacity={0.55} />
    </g>
  );
}

function Boot({ side }: { side: -1 | 1 }) {
  return (
    <g transform={`scale(${side},1)`}>
      <path d="M-26,-18 L-39,-18 L-41,-8 Q-50,-4 -47,0 L-22,0 Q-18,-3 -20,-8Z" fill={C.boot} {...LINE} />
      <path d={hatch(side + 11, -45, -14, 20, 10, 7, 4, 0.2)} stroke={C.ink} strokeWidth={0.6} fill="none" opacity={0.5} />
      <path d="M-37,-18 l3,-4 M-31,-18 l3,-4" stroke={C.ink} strokeWidth={0.8} strokeLinecap="round" />
    </g>
  );
}

export function Character({ children }: { children?: React.ReactNode }) {
  return (
    <g>
      {/* torso: oversized charcoal tee, soft folds */}
      <path d="M-23,-124 C-26,-106 -25,-60 -24,-24 L24,-24 C25,-60 26,-106 23,-124 C13,-130 -13,-130 -23,-124Z" fill={C.tee} {...LINE} />
      <path d="M-14,-118 C-18,-96 -16,-60 -18,-30 M10,-110 C13,-90 11,-56 14,-30 M18,-112 q3,16 2,40" fill="none" stroke={C.teeDark} strokeWidth={1} opacity={0.9} />
      <path d={hatch(3, 8, -118, 14, 80, 14, 8, 0.2)} stroke={C.teeDark} strokeWidth={0.9} fill="none" opacity={0.9} />
      <g transform="rotate(-1.5)" fill="none" stroke={C.ochre} strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round">
        <circle cx={9} cy={-114} r={3} fill={C.ochre} />
        <path d="M-15,-104 L-6,-117 L-1,-110 L4,-116 L15,-104Z" />
        <path d="M-9,-104 L-6,-109 L-3,-104" />
      </g>
      <path d="M-8,-130 Q0,-121 8,-130" fill={C.skinShade} stroke={C.ink} strokeWidth={0.9} />
      <path d="M-5,-140 L-5,-128 Q0,-122 5,-128 L5,-140Z" fill={C.skin} {...LINE} />

      {/* legs: knees raised, olive joggers */}
      {([-1, 1] as const).map((s) => (
        <g key={s}>
          <path d={`M${9 * s},-26 L${28 * s},-70 L${31 * s},-14`} fill="none" stroke={C.ink} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${9 * s},-26 L${28 * s},-70 L${31 * s},-14`} fill="none" stroke={C.pants} strokeWidth={13.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${25 * s},-66 q${3 * s},20 ${1 * s},44`} fill="none" stroke={C.pantsShade} strokeWidth={0.9} opacity={0.9} />
          <path d={hatch(s + 5, s > 0 ? 29 : -37, -66, 8, 44, 7, 7, 0.2)} stroke={C.pantsShade} strokeWidth={0.8} fill="none" opacity={0.8} />
          <path d={`M${24 * s},-17 q${7 * s},3 ${14 * s},0`} stroke={C.ink} strokeWidth={0.9} fill="none" />
        </g>
      ))}
      <Boot side={-1} />
      <g className="anim foot"><Boot side={1} /></g>

      {/* arms: short oversized sleeves, forearms to the keys */}
      {([-1, 1] as const).map((s) => (
        <g key={s}>
          <path d={`M${s * 23},-124 C${s * 32},-120 ${s * 36},-106 ${s * 34},-92 L${s * 26},-90 L${s * 22},-108Z`} fill={C.tee} {...LINE} />
          <path d={`M${s * 31},-91 Q${s * 36},-76 ${s * 27},-62`} fill="none" stroke={C.ink} strokeWidth={6.6} strokeLinecap="round" />
          <path d={`M${s * 31},-91 Q${s * 36},-76 ${s * 27},-62`} fill="none" stroke={C.skin} strokeWidth={4.8} strokeLinecap="round" />
        </g>
      ))}
      {/* abstract tattoo line on the left forearm + wrist details */}
      <path d="M-36,-80 q2,-3 4,0 t4,0 t3,-1" fill="none" stroke={C.ink} strokeWidth={0.8} opacity={0.55} strokeLinecap="round" transform="rotate(70 -34 -78)" />
      <rect x={31} y={-76} width={6} height={4.6} rx={2.2} fill="#2c3033" stroke={C.silver} strokeWidth={0.9} transform="rotate(20 39 -74)" />
      <path d="M-34,-72 q3,3 6,3" stroke="#A8553D" strokeWidth={1} fill="none" strokeLinecap="round" />

      <Laptop />
      {children}

      <g className="anim type-l"><ellipse cx={-27} cy={-58} rx={5} ry={3.6} fill={C.skin} {...LINE} /></g>
      <g className="anim type-r"><ellipse cx={27} cy={-58} rx={5} ry={3.6} fill={C.skin} {...LINE} /></g>

      {/* head: scaled, tilted down and slightly turned toward the screen */}
      <g transform="translate(2,-154) rotate(-5) scale(0.37)"><Head /></g>
    </g>
  );
}
void FINE;
