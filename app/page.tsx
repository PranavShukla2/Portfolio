import Hero from "@/components/Hero";
import LaptopShowcase from "@/components/LaptopShowcase";
import CricketSix from "@/components/CricketSix";
import PhoneMockup from "@/components/PhoneMockup";
import Notebook from "@/components/Notebook";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import PulseDot from "@/components/PulseDot";
import { PROJECTS_BY_ID } from "@/lib/projects";

const STACK = [
  {
    title: "Languages",
    grad: "linear-gradient(135deg,#ff6b6b,#ffb347)",
    color: "#e2563b",
    wash: "rgba(255,107,107,0.12)",
    items: ["Python", "TypeScript", "SQL", "JavaScript"],
  },
  {
    title: "Frontend",
    grad: "linear-gradient(135deg,#ff4e9b,#ff6b6b)",
    color: "#ff4e9b",
    wash: "rgba(255,78,155,0.12)",
    items: ["Next.js / React", "Tailwind", "Framer Motion"],
  },
  {
    title: "Backend & Data",
    grad: "linear-gradient(135deg,#845ec2,#ff4e9b)",
    color: "#845ec2",
    wash: "rgba(132,94,194,0.13)",
    items: ["FastAPI", "PostgreSQL", "REST APIs", "Power BI"],
  },
  {
    title: "ML / Ops",
    grad: "linear-gradient(135deg,#ffb347,#ff4e9b)",
    color: "#d98324",
    wash: "rgba(255,179,71,0.16)",
    items: ["PyTorch", "scikit-learn", "Docker", "CI/CD"],
  },
];

const FACTS = [
  { key: "FOCUS", value: "Applied ML · Full-stack", color: "#ff6b6b" },
  { key: "CURRENTLY", value: "Building ArbFlow", color: "#ff4e9b" },
  { key: "RESEARCH", value: "Sleep apnea (writing up)", color: "#845ec2" },
  { key: "LOOKING FOR", value: "SWE internship · startups", color: "#e2563b" },
  { key: "BASED", value: "India · remote-friendly", color: "#d98324" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ── Interactive laptop showcase ── */}
      <LaptopShowcase />

      {/* ── Selected work ── */}
      <Section id="work" eyebrow="Selected work">
        {/* Shipped · in production — the one real production system, front and centre */}
        <div className="mb-5 flex items-center gap-2.5">
          <PulseDot />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
            Shipped · in production
          </h3>
        </div>
        <Reveal>
          <ProjectCard project={PROJECTS_BY_ID["arbflow"]} />
        </Reveal>

        {/* Research & projects — built, but not deployed to users */}
        <div className="mb-5 mt-14 flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-ink-3" aria-hidden />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Research &amp; projects
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <ProjectCard project={PROJECTS_BY_ID["mlops"]} />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectCard project={PROJECTS_BY_ID["sleep-apnea"]} />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectCard project={PROJECTS_BY_ID["pre-eclampsia"]} />
          </Reveal>
        </div>
      </Section>

      {/* ── About ── */}
      <Section id="about" eyebrow="About">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="space-y-5 text-[18px] leading-relaxed text-ink-2">
                <p>
                  I ship. Most of what I&apos;m proud of started as a vague problem
                  and ended as something{" "}
                  <span className="font-medium text-ink">running in front of real users</span>.
                </p>
                <p>
                  My work spans two worlds — healthcare biosignals and product
                  analytics. One day it&apos;s a CNN reading single-lead
                  physiological data; the next it&apos;s per-tenant isolation in an
                  analytics SaaS. The throughline is the same: turn a hard,
                  real-world problem into a working system people rely on.
                </p>
                <p>
                  I gravitate to early-stage teams where shipping is the job.
                  <span className="font-medium text-ink"> ArbFlow</span> is what
                  I&apos;m building now, and my sleep-apnea paper is in progress.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <dl className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-24px_rgba(132,94,194,0.35)]">
                <div className="bg-candy h-1.5 w-full" aria-hidden />
                {FACTS.map((fact, i) => (
                  <div
                    key={fact.key}
                    className={`flex items-center justify-between gap-6 px-5 py-3.5 ${
                      i % 2 === 1 ? "bg-bg" : ""
                    }`}
                  >
                    <dt className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: fact.color }}
                        aria-hidden
                      />
                      <span style={{ color: fact.color }}>{fact.key}</span>
                    </dt>
                    <dd className="text-right text-[14px] font-semibold text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <PhoneMockup />
          </Reveal>
        </div>
      </Section>

      {/* ── Field notes (notebook) ── */}
      <Section eyebrow="Field notes">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="text-[28px] font-semibold tracking-tightest text-ink sm:text-[34px]">
                How I think about building.
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-2">
                No grand process — just a loop I trust: figure out what actually
                matters, ship the smallest real thing, put it in front of people,
                and tighten it from there.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Notebook />
          </Reveal>
        </div>
      </Section>

      {/* ── Stack ── */}
      <Section id="stack" eyebrow="Stack">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.05}>
              <div className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-20px_rgba(132,94,194,0.45)]">
                <div className="h-1.5 w-full" style={{ background: col.grad }} aria-hidden />
                <div className="p-6">
                  <h3
                    className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: col.color }}
                  >
                    {col.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {col.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-ink"
                        style={{ background: col.wash }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Cricket six (scroll animation) ── */}
      <CricketSix />

      {/* ── Contact ── */}
      <Section id="contact" eyebrow="Contact">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[34px] font-semibold tracking-tightest sm:text-[46px]">
              Let&apos;s build <span className="text-candy">something</span>.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
              I&apos;m looking for SWE internships with early-stage teams. If you
              think I can help you ship, I&apos;d love to hear from you.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:pranavmshukla@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-candy px-5 py-3 font-mono text-[13px] text-white shadow-md shadow-accent/20 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                Email me
              </a>
              {/* TODO: link résumé PDF */}
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-[13px] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Résumé (PDF)
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
