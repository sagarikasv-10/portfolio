/**
 * All homepage copy and navigation lives here — separate from presentation.
 * Future pages: set an `href` on the matching nav item and it becomes a real link.
 */
import type { LucideIcon } from "lucide-react";
import { Briefcase, FileText, Home, Linkedin, Mail, User } from "lucide-react";

/** Instagram links for the About Me cards. "#" shows a gentle "coming soon" note until you paste the real URLs. */
export const DOODLE_INSTAGRAM_URL = "https://www.instagram.com/a_fart_of_art/";
export const POETRY_INSTAGRAM_URL = "https://www.instagram.com/sagarika_sv/";
export const CATSPACE_INSTAGRAM_URL = "https://www.instagram.com/catspace_boarding/";

export type NavItem = {
  id: "home" | "work" | "about" | "resume" | "linkedin" | "contact";
  label: string;
  icon: LucideIcon;
  /** null = destination not built yet (shows a gentle "coming soon" note). */
  href: string | null;
  external?: boolean;
};

/** Every outbound / anchor link on the page lives here. */
export const LINKS = {
  work: "#work",
  about: "#about",
  resume: "https://drive.google.com/file/d/1pa2YwuiZ2lUCZPVtUo4cOpbZTi5wcyPh/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/sagarikasv/",
  email: "mailto:sagarikauxd@gmail.com",
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#hero" },
  { id: "work", label: "My Work", icon: Briefcase, href: LINKS.work },
  { id: "about", label: "About Me", icon: User, href: LINKS.about },
  { id: "resume", label: "Resume", icon: FileText, href: LINKS.resume, external: true },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, href: LINKS.linkedin, external: true },
  { id: "contact", label: "Contact Me", icon: Mail, href: LINKS.email },
];

export const ACTIVE_NAV: NavItem["id"] = "home";

export const AVAILABILITY = { label: "Open to work" };

export const HERO = {
  wordmark: "Sagarika SV",
  byline: "by Sagarika",
  headline: "Welcome to my safe space.",
  name: "Hey, I'm Sagarika SV.",
  intro:
    "I'm Sagarika SV, a product designer with 4+ years of experience across product, growth and design systems. I'm endlessly curious about people, drawn to the details, and love turning complex problems into thoughtful experiences.",
  supporting:
    "Somewhere between thoughtful problem-solving, visual storytelling and a little curiosity, I find my kind of magic.",
  cta: {
    label: "Explore My Work",
    /** Set to "/work" once that page exists. Until then it scrolls to the highlights. */
    href: "#work" as string | null,
    fallbackAnchor: "#work",
  },
};

export const METRICS = {
  id: "highlights",
  title: "A few things I've helped make happen.",
  items: [
    { value: "4.6x", label: "Revenue Lift" },
    { value: "₹5.5L", label: "Incremental revenue in 15 days" },
    { value: "80%", label: "Search time cut via Design System" },
  ],
};


/** The hero painting. Swap the files in /public/art to change it. */
export const HERO_ART = {
  src: "/art/hero.webp",
  small: "/art/hero-1100.webp",
  alt: "Illustration: Sagarika sits against a large oak on a sunlit meadow, working on a laptop with a calico cat on their lap. A white Persian, a curled-up tabby, a ginger cat and two fawn dogs rest nearby, with blue mountains behind.",
};

/**
 * Looping hero video + ambient flute. Files live in /public with exactly these names (night video: /dark-hero.mp4).
 * If either is missing, the page falls back to the static painting / stays silent. Nothing breaks.
 */
export const HERO_MEDIA = {
  video: "/daylight-hero.mp4",
  audio: "/ambient-flute.mp3",
};

/**
 * Selected Work cards. `image` is the swap-in slot for final mockups: put a file in /public/work and set e.g.
 * image: { src: "/work/sacred-rhythms.webp", alt: "…" }. While it is null a built-in placeholder preview is drawn.
 * `href` is the case-study page; null shows a gentle "coming soon" note on click.
 */
export type WorkItem = {
  id: "rhythms" | "access" | "system";
  tag: string;
  title: string;
  description: string;
  company: string;
  skill: string;
  href: string | null;
  /** "soon" cards get a COMING SOON ribbon and are muted and inert. */
  status: "live" | "soon";
  image: { src: string; alt: string } | null;
};

/** Native case study pages (app/work/[slug]); copy and images live in src/content/case-studies. */
export const CASE_STUDIES = {
  "access-controls": {
    crumb: "Access Controls",
    title: "Access Controls: Designing access without friction",
    description: "A contact-level privacy system for Port that lets people decide what each connection can do and see, designed and shipped in 24 hours.",
    cover: "/work/cover.jpg",
  },
  "devotional-landing-pages": {
    crumb: "High-Converting Devotional Landing Pages",
    title: "Designing context before checkout: Sri Mandir curated landing pages",
    description: "A rapid landing page experimentation system that replaced generic WhatsApp deep links with culturally grounded, personalised journeys.",
    cover: "/work/landing-pages.webp",
  },
  "port-dark-mode": {
    crumb: "Port Dark Mode",
    title: "Port Dark Mode: how a gradient and a stroke drove 1,314% growth",
    description: "Designing a Gen Z-ready dark theme and refined bottom-sheet components for Port Messenger.",
    cover: "/work/port-dark-mode.webp",
  },
} as const;
export type CaseSlug = keyof typeof CASE_STUDIES;

export const WORK = {
  id: "work",
  title: "Selected Work",
  items: [
    {
      id: "access",
      tag: "Privacy & Growth",
      title: "Access Controls: Driving +36% User Growth",
      description: "An industry-first permission system shipped in 24 hours, giving users granular control over connection privacy while lifting retention.",
      company: "Port (Numberless)",
      skill: "Product Design",
      href: "/work/access-controls",
      status: "live",
      image: { src: "/work/cover.jpg", alt: "Port permission drawer, shown as a postage-stamp graphic" },
    },

    {
      id: "rhythms",
      tag: "Growth & Conversion",
      title: "Devotional Landing Pages: Up to 4.6x Revenue per User",
      description: "Modular, high-intent web experiences for Sri Mandir that accelerated web-to-app acquisition and were later adopted natively inside the app.",
      company: "AppsForBharat",
      skill: "Product Design",
      href: "/work/devotional-landing-pages",
      status: "live",
      image: { src: "/work/landing-pages.webp", alt: "Three Sri Mandir landing page screens: Pitru Paksha pujas at Gaya, the legend of Rama Ekadashi, and Navratri Pratipada pujas" },
    },

    {
      id: "system",
      tag: "Visual Systems & Growth",
      title: "Port Dark Mode: +1,314% User Growth",
      description: "Crafting a Gen Z-ready dark theme and refined bottom-sheet components for Port Messenger, driving 3.5x daily onboarding and 46% retention.",
      company: "Port (Numberless)",
      skill: "Product Design",
      href: "/work/port-dark-mode",
      status: "live",
      image: { src: "/work/port-dark-mode.webp", alt: "Port dark mode screens: welcome, Port QR, profile and create a new Port, with a Dark mode toggle" },
    },
  ] as WorkItem[],
};

/** Kind Words. Edit the letters here; order is the order they drift past. */
export type Testimonial = { name: string; role: string; quote: string };

export const TESTIMONIALS = {
  id: "testimonials",
  /** The section's main heading (there is no separate "Kind Words" title). */
  heading: "Letters left behind by the people I\u2019ve built, wondered, and shipped with.",
  items: [
    {
      name: "Rahul Gaikar",
      role: "Product Designer",
      quote: "Sagarika was always the one asking the right questions in UX discussions, giving sharp feedback, and approaching problems with creativity. What I loved most was how effortless she made collaboration\u2014open, thoughtful, and genuinely invested in building better user experiences.",
    },
    {
      name: "Ruthvik V",
      role: "Product Designer, Pine Labs \u00b7 Ex-Port",
      quote: "Sagarika breaks down complex problem statements into structured, actionable steps while tying every detail to larger product goals. Share context once, and she executes with clarity, creativity, and strong ownership\u2014consistently elevating the quality of the team.",
    },
    {
      name: "Janice Coutinho",
      role: "Marketing, Linkrunner \u00b7 Ex-Port",
      quote: "Smart, creative, and kind\u2014Sagarika brings a great sense of humor that makes teamwork genuinely fun. Her designs always carry her unique touch, and she\u2019s adaptable, takes feedback gracefully, and constantly brings fresh ideas to the table.",
    },
    {
      name: "Rhea Prasad",
      role: "Product Manager, Blinkin",
      quote: "\u2018Ridiculously efficient\u2019 comes to mind when I think of Sagarika. She quickly rallied people around her ideas, took feedback critically, and held her point of view to improve existing processes\u2014a rare instinct that usually takes years to develop.",
    },
    {
      name: "Vidya Santhanam",
      role: "Leadership, Fitbots",
      quote: "Sagarika is a deeply collaborative and empathetic product engineer. With keen attention to detail, a questioning mind, and strong user empathy, she made meaningful contributions to our product roadmap.",
    },
  ] as Testimonial[],
};

/** About Me. Add URLs later by changing `linkUrl` ("#" shows a gentle "link coming soon" note instead of navigating). */
export type AboutCard = {
  id: "animals" | "catspace" | "doodles" | "gaming" | "curiosities" | "poetries";
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
};

export const aboutCardsData: AboutCard[] = [
  { id: "animals", title: "My animal family", description: "Nine cats, two dogs, and a home that\u2019s happily chaotic." },
  { id: "catspace", title: "CatSpace Boarding", description: "A cosy, cat-only boarding space in Bengaluru.", linkText: "Visit CatSpace \u2197", linkUrl: CATSPACE_INSTAGRAM_URL },
  { id: "doodles", title: "Doodles", description: "Quick sketches, quiet observations, and little visual stories drawn between screens.", linkText: "Explore doodles on Instagram\u00a0\u2197", linkUrl: DOODLE_INSTAGRAM_URL },
  { id: "gaming", title: "Gaming", description: "A space to unwind, explore new worlds and get inspired." },
  { id: "curiosities", title: "Thoughts & curiosities", description: "Philosophy, spirituality, space and the beautifully unknown." },
  { id: "poetries", title: "Poetries", description: "Introspective verses in English and Hindi\u2014written to pause, question, and sit a little deeper with life.", linkText: "Read poetry on Instagram\u00a0\u2197", linkUrl: POETRY_INSTAGRAM_URL },
];

export const ABOUT = {
  id: "about",
  eyebrow: "A LITTLE BEYOND THE PIXELS",
  heading: "More than a product designer.",
  intro: "When I\u2019m not designing, you\u2019ll probably find me in a caffeine-fuelled loop of doodling, writing poetry, gaming, or spiralling into thoughts about life, people and the universe.",
  signature: "A little old-school at heart, deeply curious, and a full-time animal person.",
  art: {
    src: "/art/about.webp",
    small: "/art/about-small.webp",
    alt: "Illustration: Sagarika sits under an oak, eyes closed and smiling, surrounded by sleeping cats and dogs, with a coffee mug, a stack of books and a game controller in the grass.",
  },
};

/** Work Experience timeline (reverse chronological). */
export type Milestone = { dates: string; role: string; company: string; location: string; bullets: string[]; tags: string[] };

export const EXPERIENCE = {
  id: "experience",
  eyebrow: "JOURNEY & EXPERIENCE",
  heading: "Where I\u2019ve built & shipped.",
  items: [
    {
      dates: "OCT 2025 \u2013 PRESENT",
      role: "Product Designer",
      company: "AppsForBharat",
      location: "Bengaluru",
      bullets: [
        "Established a Voice of Customer (VoC) insight program, translating qualitative user feedback and behavioral data into prioritized UX improvements.",
        "Architected the Chadhava Creative Design System (130+ templates, 132 SKUs, 22+ temples), cutting SKU lookup by ~75% and asset creation from 30 mins to 2\u20133 mins.",
        "Designed personalized, context-driven mobile journeys (Pitru Paksha & Navratri) and redesigned in-app touchpoints\u2014lifting CTR from ~1% to ~4%, doubling puja conversion, and driving +4.6x revenue/user.",
        "Led international content hierarchy research and Sacred Rhythms editorial UX, expanding email CTR from 1.35% to 18% and driving +64% newsletter revenue lift.",
      ],
      tags: ["Product Discovery & VoC", "Design Systems", "Experimentation & Growth", "UX Strategy"],
    },
    {
      dates: "JUL 2024 \u2013 SEP 2025",
      role: "Product Designer",
      company: "Numberless (Port)",
      location: "Bengaluru",
      bullets: [
        "Shipped granular chat Access Controls under a 24-hour constraint, driving 36% user growth and stronger retention.",
        "Architected Port\u2019s native Dark Mode with adaptive color tokens and WCAG-compliant night UI patterns.",
        "Built Masterflow, a centralized screen-flow architecture that eliminated dev handoff friction.",
      ],
      tags: ["0\u21921 Features", "Accessibility", "Design Ops"],
    },
    {
      dates: "JUL 2022 \u2013 JUN 2024",
      role: "Founding Designer",
      company: "Wormhole",
      location: "Bengaluru",
      bullets: [
        "Led 0\u21921 product design for a space-economy platform, turning a complex relational database into an intuitive web app in 3 months.",
        "Rebuilt the company\u2019s brand identity and primary website from the ground up.",
      ],
      tags: ["0\u21921 Discovery", "Information Architecture", "Brand"],
    },
    {
      dates: "JAN 2021 \u2013 MAY 2021",
      role: "UX Specialist & Software Developer",
      company: "DeepStack Software",
      location: "Bengaluru",
      bullets: [
        "Conducted UI/UX usability reviews and created competitive-backed Figma wireframes.",
        "Authored automated front-end UI test scripts in Playwright to streamline validation.",
      ],
      tags: ["Usability Audits", "Figma", "Playwright"],
    },
    {
      dates: "NOV 2019 \u2013 JUN 2020",
      role: "Full Stack Developer",
      company: "Fitbots",
      location: "Bengaluru",
      bullets: [
        "Integrated Slack and JIRA Service Desk APIs to automate customer ticketing workflows.",
        "Redesigned core web assets in close collaboration with design and marketing teams.",
      ],
      tags: ["Full-Stack Engineering", "API Integrations"],
    },
  ] as Milestone[],
};

/**
 * Magic Mode hero media. The painting is always shown; if `video` exists in /public it fades in over the painting
 * once it is really playing, so dropping `dark-hero.mp4` into /public (next to daylight-hero.mp4) is all that is needed.
 * A missing or blocked video simply leaves the painting (no broken-media icon).
 */
export const heroNightMedia = {
  video: "/dark-hero.mp4",
  image: "/art/dark-hero.webp",
  imageSmall: "/art/dark-hero-1100.webp",
};
