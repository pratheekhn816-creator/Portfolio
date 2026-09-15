"use client";

import { useEffect, useRef } from "react";

export function CursorEffect() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const move = (event: PointerEvent) => { if (ref.current) { ref.current.style.left = `${event.clientX}px`; ref.current.style.top = `${event.clientY}px`; } }; window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move); }, []);
  return <div className="cursor-effect" ref={ref} aria-hidden="true" />;
}
