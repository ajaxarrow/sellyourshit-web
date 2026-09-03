"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Dollar-sign cursor that trails the pointer, in the accent green — fine-pointer devices only. */
export function CustomCursor() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 600, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 600, damping: 40, mass: 0.4 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handleMove(e: PointerEvent) {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-200 -translate-x-1/2 -translate-y-1/2 select-none font-display text-2xl text-accent"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      $
    </motion.div>
  );
}
