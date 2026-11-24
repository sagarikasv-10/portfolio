import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/case/Breadcrumb";
import { Footer } from "@/components/footer/Footer";
import { BottomNav } from "@/components/nav/BottomNav";
import { LeftRail } from "@/components/nav/LeftRail";
import { NoteProvider } from "@/components/nav/useNavAction";
import { Signature } from "@/components/about/Signature";
import { PageEffects } from "@/components/PageEffects";
import { SkipLink } from "@/components/SkipLink";
import { PILL_CLASS, TONE } from "@/components/work/pill";
import { CASE_STUDIES, WORK, type CaseSlug } from "@/content/site";
import "@/content/case-studies/access-controls.css";
import "@/content/case-studies/devotional-landing-pages.css";
import "@/content/case-studies/port-dark-mode.css";
import "@/content/case-studies/shared.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(CASE_STUDIES) as CaseSlug[]).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = CASE_STUDIES[params.slug as CaseSlug];
  if (!cs) return {};
  const url = `/work/${params.slug}`;
  return {
    title: `${cs.crumb} | Sagarika SV`,
    description: cs.description,
    alternates: { canonical: url },
    openGraph: { title: cs.title, description: cs.description, url, siteName: "Sagarika SV", type: "article", images: [{ url: cs.cover }] },
    twitter: { card: "summary_large_image", title: cs.title, description: cs.description, images: [cs.cover] },
  };
}

/** Native case study page: the site shell (rail / bottom bar, footer, paper background) around the written study. */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as CaseSlug;
  const cs = CASE_STUDIES[slug];
  if (!cs) notFound();
  const raw = fs.readFileSync(path.join(process.cwd(), "src/content/case-studies", `${slug}.html`), "utf8");
  // the homepage card's category pill, repeated above the case study title
  const card = WORK.items.find((i) => i.href === `/work/${slug}`);
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const pill = card ? `<span data-tone="${TONE[card.id]}" class="cs-pill ${PILL_CLASS}">${esc(card.tag)}</span>` : "";
  const html = raw.replace("<!--CASE_PILL-->", pill);
  return (
    <NoteProvider>
      <SkipLink />
      <LeftRail base="/" active="work" />
      <main id="main" className="relative z-10 lg:pl-16">
        <Breadcrumb current={cs.crumb} />
        {/* the wrapper (not the zoomed article) carries the full-bleed offset so the margin is not scaled */}
        <div className="lg:-ml-16">
          <article className={`cs cs-${slug}`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <Signature />
        <Footer />
      </main>
      <BottomNav base="/" active="work" />
      <PageEffects subpage />
    </NoteProvider>
  );
}
