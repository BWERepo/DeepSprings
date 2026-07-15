export default function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none font-display text-terracotta/15 ${className}`}
      style={{ lineHeight: 0.5 }}
    >
      &ldquo;
    </span>
  );
}
