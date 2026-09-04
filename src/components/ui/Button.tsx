"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

const baseClasses =
  "inline-block cursor-pointer border px-6 py-3 font-label text-sm uppercase tracking-[0.2em] transition-colors disabled:cursor-not-allowed disabled:opacity-50";

// Two full, non-overlapping class sets (rather than layering override
// classes on top of a shared base) — Tailwind resolves same-specificity
// utilities by generation order, not by where they sit in a className
// string, so bolting e.g. `text-on-accent` onto the outline variant to
// fake a solid one is a coin flip on which color actually wins.
const variantClasses = {
  outline: "border-accent text-accent hover:bg-accent/15",
  solid: "border-accent bg-accent text-on-accent hover:bg-transparent hover:text-accent",
} as const;

type ButtonVariant = keyof typeof variantClasses;

const MAGNET_RADIUS = 0.3;

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  /** Set to force a real file download (plain `<a download>`) instead of Next client-side routing. */
  download?: boolean | string;
}

/** Outlined-to-filled CTA with a subtle magnetic pull, for internal/external navigation. */
export function Button({
  href,
  children,
  className = "",
  variant = "outline",
  download,
}: ButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.4 });
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

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
      {download ? (
        <a
          href={href}
          download={download}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={buttonClasses}
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={buttonClasses}
        >
          {children}
        </Link>
      )}
    </motion.div>
  );
}

interface ButtonActionProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

/** Same styling as Button, for in-page actions (form submit, etc.) instead of navigation. */
export function ButtonAction({
  type = "button",
  disabled,
  children,
  className = "",
  variant = "outline",
}: ButtonActionProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
