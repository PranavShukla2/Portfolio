"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The frame every terminal game sits in.
 *
 * Its whole job is owning the keyboard safely: a game rendered into the
 * scrollback stays mounted forever, so a window-level key listener would go on
 * eating keystrokes long after the game is over — which is exactly what snake
 * used to do to the prompt. Keys are bound to this element and only reach the
 * game while it holds focus; clicking the prompt hands them straight back.
 */
export default function GameShell({
  title,
  status,
  objective,
  controls,
  accent = "#28c840",
  actions = [],
  showPad = true,
  onKey,
  children,
}: {
  title: string;
  /** Score, level — whatever belongs on the right of the title bar. */
  status?: ReactNode;
  /** One line on what you are trying to do — shown the whole time. */
  objective: ReactNode;
  /** Shown once the game has focus; replaced by a nudge when it does not. */
  controls: ReactNode;
  accent?: string;
  /** Extra on-screen buttons for touch, beside the arrows (e.g. hard drop). */
  actions?: { label: string; key: string }[];
  /** Phones have no arrow keys — hide the pad for games that only need typing. */
  showPad?: boolean;
  onKey: (key: string) => void;
  children: ReactNode;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setHasFocus] = useState(true);

  useEffect(() => {
    boardRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const handle = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // these would scroll the terminal out from under the game
      if (key.startsWith("arrow") || key === " ") e.preventDefault();
      onKey(key);
    };

    board.addEventListener("keydown", handle);
    return () => board.removeEventListener("keydown", handle);
  }, [onKey]);

  return (
    <div
      ref={boardRef}
      tabIndex={0}
      data-keyboard-owner
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      style={{ borderColor: hasFocus ? accent : `${accent}4d` }}
      className="my-2 select-none rounded-lg border bg-[#080b12] p-3.5 font-mono text-[12px] outline-none transition-colors"
    >
      <div
        className="flex flex-wrap items-center justify-between border-b pb-2 text-[11px]"
        style={{ borderColor: `${accent}4d`, color: accent }}
      >
        <span className="font-bold">{title}</span>
        {status && <div className="flex items-center gap-3">{status}</div>}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-[#7b93ad]">
        <span style={{ color: accent }}>Goal</span> — {objective}
      </p>

      <div className="my-3 flex justify-center overflow-x-auto">{children}</div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-[#8c7ba0]">
        <span>{hasFocus ? controls : <>Click the game to play</>}</span>

        {/* touch devices have no arrow keys, so hand them the same moves */}
        {showPad && (
          <div className="flex items-center gap-1 sm:hidden">
            {[
              { label: "◀", key: "arrowleft" },
              { label: "▲", key: "arrowup" },
              { label: "▼", key: "arrowdown" },
              { label: "▶", key: "arrowright" },
              ...actions,
            ].map((button) => (
              <button
                key={button.key + button.label}
                type="button"
                onClick={() => onKey(button.key)}
                className="rounded bg-white/10 px-2 py-1 text-white active:bg-white/30"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
