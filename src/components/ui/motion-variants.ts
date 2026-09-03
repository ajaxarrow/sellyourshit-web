import type { Transition, Variants } from "motion/react";

/**
 * Brutalist motion tone: punchy/steppy arrival, not a soft spring.
 * Every shared variant below should read as "snap into place," never "float in."
 */
export const snapTransition: Transition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.5,
};

export const snapIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: snapTransition },
};

export const snapUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: snapTransition },
};

export const snapScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: snapTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
