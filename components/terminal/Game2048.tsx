"use client";

import { useCallback, useState } from "react";
import GameShell from "./GameShell";

const SIZE = 4;
type Grid = number[][];

const empty = (): Grid =>
  Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));

/** Drop a 2 (or occasionally a 4) onto a free square. */
const addTile = (grid: Grid): Grid => {
  const free: [number, number][] = [];
  grid.forEach((row, y) =>
    row.forEach((value, x) => {
      if (!value) free.push([y, x]);
    })
  );
  if (!free.length) return grid;

  const [y, x] = free[Math.floor(Math.random() * free.length)];
  const next = grid.map((row) => [...row]);
  next[y][x] = Math.random() < 0.9 ? 2 : 4;
  return next;
};

const start = () => addTile(addTile(empty()));

/** Slide one row left, merging equal neighbours once each. */
const slideRow = (row: number[]): { row: number[]; gained: number } => {
  const packed = row.filter(Boolean);
  const merged: number[] = [];
  let gained = 0;

  for (let i = 0; i < packed.length; i += 1) {
    if (packed[i] === packed[i + 1]) {
      const value = packed[i] * 2;
      merged.push(value);
      gained += value;
      i += 1;
    } else {
      merged.push(packed[i]);
    }
  }

  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gained };
};

const rotateGrid = (grid: Grid): Grid =>
  grid[0].map((_, x) => grid.map((row) => row[x]).reverse());

const rotateTimes = (grid: Grid, times: number) => {
  let out = grid;
  for (let i = 0; i < times; i += 1) out = rotateGrid(out);
  return out;
};

/**
 * Every direction is the left-slide with the board turned first, then turned
 * back — one movement rule instead of four.
 */
const slide = (grid: Grid, turns: number) => {
  const facing = rotateTimes(grid, turns);
  let gained = 0;
  const moved = facing.map((row) => {
    const result = slideRow(row);
    gained += result.gained;
    return result.row;
  });
  return { grid: rotateTimes(moved, (4 - turns) % 4), gained };
};

const sameGrid = (a: Grid, b: Grid) =>
  a.every((row, y) => row.every((value, x) => value === b[y][x]));

const canMove = (grid: Grid) =>
  [0, 1, 2, 3].some((turns) => !sameGrid(grid, slide(grid, turns).grid));

/** Warmer and more saturated as the tile climbs. */
const TILE: Record<number, { bg: string; fg: string }> = {
  0: { bg: "#0d1522", fg: "transparent" },
  2: { bg: "#2a3550", fg: "#dfe9ff" },
  4: { bg: "#33406b", fg: "#dfe9ff" },
  8: { bg: "#5b8dff", fg: "#0b1020" },
  16: { bg: "#a982e6", fg: "#12081f" },
  32: { bg: "#ff6bab", fg: "#2b0715" },
  64: { bg: "#ff4e9b", fg: "#2b0715" },
  128: { bg: "#ff8080", fg: "#2b0715" },
  256: { bg: "#ffb347", fg: "#2b1400" },
  512: { bg: "#ffd166", fg: "#2b1400" },
  1024: { bg: "#38ef7d", fg: "#04210f" },
  2048: { bg: "#28c840", fg: "#04210f" },
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(start);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const dead = !canMove(grid);
  const reached = grid.some((row) => row.some((value) => value >= 2048));

  const push = useCallback((turns: number) => {
    setGrid((current) => {
      const { grid: moved, gained } = slide(current, turns);
      if (sameGrid(current, moved)) return current;
      if (gained) {
        setScore((s) => {
          const next = s + gained;
          setBest((b) => Math.max(b, next));
          return next;
        });
      }
      return addTile(moved);
    });
  }, []);

  const restart = () => {
    setGrid(start());
    setScore(0);
  };

  const onKey = useCallback(
    (key: string) => {
      if (key === "r") return restart();
      if (key === "arrowleft" || key === "a") push(0);
      else if (key === "arrowup" || key === "w") push(1);
      else if (key === "arrowright" || key === "d") push(2);
      else if (key === "arrowdown" || key === "s") push(3);
    },
    [push]
  );

  return (
    <GameShell
      title="🔢 PRANAV_WASM_2048 v1.0"
      accent="#ffb347"
      objective={"every slide pushes all tiles one way; equal tiles merge into their sum. Get one to 2048."}
      onKey={onKey}
      status={
        <>
          <span>
            Score: <strong className="text-white">{score}</strong>
          </span>
          <span>
            Best: <strong className="text-[#ffd166]">{best}</strong>
          </span>
        </>
      }
      controls={
        dead ? (
          <span className="font-bold text-[#ff4e9b]">
            💥 No moves left — <code className="text-[#ffd166]">R</code> to play
            again
          </span>
        ) : reached ? (
          <span className="font-bold text-[#28c840]">
            🎉 2048 reached — keep going, or <code>R</code> to restart
          </span>
        ) : (
          <>
            <code className="text-[#ffd166]">Arrows</code> or{" "}
            <code className="text-[#ffd166]">WASD</code> to slide ·{" "}
            <code className="text-[#ffd166]">R</code> restart
          </>
        )
      }
    >
      <div
        className="grid gap-[6px] rounded-md border border-[#ffb347]/30 bg-black/90 p-2.5"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 52px)` }}
      >
        {grid.map((row, y) =>
          row.map((value, x) => {
            const tone = TILE[value] ?? { bg: "#28c840", fg: "#04210f" };
            return (
              <div
                key={`${x}-${y}`}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[4px] font-bold tabular-nums"
                style={{
                  background: tone.bg,
                  color: tone.fg,
                  fontSize: value >= 1024 ? 13 : value >= 128 ? 15 : 17,
                }}
              >
                {value || ""}
              </div>
            );
          })
        )}
      </div>
    </GameShell>
  );
}
