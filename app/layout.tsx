import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Caveat } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pranav — I build systems that read signal out of messy data",
  description:
    "CS undergrad and builder shipping across applied ML (healthcare biosignals) and full-stack SaaS. Open to SWE internships, 2026.",
  openGraph: {
    title: "Pranav — Software Engineer",
    description:
      "Shipping across applied ML and full-stack SaaS. Reading signal out of noise.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${caveat.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-ink"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-50">
          <ScrollProgress />
          <Nav />
        </header>

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
