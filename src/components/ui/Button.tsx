"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

const buttonClasses =
  "inline-block cursor-pointer border border-accent px-6 py-3 font-label text-sm uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-50";

const MAGNET_RADIUS = 0.3;

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Outlined-to-filled CTA with a subtle magnetic pull, for internal/external navigation. */
export function Button({ href, children, className = "" }: ButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.4 });

  function handlePointerMove(e: ReactPointerEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * MAGNET_RADIUS);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * MAGNET_RADIUS);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div style={{ x, y }} className="inline-block" whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`${buttonClasses} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

interface ButtonActionProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

/** Same styling as Button, for in-page actions (form submit, etc.) instead of navigation. */
export function ButtonAction({
  type = "button",
  disabled,
  children,
  className = "",
}: ButtonActionProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className={`${buttonClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
}
