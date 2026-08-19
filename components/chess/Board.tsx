"use client";

import type { Color, PieceSymbol, Square } from "chess.js";
import Piece from "./Piece";

export type BoardGrid = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];

const NAMES: Record<PieceSymbol, string> = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

interface Props {
  /** `chess.board()` — rank 8 first, file a first. */
  grid: BoardGrid;
  orientation: Color;
  selected: Square | null;
  targets: Square[];
  lastMove: { from: Square; to: Square } | null;
  checkOn: Square | null;
  frozen?: boolean;
  onPick: (square: Square) => void;
}

export default function Board({
  grid,
  orientation,
  selected,
  targets,
  lastMove,
  checkOn,
  frozen = false,
  onPick,
}: Props) {
  const rows = orientation === "w" ? grid : [...grid].reverse();

  return (
    <div className="rounded-2xl border border-line bg-surface p-2 shadow-sm sm:p-3">
      <div className="grid aspect-square w-full grid-cols-8 overflow-hidden rounded-lg">
        {rows.map((row, rankIndex) => {
          const cells = orientation === "w" ? row : [...row].reverse();

          return cells.map((cell, fileIndex) => {
            // the square name is on the cell, except empty ones — derive those
            const file = orientation === "w" ? fileIndex : 7 - fileIndex;
            const rank = orientation === "w" ? 8 - rankIndex : rankIndex + 1;
            const square = (cell?.square ??
              `${"abcdefgh"[file]}${rank}`) as Square;

            // a1 is dark, so odd file+rank sums are the dark squares
            const dark = (file + rank) % 2 === 1;
            const isTarget = targets.includes(square);
            const isSelected = selected === square;
            const isLast =
              lastMove?.from === square || lastMove?.to === square;

            const label = cell
              ? `${square}, ${cell.color === "w" ? "white" : "black"} ${NAMES[cell.type]}`
              : square;

            return (
              <button
                key={square}
                type="button"
                aria-label={isTarget ? `Move to ${label}` : label}
                aria-pressed={isSelected}
                disabled={frozen}
                onClick={() => onPick(square)}
                className={[
                  "relative flex aspect-square items-center justify-center",
                  dark ? "bg-board-dark" : "bg-board-light",
                  frozen ? "cursor-default" : "cursor-pointer",
                  "focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                ].join(" ")}
              >
                {/* last move trail */}
                {isLast && (
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ backgroundColor: "rgba(255,179,71,0.38)" }}
                  />
                )}

                {/* the king that is currently in check */}
                {checkOn === square && (
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,107,107,0.85) 12%, rgba(255,107,107,0) 72%)",
                    }}
                  />
                )}

                {isSelected && (
                  <span
                    aria-hidden
                    className="absolute inset-0 ring-[3px] ring-inset ring-accent"
                  />
                )}

                {cell && (
                  <Piece
                    type={cell.type}
                    color={cell.color}
                    className="relative h-[86%] w-[86%] drop-shadow-sm"
                  />
                )}

                {/* where the selected piece may go */}
                {isTarget &&
                  (cell ? (
                    <span
                      aria-hidden
                      className="absolute inset-[6%] rounded-full border-[3px] border-accent/70"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute h-[26%] w-[26%] rounded-full bg-accent/60"
                    />
                  ))}
              </button>
            );
          });
        })}
      </div>
    </div>
  );
}
