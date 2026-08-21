"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

/** Lines worth typing: things that actually get typed around here. */
const PROMPTS = [
  "ship the smallest real thing, put it in front of people, then tighten it",
  "a forced mate is only forced if every reply still loses",
  "the model was ninety one percent accurate and still missed every apnea event",
  "per tenant isolation means one workspace can never read another's data",
  "regex to epsilon nfa to dfa to minimal dfa and back to regex",
  "measure on the device so the worker gets an answer during the visit",
];

const pick = () => PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

export default function TypingTest() {
  const [target, setTarget] = useState(pick);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [best, setBest] = useState(0);
  const [now, setNow] = useState(Date.now());

  const typedRef = useRef(typed);
  typedRef.current = typed;

  // drives the live timer while a run is in progress
  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const timer = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(timer);
  }, [startedAt, finishedAt]);

  const elapsed = startedAt ? ((finishedAt ?? now) - startedAt) / 1000 : 0;
  const correct = typed
    .split("")
    .filter((char, i) => char === target[i]).length;
  const accuracy = typed.length
    ? Math.round((correct / typed.length) * 100)
    : 100;
  // the standard: a "word" is five characters
  const wpm = elapsed > 0 ? Math.round((correct / 5 / elapsed) * 60) : 0;

  const reset = useCallback(() => {
    setTarget(pick());
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
  }, []);

  const onKey = useCallback(
    (key: string) => {
      if (key === "escape") return reset();

      const current = typedRef.current;

      if (key === "backspace") {
        setTyped(current.slice(0, -1));
        return;
      }
      // ignore modifiers, function keys and the arrows
      if (key.length !== 1) return;
      if (finishedAt) return;

      if (!startedAt) setStartedAt(Date.now());
      const nextTyped = current + key;
      setTyped(nextTyped);

      if (nextTyped.length >= target.length) {
        const done = Date.now();
        setFinishedAt(done);
        const seconds = ((done - (startedAt ?? done)) || 1) / 1000;
        const hits = nextTyped
          .split("")
          .filter((char, i) => char === target[i]).length;
        setBest((b) => Math.max(b, Math.round((hits / 5 / seconds) * 60)));
      }
    },
    [finishedAt, reset, startedAt, target]
  );

  return (
    <GameShell
      title="⌨ PRANAV_WASM_TYPETEST v1.0"
      accent="#a982e6"
      onKey={onKey}
      status={
        <>
          <span>
            WPM: <strong className="text-white">{wpm}</strong>
          </span>
          <span>
            Acc: <strong className="text-[#c9b3ef]">{accuracy}%</strong>
          </span>
          <span>
            Best: <strong className="text-[#c9b3ef]">{best}</strong>
          </span>
        </>
      }
      controls={
        finishedAt ? (
          <span className="font-bold text-[#38ef7d]">
            ✓ {wpm} wpm at {accuracy}% in {elapsed.toFixed(1)}s —{" "}
            <code className="text-[#c9b3ef]">Esc</code> for another line
          </span>
        ) : (
          <>
            Just type — <code className="text-[#c9b3ef]">Backspace</code> fixes,{" "}
            <code className="text-[#c9b3ef]">Esc</code> starts a new line
          </>
        )
      }
    >
      <p className="max-w-[560px] text-left text-[15px] leading-[1.9] tracking-wide">
        {target.split("").map((char, i) => {
          const state =
            i >= typed.length
              ? "text-[#5f7590]"
              : typed[i] === char
                ? "text-[#38ef7d]"
                : "bg-[#ff4e9b]/30 text-[#ff8fbe]";
          const cursor =
            i === typed.length && !finishedAt
              ? " border-b-2 border-[#a982e6]"
              : "";
          return (
            <span key={i} className={`${state}${cursor}`}>
              {char}
            </span>
          );
        })}
      </p>
    </GameShell>
  );
}
