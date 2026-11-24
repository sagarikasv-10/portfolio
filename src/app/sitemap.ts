import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/site";

const SITE_URL = "https://sagarikasv.vercel.app";

/** Homepage plus one entry per native case study page (app/work/[slug]). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...Object.keys(CASE_STUDIES).map((slug) => ({ url: `${SITE_URL}/work/${slug}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
