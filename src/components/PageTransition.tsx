"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const panelCount = 8;
const enterDuration = 0.1;
const exitDuration = 0.12;
const stagger = 0.012;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setIsReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPhase("cover"));
    const timeout = window.setTimeout(() => setPhase("reveal"), isReducedMotion ? 20 : 140);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timeout); };
  }, [pathname, isReducedMotion]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const timeout = window.setTimeout(() => setPhase("idle"), isReducedMotion ? 80 : 260);
    return () => window.clearTimeout(timeout);
  }, [phase, isReducedMotion]);

  const visible = phase !== "idle";
  return <>
    {children}
    {visible && <motion.div className="page-transition" aria-hidden="true" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {Array.from({ length: panelCount }, (_, index) => <motion.div
        className="page-transition-panel"
        key={index}
        initial={{ x: phase === "reveal" ? "0%" : "-105%" }}
        animate={{ x: phase === "cover" ? "0%" : "105%" }}
        transition={isReducedMotion ? { duration: 0.08 } : { duration: phase === "cover" ? enterDuration : exitDuration, delay: phase === "cover" ? index * stagger : (panelCount - index - 1) * stagger, ease: [0.76, 0, 0.24, 1] }}
        style={{ top: `${index * 12.5}%` }}
      />)}
    </motion.div>}
  </>;
}
