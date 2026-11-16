import type { MetadataRoute } from "next";

const SITE_URL = "https://sagarikasv.vercel.app";

/** Homepage only for now. Add case study routes here (e.g. `${SITE_URL}/work/<slug>`) when those pages exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
