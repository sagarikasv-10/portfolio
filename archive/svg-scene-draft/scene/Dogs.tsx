import { hatch } from "@/lib/draw";
import { C, LINE } from "./palette";

const FAWN = "#BE9462";
const FAWN_D = "#9A7545";
const WHITE = "#EDE5D2";

/**
 * Fawn Indian indie dog, lean, side view facing right. Origin bottom-centre. ~85 tall, ~165 wide.
 * asleep = head resting on forepaws, eyes closed.
 */
export function IndieDog({ asleep = false, wagClass = "wag" }: { asleep?: boolean; wagClass?: string }) {
  return (
    <g>
      <g className={`anim ${wagClass}`} style={{ transformOrigin: "100% 100%" }}>
        <path d="M-66,-20 C-96,-22 -102,-52 -88,-62" fill="none" stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
        <path d="M-66,-20 C-96,-22 -102,-52 -88,-62" fill="none" stroke={FAWN} strokeWidth={7} strokeLinecap="round" />
      </g>
      <g className="anim breathe" style={{ transformOrigin: "50% 100%" }}>
        <path d="M-70,0 C-84,-6 -86,-38 -60,-46 C-30,-52 14,-50 40,-44 C54,-40 56,-18 50,0Z" fill={FAWN} {...LINE} />
        <path d="M-62,-14 C-62,-36 -36,-40 -32,-20 C-30,-6 -42,-2 -62,-2Z" fill={FAWN_D} opacity={0.5} />
        <path d={hatch(4, -64, -46, 100, 40, 26, 8, 0.3)} stroke={FAWN_D} strokeWidth={0.8} fill="none" opacity={0.7} />
      </g>
      <path d="M30,-24 L84,-11 Q95,-8 93,0 L28,0Z" fill={FAWN} {...LINE} />
      <path d="M80,-11 Q95,-8 93,0 L72,0 Q80,-4 78,-11Z" fill={WHITE} {...LINE} />
      <path d="M-70,-4 q10,-12 30,-6 l0,10 h-32Z" fill={FAWN_D} {...LINE} />
      {asleep ? (
        <g>
          <path d="M52,-26 C52,-40 70,-44 84,-38 C100,-32 114,-24 118,-16 C112,-8 96,-6 80,-6 C62,-6 52,-14 52,-26Z" fill={FAWN} {...LINE} />
          <path d="M92,-26 Q114,-22 118,-14 Q104,-6 88,-10Z" fill={WHITE} />
          <path d="M54,-34 Q46,-52 62,-56 Q70,-46 68,-34Z" fill={FAWN_D} {...LINE} />
          <path d="M72,-27 q6,4 12,0" stroke={C.ink} strokeWidth={1.2} fill="none" strokeLinecap="round" />
          <ellipse cx={117} cy={-14} rx={3.6} ry={2.8} fill={C.ink} />
        </g>
      ) : (
        <g>
          <path d="M30,-44 Q44,-66 58,-62 L62,-34Z" fill={FAWN} {...LINE} />
          <path d="M46,-82 L52,-108 L66,-86Z" fill={FAWN_D} {...LINE} />
          <path d="M44,-70 C44,-82 56,-86 68,-82 C80,-78 96,-70 104,-64 C100,-54 84,-52 70,-54 C54,-56 44,-60 44,-70Z" fill={FAWN} {...LINE} />
          <path d="M72,-70 Q96,-70 104,-64 Q100,-54 76,-53Z" fill={WHITE} />
          <path d="M60,-86 Q66,-76 70,-68" stroke={WHITE} strokeWidth={4} strokeLinecap="round" fill="none" />
          <ellipse cx={103} cy={-63} rx={4.2} ry={3.2} fill={C.ink} />
          <g className="anim blink"><path d="M62,-71 q4,-3 8,0 q-4,2.4 -8,0Z" fill="#241a18" /></g>
          <path d="M78,-54 q8,5 16,-2" stroke={C.ink} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}
