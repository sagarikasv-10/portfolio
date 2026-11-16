import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://sagarikasv.vercel.app";
const TITLE = "Sagarika SV | Product Designer";
const DESCRIPTION = "Product Designer with 4+ years of experience designing high-impact consumer mobile apps, design systems, and 0-to-1 products.";
const OG_IMAGE = "/og-image.jpg"; // 1200x630 crop of the daylight hero illustration (public/art/hero.webp)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Sagarika SV",
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sagarika SV \u2014 Product Designer" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#E9DFC9" };

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sagarika SV",
  jobTitle: "Product Designer",
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/sagarikasv"],
};

/** Shared shell: future pages inherit fonts, tokens, paper grain. Page-level nav lives in components/nav. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }} />
        {children}
      </body>
    </html>
  );
}
