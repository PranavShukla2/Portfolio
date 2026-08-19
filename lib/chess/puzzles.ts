/**
 * Forced-mate puzzles, not full games — every position below was generated and
 * then verified with the solver in ./solver: a mate exists in exactly `mateIn`
 * moves, and the listed key move is the only one that works.
 *
 * `line` is the main variation, kept for reference when tuning a hint.
 */
export interface Puzzle {
  id: string;
  title: string;
  /** Position with the solver's side to move. */
  fen: string;
  /** Mate in this many of your own moves. */
  mateIn: number;
  /** Shown only when asked for. */
  hint: string;
  /** The main line, for reference. */
  line: string;
}

export const PUZZLES: Puzzle[] = [
  {
    id: "walk-the-king",
    title: "Walk the king",
    fen: "6k1/6pp/3Q1p2/8/8/4B3/8/7K w - - 0 1",
    mateIn: 2,
    hint: "The bishop delivers it. Find the check that walks the king onto its diagonal.",
    line: "Qe6+ Kf8 Bc5#",
  },
  {
    id: "philidors-legacy",
    title: "Philidor's legacy",
    fen: "5r1k/6pp/7N/8/8/1Q6/8/6K1 w - - 0 1",
    mateIn: 2,
    hint: "The king is already boxed in by its own pieces. Give the rook a square it does not want.",
    line: "Qg8+ Rxg8 Nf7#",
  },
  {
    id: "corner-office",
    title: "Corner office",
    fen: "7k/2r2Np1/6p1/8/8/3R4/8/6K1 w - - 0 1",
    mateIn: 2,
    hint: "Your knight already covers the escape square. Push the king towards the corner.",
    line: "Rd8+ Kh7 Rh8#",
  },
  {
    id: "clearing-the-way",
    title: "Clearing the way",
    fen: "1n6/2r3k1/5p1p/6Q1/4R3/8/6K1/8 w - - 0 1",
    mateIn: 2,
    hint: "A rook check first — it takes away the squares the queen cannot cover.",
    line: "Re7+ Kf8 Qg7#",
  },
  {
    id: "quiet-aim",
    title: "Quiet aim",
    fen: "2b4k/Q6p/6p1/8/8/8/1R6/7K w - - 0 1",
    mateIn: 2,
    hint: "Nothing checks. Take aim at the piece that is holding the back rank together.",
    line: "Rb8 g5 Rxc8#",
  },
  {
    id: "only-defender",
    title: "The only defender",
    fen: "3n2k1/2Q4p/5p2/8/8/8/R7/2K5 w - - 0 1",
    mateIn: 2,
    hint: "One black piece guards the mating square. Line up against it and leave Black nothing to do.",
    line: "Ra8 f5 Rxd8#",
  },
];
