import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-4 py-5 backdrop-blur-sm sm:px-8 md:border-none md:bg-transparent md:backdrop-blur-none">
      <Link href="/" className="leading-none">
        <Wordmark fontSize={22} />
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/docs"
          className="font-body text-xs uppercase tracking-[0.2em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Docs
        </Link>
        <Link
          href="/contact"
          className="font-body text-xs uppercase tracking-[0.2em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
