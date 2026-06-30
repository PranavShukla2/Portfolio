"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { PROJECTS, PROJECTS_BY_ID } from "@/lib/projects";
import Badge from "./Badge";
import Chip from "./Chip";
import Divider from "./Divider";

type View = "home" | "cli" | "project";
type LineKind = "cmd" | "out" | "sys" | "err" | "list";
interface Line {
  kind: LineKind;
  text?: string;
}

const PROMPT = "pranav@portfolio projects %";

/**
 * Big MacBook-style showcase. The lid opens on scroll. The display boots to a
 * bright "click to view projects" home screen; clicking drops into a real CLI
 * where `ls` / `open <project>` browse the work, and "know more" opens a detail
 * window inside the same laptop with a back button. Fully keyboard-accessible;
 * the lid simply starts open under prefers-reduced-motion.
 */
export default function LaptopShowcase() {
  const reduce = useReducedMotion();

  const [view, setView] = useState<View>("home");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, view]);

  useEffect(() => {
    if (view === "cli") inputRef.current?.focus({ preventScroll: true });
  }, [view]);

  const openProject = (id: string) => {
    setActiveId(id);
    setView("project");
    setMinimized(false);
  };

  // window-control actions (macOS traffic lights)
  const closeWindow = () => {
    setMinimized(false);
    setView("home");
  };
  const minimizeWindow = () => setMinimized(true);
  const restoreWindow = () => setMinimized(false);

  const goto = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");
    const next: Line[] = [{ kind: "cmd", text: raw }];

    if (cmd === "") {
      // ignore
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "home" || cmd === "exit") {
      setView("home");
      setInput("");
      return;
    } else if (head === "ls" || cmd === "ll" || cmd === "ls projects") {
      next.push({ kind: "list" });
    } else if (head === "open" || head === "cat" || head === "know") {
      const proj = PROJECTS_BY_ID[arg];
      if (proj) {
        next.push({ kind: "sys", text: `opening ${proj.id}…` });
        setHistory((h) => [...h, ...next]);
        setInput("");
        openProject(proj.id);
        return;
      }
      next.push({ kind: "err", text: `no such project: ${arg || "—"} — try \`ls\`` });
    } else if (head === "whoami") {
      next.push({
        kind: "out",
        text: "CS undergrad · builder · ships across applied ML and full-stack SaaS.",
      });
    } else if (cmd === "about" || cmd === "stack" || cmd === "contact") {
      next.push({ kind: "sys", text: `→ ${cmd}` });
      goto(cmd);
    } else if (cmd === "help") {
      next.push({
        kind: "out",
        text: "commands: ls · open <project> · about · stack · contact · clear · home",
      });
    } else {
      next.push({ kind: "err", text: `zsh: command not found: ${raw} — try \`help\`` });
    }

    setHistory((h) => [...h, ...next]);
    setInput("");
  };

  const lineColor: Record<Exclude<LineKind, "cmd" | "list">, string> = {
    out: "text-[#c6b9d6]",
    sys: "text-accent-bright",
    err: "text-accent",
  };

  const activeProject = activeId ? PROJECTS_BY_ID[activeId] : null;
  const showWindow = view !== "home" && !minimized;
  const showHome = view === "home" || minimized;

  return (
    <section id="terminal" className="scroll-mt-[120px] pb-20 sm:pb-28">
      <Divider />
      <div className="mx-auto mt-20 w-full max-w-page px-6 sm:mt-28 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            <span className="text-accent" aria-hidden>
              ∿
            </span>
            Boot it up
          </p>
          <h2 className="mt-4 text-[28px] font-semibold tracking-tightest text-ink sm:text-[36px]">
            Browse my work the coder&apos;s way.
          </h2>
          <p className="mt-3 text-[15px] text-ink-2">
            Open the laptop, then click in — or run{" "}
            <code className="font-mono text-accent">ls</code> and{" "}
            <code className="font-mono text-accent">open arbflow</code>.
          </p>
        </div>

        {/* ── MacBook ── */}
        <div className="mx-auto mt-12 max-w-[880px] [perspective:2000px]">
          <motion.div
            initial={{ rotateX: reduce ? 0 : -88, opacity: reduce ? 1 : 0.5 }}
            whileInView={{ rotateX: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center bottom" }}
            className="relative rounded-[20px] border border-[#3a3a3c] bg-[#1c1c1e] p-2.5 shadow-[0_40px_90px_-30px_rgba(132,94,194,0.5)] sm:p-3"
          >
            {/* camera notch */}
            <div className="absolute left-1/2 top-2.5 z-20 h-4 w-28 -translate-x-1/2 rounded-b-xl bg-[#1c1c1e] sm:top-3">
              <span className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-[#3a3a3c]" />
            </div>

            {/* display */}
            <div className="relative h-[440px] overflow-hidden rounded-[12px] bg-term sm:h-[480px]">
              {showHome && (
                <HomeScreen
                  onStart={() => {
                    setMinimized(false);
                    setView("cli");
                  }}
                  onOpen={openProject}
                  minimizedLabel={
                    minimized
                      ? view === "project" && activeProject
                        ? activeProject.title
                        : "Terminal"
                      : null
                  }
                  onRestore={restoreWindow}
                />
              )}

              {showWindow && (
                <div className="flex h-full flex-col">
                  {/* window title bar */}
                  <div className="flex items-center gap-2 border-b border-term-line px-4 py-3">
                    <div className="group/tl flex items-center gap-2">
                      <button
                        type="button"
                        onClick={closeWindow}
                        aria-label="Close — back to home"
                        title="Close"
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57] text-[9px] font-bold leading-none text-black/55 transition-colors hover:bg-[#ff7b74]"
                      >
                        <span className="opacity-0 group-hover/tl:opacity-100">×</span>
                      </button>
                      <button
                        type="button"
                        onClick={minimizeWindow}
                        aria-label="Minimize"
                        title="Minimize"
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#febc2e] text-[10px] font-bold leading-none text-black/55 transition-colors hover:bg-[#ffce5a]"
                      >
                        <span className="-mt-px opacity-0 group-hover/tl:opacity-100">–</span>
                      </button>
                      <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" aria-hidden />
                    </div>
                    <span className="ml-3 truncate font-mono text-[11px] text-[#8c7ba0]">
                      {view === "project" && activeProject
                        ? `~/projects/${activeProject.id}`
                        : "pranav — zsh — projects"}
                    </span>
                    {view === "project" && (
                      <button
                        type="button"
                        onClick={() => setView("cli")}
                        className="ml-auto font-mono text-[11px] text-accent-bright transition-colors hover:text-white"
                      >
                        ← back
                      </button>
                    )}
                  </div>

                  {/* CLI */}
                  {view === "cli" && (
                    <div
                      ref={bodyRef}
                      onClick={() => inputRef.current?.focus({ preventScroll: true })}
                      className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-[14px]"
                    >
                      <p className="text-[#c6b9d6]">
                        PranavOS · {PROJECTS.length} projects. Type a command.
                      </p>
                      <p className="mt-1 text-[#6f5f85]"># list everything →&nbsp;&nbsp;ls</p>
                      <p className="text-[#6f5f85]"># open one →&nbsp;&nbsp;open arbflow</p>

                      {history.map((line, i) => {
                        if (line.kind === "cmd") {
                          return (
                            <div key={i} className="mt-2 flex flex-wrap items-center gap-x-2">
                              <span className="text-accent-bright">{PROMPT}</span>
                              <span className="text-[#efe7f7]">{line.text}</span>
                            </div>
                          );
                        }
                        if (line.kind === "list") {
                          return (
                            <ul key={i} className="mt-1">
                              {PROJECTS.map((p) => (
                                <li
                                  key={p.id}
                                  className="flex flex-col gap-0.5 border-l-2 border-term-line py-1.5 pl-3 sm:flex-row sm:items-center sm:gap-3"
                                >
                                  <button
                                    type="button"
                                    onClick={() => openProject(p.id)}
                                    className="text-left font-medium text-accent-bright hover:underline"
                                  >
                                    {p.id}
                                  </button>
                                  <span className="text-[#a596ba]">{p.tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => openProject(p.id)}
                                    className="font-mono text-[12px] text-accent hover:text-white sm:ml-auto"
                                  >
                                    know more →
                                  </button>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <div key={i} className={`mt-1 ${lineColor[line.kind]}`}>
                            {line.text}
                          </div>
                        );
                      })}

                      {/* live input */}
                      <div className="mt-2 flex flex-wrap items-center gap-x-2">
                        <span className="text-accent-bright">{PROMPT}</span>
                        <input
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") run(input);
                          }}
                          spellCheck={false}
                          autoComplete="off"
                          autoCapitalize="off"
                          aria-label="Terminal command input. Try: ls, then open arbflow."
                          className="min-w-[8ch] flex-1 bg-transparent text-[#efe7f7] caret-accent-bright outline-none placeholder:text-[#6f5f85]"
                          placeholder="type a command…"
                        />
                      </div>
                    </div>
                  )}

                  {/* Project detail window */}
                  {view === "project" && activeProject && (
                    <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[22px] font-semibold tracking-tightest text-white">
                          {activeProject.title}
                        </h3>
                        {activeProject.badge && (
                          <Badge
                            label={activeProject.badge.label}
                            variant={activeProject.badge.variant}
                            pulse={activeProject.badge.pulse}
                          />
                        )}
                      </div>

                      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-[#c6b9d6]">
                        {activeProject.description}
                      </p>

                      {activeProject.callout && (
                        <div className="mt-5 rounded-xl border border-accent/25 bg-accent-wash p-4">
                          <p className="text-[14px] leading-relaxed text-[#efe7f7]">
                            {activeProject.callout}
                          </p>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeProject.chips.map((chip) => (
                          <Chip key={chip}>{chip}</Chip>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setView("cli")}
                          className="inline-flex items-center gap-2 rounded-full border border-term-line px-4 py-2 font-mono text-[13px] text-[#c6b9d6] transition-colors hover:border-accent-bright hover:text-white"
                        >
                          ← back to terminal
                        </button>
                        {activeProject.link &&
                          (activeProject.link.href.startsWith("/") ? (
                            <Link
                              href={activeProject.link.href}
                              className="inline-flex items-center gap-2 rounded-full bg-candy px-4 py-2 font-mono text-[13px] text-white"
                            >
                              {activeProject.link.label}
                            </Link>
                          ) : (
                            <a
                              href={activeProject.link.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-2 rounded-full bg-candy px-4 py-2 font-mono text-[13px] text-white"
                            >
                              {activeProject.link.label}
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* base / hinge */}
          <div
            className="relative mx-auto h-3.5 w-[110%] -translate-x-[4.5%] rounded-b-2xl bg-gradient-to-b from-[#c8ccd2] to-[#9aa0a8] shadow-xl"
            aria-hidden
          >
            <div className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-lg bg-[#7e858d]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── bright home display ── */
function HomeScreen({
  onStart,
  onOpen,
  minimizedLabel,
  onRestore,
}: {
  onStart: () => void;
  onOpen: (id: string) => void;
  minimizedLabel: string | null;
  onRestore: () => void;
}) {
  return (
    <div className="bg-candy relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80">
        PranavOS
      </span>
      <h3 className="mt-3 text-[30px] font-semibold tracking-tightest sm:text-[40px]">
        {PROJECTS.length} things I&apos;ve built.
      </h3>

      <div className="mt-6 flex max-w-lg flex-wrap items-center justify-center gap-2">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpen(p.id)}
            className="rounded-full bg-white/15 px-3 py-1.5 font-mono text-[12px] text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            {p.title}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[14px] font-medium text-accent shadow-lg transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      >
        ▶ Click to view projects
      </button>
      <p className="mt-3 font-mono text-[11px] text-white/70">
        opens a terminal — browse it like a dev
      </p>

      {/* minimized window dock */}
      {minimizedLabel && (
        <button
          type="button"
          onClick={onRestore}
          className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-4 py-2 font-mono text-[12px] text-white backdrop-blur transition-colors hover:bg-black/40"
        >
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden />
          {minimizedLabel} — click to restore
        </button>
      )}
    </div>
  );
}
