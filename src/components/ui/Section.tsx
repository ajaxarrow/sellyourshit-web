import type { ElementType, ReactNode } from "react";

type SectionCanvas = "a" | "b";

interface SectionProps {
  canvas?: SectionCanvas;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}

// Unlike cashthefuckout-web's stark black/white canvas flip, sellyoshit's
// palette has one elevation scale per mode — "b" steps up to --surface
// rather than inverting, for a subtler rhythm between sections.
const canvasClasses: Record<SectionCanvas, string> = {
  a: "bg-bg text-ink",
  b: "bg-surface text-ink",
};

export function Section({
  canvas = "a",
  as: Tag = "section",
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <Tag id={id} className={`${canvasClasses[canvas]} py-20 md:py-32 ${className}`}>
      {children}
    </Tag>
  );
}
