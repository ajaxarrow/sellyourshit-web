import { DEV_URL } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-6 text-center sm:px-8">
      <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        Made with angst and passion by{" "}
        <a
          href={DEV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          jiu axl
        </a>
      </p>
    </footer>
  );
}
