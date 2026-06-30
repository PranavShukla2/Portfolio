export type BadgeVariant = "live" | "warm" | "candy" | "muted";

export interface ProjectData {
  id: string;
  title: string;
  /** Emoji glyph shown in the card's gradient icon. */
  glyph: string;
  /** Short one-liner shown in the terminal `ls` listing. */
  tag: string;
  description: string;
  chips: string[];
  badge?: { label: string; variant: BadgeVariant; pulse?: boolean };
  /** Extra accent-washed callout (Sleep Apnea). */
  callout?: string;
  link?: { href: string; label: string; external?: boolean };
  featured?: boolean;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "arbflow",
    title: "ArbFlow",
    glyph: "📊",
    tag: "Multi-tenant GA4 analytics SaaS — live in production",
    description:
      "Multi-tenant GA4 analytics SaaS — secure workspaces, per-tenant data isolation, and a clean dashboard for product metrics. Deployed and running in production.",
    chips: ["Next.js", "FastAPI", "PostgreSQL", "Vercel"],
    badge: { label: "Live", variant: "live", pulse: true },
    link: { href: "/work/arbflow", label: "Case study & live demo →" },
  },
  {
    id: "mlops",
    title: "Self-Healing MLOps Pipeline",
    glyph: "♻️",
    tag: "Training pipeline that detects failures and recovers itself",
    description:
      "Automated training pipeline that detects failures and recovers without manual intervention — retraining, rollback, and alerting built in.",
    chips: ["Python", "Docker", "CI/CD"],
  },
  {
    id: "sleep-apnea",
    title: "Sleep Apnea Detection",
    glyph: "🫀",
    tag: "1D CNN on single-lead biosignals · LOPO-validated",
    description:
      "A 1D CNN that detects apnea events from single-lead physiological signals, validated with leave-one-patient-out cross-validation so results hold on unseen patients.",
    chips: ["PyTorch", "1D CNN", "LOPO CV", "SHAP"],
    badge: { label: "Research · in progress", variant: "muted" },
    callout:
      "Apnea events are rare, so accuracy is the wrong yardstick — a model can score ~91% by mostly predicting 'normal' and still miss the events that matter. I evaluate it on recall/sensitivity and PR-AUC over the apnea class, where real performance actually shows. Catching that gap and rebuilding the evaluation around it is the core of the paper I'm writing.",
  },
  {
    id: "pre-eclampsia",
    title: "Pre-Eclampsia Risk Model",
    glyph: "🩺",
    tag: "Flags high-risk pregnancies early from routine clinical data",
    description:
      "Predicts pre-eclampsia risk from routine clinical features — one of the leading causes of maternal mortality worldwide. Built to flag high-risk pregnancies early enough for intervention to change the outcome.",
    chips: ["scikit-learn", "Pandas", "Feature eng."],
    badge: { label: "Maternal health", variant: "warm" },
  },
];

export const PROJECTS_BY_ID: Record<string, ProjectData> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p]),
);
