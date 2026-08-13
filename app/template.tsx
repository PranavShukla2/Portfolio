"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * App Router `template.tsx` re-mounts on every navigation, so this wraps each
 * page's content in a gentle fade-in — a smooth transition between routes while
 * the persistent header/footer stay put. Opacity-only on purpose: a lingering
 * transform would create a containing block that breaks the sticky post TOC.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
