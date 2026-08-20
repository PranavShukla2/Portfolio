import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Eyebrow } from "@/components/Section";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import {
  FactCard,
  HeaderBackdrop,
  PointList,
  StackPills,
} from "@/components/work/CaseStudy";

export const metadata: Metadata = {
  title: "Ankur (CNAMS) — Child growth & malnutrition screening",
  description:
    "Case study: WHO LMS z-scores computed on-device in Flutter so Anganwadi workers get a SAM/MAM result on the spot, with an encrypted offline-first store and a supervisor portal.",
};

const STACK_PILLS = [
  { label: "Flutter", color: "#ff4e9b", wash: "rgba(255,78,155,0.12)" },
  { label: "Riverpod", color: "#845ec2", wash: "rgba(132,94,194,0.13)" },
  { label: "SQLCipher", color: "#e2563b", wash: "rgba(255,107,107,0.14)" },
  { label: "BLE", color: "#d98324", wash: "rgba(255,179,71,0.18)" },
  { label: "Next.js 14", color: "var(--ink-3)", wash: "var(--line)" },
];

const AT_A_GLANCE = [
  {
    key: "STACK",
    value: "Flutter · Riverpod · SQLite/SQLCipher · BLE · Next.js 14 · TypeScript",
  },
  { key: "FOR", value: "Anganwadi workers screening children in the field" },
  {
    key: "WORKS",
    value: "Offline by default — scoring and classification happen on the device",
  },
  {
    key: "PORTAL",
    value: "21 routes across 5 roles — worker, supervisor, doctor, parent, admin",
  },
];

const ARCHITECTURE = [
  {
    key: "APP",
    value:
      "Flutter with Riverpod — capture, WHO LMS z-score computation and SAM/MAM classification, all on-device.",
  },
  {
    key: "STORE",
    value:
      "drift over SQLCipher — an encrypted offline-first database with background sync once a connection returns.",
  },
  {
    key: "SCALES",
    value:
      "Bluetooth Low Energy ingestion, so a weighing scale's reading lands in the record without transcription.",
  },
  {
    key: "PORTAL",
    value:
      "A Next.js 14 portal for supervisors: sector-level SAM/MAM trends and a live referral queue.",
  },
];

const FIELD = [
  "Z-scores (WAZ, HAZ, WHZ and MUAC-for-age) are computed on the device, so a worker gets a SAM/MAM/normal result during the visit instead of after a lab round-trip.",
  "Capture keeps working in centres with no connectivity — the encrypted store is the source of truth and sync is a background concern, not a precondition.",
  "Records sit in a SQLCipher-encrypted database rather than in plain local storage, because this is children's health data.",
  "Export is ordered for Poshan Tracker, so the data leaves in the shape the existing government workflow already expects.",
];

export default function CnamsCaseStudy() {
  return (
    <article className="relative mx-auto w-full max-w-page px-6 py-16 sm:px-8 sm:py-24">
      <HeaderBackdrop />

      <Link
        href="/#work"
        className="font-mono text-[13px] text-ink-2 transition-colors hover:text-accent"
      >
        ← Back to work
      </Link>

      {/* header */}
      <div className="relative mt-8">
        {/* floating badges (desktop) */}
        <span
          className="pointer-events-none absolute right-2 top-8 hidden rotate-3 items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[12px] font-medium shadow-md lg:inline-flex"
          style={{ background: "rgba(255,179,71,0.2)", color: "#d98324" }}
        >
          ● offline-first
        </span>
        <span
          className="pointer-events-none absolute right-24 top-28 hidden -rotate-3 rounded-full px-3 py-1.5 font-mono text-[12px] font-medium shadow-md lg:inline-block"
          style={{ background: "rgba(132,94,194,0.16)", color: "#845ec2" }}
        >
          🔒 encrypted at rest
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>Case study</Eyebrow>
          <Badge label="Field tool" variant="warm" />
        </div>

        <h1
          style={{ viewTransitionName: "project-title-cnams" }}
          className="mt-5 text-[44px] font-semibold leading-[1.02] tracking-tightest sm:text-[60px]"
        >
          <span className="text-candy">Ankur</span>{" "}
          <span className="text-ink-3">(CNAMS)</span>
        </h1>

        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">
          Child growth and malnutrition screening for Anganwadi workers. WHO LMS
          z-scores are computed on the device, so a worker gets a SAM/MAM result
          during the visit — with no network, no lab round-trip, and an encrypted
          record that syncs when it can.
        </p>

        <StackPills pills={STACK_PILLS} />
      </div>

      {/* At a glance */}
      <div className="mt-12">
        <FactCard rows={AT_A_GLANCE} />
      </div>

      {/* Problem */}
      <section className="mt-16">
        <Eyebrow>The problem</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Triaging a malnourished child meant a lab round-trip: measure now, find
          out later, follow up if you can. The delay is the problem — the whole
          point of screening is to catch severe cases early enough to refer them.
          And the centres where this matters most are the ones least likely to
          have a working connection while the worker is standing there.
        </p>
      </section>

      {/* What it does */}
      <section className="mt-14">
        <Eyebrow>What it does</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          A worker records a child&apos;s measurements and the app computes the WHO
          LMS z-scores — WAZ, HAZ, WHZ and MUAC-for-age — on the spot, classifying
          the result as SAM, MAM or normal with no network dependency. Supervisors
          see the same data roll up as sector-level trends and a live referral
          queue.
        </p>
        <p className="mt-4 font-mono text-[12px] text-ink-3">
          measure <span className="text-accent">→</span> on-device z-scores{" "}
          <span className="text-accent-2">→</span> SAM / MAM / normal{" "}
          <span className="text-coral">→</span> encrypted store{" "}
          <span className="text-accent-3">→</span> sync · referral queue
        </p>
      </section>

      {/* Architecture */}
      <section className="mt-14">
        <Eyebrow>Architecture</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          A Flutter app owns capture and scoring; an encrypted local database owns
          the truth; the Next.js portal is a read-up for the people supervising a
          sector.
        </p>
        <div className="mt-6">
          <FactCard rows={ARCHITECTURE} />
        </div>
      </section>

      {/* Built for the field */}
      <section className="mt-14">
        <Eyebrow>Built for the field</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Every significant decision here follows from where it gets used rather
          than from what is pleasant to build:
        </p>
        <PointList points={FIELD} />
      </section>

      {/* Status */}
      <section className="mt-14">
        <Eyebrow>Status</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Built end to end — the Flutter app and the supervisor portal. The portal
          is deployed and can be opened below.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Button href="https://cnamsfrontend.vercel.app">Open the portal →</Button>
        <Button href="mailto:pranavmshukla@gmail.com" variant="outline">
          Ask me about it
        </Button>
      </div>
    </article>
  );
}
