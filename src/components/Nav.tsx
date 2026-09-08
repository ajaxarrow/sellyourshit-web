import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { DEV_URL } from "@/lib/site-config";

const navLinkClasses =
  "group inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.2em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

/** Small square bullet, echoing the accent dot used elsewhere (Hero's tagline, Wordmark's period) — fades and scales in on hover. */
function NavLinkDot() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 scale-0 bg-accent opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
    />
  );
}

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-4 py-5 backdrop-blur-sm sm:px-8 md:border-none md:bg-transparent md:backdrop-blur-none">
      <Link href="/" className="leading-none">
        <Wordmark fontSize={22} />
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/docs" className={navLinkClasses}>
          <NavLinkDot />
          Docs
        </Link>
        <Link href="/contact" className={navLinkClasses}>
          <NavLinkDot />
          Contact
        </Link>
        <a
          href={DEV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClasses}
        >
          <NavLinkDot />
          Dev
        </a>
      </div>
    </nav>
  );
}
