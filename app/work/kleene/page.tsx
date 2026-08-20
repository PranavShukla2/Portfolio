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
  title: "Kleene — Browser-native automata theory workbench",
  description:
    "Case study: the regex → ε-NFA → DFA → minimal DFA → regex pipeline compiled to WebAssembly, with every construction round replayable as a scrubbable step. No JRE, no install.",
};

const STACK_PILLS = [
  { label: "Rust", color: "#e2563b", wash: "rgba(255,107,107,0.14)" },
  { label: "WebAssembly", color: "#845ec2", wash: "rgba(132,94,194,0.13)" },
  { label: "React", color: "#ff4e9b", wash: "rgba(255,78,155,0.12)" },
  { label: "TypeScript", color: "#d98324", wash: "rgba(255,179,71,0.18)" },
  { label: "Vite", color: "#5a5a5f", wash: "rgba(90,90,95,0.08)" },
];

const AT_A_GLANCE = [
  { key: "STACK", value: "Rust · WebAssembly · React · TypeScript · Vite" },
  {
    key: "RUNS",
    value: "Entirely client-side — the converter is compiled to WebAssembly and runs in the tab",
  },
  {
    key: "REPLACES",
    value: "JFLAP, and the JRE install that gates it in most CS departments",
  },
  {
    key: "STATUS",
    value: "Live at kleene.pranavmshukla.in · v2 in progress",
  },
];

const ARCHITECTURE = [
  {
    key: "CORE",
    value:
      "A four-crate Rust workspace holding the automata, the conversions, and the equivalence checks.",
  },
  {
    key: "BRIDGE",
    value:
      "Compiled to WebAssembly, so the whole pipeline runs in the browser rather than on a server.",
  },
  {
    key: "CANVAS",
    value:
      "React and TypeScript on Vite — an SVG canvas for drawing states and transitions, plus regex entry.",
  },
  {
    key: "STEPS",
    value:
      "Each conversion emits its rounds as discrete steps, which is what the UI scrubs through.",
  },
];

const CORRECTNESS = [
  "10,000 randomized property cases per suite, run across the four-crate Rust workspace.",
  "A differential harness that checks language equivalence against Rust's regex crate, so the conversions are tested against an independent implementation rather than against themselves.",
  "Every subset-construction round and Hopcroft partition split is rendered as a scrubbable step naming the witness string that caused it.",
  "Inequivalent machines report the shortest string they disagree on, so a wrong answer comes with its own counterexample.",
];

export default function KleeneCaseStudy() {
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
          style={{ background: "rgba(255,107,107,0.16)", color: "#e2563b" }}
        >
          ● no install
        </span>
        <span
          className="pointer-events-none absolute right-24 top-28 hidden -rotate-3 rounded-full px-3 py-1.5 font-mono text-[12px] font-medium shadow-md lg:inline-block"
          style={{ background: "rgba(132,94,194,0.16)", color: "#845ec2" }}
        >
          🦀 rust → wasm
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>Case study</Eyebrow>
          <Badge label="Live" variant="live" pulse />
        </div>

        <h1
          style={{ viewTransitionName: "project-title-kleene" }}
          className="mt-5 text-[44px] font-semibold leading-[1.02] tracking-tightest sm:text-[60px]"
        >
          <span className="text-candy">Kleene</span>
        </h1>

        <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-2">
          A browser-native automata theory workbench. Draw states and transitions
          on an SVG canvas or type a regex, and the full conversion pipeline runs
          client-side as WebAssembly — with every construction round replayable,
          rather than handed to you as an answer to trust.
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
          JFLAP is assigned in most CS departments, and it asks a student to
          install a Java runtime before they can draw their first state. That is a
          real barrier for a tool used for a few weeks of one course. The second
          problem is subtler: these tools hand back a converted machine without
          showing the work, so a subset construction stays a black box exactly
          when a student is trying to learn what it does.
        </p>
      </section>

      {/* What it does */}
      <section className="mt-14">
        <Eyebrow>What it does</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Kleene opens from a URL. There is an SVG canvas for drawing states and
          transitions, a field for entering a regex, and the complete regex →
          ε-NFA → DFA → minimal DFA → regex converter running in the tab. Nothing
          is uploaded and nothing is installed.
        </p>
        <p className="mt-4 font-mono text-[12px] text-ink-3">
          regex <span className="text-accent">→</span> ε-NFA{" "}
          <span className="text-accent-2">→</span> DFA{" "}
          <span className="text-coral">→</span> minimal DFA{" "}
          <span className="text-accent-3">→</span> regex · all client-side
        </p>
      </section>

      {/* Architecture */}
      <section className="mt-14">
        <Eyebrow>Architecture</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          The theory lives in Rust and is compiled to WebAssembly; React only
          draws it. Keeping the conversions in one typed core is what makes the
          step-by-step replay possible without re-implementing anything in the UI.
        </p>
        <div className="mt-6">
          <FactCard rows={ARCHITECTURE} />
        </div>
      </section>

      {/* Showing the work */}
      <section className="mt-14">
        <Eyebrow>Showing the work</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          The point of the workbench is that a conversion is auditable rather than
          opaque, and that correctness is demonstrated instead of asserted:
        </p>
        <PointList points={CORRECTNESS} />
      </section>

      {/* Status */}
      <section className="mt-14">
        <Eyebrow>Status</Eyebrow>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
          Live and open in a tab. v2 — pushdown automata, Turing machines and
          grammars — is in progress.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Button href="https://kleene.pranavmshukla.in">Open the workbench →</Button>
        <Button href="mailto:pranavmshukla@gmail.com" variant="outline">
          Ask me about it
        </Button>
      </div>
    </article>
  );
}
