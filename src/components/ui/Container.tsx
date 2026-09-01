import type { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  /** Full-bleed: keeps side padding but drops the max-width cap. */
  bleed?: boolean;
}

export function Container({ className = "", children, bleed = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-[6vw] ${bleed ? "" : "max-w-[1200px]"} ${className}`}
    >
      {children}
    </div>
  );
}
