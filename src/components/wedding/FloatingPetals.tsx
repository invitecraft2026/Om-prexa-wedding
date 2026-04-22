import { useMemo } from "react";

const colors = [
  "oklch(0.74 0.17 60)", // marigold
  "oklch(0.7 0.09 30)",  // rose
  "oklch(0.85 0.1 85)",  // gold light
  "oklch(0.84 0.07 40)", // blush
];

interface PetalProps {
  count?: number;
  className?: string;
}

export function FloatingPetals({ count = 28, className = "" }: PetalProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 8 + Math.random() * 10;
        const left = Math.random() * 100;
        const duration = 7 + Math.random() * 8;
        const delay = -Math.random() * duration;
        const color = colors[i % colors.length];
        return { size, left, duration, delay, color, key: i };
      }),
    [count],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute top-0 block animate-petal-fall"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            background: `radial-gradient(ellipse at 30% 30%, ${p.color}, transparent 70%)`,
            borderRadius: "50% 10% 50% 10%",
            opacity: 0.75,
            willChange: "transform, opacity",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: "blur(0.3px)",
          }}
        />
      ))}
    </div>
  );
}
