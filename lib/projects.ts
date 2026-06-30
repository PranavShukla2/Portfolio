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
  /** Extra accent-washed callout box — unique to Sleep Apnea. */
  callout?: string;
  /** Plain muted "why it matters" supporting paragraph (Research & projects). */
  why?: string;
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
    why: "Models don't fail loudly — they rot. Inputs drift away from the training distribution and accuracy slips for weeks before anyone notices. I built this so the pipeline watches its own data, catches drift statistically, and retrains itself before degradation ever reaches users — making reliability a property of the system instead of a fire drill.",
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
    why: "Pre-eclampsia is one of the leading causes of maternal death, and the hard part is that it's often catchable — the signal sits in routine checkup data well before it becomes an emergency. I built this to surface that risk early, from features clinicians already collect, so intervention can happen while it still changes the outcome.",
    chips: ["scikit-learn", "Pandas", "Feature eng."],
    badge: { label: "Maternal health", variant: "warm" },
  },
];

export const PROJECTS_BY_ID: Record<string, ProjectData> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p]),
);
