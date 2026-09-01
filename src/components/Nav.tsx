import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-transparent px-8 py-5">
      <Link href="/" className="leading-none">
        <Wordmark fontSize={22} />
      </Link>
      <Link
        href="/docs"
        className="font-body text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-accent"
      >
        Docs
      </Link>
    </nav>
  );
}
