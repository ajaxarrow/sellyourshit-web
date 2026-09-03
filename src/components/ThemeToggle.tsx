"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-4 right-4 z-100 cursor-pointer border border-border-strong bg-bg px-2.5 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.15em] text-ink-muted transition-colors hover:border-accent hover:text-accent sm:bottom-6 sm:right-6"
    >
      {theme === "dark" ? "◐ LIGHT" : "● DARK"}
    </button>
  );
}
