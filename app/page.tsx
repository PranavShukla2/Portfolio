import Hero from "@/components/Hero";
import LaptopShowcase from "@/components/LaptopShowcase";
import CricketSix from "@/components/CricketSix";
import PhoneMockup from "@/components/PhoneMockup";
import Notebook from "@/components/Notebook";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import PulseDot from "@/components/PulseDot";
import Button from "@/components/Button";
import { PROJECTS_BY_ID } from "@/lib/projects";
import { SITE_URL } from "@/lib/posts";

const PROFILES = [
  "https://github.com/PranavShukla2",
  "https://www.linkedin.com/in/pranav-shukla-softwaredeveloper/",
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Pranav Shukla",
      url: SITE_URL,
      jobTitle: "Applied ML & Full-stack Engineer",
      sameAs: PROFILES,
    },
    {
      "@type": "WebSite",
      name: "Pranav Shukla",
      url: SITE_URL,
    },
  ],
};

const STACK = [
  {
    title: "Languages",
    grad: "linear-gradient(135deg,#ff6b6b,#ffb347)",
    color: "#e2563b",
    wash: "rgba(255,107,107,0.12)",
    items: ["Python", "C++", "Rust", "TypeScript", "SQL", "Dart", "Java"],
  },
  {
    title: "Web & Backend",
    grad: "linear-gradient(135deg,#ff4e9b,#ff6b6b)",
    color: "#ff4e9b",
    wash: "rgba(255,78,155,0.12)",
    items: [
      "Next.js / React",
      "FastAPI",
      "Flask",
      "Flutter",
      "WebAssembly",
      "REST APIs",
      "Tailwind",
    ],
  },
  {
    title: "ML & Data",
    grad: "linear-gradient(135deg,#845ec2,#ff4e9b)",
    color: "#845ec2",
    wash: "rgba(132,94,194,0.13)",
    items: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "SciPy",
      "Signal processing",
    ],
  },
  {
    title: "Infra & Tools",
    grad: "linear-gradient(135deg,#ffb347,#ff4e9b)",
    color: "#d98324",
    wash: "rgba(255,179,71,0.16)",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Docker",
      "Linux",
      "Vercel",
      "Looker Studio",
      "Power BI",
    ],
  },
];

const FACTS = [
  { key: "FOCUS", value: "Applied ML · Full-stack", color: "#ff6b6b" },
  { key: "CURRENTLY", value: "Building Kleene & ArbFlow", color: "#ff4e9b" },
  { key: "EXPERIENCE", value: "Data Analyst @ Com1", color: "#e2563b" },
  { key: "RESEARCH", value: "Sleep apnea (writing up)", color: "#845ec2" },
  { key: "LOOKING FOR", value: "SWE internship · startups", color: "#e2563b" },
  { key: "BASED", value: "India · remote-friendly", color: "#d98324" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Hero />

      {/* ── Interactive laptop showcase ── */}
      <LaptopShowcase />

      {/* ── Selected work ── */}
      <Section id="work" eyebrow="Selected work">
        {/* Shipped · in production — the two that are live and reachable today */}
        <div className="mb-5 flex items-center gap-2.5">
          <PulseDot />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
            Shipped · in production
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <ProjectCard project={PROJECTS_BY_ID["arbflow"]} />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectCard project={PROJECTS_BY_ID["kleene"]} />
          </Reveal>
        </div>

        {/* Research & projects — built, but not deployed to users */}
        <div className="mb-5 mt-14 flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-ink-3" aria-hidden />
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Research &amp; projects
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <ProjectCard project={PROJECTS_BY_ID["cnams"]} />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectCard project={PROJECTS_BY_ID["sleep-apnea"]} />
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
              <Button href="mailto:pranavmshukla@gmail.com">Email me</Button>
              <Button
                href="/resume/Pranav-Shukla-Resume.pdf"
                variant="outline"
                newTab
              >
                Résumé (PDF)
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
