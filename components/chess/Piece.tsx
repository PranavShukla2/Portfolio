import type { Color, PieceSymbol } from "chess.js";

/**
 * Hand-drawn piece set, in the site's palette rather than a stock font or
 * sprite sheet. One path per piece in a 45x45 box (the usual chess convention),
 * so a piece is just an <svg> that fills its square.
 */
const SHAPES: Record<PieceSymbol, React.ReactNode> = {
  p: (
    <path d="M22.5 9a5.5 5.5 0 0 1 3.2 10c2.2 1.5 3.7 4 3.7 6.9 0 3.3-2 6.2-4.8 7.4h5.4a2.5 2.5 0 0 1 0 5h-15a2.5 2.5 0 0 1 0-5h5.4c-2.8-1.2-4.8-4.1-4.8-7.4 0-2.9 1.5-5.4 3.7-6.9A5.5 5.5 0 0 1 22.5 9z" />
  ),
  r: (
    <path d="M11.5 10h5.2v3h4.2v-3h2.2v3h4.2v-3h5.2v8.4l-3 2.6v9.6l3.4 3.4v3.5h-22V34l3.4-3.4V21l-3-2.6z" />
  ),
  n: (
    <path d="M25.2 8c5.6 0 10.3 4.5 10.3 10.6 0 3.9-.8 7.4-2 10.6-1 2.7-1.5 5-1.5 8.2h-19c0-6.6 1.4-11.2 3.9-14.6 1.7-2.3 3.7-4 5.6-5.4l-4.6 1.8c-1.4.6-3-.2-3.4-1.7-.3-1.2.2-2.5 1.3-3.1l6.3-3.5C23.3 9 24 8 25.2 8z" />
  ),
  b: (
    <path d="M22.5 7.5a2.6 2.6 0 0 1 1.6 4.6c4.1 2.2 7 6.3 7 11.1 0 3.4-1.4 6.4-3.7 8.6l2.3 2.6h-14.4l2.3-2.6a11.7 11.7 0 0 1-3.7-8.6c0-4.8 2.9-8.9 7-11.1a2.6 2.6 0 0 1 1.6-4.6z" />
  ),
  q: (
    <path d="M8.5 13.5a2.3 2.3 0 1 1 2.6 2.3l2.3 6.6 4.3-8.4a2.3 2.3 0 1 1 3.3-.7l1.5 8.7 1.5-8.7a2.3 2.3 0 1 1 3.3.7l4.3 8.4 2.3-6.6a2.3 2.3 0 1 1 2.6-2.3c0 1.2-.9 2.2-2.1 2.3l-2.6 15.1c1.6 1 2.7 2.4 2.7 4.1h-24c0-1.7 1.1-3.1 2.7-4.1l-2.6-15.1a2.3 2.3 0 0 1-2.1-2.3z" />
  ),
  k: (
    <path d="M21 6h3v3.2h3.2v3H24v3.3c4.8 1.1 8.4 5 8.4 9.7 0 3-1.5 5.7-3.8 7.5l2.4 2.3h-17l2.4-2.3a9.4 9.4 0 0 1-3.8-7.5c0-4.7 3.6-8.6 8.4-9.7v-3.3h-3.2v-3H21z" />
  ),
};

/** Every piece stands on the same base, which keeps the set feeling like a set. */
const BASE = (
  <path d="M11.5 36.5h22a2.4 2.4 0 0 1 0 4.8h-22a2.4 2.4 0 0 1 0-4.8z" />
);

export default function Piece({
  type,
  color,
  className,
}: {
  type: PieceSymbol;
  color: Color;
  className?: string;
}) {
  const light = color === "w";

  return (
    <svg viewBox="0 0 45 45" className={className} aria-hidden focusable="false">
      <g
        fill={light ? "#fffdfb" : "#2f2044"}
        stroke={light ? "#2b1b3d" : "#160d24"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        {SHAPES[type]}
        {BASE}
      </g>
    </svg>
  );
}
