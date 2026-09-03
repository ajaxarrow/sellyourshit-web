"use client";

import { motion } from "motion/react";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { staggerContainer, snapUp } from "@/components/ui/motion-variants";

export function Hero() {
  return (
    <Section
      canvas="a"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-start gap-6"
        >
          <motion.p
            variants={snapUp}
            className="flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-ink-faint"
          >
            <span className="inline-block h-[0.35em] w-[0.35em] bg-accent" />
            For resellers starting from zero
          </motion.p>

          <motion.div variants={snapUp}>
            <Wordmark fontSize="clamp(3rem, 13vw, 8.5rem)" />
          </motion.div>

          <motion.p variants={snapUp} className="max-w-xl font-body text-lg text-ink-muted">
            This is an inventory slash sales tracking platform for garment resellers
            who are just starting their own business — built by people who got
            tired of doing this in a notes app too.
          </motion.p>

          <motion.div variants={snapUp} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/docs">Read the docs</Button>
            <a
              href="/contact"
              className="font-label text-sm uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-accent"
            >
              Get in touch →
            </a>
          </motion.div>
        </motion.div>
      </Container>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 left-6 z-10 font-label text-[0.65rem] tracking-[0.3em] text-ink-faint uppercase md:left-[6vw]"
      >
        Scroll ↓
      </motion.p>
    </Section>
  );
}
