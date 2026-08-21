import type { Color, PieceSymbol } from "chess.js";

/**
 * A Staunton set drawn from scratch — the silhouettes people actually recognise
 * from a real board, rather than the geometric shapes this board started with.
 * Each piece is a list of paths in the usual 45x45 box; `detail` paths are
 * stroked lines (the rook's courses, the bishop's slit, the king's cross) and
 * need a colour that reads against the piece body, not against its outline.
 */
interface Part {
  d: string;
  detail?: boolean;
}

const FOOT: Part = {
  d: "M9.5 40.6h26a2.1 2.1 0 0 0 0-4.2h-26a2.1 2.1 0 0 0 0 4.2z",
};
const SKIRT: Part = {
  d: "M12.6 36.4c0-2.9 1.9-4.2 3.1-5.6h12.6c1.2 1.4 3.1 2.7 3.1 5.6z",
};
const collar = (x: number, w: number): Part => ({
  d: `M${x} 29.6h${w}a1.7 1.7 0 0 1 0 3.4h-${w}a1.7 1.7 0 0 1 0-3.4z`,
});

const PIECES: Record<PieceSymbol, Part[]> = {
  p: [
    { d: "M22.5 7.1a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4z" },
    { d: "M19.1 17.6h6.8c2 3.6 3.3 7.2 3.6 12H15.5c.3-4.8 1.6-8.4 3.6-12z" },
    collar(16.8, 11.4),
    SKIRT,
    FOOT,
  ],
  r: [
    {
      d: "M11.8 11.4h4.6v3.4h4.2v-3.4h3.8v3.4h4.2v-3.4h4.6v7.2l-3 2.6v9.5l3.6 3.3v2.7H11.2v-2.7l3.6-3.3v-9.5l-3-2.6z",
    },
    { d: "M14.8 21.2h15.4", detail: true },
    { d: "M14.8 30.7h15.4", detail: true },
    FOOT,
  ],
  n: [
    {
      d: "M23.6 7.2c5.9 0 10.4 4.8 10.4 11.4 0 4.6-.9 7.9-1.9 10.7-.8 2.3-1.2 4.6-1.2 7.1H14.2c0-6.3 1.5-10.4 4.2-13.4 1.3-1.4 2.7-2.6 4.1-3.6l-6.4 2.1c-1.9.6-3.6-1.4-2.8-3.2l1.9-4.2 6.3-4 .6-2.9z",
    },
    { d: "M17.9 18.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z", detail: true },
    { d: "M26.4 10.4c2.9 1.6 5 4.7 5.4 8.6", detail: true },
    FOOT,
  ],
  b: [
    {
      d: "M22.5 5.6a2.6 2.6 0 0 1 1.5 4.7c4.1 2.2 6.9 6.4 6.9 11.1 0 3.2-1.3 6.1-3.5 8.2H17.6a11.4 11.4 0 0 1-3.5-8.2c0-4.7 2.8-8.9 6.9-11.1a2.6 2.6 0 0 1 1.5-4.7z",
    },
    { d: "M19.6 22.2 25.4 15.8", detail: true },
    collar(16.4, 12.2),
    SKIRT,
    FOOT,
  ],
  q: [
    {
      d: "M8.6 13.2a2.3 2.3 0 1 1 2.7 2.3l2.4 7.1 3.7-8.6a2.3 2.3 0 1 1 3.2-.8l2 8.6 2-8.6a2.3 2.3 0 1 1 3.2.8l3.7 8.6 2.4-7.1a2.3 2.3 0 1 1 2.7-2.3c0 1.2-.9 2.2-2.1 2.3l-2.6 14.1H13.7L11.1 15.5a2.3 2.3 0 0 1-2.5-2.3z",
    },
    collar(13.4, 18.2),
    SKIRT,
    FOOT,
  ],
  k: [
    {
      d: "M21.2 4.2h2.6v2.6h2.6v2.6h-2.6v3.2h-2.6V9.4h-2.6V6.8h2.6z",
    },
    {
      d: "M22.5 11.6c3.1 0 5.6 2.1 5.6 4.7 0 1.7-1 3.2-2.5 4.1h-6.2c-1.5-.9-2.5-2.4-2.5-4.1 0-2.6 2.5-4.7 5.6-4.7z",
    },
    {
      d: "M17.4 20.9h10.2c2.9 2.5 4.6 5.6 4.6 8.7H12.8c0-3.1 1.7-6.2 4.6-8.7z",
    },
    collar(14.4, 16.2),
    SKIRT,
    FOOT,
  ],
};

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
  const body = light ? "#fffdfb" : "#2f2044";
  const outline = light ? "#2b1b3d" : "#150d22";
  // a dark outline drawn on top of a dark body disappears
  const detail = light ? "#2b1b3d" : "#b9a6d6";

  return (
    <svg viewBox="0 0 45 45" className={className} aria-hidden focusable="false">
      <g
        fill={body}
        stroke={outline}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {PIECES[type].map((part, i) =>
          part.detail ? (
            <path
              key={i}
              d={part.d}
              fill="none"
              stroke={detail}
              strokeWidth="1.4"
            />
          ) : (
            <path key={i} d={part.d} />
          )
        )}
      </g>
    </svg>
  );
}
