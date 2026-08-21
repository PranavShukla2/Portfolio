/**
 * Checks every position in lib/chess/puzzles.ts:
 *
 *   1. the FEN loads at all;
 *   2. the side that is NOT to move is not already in check — a position where
 *      it is could never have arisen in a game, and it is the failure that got
 *      two puzzles onto the site;
 *   3. a forced mate exists in exactly the stated number of moves;
 *   4. the checked-in key moves are exactly the moves that force it.
 *
 * Run with `npm run verify:puzzles`.
 */
import { readFileSync } from "node:fs";
import { Chess } from "chess.js";

const source = readFileSync(
  new URL("../lib/chess/puzzles.ts", import.meta.url),
  "utf8"
);

const puzzles = [
  ...source.matchAll(
    /id: "([^"]+)",[\s\S]*?fen: "([^"]+)",[\s\S]*?mateIn: (\d+),[\s\S]*?keys: \[([^\]]*)\]/g
  ),
].map(([, id, fen, mateIn, keys]) => ({
  id,
  fen,
  mateIn: Number(mateIn),
  keys: [...keys.matchAll(/"([^"]+)"/g)].map((m) => m[1]),
}));

const everyReplyLoses = (game, moves) => {
  const replies = game.moves({ verbose: true });
  if (replies.length === 0) return false;
  for (const reply of replies) {
    game.move(reply);
    const survives = !forcesMate(game, moves);
    game.undo();
    if (survives) return false;
  }
  return true;
};

const forcesMate = (game, moves) => {
  if (moves <= 0) return false;
  for (const move of game.moves({ verbose: true })) {
    game.move(move);
    const mate =
      game.isCheckmate() || (moves > 1 && everyReplyLoses(game, moves - 1));
    game.undo();
    if (mate) return true;
  }
  return false;
};

const matingMoves = (game, moves) => {
  const found = [];
  for (const move of game.moves({ verbose: true })) {
    game.move(move);
    const mate =
      game.isCheckmate() || (moves > 1 && everyReplyLoses(game, moves - 1));
    game.undo();
    if (mate) found.push(move.san);
  }
  return found;
};

/** The side without the move must not be sitting in check. */
const opponentIsInCheck = (fen) => {
  const parts = fen.split(" ");
  parts[1] = parts[1] === "w" ? "b" : "w";
  parts[3] = "-";
  return new Chess(parts.join(" ")).isCheck();
};

let failed = 0;

for (const puzzle of puzzles) {
  const problems = [];
  let game;

  try {
    game = new Chess(puzzle.fen);
  } catch (error) {
    console.log(`✗ ${puzzle.id}: FEN will not load — ${error.message}`);
    failed += 1;
    continue;
  }

  if (opponentIsInCheck(puzzle.fen)) {
    problems.push("illegal position: the side not to move is already in check");
  }
  if (game.isGameOver()) problems.push("position is already over");

  for (let n = 1; n < puzzle.mateIn; n += 1) {
    if (forcesMate(game, n)) problems.push(`mate exists in ${n}, not ${puzzle.mateIn}`);
  }

  const keys = matingMoves(game, puzzle.mateIn);
  if (keys.length === 0) {
    problems.push(`no forced mate in ${puzzle.mateIn}`);
  } else if (keys.join(",") !== puzzle.keys.join(",")) {
    problems.push(`keys are [${keys}], data says [${puzzle.keys}]`);
  }

  if (problems.length) {
    failed += 1;
    console.log(`✗ ${puzzle.id}`);
    for (const problem of problems) console.log(`    ${problem}`);
  } else {
    console.log(`✓ ${puzzle.id} — mate in ${puzzle.mateIn}, key ${keys.join("/")}`);
  }
}

console.log(
  failed
    ? `\n${failed} of ${puzzles.length} puzzles are broken.`
    : `\nAll ${puzzles.length} puzzles check out.`
);
process.exit(failed ? 1 : 0);
