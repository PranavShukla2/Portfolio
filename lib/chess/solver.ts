import { Chess } from "chess.js";

/**
 * A tiny forced-mate solver for the puzzle board. Deliberately not an engine:
 * these are sparse endgame positions where an exhaustive search is instant, and
 * it means the defender genuinely fights back instead of replaying a script.
 *
 * Everything here is pure and framework-free so the terminal can reuse it.
 */

export interface Reply {
  san: string;
  from: string;
  to: string;
}

/**
 * Checks first. A forced mate nearly always starts with one, so ordering this
 * way lets the search exit early instead of grinding through quiet moves.
 */
const ordered = (game: Chess) =>
  game
    .moves({ verbose: true })
    .sort((a, b) => Number(b.san.includes("+")) - Number(a.san.includes("+")));

/**
 * Every defensive reply from here still loses to mate in `moves` — i.e. the
 * move just played kept the mate alive. This is what the board checks after
 * each of your moves.
 */
export const everyReplyLoses = (game: Chess, moves: number): boolean => {
  const replies = game.moves({ verbose: true });
  if (replies.length === 0) return false; // stalemate — the defender saved it

  for (const reply of replies) {
    game.move(reply);
    const survives = !forcesMate(game, moves);
    game.undo();
    if (survives) return false;
  }
  return true;
};

/** Can the side to move force checkmate within `moves` of its own moves? */
export const forcesMate = (game: Chess, moves: number): boolean => {
  if (moves <= 0) return false;

  for (const move of ordered(game)) {
    game.move(move);
    const mate = game.isCheckmate() || (moves > 1 && everyReplyLoses(game, moves - 1));
    game.undo();
    if (mate) return true;
  }
  return false;
};

/**
 * The first move found that forces mate — used for hints, where enumerating
 * every solution would mean searching the whole root for no extra benefit.
 */
export const findMate = (game: Chess, moves: number): Reply | null => {
  if (moves <= 0) return null;

  for (const move of ordered(game)) {
    game.move(move);
    const mate = game.isCheckmate() || (moves > 1 && everyReplyLoses(game, moves - 1));
    game.undo();
    if (mate) return { san: move.san, from: move.from, to: move.to };
  }
  return null;
};

/** Every move that forces mate within `moves` — a puzzle should have exactly one. */
export const matingMoves = (game: Chess, moves: number): Reply[] => {
  const found: Reply[] = [];
  if (moves <= 0) return found;

  for (const move of game.moves({ verbose: true })) {
    game.move(move);
    const mate = game.isCheckmate() || (moves > 1 && everyReplyLoses(game, moves - 1));
    game.undo();
    if (mate) found.push({ san: move.san, from: move.from, to: move.to });
  }
  return found;
};

/**
 * The defender's most stubborn legal reply: the one that survives longest, then
 * the one that grabs material, then alphabetical so a puzzle always replays the
 * same way.
 */
export const bestDefence = (game: Chess, moves: number): Reply | null => {
  const replies = game.moves({ verbose: true });
  if (replies.length === 0) return null;

  const scored = replies.map((reply) => {
    game.move(reply);
    // how many moves the attacker still needs — higher is more stubborn
    let resistance = moves + 1;
    for (let n = 1; n <= moves; n += 1) {
      if (forcesMate(game, n)) {
        resistance = n;
        break;
      }
    }
    game.undo();
    return {
      reply,
      resistance,
      captures: reply.captured ? 1 : 0,
    };
  });

  scored.sort(
    (a, b) =>
      b.resistance - a.resistance ||
      b.captures - a.captures ||
      a.reply.san.localeCompare(b.reply.san)
  );

  const { reply } = scored[0];
  return { san: reply.san, from: reply.from, to: reply.to };
};
