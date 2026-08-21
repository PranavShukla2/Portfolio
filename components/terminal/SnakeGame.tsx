"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GameShell from "./GameShell";

const WIDTH = 26;
const HEIGHT = 13;
const START = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default function SnakeGame() {
  const [snake, setSnake] = useState(START);
  const [food, setFood] = useState({ x: 12, y: 5 });
  const [direction, setDirection] = useState<Dir>("RIGHT");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const dirRef = useRef(direction);
  dirRef.current = direction;

  const step = useCallback(() => {
    if (gameOver || paused) return;

    setSnake((prev) => {
      const head = { ...prev[0] };
      const dir = dirRef.current;
      if (dir === "UP") head.y -= 1;
      if (dir === "DOWN") head.y += 1;
      if (dir === "LEFT") head.x -= 1;
      if (dir === "RIGHT") head.x += 1;

      // wrap around the edges rather than dying on them
      head.x = (head.x + WIDTH) % WIDTH;
      head.y = (head.y + HEIGHT) % HEIGHT;

      if (prev.some((cell) => cell.x === head.x && cell.y === head.y)) {
        setGameOver(true);
        return prev;
      }

      const grown = [head, ...prev];
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => {
          const next = s + 10;
          setBest((b) => Math.max(b, next));
          return next;
        });
        setFood({
          x: Math.floor(Math.random() * WIDTH),
          y: Math.floor(Math.random() * HEIGHT),
        });
      } else {
        grown.pop();
      }
      return grown;
    });
  }, [food, gameOver, paused]);

  useEffect(() => {
    const timer = setInterval(step, 110);
    return () => clearInterval(timer);
  }, [step]);

  const restart = () => {
    setSnake(START);
    setDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  const onKey = useCallback(
    (key: string) => {
      if (key === "arrowup" || key === "w") {
        if (dirRef.current !== "DOWN") setDirection("UP");
      } else if (key === "arrowdown" || key === "s") {
        if (dirRef.current !== "UP") setDirection("DOWN");
      } else if (key === "arrowleft" || key === "a") {
        if (dirRef.current !== "RIGHT") setDirection("LEFT");
      } else if (key === "arrowright" || key === "d") {
        if (dirRef.current !== "LEFT") setDirection("RIGHT");
      } else if (key === " " || key === "p") {
        setPaused((p) => !p);
      } else if (key === "r") {
        restart();
      }
    },
    []
  );

  return (
    <GameShell
      title="🐍 PRANAV_WASM_SNAKE v1.0"
      accent="#28c840"
      objective={"eat the ★ to grow one square longer. The walls wrap around — your own tail does not."}
      onKey={onKey}
      status={
        <>
          <span>
            Score: <strong className="text-white">{score}</strong>
          </span>
          <span>
            Best: <strong className="text-[#a2f0b0]">{best}</strong>
          </span>
        </>
      }
      controls={
        gameOver ? (
          <span className="font-bold text-[#ff4e9b]">
            💥 Game over — <code className="text-[#a2f0b0]">R</code> to play
            again
          </span>
        ) : (
          <>
            <code className="text-[#a2f0b0]">WASD</code> or{" "}
            <code className="text-[#a2f0b0]">Arrows</code> ·{" "}
            <code className="text-[#a2f0b0]">Space</code> pause · click the
            prompt to type again
          </>
        )
      }
    >
      <div
        className="grid gap-[2.5px] rounded-md border border-[#28c840]/30 bg-black/90 p-2.5"
        style={{
          gridTemplateColumns: `repeat(${WIDTH}, 16px)`,
          gridTemplateRows: `repeat(${HEIGHT}, 16px)`,
        }}
      >
        {Array.from({ length: HEIGHT }).map((_, y) =>
          Array.from({ length: WIDTH }).map((_, x) => {
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some((c) => c.x === x && c.y === y);
            const isFood = food.x === x && food.y === y;

            const tone = isHead
              ? "bg-[#a2f0b0]"
              : isBody
                ? "bg-[#28c840]"
                : isFood
                  ? "bg-[#ff4e9b] animate-pulse"
                  : "bg-[#0f1f13]";

            return (
              <div
                key={`${x}-${y}`}
                className={`flex h-[16px] w-[16px] items-center justify-center rounded-[3px] text-[10px] font-bold text-black ${tone}`}
              >
                {isHead ? "•" : isFood ? "★" : ""}
              </div>
            );
          })
        )}
      </div>
    </GameShell>
  );
}
