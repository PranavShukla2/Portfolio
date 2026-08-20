/**
 * Shared furniture for the /work case studies, so every one of them carries the
 * same palette, fact tables and header treatment rather than re-deriving it.
 */

export const PALETTE = ["#ff4e9b", "#845ec2", "#e2563b", "#d98324"];

export const WASHES = [
  "rgba(255,78,155,0.10)",
  "rgba(132,94,194,0.12)",
  "rgba(255,107,107,0.12)",
  "rgba(255,179,71,0.16)",
];

export interface Pill {
  label: string;
  color: string;
  wash: string;
}

/** Gradient blobs + dotted pattern behind a case study's header. */
export function HeaderBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden"
    >
      <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-accent-wash blur-3xl" />
      <div className="absolute right-0 -top-10 h-72 w-72 rounded-full bg-accent-2-wash blur-3xl" />
      <div className="absolute left-1/3 top-44 h-64 w-64 rounded-full bg-accent-3-wash blur-3xl" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(132,94,194,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </div>
  );
}

/** The tilted tech pills under a case study's intro. */
export function StackPills({ pills }: { pills: Pill[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {pills.map((pill, i) => (
        <span
          key={pill.label}
          className="rounded-full px-3.5 py-1.5 font-mono text-[12px] font-medium shadow-sm"
          style={{
            background: pill.wash,
            color: pill.color,
            transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
          }}
        >
          {pill.label}
        </span>
      ))}
    </div>
  );
}

/** Gradient-topped fact card with colour-dotted keys. */
export function FactCard({ rows }: { rows: { key: string; value: string }[] }) {
  return (
    <dl className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-24px_rgba(132,94,194,0.35)]">
      <div className="bg-candy h-1.5 w-full" aria-hidden />
      {rows.map((row, i) => (
        <div
          key={row.key}
          className={`grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[170px_1fr] sm:gap-6 ${
            i % 2 === 1 ? "bg-bg" : ""
          }`}
        >
          <dt className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
              aria-hidden
            />
            <span style={{ color: PALETTE[i % PALETTE.length] }}>{row.key}</span>
          </dt>
          <dd className="text-[15px] leading-relaxed text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Washed, colour-cycled callout list — the "decisions that mattered" grid. */
export function PointList({ points }: { points: string[] }) {
  return (
    <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
      {points.map((point, i) => (
        <li
          key={point}
          className="flex gap-3 rounded-xl border p-4 text-[15px] leading-relaxed text-ink"
          style={{
            background: WASHES[i % WASHES.length],
            borderColor: PALETTE[i % PALETTE.length] + "33",
          }}
        >
          <span
            className="mt-0.5 shrink-0"
            style={{ color: PALETTE[i % PALETTE.length] }}
            aria-hidden
          >
            ∿
          </span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
