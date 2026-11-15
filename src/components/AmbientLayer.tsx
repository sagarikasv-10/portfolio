/** Deterministic pseudo-random so server and client markup match. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const r = lcg(1313);

const FIREFLIES = Array.from({ length: 24 }, () => ({
  x: r() * 100, y: 8 + r() * 88, size: 10 + r() * 12,
  dx: (r() - 0.5) * 160, dy: -30 - r() * 120,
  drift: 16 + r() * 14, pulse: 3 + r() * 4, delay: -r() * 24,
}));
const STARS = Array.from({ length: 64 }, () => ({
  x: r() * 100, y: r() * 100, size: r() < 0.8 ? 1.5 : 2.5, tw: 2.5 + r() * 5, delay: -r() * 8, gold: r() < 0.3,
}));
const SPARKS = Array.from({ length: 9 }, () => ({ x: 4 + r() * 92, y: 4 + r() * 70, size: 10 + r() * 10, tw: 4 + r() * 4, delay: -r() * 8 }));

/**
 * Magic Mode ambient layer: drifting golden fireflies, a twinkling starfield and a slow nebula shimmer.
 * Always in the markup but display:none until <html data-theme="magic">, so it costs nothing in daylight.
 * Everything is non-interactive and only animates transform / opacity.
 */
export function AmbientLayer() {
  return (
    <div aria-hidden className="ambient pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="neb neb-a" />
      <div className="neb neb-b" />
      <div className="neb neb-c" />
      {STARS.map((s, i) => (
        <span key={"s" + i} className={`star-dot${s.gold ? " is-gold" : ""}`} style={{ left: `${s.x.toFixed(1)}%`, top: `${s.y.toFixed(1)}%`, width: s.size, height: s.size, ["--tw" as string]: `${s.tw.toFixed(1)}s`, animationDelay: `${s.delay.toFixed(1)}s` }} />
      ))}
      {SPARKS.map((s, i) => (
        <span key={"k" + i} className="spark" style={{ left: `${s.x.toFixed(1)}%`, top: `${s.y.toFixed(1)}%`, width: s.size, height: s.size, ["--tw" as string]: `${s.tw.toFixed(1)}s`, animationDelay: `${s.delay.toFixed(1)}s` }} />
      ))}
      {FIREFLIES.map((f, i) => (
        <span
          key={"f" + i}
          className="firefly"
          style={{
            left: `${f.x.toFixed(1)}%`, top: `${f.y.toFixed(1)}%`, width: f.size, height: f.size,
            ["--dx" as string]: `${f.dx.toFixed(0)}px`, ["--dy" as string]: `${f.dy.toFixed(0)}px`,
            ["--drift" as string]: `${f.drift.toFixed(1)}s`, ["--pulse" as string]: `${f.pulse.toFixed(1)}s`,
            animationDelay: `${f.delay.toFixed(1)}s, ${(f.delay / 2).toFixed(1)}s`,
          }}
        />
      ))}
    </div>
  );
}
