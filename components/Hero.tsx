import Avatar3D from "./Avatar3D";
import PulseDot from "./PulseDot";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-page px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          {/* ── copy ── */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[12px] text-ink-2 backdrop-blur">
              <PulseDot />
              Open to SWE internships · 2026
            </span>

            <h1 className="mt-7 text-[40px] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[54px] lg:text-[60px]">
              I build systems that read{" "}
              <span className="text-candy">signal</span> out of messy data.
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
              I ship across applied ML and full-stack SaaS — from healthcare
              biosignals to multi-tenant analytics in production. I like turning
              ambiguous problems into things that run.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#work">See selected work →</Button>
              <Button href="mailto:pranavmshukla@gmail.com" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>

          {/* ── avatar ── */}
          <div className="order-first lg:order-none">
            <Avatar3D />
          </div>
        </div>
      </div>
    </section>
  );
}
