import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/case/Breadcrumb";
import { Footer } from "@/components/footer/Footer";
import { BottomNav } from "@/components/nav/BottomNav";
import { LeftRail } from "@/components/nav/LeftRail";
import { NoteProvider } from "@/components/nav/useNavAction";
import { CtaPair } from "@/components/CtaPair";
import { PageEffects } from "@/components/PageEffects";
import { SkipLink } from "@/components/SkipLink";
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
      <SkipLink />
      <LeftRail base="/" active="work" />
      <main id="main" className="relative z-10 lg:pl-16">
        <Breadcrumb current={cs.crumb} />
        {/* the wrapper (not the zoomed article) carries the full-bleed offset so the margin is not scaled */}
        <div className="lg:-ml-16">
          <article className={`cs cs-${slug}`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <section aria-label="Get in touch" className="border-t border-[#7A5C32]/25 bg-paper px-5 pb-14 pt-2 lg:-ml-16 lg:pl-16">
          <CtaPair className="mt-10 flex flex-wrap items-center justify-center gap-4" />
        </section>
        <Footer />
      </main>
      <BottomNav base="/" active="work" />
      <PageEffects subpage />
    </NoteProvider>
  );
}
