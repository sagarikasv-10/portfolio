"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_ART, HERO_MEDIA, heroNightMedia } from "@/content/site";

/** Small deterministic generator so server and client markup always match. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Golden pollen over the meadow. All positions are percentages of the PAINTING, not the screen. */
const r = lcg(2024);
const POLLEN = Array.from({ length: 16 }, (_, i) => ({
  x: 3 + r() * 94,
  y: 56 + r() * 40,
  s: 0.7 + r() * 0.8,
  dx: 2 + r() * 4,
  dy: -(7 + r() * 9),
  dur: 18 + r() * 14,
  delay: -r() * 30 - i * 0.4,
}));

/** Ambient flute plays quietly: 25% volume. */
const AMBIENT_VOLUME = 0.25;

/** Ramp an audio element's volume smoothly (no clicks when starting or stopping). */
function fade(audio: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = audio.volume;
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / ms);
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * (k * k * (3 - 2 * k))));
    if (k < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

/**
 * Hero media frame.
 *  - The static painting is ALWAYS rendered underneath (and is the video's poster), so the hero is never blank.
 *  - /daylight-hero.mp4 sits on top, hidden until it is actually playing, then fades in. If the file is missing,
 *    blocked, or the visitor prefers reduced motion / data saving, nothing changes.
 *  - Ambient audio is off by default and only starts from the toggle (user gesture), with fades.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [useVideo, setUseVideo] = useState(true);
  const [ready, setReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [note, setNote] = useState("");

  // Skip the video for reduced-motion / data-saver visitors (the painting stays).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) setUseVideo(false);
  }, []);

  // Make sure autoplay actually starts (React does not always set `muted` on server-rendered markup),
  // reveal the video only once it is really playing, and pause it while the hero is off-screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !useVideo) return;
    v.muted = true;
    const markReady = () => setReady(true);
    if (v.readyState >= 3 && !v.paused) markReady();
    v.addEventListener("playing", markReady);
    v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      v.removeEventListener("playing", markReady);
      io.disconnect();
    };
  }, [useVideo]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggleSound = useCallback(async () => {
    setNote("");
    if (soundOn) {
      setSoundOn(false);
      const a = audioRef.current;
      if (a) fade(a, 0, 1000, () => a.pause());
      return;
    }
    try {
      if (!audioRef.current) {
        const a = new Audio(HERO_MEDIA.audio);
        a.loop = true;
        a.preload = "auto";
        audioRef.current = a;
      }
      const a = audioRef.current;
      a.volume = 0;
      await a.play();
      setSoundOn(true);
      fade(a, AMBIENT_VOLUME, 1600);
    } catch {
      audioRef.current = null;
      setSoundOn(false);
      setNote("Ambient sound isn't available yet.");
      window.setTimeout(() => setNote(""), 3200);
    }
  }, [soundOn]);

  return (
    <div ref={rootRef} className={`art overflow-hidden bg-[#E9E2D0] ${className}`} data-hero-art>
      <div className="art-frame">
        {/* base layer: the untouched painting */}
        <img
          src={HERO_ART.src}
          srcSet={`${HERO_ART.small} 1100w, ${HERO_ART.src} 1672w`}
          sizes="(min-width: 900px) 120vw, 178vw"
          alt={HERO_ART.alt}
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
          className="art-img"
        />

        {/* seamless loop, fades in over the painting once it is playing */}
        {useVideo && (
          <video
            ref={videoRef}
            className={`art-video ${ready ? "is-ready" : ""}`}
            poster={HERO_ART.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
            onError={() => setReady(false)}
          >
            <source src={HERO_MEDIA.video} type="video/mp4" onError={() => setReady(false)} />
          </video>
        )}

        {/* Magic Mode: the midnight painting, with the night video stacked on top once it is actually playing.
            Both fade in together (opacity, 0.7s) when <html data-theme="magic">; no colour filters are applied. */}
        <div className="night-layer" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="night-img"
            src={heroNightMedia.image}
            srcSet={`${heroNightMedia.imageSmall} 1100w, ${heroNightMedia.image} 1672w`}
            sizes="(min-width: 900px) 120vw, 178vw"
            alt=""
            width={1672}
            height={941}
            decoding="async"
            fetchPriority="low"
          />
          <video
            className="night-video"
            data-night-video
            muted
            loop
            playsInline
            preload="none"
            poster={heroNightMedia.image}
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={(e) => e.currentTarget.classList.add("is-ready")}
          >
            <source src={heroNightMedia.video} type="video/mp4" />
          </video>
        </div>

        <div className="fx" aria-hidden>
          <div className="laptop-glow" />
          {POLLEN.map((p, i) => (
            <span
              key={i}
              className="pollen"
              style={{
                left: `${p.x.toFixed(1)}%`,
                top: `${p.y.toFixed(1)}%`,
                ["--s" as string]: `max(3px, ${p.s.toFixed(2)}cqw)`,
                ["--dx" as string]: `${p.dx.toFixed(1)}cqw`,
                ["--dy" as string]: `${p.dy.toFixed(1)}cqh`,
                ["--dur" as string]: `${p.dur.toFixed(1)}s`,
                ["--delay" as string]: `${p.delay.toFixed(1)}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div aria-hidden className="hero-bottom-fade" />

      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 sm:left-5 sm:gap-2.5 lg:left-[max(104px,6vw)] lg:top-5">
        <span className="magic-wrap relative inline-flex rounded-full p-[2px]">
        <span aria-hidden className="magic-ring" />
        <button
          type="button"
          data-magic-toggle
          aria-pressed="false"
          aria-label="Switch to magic mode"
          className="magic-btn relative z-[1] inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-xs sm:px-3.5 font-medium shadow-sm backdrop-blur-md transition-all duration-300"
        >
          <span className="mg-day items-center gap-1.5"><span aria-hidden className="mg-spark">&#10022;</span><span className="mg-long">Switch to magic mode</span><span className="mg-short">Magic</span></span>
          <span className="mg-night items-center gap-1.5"><span aria-hidden>&#9728;</span><span className="mg-long">Switch to daylight</span><span className="mg-short">Day</span></span>
        </button>
        </span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Turn ambient sound off" : "Turn ambient sound on"}
          title={soundOn ? "Ambient sound on" : "Ambient sound off"}
          className={`sound-btn ${soundOn ? "is-on" : ""}`}
        >
          {soundOn ? <Volume2 aria-hidden size={18} strokeWidth={1.7} /> : <VolumeX aria-hidden size={18} strokeWidth={1.7} />}
        </button>
        <span role="status" aria-live="polite" className={`sound-note ${note ? "is-visible" : ""}`}>{note}</span>
      </div>
    </div>
  );
}
