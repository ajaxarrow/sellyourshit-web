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
      className="fixed bottom-6 right-6 z-100 cursor-pointer border border-border-strong bg-transparent px-2.5 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.15em] text-ink-muted"
    >
      {theme === "dark" ? "◐ LIGHT" : "● DARK"}
    </button>
  );
}
