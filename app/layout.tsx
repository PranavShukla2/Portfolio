import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ViewTransitions } from "next-view-transitions";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/posts";
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
  metadataBase: new URL(SITE_URL),
  title: "Pranav Shukla — Applied ML & Full-stack Engineer",
  description:
    "CS undergrad and builder shipping across applied ML (healthcare biosignals) and full-stack SaaS. Open to SWE internships, 2026.",
  verification: {
    google: "G5BvkvSemaM5d-q1SGbqymT4mNxJhQMHFN2ZaONv4jk",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Pranav Shukla — Blog" }],
    },
  },
  openGraph: {
    title: "Pranav — Software Engineer",
    description:
      "Shipping across applied ML and full-stack SaaS — from healthcare biosignals to multi-tenant analytics in production.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff6f6" },
    { media: "(prefers-color-scheme: dark)", color: "#141019" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Applies a stored theme before first paint so there's no light→dark flash.
const NO_FLASH = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${jetbrainsMono.variable} ${caveat.variable}`}
      >
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
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
        <Analytics />
      </body>
      </html>
    </ViewTransitions>
  );
}
