import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Hero() {
  return (
    <Section canvas="a" className="pt-40">
      <Container className="flex flex-col items-start gap-6">
        <Wordmark fontSize={72} />
        <p className="max-w-xl font-body text-lg text-ink-muted">
          The reseller inventory &amp; sales tracker for people who actually move
          product. Track your closet, log every sale, know your numbers — no
          spreadsheets required.
        </p>
        <Link
          href="/docs"
          className="border border-accent px-6 py-3 font-label text-sm uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-on-accent"
        >
          Read the docs
        </Link>
      </Container>
    </Section>
  );
}
