export default function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[.78rem] font-semibold tracking-[.14em] text-ink/62 uppercase before:size-2 before:shrink-0 before:rounded-full before:bg-acc before:content-[''] ${className}`}
    >
      {children}
    </span>
  );
}
