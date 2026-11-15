# A Little World — Homepage

Sagarika's portfolio homepage (homepage only for this milestone).
Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Lucide. Fonts: Fraunces (headings) + Inter (everything else), bundled locally via Fontsource.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint       # type-check
```

## Design

Warm cream paper, earthy palette taken from the hero painting (olive, ochre, umber-brown, dusty blue).
The painting is the centrepiece. Text sits directly on the page — no cards, no boxed type.
Desktop (≥1024px): the painting fills the width under the header with the eyebrow and headline on its sky; below it an intro band (7/5 columns: intro left, signature line right) and a full-width metrics + CTA bar. Below 1024px the signature line sits under the bio.
and a quiet strip underneath holds the tagline, the three metrics and the "Explore My Work" button. Mobile: heading, painting (cropped to the figure), copy, metrics, then the button.

## Hero media: video, ambient sound, ambient effects

`HeroArt.tsx` + the "Hero painting + ambient effects" and "Hero video, sound toggle" blocks in `globals.css`.

- **Painting (always there):** `public/art/hero.webp`. It is the base layer and the video's `poster`, so the hero is never blank.
- **Video:** the seamless loop lives at `public/daylight-hero.mp4` (same 16:9 framing as the painting). It has `autoPlay loop muted playsInline`,
  stays invisible until it is really playing, then fades in over the painting. Missing or blocked file → the painting simply stays.
  It is skipped for reduced-motion and data-saver visitors and pauses while the hero is off-screen.
  Suggested export: H.264, 1920×1080 or 1280×720, 24–30 fps, no audio track, ~3–6 MB, first and last frame matching for a seamless loop, `-movflags +faststart`.
- **Ambient sound:** the loopable flute lives at `public/ambient-flute.mp3`. It is off by default and only starts from the round toggle
  (bottom-right of the frame) with 1.6 s / 1 s fades, 25% volume. If the file is missing the toggle shows a short "isn't available yet" note.
  Paths live in `HERO_MEDIA` in `src/content/site.ts`.
- **Edges:** the frame is full-bleed and fully sharp (no feather or vignette). The only wash is a small, soft parchment gradient behind the desktop text block in the top-left corner (`page.tsx`).
- **Light touches over the picture:** 16 golden pollen specks drift through the meadow (10 on phones) and a soft glow beside the laptop breathes.
  Only `transform`/`opacity` animate, no JavaScript; effects are positioned in % of the painting so they stay aligned at any crop.
  Reduced motion hides the pollen and video and freezes the glow.

## Where things live

| What | Where |
|---|---|
| Copy, the 4 metrics, nav items + links, hero image paths and alt text | `src/content/site.ts` |
| Hero painting | `public/art/hero.webp` (1672×941) and `public/art/hero-1100.webp` |
| Hero painting component | `src/components/HeroArt.tsx` |
| Headline and intro | `src/components/Hero.tsx` |
| Tagline, metrics + CTA button | `src/components/Metrics.tsx` |
| Top nav (≥768px) and bottom nav (<768px, fixed, six items) | `src/components/nav/` |
| Page layout | `src/app/page.tsx` |
| Colour / font tokens | `tailwind.config.ts`, `:root` in `src/app/globals.css` |
| Earlier hand-coded SVG scene (unused, kept for reference) | `archive/svg-scene-draft/` |

## Adding the next pages

1. Create `src/app/work/page.tsx` etc.
2. In `src/content/site.ts` set that nav item's `href`; it becomes a real link in both navs. Add the real LinkedIn URL / `mailto:` there too.
3. Set `ACTIVE_NAV` per page and point the CTA at the work page with `HERO.cta.href = "/work"`.

## Replacing the painting

Overwrite `public/art/hero.webp` (16:9, about 1672×941 or larger) and `hero-1100.webp` (a smaller copy), and update `HERO_ART.alt`.
Desktop shows the whole picture (slightly cropped to fit); mobile crops to a square centred at 74% across. Adjust `object-[74%_50%]` in `HeroArt.tsx` if the new art has a different focal point.


## Navigation, hero and Magic Mode (latest)

- **Navigation:** from 1024px a floating icon rail on the left (`components/nav/LeftRail.tsx`; labels slide out on hover or keyboard focus, active item underlined).
  Below 1024px the fixed bottom bar is used. There is no top header any more; the hero sits flush at the top.
- **Hero:** the identity row (name + "Open to work" pill), eyebrow and headline overlay the illustration (`components/Hero.tsx`).
  Under it: intro (5 cols) + metrics (7 cols), then the centred CTA. The signature line now closes the page, after About Me (`about/Signature.tsx`).
- **Magic Mode:** `✦ Switch to magic mode` (bottom-right of the hero, left of the sound button) sets `<html data-theme="magic">`.
  All colours live in the "MAGIC MODE" block of `src/app/globals.css`; `src/lib/magic.ts` flips the attribute (cross-fade via View Transitions where supported).
  `components/AmbientLayer.tsx` holds the fireflies, starfield and nebula (hidden in daylight, so it costs nothing).
- **Night hero media slot:** set `heroNightMedia` in `src/content/site.ts` to an image or a looping muted video; it fades in over the painting in Magic Mode.
  While it is `null`, the painting gets a moonlit colour grade plus a twilight overlay.
- All `mailto:` links are plain links (no `target="_blank"`), so mobile mail apps open reliably.
