"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const COLS = 10;
const ROWS = 18;

type Cell = string | null;
type Shape = number[][];

/** Each piece as its spawn matrix plus the colour it keeps once it lands. */
const PIECES: { shape: Shape; colour: string }[] = [
  { shape: [[1, 1, 1, 1]], colour: "#38bdf8" }, // I
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    colour: "#ffd166",
  }, // O
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    colour: "#a982e6",
  }, // T
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    colour: "#28c840",
  }, // S
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    colour: "#ff4e9b",
  }, // Z
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    colour: "#5b8dff",
  }, // J
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    colour: "#ffb347",
  }, // L
];

const emptyBoard = (): Cell[][] =>
  Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null));

const rotate = (shape: Shape): Shape =>
  shape[0].map((_, x) => shape.map((row) => row[x]).reverse());

const randomPiece = () => PIECES[Math.floor(Math.random() * PIECES.length)];

interface Active {
  shape: Shape;
  colour: string;
  x: number;
  y: number;
}

const spawn = (piece: { shape: Shape; colour: string }): Active => ({
  shape: piece.shape,
  colour: piece.colour,
  x: Math.floor((COLS - piece.shape[0].length) / 2),
  y: 0,
});

/** Would this shape overlap a wall, the floor, or a settled block? */
const collides = (board: Cell[][], shape: Shape, x: number, y: number) => {
  for (let r = 0; r < shape.length; r += 1) {
    for (let c = 0; c < shape[r].length; c += 1) {
      if (!shape[r][c]) continue;
      const boardX = x + c;
      const boardY = y + r;
      if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return true;
      if (boardY >= 0 && board[boardY][boardX]) return true;
    }
  }
  return false;
};

const LINE_SCORE = [0, 100, 300, 500, 800];

export default function TetrisGame() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [active, setActive] = useState<Active>(() => spawn(randomPiece()));
  const [next, setNext] = useState(randomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const level = Math.floor(lines / 10) + 1;

  // the gravity timer and the key handler both need the live position
  const boardRef = useRef(board);
  const activeRef = useRef(active);
  const nextRef = useRef(next);
  boardRef.current = board;
  activeRef.current = active;
  nextRef.current = next;

  /** Settle the piece, clear any full lines, and bring in the next one. */
  const lockPiece = useCallback(() => {
    const merged = boardRef.current.map((row) => [...row]);
    const piece = activeRef.current;

    piece.shape.forEach((row, r) =>
      row.forEach((filled, c) => {
        if (!filled) return;
        const y = piece.y + r;
        const x = piece.x + c;
        if (y >= 0) merged[y][x] = piece.colour;
      })
    );

    const kept = merged.filter((row) => row.some((cell) => !cell));
    const cleared = ROWS - kept.length;
    while (kept.length < ROWS) kept.unshift(Array<Cell>(COLS).fill(null));

    if (cleared) {
      setLines((n) => n + cleared);
      setScore((s) => s + LINE_SCORE[cleared] * level);
    }
    setBoard(kept);

    const upcoming = spawn(nextRef.current);
    if (collides(kept, upcoming.shape, upcoming.x, upcoming.y)) {
      setGameOver(true);
      return;
    }
    setActive(upcoming);
    setNext(randomPiece());
  }, [level]);

  const move = useCallback((dx: number, dy: number) => {
    const piece = activeRef.current;
    if (collides(boardRef.current, piece.shape, piece.x + dx, piece.y + dy)) {
      return false;
    }
    setActive({ ...piece, x: piece.x + dx, y: piece.y + dy });
    return true;
  }, []);

  const drop = useCallback(() => {
    if (!move(0, 1)) lockPiece();
  }, [move, lockPiece]);

  useEffect(() => {
    if (gameOver || paused) return;
    // 620ms at level 1, floored so it stays playable
    const speed = Math.max(110, 620 - (level - 1) * 55);
    const timer = setInterval(drop, speed);
    return () => clearInterval(timer);
  }, [drop, gameOver, paused, level]);

  const restart = () => {
    setBoard(emptyBoard());
    setActive(spawn(randomPiece()));
    setNext(randomPiece());
    setScore(0);
    setLines(0);
    setGameOver(false);
    setPaused(false);
  };

  const onKey = useCallback(
    (key: string) => {
      if (key === "r") {
        restart();
        return;
      }
      if (key === "p") {
        setPaused((p) => !p);
        return;
      }
      if (gameOver || paused) return;

      if (key === "arrowleft" || key === "a") move(-1, 0);
      else if (key === "arrowright" || key === "d") move(1, 0);
      else if (key === "arrowdown" || key === "s") {
        if (move(0, 1)) setScore((s) => s + 1);
      } else if (key === "arrowup" || key === "w") {
        const piece = activeRef.current;
        const turned = rotate(piece.shape);
        // nudge off the wall if the rotation would poke through it
        for (const nudge of [0, -1, 1, -2, 2]) {
          if (!collides(boardRef.current, turned, piece.x + nudge, piece.y)) {
            setActive({ ...piece, shape: turned, x: piece.x + nudge });
            return;
          }
        }
      } else if (key === " ") {
        const piece = activeRef.current;
        let distance = 0;
        while (
          !collides(boardRef.current, piece.shape, piece.x, piece.y + distance + 1)
        ) {
          distance += 1;
        }
        activeRef.current = { ...piece, y: piece.y + distance };
        setActive(activeRef.current);
        setScore((s) => s + distance * 2);
        lockPiece();
      }
    },
    [gameOver, paused, move, lockPiece]
  );

  // what the player sees: the settled board with the falling piece drawn on top
  const view = board.map((row) => [...row]);
  active.shape.forEach((row, r) =>
    row.forEach((filled, c) => {
      if (!filled) return;
      const y = active.y + r;
      const x = active.x + c;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) view[y][x] = active.colour;
    })
  );

  return (
    <GameShell
      title="🧱 PRANAV_WASM_TETRIS v1.0"
      accent="#38bdf8"
      onKey={onKey}
      status={
        <>
          <span>
            Score: <strong className="text-white">{score}</strong>
          </span>
          <span>
            Lines: <strong className="text-[#8fd8ff]">{lines}</strong>
          </span>
          <span>
            Level: <strong className="text-[#8fd8ff]">{level}</strong>
          </span>
        </>
      }
      controls={
        gameOver ? (
          <span className="font-bold text-[#ff4e9b]">
            💥 Stack out — <code className="text-[#8fd8ff]">R</code> to play
            again
          </span>
        ) : paused ? (
          <span className="font-bold text-[#ffd166]">
            ⏸ Paused — <code className="text-[#8fd8ff]">P</code> to resume
          </span>
        ) : (
          <>
            <code className="text-[#8fd8ff]">←→</code> move ·{" "}
            <code className="text-[#8fd8ff]">↑</code> rotate ·{" "}
            <code className="text-[#8fd8ff]">↓</code> soft drop ·{" "}
            <code className="text-[#8fd8ff]">Space</code> hard drop ·{" "}
            <code className="text-[#8fd8ff]">P</code> pause
          </>
        )
      }
    >
      <div className="flex items-start gap-4">
        <div
          className="grid gap-[2px] rounded-md border border-[#38bdf8]/30 bg-black/90 p-2"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 14px)`,
            gridTemplateRows: `repeat(${ROWS}, 14px)`,
          }}
        >
          {view.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="h-[14px] w-[14px] rounded-[3px]"
                style={{ background: cell ?? "#0d1522" }}
              />
            ))
          )}
        </div>

        <div className="text-[10px] text-[#7b93ad]">
          <p className="mb-1.5 uppercase tracking-[0.14em]">Next</p>
          <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(4, 12px)` }}>
            {Array.from({ length: 2 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => (
                <div
                  key={`${r}-${c}`}
                  className="h-[12px] w-[12px] rounded-[2px]"
                  style={{
                    background: next.shape[r]?.[c] ? next.colour : "#0d1522",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </GameShell>
  );
}
