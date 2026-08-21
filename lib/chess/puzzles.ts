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
  /**
   * Every first move that forces the mate, in SAN. Checked in rather than
   * searched for: refuting a wrong move at the root means proving no mate
   * exists, which is the one search too slow to run on the main thread.
   */
  keys: string[];
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
    keys: ["Qe6+"],
    hint: "The bishop delivers it. Find the check that walks the king onto its diagonal.",
    line: "Qe6+ Kf8 Bc5#",
  },
  {
    id: "philidors-legacy",
    title: "Philidor's legacy",
    fen: "5r1k/6pp/7N/8/8/1Q6/8/6K1 w - - 0 1",
    mateIn: 2,
    keys: ["Qg8+"],
    hint: "The king is already boxed in by its own pieces. Give the rook a square it does not want.",
    line: "Qg8+ Rxg8 Nf7#",
  },
  {
    id: "corner-office",
    title: "Corner office",
    fen: "6k1/p4p2/3R1Bpp/8/8/8/6K1/8 w - - 0 1",
    mateIn: 2,
    keys: ["Rd8+"],
    hint: "Your bishop already covers the escape square. Push the king towards the corner.",
    line: "Rd8+ Kh7 Rh8#",
  },
  {
    id: "hand-off",
    title: "The hand-off",
    fen: "1b5k/1R3p2/3Q2p1/8/8/8/8/6K1 w - - 0 1",
    mateIn: 2,
    keys: ["Qf8+"],
    hint: "The queen only has to move the king one square. The rook does the finishing.",
    line: "Qf8+ Kh7 Rxf7#",
  },
  {
    id: "quiet-aim",
    title: "Quiet aim",
    fen: "2b4k/Q6p/6p1/8/8/8/1R6/7K w - - 0 1",
    mateIn: 2,
    keys: ["Rb8"],
    hint: "Nothing checks. Take aim at the piece that is holding the back rank together.",
    line: "Rb8 g5 Rxc8#",
  },
  {
    id: "only-defender",
    title: "The only defender",
    fen: "3n2k1/2Q4p/5p2/8/8/8/R7/2K5 w - - 0 1",
    mateIn: 2,
    keys: ["Ra8"],
    hint: "One black piece guards the mating square. Line up against it and leave Black nothing to do.",
    line: "Ra8 f5 Rxd8#",
  },
  {
    id: "queen-march",
    title: "Queen's march",
    fen: "1n4k1/4b1pp/6p1/3N4/8/8/4Q3/6K1 w - - 0 1",
    mateIn: 3,
    keys: ["Qe6+"],
    hint: "Every move is a check. The bishop on e7 is the only thing holding the eighth rank.",
    line: "Qe6+ Kf8 Qxe7+ Kg8 Qe8#",
  },
  {
    id: "rook-ladder",
    title: "Rook ladder",
    fen: "7k/4rp2/5p2/2R5/R7/8/6K1/8 w - - 0 1",
    mateIn: 3,
    keys: ["Rh5+"],
    hint: "Rooks work in pairs: check with one, cut off the next rank with the other.",
    line: "Rh5+ Kg7 Rg4+ Kf8 Rh8#",
  },
  {
    id: "squeeze",
    title: "The squeeze",
    fen: "b5k1/6pp/2n5/8/8/8/4R1Q1/7K w - - 0 1",
    mateIn: 3,
    keys: ["Qd5+"],
    hint: "The queen does the pushing. The rook finishes it on the back rank.",
    line: "Qd5+ Kf8 Qf5+ Kg8 Re8#",
  },
];
