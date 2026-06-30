import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Section";
import Badge from "@/components/Badge";
import Chip from "@/components/Chip";

export const metadata: Metadata = {
  title: "ArbFlow — Multi-tenant GA4 analytics SaaS",
  description:
    "Case study: secure workspaces, per-tenant data isolation, and a clean dashboard for product metrics. Deployed and running in production.",
};

const CHIPS = ["Next.js", "FastAPI", "PostgreSQL", "Vercel"];

const HIGHLIGHTS = [
  {
    key: "TENANCY",
    value:
      "Per-tenant data isolation enforced at the data layer, so one workspace can never read another's metrics.",
  },
  {
    key: "AUTH",
    value: "Secure, scoped workspaces with role-based access to each tenant's data.",
  },
  {
    key: "DASHBOARD",
    value: "A clean product-metrics dashboard built on top of GA4 data.",
  },
  {
    key: "STATUS",
    value: "Deployed on Vercel and running in production.",
  },
];

export default function ArbFlowCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-page px-6 py-16 sm:px-8 sm:py-24">
      <Link
        href="/#work"
        className="font-mono text-[13px] text-ink-2 transition-colors hover:text-accent"
      >
        ← Back to work
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Eyebrow>Case study</Eyebrow>
        <Badge label="Live" variant="live" pulse />
      </div>

      <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
        ArbFlow
      </h1>

      <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">
        Multi-tenant GA4 analytics SaaS — secure workspaces, per-tenant data
        isolation, and a clean dashboard for product metrics. Deployed and
        running in production.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>

      <dl className="mt-12 divide-y divide-line rounded-2xl border border-line bg-surface">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.key}
            className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              {h.key}
            </dt>
            <dd className="text-[15px] leading-relaxed text-ink">{h.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <a
          href="https://marketing-saas-platform-nb3q.vercel.app/"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full bg-candy px-5 py-3 font-mono text-[13px] text-white shadow-md shadow-accent/20 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
        >
          Visit live demo →
        </a>
        <a
          href="mailto:pranavmshukla@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-[13px] text-ink transition-colors hover:border-ink-3"
        >
          Ask me about it
        </a>
      </div>
    </article>
  );
}
