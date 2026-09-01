import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-10 text-ink-muted">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-body text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} sellyoshit
        </p>
        <nav className="flex gap-6 font-body text-xs uppercase tracking-widest">
          <Link href="/docs" className="hover:text-accent">
            Docs
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
