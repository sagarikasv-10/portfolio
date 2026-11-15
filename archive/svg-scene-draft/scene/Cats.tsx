import { furBlob, hatch } from "@/lib/draw";
import { C, FINE, LINE } from "./palette";

export type CatLook = {
  fur: string;
  alt?: string;
  white?: string;
  eye?: string;
  stripes?: boolean;
  patches?: boolean;
  tux?: boolean;
};

/** Coat looks for all nine cats (muted to sit in the palette). */
export const LOOKS = {
  tabbyGrey: { fur: "#9A978E", alt: "#4A4541", white: "#EDE4CE", eye: "#B09A48", stripes: true } as CatLook,
  gingerWhite: { fur: "#C98F58", alt: "#9A6634", white: "#F0E6D0", eye: "#7E9358", stripes: true } as CatLook,
  brownTabby: { fur: "#7A5E48", alt: "#2E2622", white: "#E6DBC2", eye: "#B79A48", stripes: true } as CatLook,
  black: { fur: "#2E2B2A", alt: "#1E1C1B", eye: "#B8A744" } as CatLook,
  tuxedo: { fur: "#2E2B2A", white: "#EDE4CE", eye: "#B8A744", tux: true } as CatLook,
  calico: { fur: "#EDE4CE", alt: "#C98F58", white: "#EDE4CE", eye: "#7E9358", patches: true } as CatLook,
  persianWhite: { fur: "#F3EBDA", alt: "#D5C9AE", white: "#FBF6EA", eye: "#B8975F" } as CatLook,
  persianGinger: { fur: "#CB9A62", alt: "#A9783F", white: "#E6CDA0", eye: "#9A6E2C" } as CatLook,
};

function Eye({ x, y, eye, mirror = 1 }: { x: number; y: number; eye: string; mirror?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${mirror},1)`}>
      <path d="M-5,0 Q0,-3.6 5,0 Q0,3.2 -5,0Z" fill={eye} stroke={C.ink} strokeWidth={0.6} />
      <ellipse cx={0} cy={0} rx={0.9} ry={2.4} fill="#14161a" />
    </g>
  );
}

/** Sitting cat facing the viewer. Origin bottom-centre. ~100 tall. */
export function SitCat({ look, tail = "right", sleepy = false }: { look: CatLook; tail?: "left" | "right"; sleepy?: boolean }) {
  const { fur, alt, white = "#E8E1D0", eye = "#A8944A" } = look;
  const flip = tail === "left" ? "scale(-1,1)" : undefined;
  return (
    <g>
      <g transform={flip}>
        <g className="anim tail-slow" style={{ transformOrigin: "0% 100%" }}>
          <path d="M20,-3 C44,3 60,-4 54,-16" fill="none" stroke={C.ink} strokeWidth={8.4} strokeLinecap="round" />
          <path d="M20,-3 C44,3 60,-4 54,-16" fill="none" stroke={fur} strokeWidth={6.6} strokeLinecap="round" />
          {look.stripes && <path d="M34,-1 l1,-5 M43,0 l0,-5 M51,-5 l-3,-4" stroke={alt} strokeWidth={1.6} strokeLinecap="round" />}
        </g>
      </g>
      <path d="M-22,0 C-27,-22 -21,-52 -9,-62 L9,-62 C21,-52 27,-22 22,0Z" fill={fur} {...LINE} />
      {look.stripes && <path d="M-22,-40 q6,2 10,6 M-23,-28 q7,1 11,5 M22,-40 q-6,2 -10,6 M23,-28 q-7,1 -11,5" stroke={alt} strokeWidth={1.7} fill="none" strokeLinecap="round" />}
      {(look.tux || look.white) && <path d="M-7,-58 Q0,-50 7,-58 L6,-12 Q0,-6 -6,-12Z" fill={white} opacity={look.stripes ? 0.9 : 1} />}
      {look.patches && <path d="M-22,-44 Q-14,-62 -4,-60 Q-8,-44 -22,-44Z M12,-34 Q26,-36 22,-8 Q14,-10 12,-34Z" fill={alt} />}
      <g {...LINE}>
        <path d="M-10,-30 L-10,-2 Q-10,0 -7,0 L-3,0 L-3,-30Z" fill={fur} />
        <path d="M3,-30 L3,0 L7,0 Q10,0 10,-2 L10,-30Z" fill={fur} />
        <path d="M-10,-5 h7 v5 h-8Z M3,-5 h7 v5 h-7Z" fill={white} />
      </g>
      {/* head, proportionate */}
      <path d="M-15,-80 L-15,-100 L-2,-86Z M15,-80 L15,-100 L2,-86Z" fill={fur} {...LINE} />
      <path d="M-12,-84 L-12,-94 L-6,-86Z M12,-84 L12,-94 L6,-86Z" fill={C.rose} opacity={0.5} />
      <path d="M-18,-70 C-19,-82 -10,-88 0,-88 C10,-88 19,-82 18,-70 C17,-62 8,-58 0,-58 C-8,-58 -17,-62 -18,-70Z" fill={fur} {...LINE} />
      {look.tux && <path d="M-6,-60 Q0,-84 6,-60 Q0,-56 -6,-60Z" fill={white} />}
      {look.stripes && <path d="M0,-88 v7 M-5,-87 l1,6 M5,-87 l-1,6 M-18,-72 h6 M18,-72 h-6" stroke={alt} strokeWidth={1.4} strokeLinecap="round" />}
      {look.patches && <path d="M-18,-72 Q-18,-86 -4,-86 Q-6,-74 -18,-72Z" fill={alt} />}
      {sleepy ? (
        <path d="M-11,-72 q4,3 8,0 M3,-72 q4,3 8,0" stroke={C.ink} strokeWidth={1.2} fill="none" strokeLinecap="round" />
      ) : (
        <g className="anim blink"><Eye x={-7} y={-72} eye={eye} /><Eye x={7} y={-72} eye={eye} mirror={-1} /></g>
      )}
      <path d="M-2,-66 L2,-66 L0,-63Z" fill={C.rose} stroke={C.ink} strokeWidth={0.6} strokeLinejoin="round" />
      <path d="M0,-63 v2 M-4,-60 q4,3 4,-1 M4,-60 q-4,3 -4,-1" stroke={C.ink} strokeWidth={0.7} fill="none" strokeLinecap="round" />
      <path d="M-10,-65 l-14,-3 M-10,-63 l-13,2 M10,-65 l14,-3 M10,-63 l13,2" stroke={C.ink} strokeWidth={0.5} opacity={0.5} />
    </g>
  );
}

/** Loafing, sleeping Persian: long fur edge, flat face. Origin bottom-centre. ~60 tall. */
export function PersianLoaf({ look }: { look: CatLook }) {
  const { fur, alt = "#CFC5AD", white = "#F6F2E8" } = look;
  return (
    <g>
      <g className="anim tail-slow" style={{ transformOrigin: "100% 100%" }}>
        <path d={furBlob(4, -62, -16, 24, 9, 16, 0.12)} fill={fur} {...LINE} />
      </g>
      <g className="anim breathe">
        <path d={furBlob(7, 0, -22, 58, 22, 40, 0.07)} fill={fur} {...LINE} />
        <path d="M-40,-10 q8,6 16,0 M-12,-6 q8,6 16,0 M16,-10 q8,6 16,0" stroke={alt} strokeWidth={1} fill="none" strokeLinecap="round" />
        <path d={hatch(9, -48, -34, 80, 26, 22, 7, 0.1)} stroke={alt} strokeWidth={0.8} fill="none" opacity={0.8} />
      </g>
      <path d="M26,-50 L30,-64 L38,-54Z M52,-50 L50,-64 L42,-54Z" fill={fur} {...LINE} />
      <path d={furBlob(11, 42, -32, 24, 20, 30, 0.07)} fill={fur} {...LINE} />
      <ellipse cx={42} cy={-26} rx={11} ry={7} fill={white} opacity={0.85} />
      <path d="M31,-35 q5,3 10,0 M44,-35 q5,3 10,0" stroke={C.ink} strokeWidth={1.1} fill="none" strokeLinecap="round" />
      <ellipse cx={42} cy={-29} rx={2.2} ry={1.6} fill={C.rose} stroke={C.ink} strokeWidth={0.6} />
      <path d="M42,-27 v2 M38,-24 q4,3 4,-1 M46,-24 q-4,3 -4,-1" stroke={C.ink} strokeWidth={0.8} fill="none" strokeLinecap="round" />
      <path d="M26,-6 q4,-5 12,-3 q-2,7 -12,3Z M48,-8 q8,-4 14,2 q-8,5 -14,-2Z" fill={white} {...LINE} />
    </g>
  );
}

/** Walking cat, side view facing right. Origin bottom-centre. */
export function WalkCat({ look }: { look: CatLook }) {
  const { fur, alt, white = "#EDE5D2", eye = "#7A8F5E" } = look;
  return (
    <g>
      <g className="anim tail" style={{ transformOrigin: "100% 100%" }}>
        <path d="M-40,-38 C-66,-40 -68,-74 -54,-84" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <path d="M-40,-38 C-66,-40 -68,-74 -54,-84" fill="none" stroke={fur} strokeWidth={6} strokeLinecap="round" />
        {look.stripes && <path d="M-62,-56 l5,-3 M-61,-68 l5,-1" stroke={alt} strokeWidth={1.5} strokeLinecap="round" />}
      </g>
      <g {...LINE}>
        <path d="M-34,-26 L-38,-2 L-27,-2 L-23,-26Z" fill={fur} />
        <path d="M-39,-4 h14 v4 h-15Z" fill={white} />
        <path d="M24,-28 L30,-2 L39,-2 L34,-28Z" fill={fur} />
        <path d="M28,-4 h13 v4 h-14Z" fill={white} />
      </g>
      <path d="M-46,-34 C-48,-56 -20,-58 6,-56 C32,-56 44,-48 43,-34 C40,-24 -40,-22 -46,-34Z" fill={fur} {...LINE} />
      <path d="M-2,-28 C14,-24 30,-26 40,-32 C42,-24 28,-20 8,-21Z" fill={white} />
      {look.stripes && <path d="M-34,-52 l4,12 M-22,-55 l4,13 M-8,-56 l3,13 M6,-56 l3,13" stroke={alt} strokeWidth={1.8} strokeLinecap="round" fill="none" />}
      <path d="M38,-70 L40,-86 L49,-74Z M56,-72 L62,-86 L66,-70Z" fill={fur} {...LINE} />
      <path d="M36,-62 C36,-74 46,-78 56,-76 C66,-74 72,-66 70,-58 C68,-50 58,-48 50,-48 C42,-48 36,-52 36,-62Z" fill={fur} {...LINE} />
      <path d="M52,-58 Q68,-60 70,-54 Q64,-47 52,-49Z" fill={white} />
      <g className="anim blink-b"><Eye x={55} y={-64} eye={eye} /></g>
      <circle cx={69} cy={-56} r={1.6} fill={C.rose} stroke={C.ink} strokeWidth={0.6} />
      {look.stripes && <path d="M46,-76 v5 M53,-77 v5" stroke={alt} strokeWidth={1.4} strokeLinecap="round" />}
    </g>
  );
}
void FINE;


/** Curled, sleeping cat seen from the side. Origin bottom-centre. ~50 tall, ~100 wide. */
export function CurledCat({ look }: { look: CatLook }) {
  const { fur, alt = "#2E2622", white = "#E6DBC2" } = look;
  return (
    <g>
      <g className="anim breathe">
        <path d={furBlob(8, 0, -22, 50, 24, 30, 0.06)} fill={fur} {...LINE} />
        <path d="M-40,-22 q10,-16 22,-20 M-24,-8 q16,-26 40,-30 M-6,-4 q22,-22 44,-24 M14,-4 q18,-14 32,-14" stroke={alt} strokeWidth={2.4} fill="none" strokeLinecap="round" />
        <path d={hatch(5, -40, -42, 80, 40, 22, 8, 0.4)} stroke={alt} strokeWidth={0.9} fill="none" opacity={0.7} />
      </g>
      <path d="M32,-12 C54,-10 56,-28 44,-34" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
      <path d="M32,-12 C54,-10 56,-28 44,-34" fill="none" stroke={fur} strokeWidth={7} strokeLinecap="round" />
      <path d="M-46,-24 L-44,-42 L-34,-32Z" fill={fur} {...LINE} />
      <path d={furBlob(12, -36, -18, 18, 15, 18, 0.06)} fill={fur} {...LINE} />
      <path d="M-46,-14 q6,5 14,1" stroke={white} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M-44,-20 q4,3 8,0" stroke={C.ink} strokeWidth={1.1} fill="none" strokeLinecap="round" />
      <ellipse cx={-48} cy={-14} rx={1.8} ry={1.4} fill={C.rose} />
    </g>
  );
}
