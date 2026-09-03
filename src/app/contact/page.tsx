"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Status = "idle" | "sending" | "sent" | "error";

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

  if (status === "sent") {
    return (
      <Section canvas="a" className="pt-40">
        <Container className="max-w-xl">
          <h1 className="font-display text-3xl">TICKET SENT</h1>
          <p className="mt-4 font-body text-ink-muted">
            Thanks for reaching out! We&apos;ll email you back once your
            concern is received.
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <Section canvas="a" className="pt-40">
      <Container className="max-w-xl">
        <h1 className="font-display text-3xl">SUBMIT A TICKET</h1>
        <p className="mt-4 font-body text-ink-muted">
          Run into a bug, or have feedback? Send us a message and we&apos;ll
          get back to you by email.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-muted">
              Your email
            </span>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="border border-border bg-surface px-4 py-3 font-body text-ink outline-none focus:border-accent"
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
              className="border border-border bg-surface px-4 py-3 font-body text-ink outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-label text-xs uppercase tracking-[0.15em] text-ink-muted">
              Content
            </span>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-border bg-surface px-4 py-3 font-body text-ink outline-none focus:border-accent"
            />
          </label>
          {status === "error" && error && (
            <p className="font-body text-sm text-danger">{error}</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="border border-accent px-6 py-3 font-label text-sm uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-on-accent disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      </Container>
    </Section>
  );
}
