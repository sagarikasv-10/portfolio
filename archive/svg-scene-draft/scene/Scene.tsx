"use client";

import { ART_OVERRIDES, type ArtOverride } from "@/content/art";
import { Character } from "./Character";
import { CurledCat, LOOKS, PersianLoaf, SitCat, WalkCat } from "./Cats";
import { IndieDog } from "./Dogs";
import { CloudWash, FrontGrass, Hills, Meadow, Rock, Sky, Sunlight, Wildflowers } from "./Environment";
import { CanopyBack, CanopyFront, Trunk } from "./Tree";

type Slot = keyof typeof ART_OVERRIDES;

/** Shows the user's final artwork if configured in content/art.ts, otherwise the draft SVG. */
function ArtSlot({ id, children }: { id: Slot; children: React.ReactNode }) {
  const o: ArtOverride = ART_OVERRIDES[id];
  if (!o) return <g data-art={id}>{children}</g>;
  return <image data-art={id} href={o.src} x={o.x} y={o.y} width={o.width} height={o.height} />;
}

/**
 * ONE composition for every screen size (viewBox 1000 × 900). The wrapper decides how big it is;
 * the scene itself never reflows, so the characters and animals can never collide with text.
 */
export function Scene() {
  return (
    <svg
      className="block h-full w-full"
      viewBox="0 0 1000 900"
      preserveAspectRatio="xMaxYMax meet"
      role="img"
      aria-label="Illustration: Sagarika sits under a large oak on a sunlit meadow with a laptop, a cat on their lap, a white Persian, a curled-up tabby, a ginger cat and two relaxed dogs, with blue hills behind."
    >
      <defs>
        {/* printed-paper grain: static overlay, never filters the animated artwork */}
        <filter id="pencil-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" />
          <feColorMatrix values="0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0.95 -0.28" />
        </filter>
        <filter id="paper-wash" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="9" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.4  0 0 0 0 0.2  0 0 0 0.5 -0.12" />
        </filter>
      </defs>

      <Sky />
      <CloudWash />
      <Hills y={540} />
      <Meadow y={560} />
      <Sunlight cx={640} cy={700} w={600} />
      <Rock x={985} y={800} s={0.9} />
      <Rock x={560} y={668} s={0.5} />

      {/* the oak */}
      <g transform="translate(850,746) scale(1.0)">
        <ArtSlot id="tree"><CanopyBack /><Trunk /></ArtSlot>
      </g>

      <Wildflowers x0={-60} x1={900} y0={640} y1={880} seed={4} count={34} scale={0.9} />

      {/* animals behind / beside the figure */}
      <ArtSlot id="catPersian"><g transform="translate(445,716) scale(1.6)"><PersianLoaf look={LOOKS.persianWhite} /></g></ArtSlot>
      <ArtSlot id="dogA"><g transform="translate(200,806) scale(1.4)"><IndieDog wagClass="wag-b" /></g></ArtSlot>

      <g transform="translate(850,746) scale(1.0)"><CanopyFront /></g>

      {/* Sagarika, leaning on the trunk, cat in the lap */}
      <g transform="translate(715,750) scale(2.5)">
        <ArtSlot id="character">
          <Character>
            <ArtSlot id="catLap"><g transform="translate(0,-1) scale(0.42)"><SitCat look={LOOKS.calico} /></g></ArtSlot>
          </Character>
        </ArtSlot>
      </g>

      <ArtSlot id="catBlack"><g transform="translate(335,862) scale(1.3)"><CurledCat look={LOOKS.brownTabby} /></g></ArtSlot>
      <ArtSlot id="catGinger"><g transform="translate(585,858) scale(-1.15,1.15)"><WalkCat look={LOOKS.gingerWhite} /></g></ArtSlot>
      <ArtSlot id="dogB"><g transform="translate(900,832) scale(-1.4,1.4)"><IndieDog asleep wagClass="wag" /></g></ArtSlot>

            <FrontGrass x={30} y={905} s={1.25} />
      <FrontGrass x={120} y={915} s={0.9} />
      <Wildflowers x0={0} x1={190} y0={845} y1={890} seed={12} count={7} scale={1.5} />

      {/* grain + paper wash (multiply) */}
      <rect x={-700} y={-300} width={2400} height={1500} filter="url(#pencil-grain)" opacity={0.5} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
      <rect x={-700} y={-300} width={2400} height={1500} filter="url(#paper-wash)" opacity={0.35} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
    </svg>
  );
}
void 0;
