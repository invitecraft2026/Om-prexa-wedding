interface OrnamentProps {
  className?: string;
}

export function OrnamentDivider({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`mx-auto h-6 w-60 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <line x1="0" y1="12" x2="90" y2="12" />
      <line x1="150" y1="12" x2="240" y2="12" />
      <circle cx="120" cy="12" r="6" />
      <circle cx="120" cy="12" r="2.5" fill="currentColor" />
      <path d="M105 12 Q120 0 135 12 Q120 24 105 12 Z" />
    </svg>
  );
}

export function MandalaFrame({ className = "" }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden
    >
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="64" strokeOpacity="0.6" />
      <circle cx="100" cy="100" r="48" strokeOpacity="0.4" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        const x1 = 100 + Math.cos(a) * 48;
        const y1 = 100 + Math.sin(a) * 48;
        const x2 = 100 + Math.cos(a) * 80;
        const y2 = 100 + Math.sin(a) * 80;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.5" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        const cx = 100 + Math.cos(a) * 64;
        const cy = 100 + Math.sin(a) * 64;
        return <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" />;
      })}
    </svg>
  );
}
