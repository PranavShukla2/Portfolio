import type { Metadata } from "next";
import { Eyebrow } from "@/components/Section";
import PuzzleGame from "@/components/chess/PuzzleGame";
import { PUZZLES } from "@/lib/chess/puzzles";

const DESCRIPTION =
  "Forced-mate chess puzzles — no engine, just a small solver that checks whether your move still mates and picks the toughest defence.";

export const metadata: Metadata = {
  title: "Chess — Pranav Shukla",
  description: DESCRIPTION,
  openGraph: {
    title: "Chess — Pranav Shukla",
    description: DESCRIPTION,
    type: "website",
  },
};

export default function ChessPage() {
  return (
    <div className="relative mx-auto w-full max-w-page px-6 py-16 sm:px-8 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
      >
        <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-accent-2-wash blur-3xl" />
        <div className="absolute right-0 -top-10 h-72 w-72 rounded-full bg-accent-wash blur-3xl" />
      </div>

      <header className="max-w-2xl">
        <Eyebrow>Chess</Eyebrow>
        <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-tightest sm:text-[52px]">
          Find the <span className="text-candy">forced mate</span>.
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
          {PUZZLES.length} positions, each one mate in a couple of moves. There is
          no engine here — a small solver checks whether the move you played still
          forces mate, then answers with the most stubborn defence it can find. So
          the only way through is the real one. Prefer to work out both sides? Turn
          on <span className="font-medium text-ink">play both sides</span> and
          answer for the defender yourself.
        </p>
      </header>

      <div className="mt-12">
        <PuzzleGame />
      </div>

      <p className="mt-14 max-w-2xl font-mono text-[12px] leading-relaxed text-ink-3">
        Rules and move generation by chess.js. The positions were generated and
        then verified by the solver: in each one a mate exists in exactly the
        stated number of moves, with a single key move.
      </p>
    </div>
  );
}
