import Badge from "./Badge";
import Chip from "./Chip";
import { buildEcgPath } from "@/lib/signal";

const ECG_W = 600;
const ECG_H = 120;
// The biosignal ECG trace lives here, where single-lead physiology belongs.
// Two tiled copies side by side let the trace drift seamlessly.
const ECG_PATH = buildEcgPath(ECG_W, ECG_H, 7);

const CHIPS = ["PyTorch", "1D CNN", "LOPO CV", "SHAP"];

/**
 * Featured, full-width Sleep Apnea Detection card: info on the left, a dark
 * "live inference" demo panel on the right (stacks under on mobile).
 * The demo's dormant/disabled state is intentional.
 */
export default function FeatureCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ── Info ── */}
        <div className="flex flex-col p-7 sm:p-9">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tightest text-ink">
              Sleep Apnea Detection
            </h3>
            <Badge label="Demo · coming soon" variant="muted" />
          </div>

          <p className="text-[15px] leading-relaxed text-ink-2">
            A 1D CNN that detects apnea events from single-lead physiological
            signals, validated with leave-one-patient-out cross-validation so
            results hold on unseen patients.
          </p>

          {/* accuracy-paradox callout */}
          <div className="mt-6 rounded-xl border border-accent/15 bg-accent-wash p-5">
            <p className="text-[14px] leading-relaxed text-ink">
              Beyond accuracy: under heavy class imbalance, a model can score
              ~91% and still miss the events that matter. I surfaced this
              accuracy paradox and built the evaluation around it — the part I&apos;m
              writing up for publication.
            </p>
            {/* TODO confirm the ~91% figure */}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        </div>

        {/* ── Dark "live inference" demo panel ── */}
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-term p-7 sm:p-9">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-bright">
            ∿ live inference
          </span>

          {/* faint single-lead ECG trace, drifting */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-60"
            aria-hidden
          >
            <svg
              viewBox={`0 0 ${ECG_W} ${ECG_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-28 w-[200%] animate-osc"
            >
              <path
                d={ECG_PATH}
                fill="none"
                stroke="var(--accent-bright)"
                strokeWidth={1.6}
                opacity={0.55}
              />
              <path
                d={ECG_PATH}
                transform={`translate(${ECG_W} 0)`}
                fill="none"
                stroke="var(--accent-bright)"
                strokeWidth={1.6}
                opacity={0.55}
              />
            </svg>
          </div>

          <div className="relative flex flex-col gap-3">
            <button
              type="button"
              disabled
              aria-disabled
              className="inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 font-mono text-[13px] text-accent-bright opacity-60"
            >
              ▷ Run inference on sample
            </button>
            <p className="font-mono text-[11px] text-ink-3">
              // wires up once the model is deployed
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
