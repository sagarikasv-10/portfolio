import type { Testimonial } from "@/content/site";

/** Deterministic deckle-edge polygon (tiny irregular offsets along all four edges), in percent. */
function deckle(seed: number, nx = 44, ny = 40, depth = 0.9): string {
  let s = seed >>> 0;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const e = () => (r() * depth).toFixed(2);
  const pts: string[] = [];
  for (let i = 0; i <= nx; i++) pts.push(`${((i / nx) * 100).toFixed(2)}% ${e()}%`);
  for (let i = 1; i < ny; i++) pts.push(`${(100 - Number(e()) * 0.7).toFixed(2)}% ${((i / ny) * 100).toFixed(2)}%`);
  for (let i = nx; i >= 0; i--) pts.push(`${((i / nx) * 100).toFixed(2)}% ${(100 - Number(e())).toFixed(2)}%`);
  for (let i = ny - 1; i > 0; i--) pts.push(`${(Number(e()) * 0.7).toFixed(2)}% ${((i / ny) * 100).toFixed(2)}%`);
  return `polygon(${pts.join(",")})`;
}
const DECKLE = deckle(7);

/** Perforated postage stamp (tiny sun-and-hills picture). */
function Stamp({ uid }: { uid: string }) {
  const w = 40, h = 50, holes: [number, number][] = [];
  for (let x = 6; x < w - 3; x += 7.2) { holes.push([x, 1.2], [x, h - 1.2]); }
  for (let y = 6; y < h - 3; y += 7.2) { holes.push([1.2, y], [w - 1.2, y]); }
  return (
    <svg aria-hidden width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="stamp env-stamp absolute right-4 top-3 drop-shadow-[0_1px_1.5px_rgba(60,40,10,0.3)]">
      <defs>
        <mask id={`stamp-perf-${uid}`}>
          <rect width={w} height={h} fill="#fff" />
          {holes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" fill="#000" />)}
        </mask>
      </defs>
      <g mask={`url(#stamp-perf-${uid})`}>
        <rect width={w} height={h} fill="#FAF6EE" />
        <rect x="5" y="5" width={w - 10} height={h - 10} fill="#EFE4CE" stroke="#8C6D3F" strokeOpacity=".5" strokeWidth=".7" />
        <circle cx="26" cy="16" r="4.2" fill="#D9A93F" />
        <path d="M5 38 L14 26 L21 34 L27 28 L35 38 V45 H5Z" fill="#8FA9B5" />
        <path d="M5 42 L16 34 L25 41 L35 36 V45 H5Z" fill="#7C8A3A" />
      </g>
    </svg>
  );
}

function Postmark() {
  return (
    <svg aria-hidden width="70" height="30" viewBox="0 0 70 30" className="env-stamp absolute right-[48px] top-[14px]" fill="none" stroke="#5C4928" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round">
      <path d="M2 6q4-4 8 0t8 0 8 0 8 0 8 0 8 0" />
      <path d="M2 14q4-4 8 0t8 0 8 0 8 0 8 0 8 0" />
      <path d="M2 22q4-4 8 0t8 0 8 0 8 0 8 0 8 0" />
    </svg>
  );
}

/** Terracotta wax seal: irregular blob, pressed ring, tiny star. */
function WaxSeal() {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className="h-10 w-10 drop-shadow-[0_2px_2px_rgba(60,20,10,0.35)]">
      <path d="M20 2c4 0 5 3 9 3.5s5.5 3 5 7 3 5 2.5 9-3.5 5.5-5 8.5-4 5-8 4.5-6 3-9.5 1.5-4-4.5-7.5-6-5-3-4.5-7S3 20.5 5 16s3-6 6.5-8S16 2 20 2Z" fill="#9E4735" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="#7E3428" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="11.8" fill="none" stroke="#C5705A" strokeOpacity=".5" strokeWidth=".6" />
      <path d="M20 12.5l1.7 5.1 5.3.1-4.3 3.2 1.6 5.1-4.3-3.1-4.3 3.1 1.6-5.1-4.3-3.2 5.3-.1Z" fill="#7E3428" />
    </svg>
  );
}

function Mist({ uid }: { uid: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 30" preserveAspectRatio="none" className="block h-[26px] w-full">
      <defs>
        <linearGradient id={`mist-fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FAF6EE" stopOpacity="0" />
          <stop offset="1" stopColor="#FAF6EE" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d="M0 22 L28 9 L50 17 L84 4 L118 18 L150 8 L190 19 L226 6 L262 17 L300 10 V30 H0Z" fill="#8FA9B5" fillOpacity=".34" />
      <path d="M0 26 L36 15 L70 23 L110 12 L152 24 L198 13 L244 24 L300 15 V30 H0Z" fill="#9AA78A" fillOpacity=".42" />
      <rect width="300" height="30" fill={`url(#mist-fade-${uid})`} />
    </svg>
  );
}

/**
 * One tactile envelope. Closed: sealed flap, stamp, postmark, sender. Open (click or tap, or Enter/Space):
 * flap rotates up and tucks the seal away, the letter slides out and sits in front with the full quote.
 * Styles for the states live in globals.css under "Kind Words".
 */
export function Envelope({ t, interactive, open, onOpen, onClose, onToggle, copy = 0, primary = true }: { t: Testimonial; interactive: boolean; primary?: boolean; open?: boolean; onOpen?: () => void; onClose?: () => void; onToggle?: () => void; copy?: number }) {
  const uid = `${copy}-${t.name.replace(/\W+/g, "").toLowerCase()}`;
  return (
    <article
      className={`env relative mr-3 h-[232px] w-[340px] shrink-0 sm:mr-6 sm:h-[250px] sm:w-[375px] ${open ? "is-open" : ""}`}
      tabIndex={interactive && primary ? 0 : -1}
      aria-label={interactive && primary ? `Letter from ${t.name}, ${t.role}. Press Enter to open or close.` : undefined}
      // click (desktop) or tap (touch) toggles open / closed; hovering only lifts the envelope (see .env hover in globals.css)
      onClick={interactive ? () => onToggle?.() : undefined}
      onBlur={interactive ? () => { if (open) onClose?.(); } : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle?.(); } } : undefined}
    >
      {/* the letter, tucked inside the envelope until it is opened */}
      <div className="letter-clip">
        <div className="letter">
          <div className="letter-paper" style={{ clipPath: DECKLE }}>
            <Mist uid={uid} />
            <div className="px-5 pb-5 pt-1">
              <span aria-hidden className="display block text-[2.4rem] font-medium leading-[0.6] text-[#B48A3E]">&ldquo;</span>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#1A1A1A]/85">
                {t.quote}
                <span aria-hidden className="display ml-0.5 text-[1.4rem] font-medium leading-none text-[#B48A3E] align-[-0.2em]">&rdquo;</span>
              </p>
              <p className="display mt-3 text-[13px] font-light italic text-[#5C4928]">&mdash; {t.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* envelope face */}
      <div className="env-face">
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L50 52 L100 100" fill="none" stroke="#8C6D3F" strokeOpacity=".22" strokeWidth=".6" vectorEffect="non-scaling-stroke" />
          <path d="M0 0 L50 52 L100 0" fill="none" stroke="#8C6D3F" strokeOpacity=".12" strokeWidth=".6" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      {/* lower pocket: sits in front of the letter at the bottom of the envelope */}
      <div className="env-pocket">
        <div className="absolute inset-x-4 bottom-2 text-center">
          <p className="display text-lg font-medium leading-tight text-[#1A1A1A]">{t.name}</p>
          <p className="mx-auto mt-1 max-w-[290px] text-[11px] uppercase leading-snug tracking-wider text-[#5C4928]">{t.role}</p>
        </div>
      </div>
      <Postmark />
      <Stamp uid={uid} />
      {/* "TAP TO OPEN": a hand-stamped postal cancellation; fades out once the letter is open */}
      {interactive && <span aria-hidden className="tap-cue env-stamp">Tap to open</span>}

      {/* folded flap + wax seal */}
      <div className="flap">
        <div className="flap-face flap-front"><div className="flap-tri flap-tri-front" /></div>
        <div className="flap-face flap-back"><div className="flap-tri flap-tri-back" /></div>
        <div className="flap-seal"><WaxSeal /></div>
      </div>
    </article>
  );
}
