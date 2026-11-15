import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little World — Sagarika SV, Product Designer",
  description: "Welcome to my safe space. Sagarika SV is a product designer working across product, growth and design systems.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#E9DFC9" };

/** Shared shell: future pages inherit fonts, tokens, paper grain. Page-level nav lives in components/nav. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
