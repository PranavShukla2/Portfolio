"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * The nav's arcade button. Terminal games are launched by asking the laptop to
 * run the command — same as typing it — so there is one code path for both.
 * Chess keeps its own page; a board does not want to live in a 480px terminal.
 */
const GAMES = [
  {
    cmd: "tetris",
    glyph: "🧱",
    name: "Tetris",
    blurb: "Rotate, drop, clear lines",
    where: "terminal",
  },
  {
    cmd: "2048",
    glyph: "🔢",
    name: "2048",
    blurb: "Slide tiles, merge to 2048",
    where: "terminal",
  },
  {
    cmd: "snake",
    glyph: "🐍",
    name: "Snake",
    blurb: "Eat, grow, don't turn on yourself",
    where: "terminal",
  },
  {
    cmd: "type",
    glyph: "⌨",
    name: "Typing test",
    blurb: "Words per minute, live",
    where: "terminal",
  },
  {
    cmd: "doom",
    glyph: "🎮",
    name: "DOOM",
    blurb: "1993, on WebAssembly",
    where: "terminal",
  },
  {
    href: "/chess",
    glyph: "♞",
    name: "Chess puzzles",
    blurb: "Nine forced mates",
    where: "page",
  },
] as const;

export default function GamePicker() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const launch = (cmd: string) => {
    setOpen(false);
    if (pathname === "/") {
      // the terminal is on this page already — just hand it the command
      window.dispatchEvent(new CustomEvent("pranavos:play", { detail: cmd }));
    } else {
      router.push(`/?play=${cmd}#terminal`);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Play a game"
        className="group inline-flex items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2-wash px-2.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-accent-2 transition-all hover:-translate-y-0.5 hover:border-accent-2 motion-reduce:hover:translate-y-0 sm:px-3.5"
      >
        <motion.span
          aria-hidden
          animate={reduce ? {} : { rotate: [0, -12, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.4 }}
        >
          🕹
        </motion.span>
        <span className="hidden sm:inline">Play</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: reduce ? 1 : 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[62px] z-50 origin-top overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_28px_70px_-24px_rgba(132,94,194,0.5)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-[290px] sm:origin-top-right"
          >
            <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
              Pick one
            </p>

            {GAMES.map((game, i) => {
              const body = (
                <>
                  <span className="text-[17px]" aria-hidden>
                    {game.glyph}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-medium text-ink">
                      {game.name}
                    </span>
                    <span className="block truncate text-[12px] text-ink-3">
                      {game.blurb}
                    </span>
                  </span>
                  {game.where === "page" && (
                    <span className="shrink-0 rounded-full bg-accent-wash px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                      page
                    </span>
                  )}
                </>
              );

              return (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, x: reduce ? 0 : -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.03 * i, duration: 0.16 }}
                >
                  {"href" in game ? (
                    <a
                      href={game.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-2-wash"
                    >
                      {body}
                    </a>
                  ) : (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => launch(game.cmd)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent-2-wash"
                    >
                      {body}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
