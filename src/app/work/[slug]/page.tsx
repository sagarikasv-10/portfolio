import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/case/Breadcrumb";
import { Footer } from "@/components/footer/Footer";
import { BottomNav } from "@/components/nav/BottomNav";
import { LeftRail } from "@/components/nav/LeftRail";
import { NoteProvider } from "@/components/nav/useNavAction";
import { PageEffects } from "@/components/PageEffects";
import { CASE_STUDIES, type CaseSlug } from "@/content/site";
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
  const html = fs.readFileSync(path.join(process.cwd(), "src/content/case-studies", `${slug}.html`), "utf8");
  return (
    <NoteProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <LeftRail base="/" active="work" />
      <main id="main" className="relative z-10 lg:pl-16">
        <Breadcrumb current={cs.crumb} />
        <article className={`cs cs-${slug} lg:-ml-16`} dangerouslySetInnerHTML={{ __html: html }} />
        <Footer />
      </main>
      <BottomNav base="/" active="work" />
      <PageEffects subpage />
    </NoteProvider>
  );
}
