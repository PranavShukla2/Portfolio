"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Color, type Square } from "chess.js";
import { useReducedMotion } from "framer-motion";
import { PUZZLES } from "@/lib/chess/puzzles";
import { bestDefence, everyReplyLoses, findMate } from "@/lib/chess/solver";
import Board from "./Board";

type Status = "play" | "thinking" | "wrong" | "solved";

const kingSquare = (game: Chess, colour: Color): Square | null => {
  for (const row of game.board()) {
    for (const cell of row) {
      if (cell && cell.type === "k" && cell.color === colour) return cell.square;
    }
  }
  return null;
};

/**
 * The puzzle board. There is no engine behind this — the solver in
 * lib/chess/solver decides whether your move still forces mate and picks the
 * defender's most stubborn reply, which is quick because these positions are
 * small. All of the chess lives in lib/chess so the terminal can reuse it.
 */
export default function PuzzleGame() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const puzzle = PUZZLES[index];

  const gameRef = useRef(new Chess(puzzle.fen));
  const timerRef = useRef<number | null>(null);

  const [fen, setFen] = useState(puzzle.fen);
  const [status, setStatus] = useState<Status>("play");
  const [selected, setSelected] = useState<Square | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(
    null
  );
  const [played, setPlayed] = useState(0);
  const [hint, setHint] = useState<Square | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const load = useCallback((next: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    const target = PUZZLES[next];
    gameRef.current = new Chess(target.fen);
    setIndex(next);
    setFen(target.fen);
    setStatus("play");
    setSelected(null);
    setLastMove(null);
    setPlayed(0);
    setHint(null);
    setHistory([]);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const game = gameRef.current;
  const solverSide = useMemo(() => new Chess(puzzle.fen).turn(), [puzzle.fen]);
  const movesLeft = puzzle.mateIn - played;

  const grid = useMemo(() => new Chess(fen).board(), [fen]);
  const targets = useMemo(() => {
    if (!selected || status !== "play") return [];
    return game
      .moves({ square: selected, verbose: true })
      .map((move) => move.to as Square);
    // fen keeps this in step with the live position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, status, fen]);

  const checkOn = useMemo(() => {
    const live = new Chess(fen);
    return live.isCheck() ? kingSquare(live, live.turn()) : null;
  }, [fen]);

  const play = (from: Square, to: Square) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) return;

    setSelected(null);
    setHint(null);
    setLastMove({ from: move.from as Square, to: move.to as Square });
    setHistory((prev) => [...prev, move.san]);
    setFen(game.fen());

    if (game.isCheckmate()) {
      setStatus("solved");
      return;
    }

    const left = movesLeft - 1;
    // At the root the answer is already known, which keeps the one expensive
    // search — proving a wrong move has no mate behind it — off the main
    // thread entirely. Deeper in, the solver is only milliseconds.
    const stillMating =
      played === 0
        ? puzzle.keys.includes(move.san)
        : left > 0 && everyReplyLoses(game, left);

    if (!stillMating) {
      setStatus("wrong");
      return;
    }

    setPlayed((prev) => prev + 1);
    setStatus("thinking");

    timerRef.current = window.setTimeout(
      () => {
        const reply = bestDefence(game, left);
        if (reply) {
          game.move(reply.san);
          setLastMove({ from: reply.from as Square, to: reply.to as Square });
          setHistory((prev) => [...prev, reply.san]);
          setFen(game.fen());
        }
        setStatus("play");
      },
      reduce ? 0 : 420
    );
  };

  const pick = (square: Square) => {
    if (status !== "play") return;

    if (selected) {
      const move = game
        .moves({ square: selected, verbose: true })
        .find((candidate) => candidate.to === square);
      if (move) {
        play(selected, square);
        return;
      }
    }

    const piece = game.get(square);
    setSelected(piece && piece.color === game.turn() ? square : null);
  };

  const takeBack = () => {
    game.undo();
    setHistory((prev) => prev.slice(0, -1));
    setFen(game.fen());
    setLastMove(null);
    setSelected(null);
    setStatus("play");
  };

  const showHint = () => {
    if (played === 0) {
      // the key move is known, so no search is needed for the first hint
      const probe = new Chess(game.fen());
      const move = probe.moves({ verbose: true }).find((candidate) =>
        puzzle.keys.includes(candidate.san)
      );
      setHint(move ? (move.from as Square) : null);
      return;
    }
    const found = findMate(game, movesLeft);
    setHint(found ? (found.from as Square) : null);
  };

  const message = {
    play: hint
      ? `Try the piece on ${hint}.`
      : `${solverSide === "w" ? "White" : "Black"} to play and mate in ${movesLeft}.`,
    thinking: "Black finds the toughest defence…",
    wrong: "That lets the king slip away. Take it back and try another move.",
    solved: "Checkmate. Clean contact.",
  }[status];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,520px)_minmax(220px,300px)] lg:items-start">
      <div className="mx-auto w-full max-w-[520px]">
        <Board
          grid={grid}
          orientation={solverSide}
          selected={selected}
          targets={targets}
          lastMove={lastMove}
          checkOn={checkOn}
          frozen={status !== "play"}
          onPick={pick}
        />

        {hint && status === "play" && (
          <p className="sr-only" role="status">
            Hint: move the piece on {hint}.
          </p>
        )}
      </div>

      <aside className="flex flex-col gap-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Puzzle {index + 1} of {PUZZLES.length}
          </p>
          <h2 className="mt-2 text-[22px] font-semibold tracking-tightest text-ink">
            {puzzle.title}
          </h2>
          <p
            role="status"
            className={[
              "mt-2 text-[14px] leading-relaxed",
              status === "solved"
                ? "text-accent"
                : status === "wrong"
                  ? "text-coral"
                  : "text-ink-2",
            ].join(" ")}
          >
            {message}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {status === "wrong" ? (
            <button
              type="button"
              onClick={takeBack}
              className="rounded-full bg-accent px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-white transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              Take it back
            </button>
          ) : (
            <button
              type="button"
              onClick={showHint}
              disabled={status !== "play"}
              className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-2 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
              Hint
            </button>
          )}

          <button
            type="button"
            onClick={() => load(index)}
            className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => load((index + 1) % PUZZLES.length)}
            className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            Next puzzle
          </button>
        </div>

        {hint && status === "play" && (
          <p className="rounded-xl border border-line bg-accent-wash/40 px-4 py-3 text-[13px] leading-relaxed text-ink-2">
            {puzzle.hint}
          </p>
        )}

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Moves
          </p>
          <ol className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[13px] text-ink-2">
            {history.length === 0 && (
              <li className="text-ink-3">— nothing yet —</li>
            )}
            {history.map((san, i) => (
              <li key={`${san}-${i}`}>
                {i % 2 === 0 && (
                  <span className="text-ink-3">{i / 2 + 1}. </span>
                )}
                {san}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
