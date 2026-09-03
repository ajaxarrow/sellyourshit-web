"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonAction } from "@/components/ui/Button";
import { staggerContainer, snapUp } from "@/components/ui/motion-variants";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "w-full border-b border-border bg-transparent py-3 font-body text-ink outline-none transition-colors focus:border-accent";

export default function ContactPage() {
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderEmail, subject, content }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.message ?? "Couldn't send your message.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Couldn't send your message. Check your connection.");
    }
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

      <Container className="relative z-10 max-w-2xl">
        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start gap-4"
          >
            <span className="h-3 w-3 bg-accent" aria-hidden="true" />
            <h1 className="text-display-md font-display">Message sent.</h1>
            <p className="max-w-sm font-body text-lg text-ink-muted">
              We&apos;ll get back to you by email. Eventually.
            </p>
          </motion.div>
        ) : (
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
              Bugs, gripes, whatever
            </motion.p>

            <motion.h1
              variants={snapUp}
              className="text-display-md font-display leading-[0.95]"
            >
              Something&apos;s broken.
              <br />
              Or missing. Or both.
            </motion.h1>

            <motion.p variants={snapUp} className="max-w-md font-body text-lg text-ink-muted">
              Say it here. Goes straight to whoever&apos;s actually building this,
              not a support queue.
            </motion.p>

            <motion.form
              variants={snapUp}
              onSubmit={handleSubmit}
              className="mt-6 flex w-full flex-col gap-8"
            >
              <label className="flex flex-col gap-2">
                <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-muted">
                  Your email
                </span>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className={fieldClasses}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-muted">
                  Subject
                </span>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={fieldClasses}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-muted">
                  What&apos;s going on
                </span>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${fieldClasses} resize-none`}
                />
              </label>
              {status === "error" && error && (
                <p className="font-body text-sm text-danger">{error}</p>
              )}
              <ButtonAction type="submit" disabled={status === "sending"} className="self-start">
                {status === "sending" ? "Sending…" : "Send it"}
              </ButtonAction>
            </motion.form>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
