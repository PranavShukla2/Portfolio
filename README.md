# Pranav — Portfolio

A personal developer portfolio. Next.js (App Router) + TypeScript + Tailwind CSS, with Framer Motion for the biosignal motion work.

A playful "Gradient Candy" palette (coral → pink → purple), an articulated SVG avatar that waves, and an interactive MacBook you browse the work through — type `ls` / `open arbflow` in the in-screen CLI, and "know more" opens a project window inside the laptop.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploy

Zero-config on [Vercel](https://vercel.com/) — import the repo and deploy. No environment variables or external services required.

## Structure

- `app/` — App Router pages (`/` and `/work/arbflow`), root layout, global tokens.
- `components/` — `Avatar3D`, `LaptopShowcase`, `ScrollProgress`, `ProjectCard`, `FeatureCard`, `Section`, `Nav`, `Footer`, and small primitives.
- `lib/projects.ts` — single source of project data (shared by the cards and the laptop).
- `lib/signal.ts` — ECG path generator for the Sleep Apnea demo trace.
- `tailwind.config.ts` + `app/globals.css` — design tokens / palette (CSS variables surfaced as Tailwind utilities). Swap the palette by editing the `:root` block in `globals.css`.

## Accessibility & motion

- All motion respects `prefers-reduced-motion`: the hero draw, the vitals monitor, and scroll reveals are disabled and final state shows immediately.
- Semantic landmarks, a skip link, visible keyboard focus rings, and AA-contrast text.

## TODO before launch

- Résumé PDF link (`app/page.tsx`).
- Confirm the ~91% figure in the sleep-apnea callout (`components/FeatureCard.tsx`).
- The avatar is hand-built SVG (`components/Avatar3D.tsx`) — tweak hair/skin/shirt colors there if you want it closer to your likeness.
