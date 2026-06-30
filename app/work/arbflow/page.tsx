import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Section";
import Badge from "@/components/Badge";
import Chip from "@/components/Chip";

export const metadata: Metadata = {
  title: "ArbFlow — Multi-tenant GA4 analytics SaaS",
  description:
    "Case study: secure per-client workspaces, per-tenant data isolation, and a dashboard that surfaces what actually changed across GA4, Meta and LinkedIn. Live in production.",
};

const CHIPS = ["Next.js", "FastAPI", "PostgreSQL", "Vercel"];

const AT_A_GLANCE = [
  // TODO: confirm role / timeline if you want them exact
  { key: "ROLE", value: "Solo — design, frontend, backend, infra" },
  { key: "STACK", value: "Next.js · FastAPI · PostgreSQL · Vercel" },
  { key: "FOR", value: "Marketing agencies managing many clients" },
  { key: "STATUS", value: "Live in production" },
];

const ARCHITECTURE = [
  {
    key: "DASHBOARD",
    value: "Next.js on Vercel (App Router) — the agency-facing UI and per-client views.",
  },
  {
    key: "API",
    value:
      "FastAPI service — authentication, the GA4 / Meta / LinkedIn OAuth connectors, and metric aggregation.",
  },
  {
    key: "DATA",
    value: "PostgreSQL — every row tagged by tenant; reads and writes are tenant-scoped.",
  },
  {
    key: "CONNECTORS",
    value: "GA4, Meta and LinkedIn pulled via OAuth on a schedule, then normalised.",
    // TODO: confirm scheduling/normalisation specifics
  },
];

const SECURITY = [
  "Per-tenant data isolation: every record is tied to a tenant and every query is scoped to the caller's tenant, so one workspace can never read another's data.",
  "Scoped workspaces with role-based access — members only ever see the clients they're granted.",
  "Third-party OAuth tokens are held server-side and never exposed to the browser.",
  "Least-privilege OAuth scopes against GA4 / Meta / LinkedIn.",
  // TODO (confirm the real mechanisms so this is exact):
  //  - tenant isolation: Postgres Row-Level Security vs application-layer scoping?
  //  - token storage: encrypted at rest? which KMS/secret store?
  //  - session/auth: how sessions + tenant claims are issued and verified
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
        Multi-tenant GA4 analytics SaaS for agencies — secure per-client
        workspaces, per-tenant data isolation, and a dashboard that unifies GA4,
        Meta and LinkedIn and tells you what actually changed. Deployed and
        running in production.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>

      {/* At a glance */}
      <dl className="mt-12 divide-y divide-line rounded-2xl border border-line bg-surface">
        {AT_A_GLANCE.map((h) => (
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

      {/* Problem */}
      <section className="mt-16">
        <Eyebrow>The problem</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Agencies juggle every client&apos;s analytics across GA4, Meta and
          LinkedIn — separate logins, exported CSVs, and still no clear answer to
          the only question that matters before a client call: what actually
          changed this week, and why? There was no single, secure place to see
          per-client performance and have the notable shifts surfaced for you.
        </p>
      </section>

      {/* What it does */}
      <section className="mt-14">
        <Eyebrow>What it does</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          ArbFlow gives an agency one isolated workspace per client. Connect a
          client&apos;s GA4, Meta and LinkedIn in a few clicks and ArbFlow unifies
          the data into a clean dashboard — then surfaces what moved: traffic
          shifts, funnel spikes, pages worth a look. You walk into the client
          call already knowing the story.
        </p>
      </section>

      {/* Architecture */}
      <section className="mt-14">
        <Eyebrow>Architecture</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          A Next.js dashboard on Vercel talks to a FastAPI backend, which owns
          auth, the OAuth connectors, and aggregation over a tenant-scoped
          PostgreSQL database.
        </p>
        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
          {ARCHITECTURE.map((h) => (
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
        <p className="mt-4 font-mono text-[12px] text-ink-3">
          browser → Next.js (Vercel) → FastAPI → PostgreSQL · connectors pull
          GA4 / Meta / LinkedIn on a schedule
        </p>
      </section>

      {/* Security & multi-tenancy */}
      <section className="mt-14">
        <Eyebrow>Security &amp; multi-tenancy</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Multi-tenancy is the whole product, so isolation is a first-class
          concern rather than an afterthought. The decisions that mattered:
        </p>
        <ul className="mt-6 max-w-2xl space-y-3">
          {SECURITY.map((s) => (
            <li
              key={s}
              className="flex gap-3 rounded-xl border border-accent/15 bg-accent-wash p-4 text-[15px] leading-relaxed text-ink"
            >
              <span className="mt-1 text-accent" aria-hidden>
                ∿
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Status */}
      <section className="mt-14">
        <Eyebrow>Status</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Live in production on Vercel. Try the connect flow and dashboard
          yourself, or ask me about any of the decisions above.
        </p>
      </section>

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
