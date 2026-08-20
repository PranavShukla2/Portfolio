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
      "Multi-tenant GA4 analytics SaaS — secure workspaces, per-tenant data isolation, and a clean dashboard for product metrics. Now running its first live client organisation's Google Analytics 4 reporting in production.",
    chips: ["Next.js", "FastAPI", "PostgreSQL", "Vercel"],
    badge: { label: "Live", variant: "live", pulse: true },
    link: { href: "/work/arbflow", label: "Case study & live demo →" },
  },
  {
    id: "kleene",
    title: "Kleene",
    glyph: "🔁",
    tag: "Automata theory workbench that runs in the browser as WebAssembly",
    description:
      "A browser-native automata theory workbench: draw states and transitions on an SVG canvas, type a regex, and watch the full regex → ε-NFA → DFA → minimal DFA → regex conversion run client-side as WebAssembly. No JRE, no install — it opens from a URL.",
    chips: ["Rust", "WebAssembly", "React", "TypeScript"],
    badge: { label: "Live", variant: "live", pulse: true },
    link: { href: "/work/kleene", label: "Case study & live demo →" },
  },
  {
    id: "cnams",
    title: "Ankur (CNAMS)",
    glyph: "🌱",
    tag: "Offline-first child growth & malnutrition screening for Anganwadi workers",
    description:
      "Child growth and malnutrition screening for Anganwadi workers: WHO LMS z-scores computed on-device in Flutter, SAM/MAM classification with no network dependency, and a supervisor portal spanning 21 routes across 5 roles.",
    chips: ["Flutter", "SQLCipher", "BLE", "Next.js 14"],
    badge: { label: "Field tool", variant: "warm" },
    link: { href: "/work/cnams", label: "Case study & live portal →" },
  },
  {
    id: "sleep-apnea",
    title: "Sleep Apnea Detection",
    glyph: "🫀",
    tag: "1D CNN on polysomnography signals · LOPO-validated",
    description:
      "A 1D CNN that detects apnea events from polysomnography signals, validated with leave-one-participant-out cross-validation so results hold on unseen participants.",
    chips: ["TensorFlow", "1D CNN", "SciPy", "LOPO CV"],
    badge: { label: "Research · paper in progress", variant: "muted" },
    callout:
      "Apnea events are rare, so accuracy is the wrong yardstick — a model can score 91% by mostly predicting 'normal' and still miss the events that matter. Re-centering evaluation on recall and PR-AUC, with SMOTE applied strictly inside each training fold, lifted minority-class F1 by 18 points. Catching that gap and rebuilding the evaluation around it is the core of the paper I'm writing.",
  },
];

export const PROJECTS_BY_ID: Record<string, ProjectData> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p]),
);
