const GOLD = "#B48A3E";

/** Five moon phases: waxing crescent, half, full, half, waning crescent. */
function MoonMotif() {
  const c = 10;
  const phases = [
    <path key="a" d="M10 1a9 9 0 0 1 0 18a5.2 9 0 0 0 0-18Z" fill={GOLD} />,
    <path key="b" d="M10 1a9 9 0 0 1 0 18Z" fill={GOLD} />,
    <circle key="c" cx={c} cy={c} r="9" fill={GOLD} />,
    <path key="d" d="M10 1a9 9 0 0 0 0 18Z" fill={GOLD} />,
    <path key="e" d="M10 1a9 9 0 0 0 0 18a5.2 9 0 0 1 0-18Z" fill={GOLD} />,
  ];
  return (
    <svg aria-hidden viewBox="0 0 156 20" className="h-5 w-[156px]" fill="none">
      {phases.map((p, i) => (
        <g key={i} transform={`translate(${i * 34},0)`}>
          <circle cx={c} cy={c} r="9" stroke={GOLD} strokeWidth="1" />
          {p}
        </g>
      ))}
    </svg>
  );
}

/** Centred section header: moon motif flanked by hairlines, then the heading (and optional subtitle). */
export function MoonHeader({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <div className="mb-5 flex w-full max-w-md items-center gap-4" aria-hidden>
        <span className="h-px flex-1 bg-[#B48A3E]/45" />
        <MoonMotif />
        <span className="h-px flex-1 bg-[#B48A3E]/45" />
      </div>
      <h2 id={id} className="display text-[clamp(2rem,1.4rem+2vw,3rem)] font-medium leading-tight tracking-[-0.01em] text-[#1A1A1A]">
        {title}
      </h2>
      {subtitle && (
        <p className="display mt-3 max-w-2xl text-balance text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-light italic leading-snug text-[#1A1A1A]/75">{subtitle}</p>
      )}
    </div>
  );
}
