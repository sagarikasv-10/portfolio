import type { AboutCard } from "@/content/site";

/** Warm vintage line-art icons (sepia ink, soft fills). 80 × 48 each. */
const INK = "#5C4928";
const sw = { stroke: INK, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Animals() {
  return (
    <>
      {/* curled tail */}
      <path d="M52 43c11 1 14-9 8-14-3-3-6 0-3 2" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 43c11 1 14-9 8-14-3-3-6 0-3 2" fill="none" stroke="#E3B873" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 41c3-1 4-4 3-6M62 35.5l2-1" fill="none" stroke="#C98F58" strokeWidth="1.2" strokeLinecap="round" />
      {/* upright body, cream chest, front paws */}
      <path d="M28 44c-2-10 2-17 12-17s14 7 12 17Z" fill="#E3B873" {...sw} />
      <path d="M40 31c-5 1-6 7-5 13h10c1-6 0-12-5-13Z" fill="#F6EBD0" stroke="none" />
      <path d="M33.5 44v-3.5a2.5 2.5 0 0 1 5 0V44ZM41.5 44v-3.5a2.5 2.5 0 0 1 5 0V44Z" fill="#F6EBD0" {...sw} strokeWidth="1.2" />
      {/* pointed ears */}
      <path d="M30 15 29.5 4.5 38 11Z" fill="#E3B873" {...sw} />
      <path d="M50 15 50.5 4.5 42 11Z" fill="#E3B873" {...sw} />
      <path d="M31.5 11.5 31.3 7.8 35 10.4ZM48.5 11.5 48.7 7.8 45 10.4Z" fill="#C98F85" />
      {/* head */}
      <ellipse cx="40" cy="19.5" rx="11.5" ry="9.5" fill="#E3B873" {...sw} />
      <path d="M40 10.5v3M36.4 11.4l1 2.6M43.6 11.4l-1 2.6" fill="none" stroke="#C98F58" strokeWidth="1.3" strokeLinecap="round" />
      {/* happy closed eyes, nose, smile, whiskers */}
      <path d="M33.6 19.4q2.3 2.6 4.6 0M41.8 19.4q2.3 2.6 4.6 0" fill="none" {...sw} />
      <path d="M38.8 22.6h2.4L40 24Z" fill="#C98F85" stroke={INK} strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M40 24v1.2M37.6 25.6q2.4 2 2.4-.4M42.4 25.6q-2.4 2-2.4-.4" fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" />
      <path d="M29.5 21.5l-7-1.2M29.5 24l-7 1.8M50.5 21.5l7-1.2M50.5 24l7 1.8" fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" />
    </>
  );
}
function Catspace() {
  return (
    <>
      <path d="M12 42c0-17 9-31 28-31s28 14 28 31Z" fill="#E3B873" {...sw} />
      <path d="M17 38c2-11 8-21 23-21" fill="none" stroke="#F4E3BE" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M26 42c0-9 5-15 14-15s14 6 14 15Z" fill="#6E4F2E" {...sw} />
      {/* sleeping cat inside */}
      <path d="M31 42c0-5 3-8 9-8s9 3 9 8Z" fill="#F0E2C4" {...sw} />
      <path d="M33 37l-1-4 4 2ZM47 37l1-4-4 2Z" fill="#F0E2C4" {...sw} />
      <path d="M36 38.5q1.5 1.2 3 0M41 38.5q1.5 1.2 3 0" fill="none" {...sw} />
      {/* paw print on top */}
      <circle cx="40" cy="14.5" r="2.3" fill="#9E5B3C" />
      <circle cx="35.6" cy="12" r="1.1" fill="#9E5B3C" /><circle cx="38.2" cy="10" r="1.1" fill="#9E5B3C" />
      <circle cx="41.8" cy="10" r="1.1" fill="#9E5B3C" /><circle cx="44.4" cy="12" r="1.1" fill="#9E5B3C" />
      <path d="M6 43h68" fill="none" {...sw} />
    </>
  );
}
function Doodles() {
  return (
    <>
      <g transform="rotate(-8 36 26)">
        <rect x="18" y="6" width="38" height="36" rx="3" fill="#F6EBD0" {...sw} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx={18} cy={11 + i * 7} r="1.6" fill="#EDE0C6" {...sw} />
            <path d={`M14.5 ${11 + i * 7}h7`} fill="none" {...sw} />
          </g>
        ))}
        <path d="M30 20l-1.5-5 4 2ZM42 20l1.5-5-4 2Z" fill="#F0E2C4" {...sw} />
        <ellipse cx="36" cy="24" rx="8" ry="6.5" fill="#F0E2C4" {...sw} />
        <path d="M32.5 23.5q1.2 1 2.4 0M37.4 23.5q1.2 1 2.4 0" fill="none" {...sw} />
        <path d="M35 26.5l1 1 1-1" fill="none" {...sw} />
        <path d="M24 35q4-3 8 0t8 0" fill="none" stroke="#C98F58" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* pencil */}
      <path d="M58 36L68 14l4 2-10 22Z" fill="#E3B873" {...sw} />
      <path d="M58 36l-1 6 5-3Z" fill="#F6EBD0" {...sw} />
      <path d="M68 14l2-5 4 2-2 5Z" fill="#C98F58" {...sw} />
    </>
  );
}
function Gaming() {
  const sparkle = (x: number, y: number, r: number) => `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
  return (
    <>
      <path d="M14 38c-4 0-6-4-4-10l3-9c1-4 5-6 9-6h36c4 0 8 2 9 6l3 9c2 6 0 10-4 10-3 0-5-2-7-5l-2-3H27l-2 3c-2 3-4 5-7 5Z" fill="#F0E2C4" {...sw} />
      <path d="M26 21v8M22 25h8" fill="none" strokeWidth="3.2" stroke="#8FA9B5" strokeLinecap="round" />
      <path d="M26 21v8M22 25h8" fill="none" {...sw} strokeWidth="0.8" />
      <circle cx="54" cy="22" r="2.4" fill="#9E5B3C" {...sw} /><circle cx="60" cy="26" r="2.4" fill="#C98F58" {...sw} />
      <circle cx="48" cy="26" r="2.4" fill="#7C8A3A" {...sw} /><circle cx="54" cy="30" r="2.4" fill="#E3B873" {...sw} />
      <circle cx="37" cy="24" r="1.2" fill={INK} /><circle cx="43" cy="24" r="1.2" fill={INK} />
      <path d={sparkle(66, 9, 4)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
      <path d={sparkle(74, 17, 2.6)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
      <path d={sparkle(10, 11, 2.4)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
    </>
  );
}
function Curiosities() {
  const star = (x: number, y: number, r: number) => `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
  return (
    <>
      <path d="M22 28a14 14 0 0 1 4-12" fill="none" stroke="#C98F58" strokeWidth="0" />
      <path d="M12 30c6-5 22-9 40-9 8 0 14 .8 14 3" fill="none" {...sw} opacity="0" />
      <circle cx="40" cy="25" r="12" fill="#E3B873" {...sw} />
      <path d="M30 20q8 3 18-1M29 27q10 3 22-1" fill="none" stroke="#C98F58" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="40" cy="26" rx="25" ry="6.5" transform="rotate(-14 40 26)" fill="none" stroke={INK} strokeWidth="2.6" />
      <ellipse cx="40" cy="26" rx="25" ry="6.5" transform="rotate(-14 40 26)" fill="none" stroke="#F0E2C4" strokeWidth="1.1" />
      <path d="M28 31.5a12 12 0 0 0 24-1" fill="none" stroke="none" />
      <path d={star(12, 12, 3.2)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
      <path d={star(70, 10, 2.4)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
      <path d={star(72, 36, 2.8)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
      <path d={star(8, 38, 1.8)} fill="#D9A93F" {...sw} strokeWidth="0.8" />
    </>
  );
}
function Poetries() {
  return (
    <>
      {/* handwritten verse on parchment */}
      <g transform="rotate(-6 30 25)">
        <path d="M12 8h34a2.5 2.5 0 0 1 2.5 2.5V38a3 3 0 0 0 3 3H15.5a3 3 0 0 1-3-3Z" fill="#F6EBD0" {...sw} />
        <path d="M12 8v30a3 3 0 0 0 3 3" fill="none" {...sw} />
        <path d="M19 15q3-3 6 0t6 0t6 0t4-1" fill="none" stroke="#C98F58" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M19 21q3-3 6 0t6 0t6 0" fill="none" stroke="#C98F58" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M19 27q3-3 6 0t6 0t3 0" fill="none" stroke="#C98F58" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M19 33q3-3 6 0t5 0" fill="none" stroke="#C98F58" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      {/* fountain pen */}
      <g transform="rotate(32 60 26)">
        <rect x="55.5" y="4" width="9" height="22" rx="3.5" fill="#5B7A62" {...sw} />
        <rect x="55.5" y="20" width="9" height="3.4" fill="#D9A93F" {...sw} strokeWidth="1" />
        <path d="M56.5 26.5h7l-1.8 8h-3.4Z" fill="#6E4F2E" {...sw} />
        <path d="M58.3 34.5h3.4L60 44.5Z" fill="#E3B873" {...sw} strokeWidth="1.2" />
        <path d="M60 36.5v4" stroke={INK} strokeWidth="0.9" strokeLinecap="round" />
      </g>
      <path d="M43 44q2.6 1.6 5.4-.2" fill="none" stroke="#5C4928" strokeWidth="1.3" strokeLinecap="round" />
    </>
  );
}

const ICONS: Record<AboutCard["id"], () => React.ReactElement> = {
  animals: () => <Animals />,
  catspace: () => <Catspace />,
  doodles: () => <Doodles />,
  gaming: () => <Gaming />,
  curiosities: () => <Curiosities />,
  poetries: () => <Poetries />,
};

/** Horizontal crop of each icon's 80 × 48 canvas to its drawing (same scale), so left alignment is flush with the title. */
const CROP: Record<AboutCard["id"], [number, number]> = {
  animals: [21.5, 44],
  catspace: [5, 70],
  doodles: [10.9, 64.1],
  gaming: [6.6, 71],
  curiosities: [5.2, 70.6],
  poetries: [9, 67],
};

/** Icon wrapper: left-aligned (flush with the title) below md, centred in the card from md up. */
export function CardIcon({ id }: { id: AboutCard["id"] }) {
  const [x, w] = CROP[id];
  return (
    <div className="flex h-12 items-center justify-start md:justify-center">
      <svg aria-hidden viewBox={`${x} 0 ${w} 48`} width={w} height={48} className="about-icon h-12 shrink-0" fill="none">
        {ICONS[id]()}
      </svg>
    </div>
  );
}
