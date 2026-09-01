interface WordmarkProps {
  fontSize?: number;
  className?: string;
}

/**
 * The "SELLYOSHI[R]T." wordmark — React port of
 * lib/core/widgets/sellyoshit_wordmark.dart: uppercase Anton set, with the
 * "[R]" in "SHI[R]T" picked out in accent green, and the trailing period
 * rendered as a small accent-colored square instead of a dot.
 */
export function Wordmark({ fontSize = 40, className = "" }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-end font-display leading-none ${className}`}
      style={{ fontSize }}
    >
      <span>SELLYOSHI</span>
      <span className="text-accent">[R]</span>
      <span>T</span>
      <span
        className="ml-[0.06em] mb-[0.06em] inline-block bg-accent"
        style={{ width: fontSize * 0.14, height: fontSize * 0.14 }}
      />
    </span>
  );
}
