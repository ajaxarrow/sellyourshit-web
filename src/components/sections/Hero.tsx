"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { staggerContainer, snapUp } from "@/components/ui/motion-variants";

const heroLinkClasses =
  "group flex items-center gap-1 font-label text-sm uppercase tracking-[0.2em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

interface HeroProps {
  downloadCount: number;
}

// How long the button reads "Downloading…" after a click — just enough
// to acknowledge the click before the browser's own download UI takes
// over; it's not tied to when the (~70MB) file actually finishes.
const DOWNLOADING_LABEL_MS = 3000;

export function Hero({ downloadCount }: HeroProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  function handleDownloadClick() {
    setIsDownloading(true);
    window.setTimeout(() => setIsDownloading(false), DOWNLOADING_LABEL_MS);
  }

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
            Reselling Inventory & Sales Tracking App
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
            <Button
              href="/api/download"
              download="sellyoshit.apk"
              onClick={handleDownloadClick}
              className={isDownloading ? "pointer-events-none opacity-70" : ""}
            >
              {isDownloading ? (
                "Downloading…"
              ) : (
                <>
                  <span aria-hidden="true">↓</span> Download for Android
                </>
              )}
            </Button>
            {downloadCount > 0 && (
              <p className="mt-2 font-body text-xs text-ink-faint">
                {downloadCount.toLocaleString()} downloads and counting
              </p>
            )}
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
