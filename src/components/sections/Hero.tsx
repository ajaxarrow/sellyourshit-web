"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { staggerContainer, snapUp } from "@/components/ui/motion-variants";

const heroLinkClasses =
  "group flex items-center gap-1 font-label text-sm uppercase tracking-[0.2em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

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
            who are just starting their own business. Built by someone who got
            tired of doing this in a notes app too.
          </motion.p>

          <motion.div variants={snapUp}>
            <Button href="/downloads/sellyoshit.apk" download>
              <span aria-hidden="true">↓</span> Download for Android
            </Button>
          </motion.div>

          <motion.div variants={snapUp} className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <Link href="/docs" className={heroLinkClasses}>
              Docs
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <a href="/contact" className={heroLinkClasses}>
              Get in touch
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
