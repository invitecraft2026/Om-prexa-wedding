import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";

interface ScratchCardProps {
  lang: Lang;
}

export function ScratchCard({ lang }: ScratchCardProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#8b6520");
    grad.addColorStop(0.5, "#e8c57a");
    grad.addColorStop(1, "#c9963a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // foil noise
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    }
    ctx.fillStyle = "rgba(26,15,10,0.55)";
    ctx.font = "600 16px 'Cinzel Decorative', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH HERE ✦", rect.width / 2, rect.height / 2);
  }, [revealed]);

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 200;
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] === 0) cleared++;
    }
    const total = data.length / (4 * step);
    if (cleared / total > 0.55) {
      setRevealed(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#c9963a", "#e8c57a", "#d4847a", "#e8922a", "#fdf6ec"],
      });
    }
  };

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    scratch(e);
  };
  const onUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    checkProgress();
  };
  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = point(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <OrnamentDivider className="mb-8" />
        <p className={`mb-8 text-sm italic tracking-wider text-muted-foreground ${fontClass}`}>
          {t.scratchHint}
        </p>

        <div
          className="relative mx-auto h-56 w-full max-w-lg overflow-hidden rounded-sm border border-gold/40 sm:h-64"
          style={{
            boxShadow: "0 20px 60px -20px oklch(0.72 0.13 75 / 0.4)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep px-6 text-center">
            <p
              className={`mb-2 font-ornament text-xs tracking-[0.3em] text-gold sm:text-sm`}
            >
              ✦ {lang === "gu" ? "શુભ મુહૂર્ત" : "AUSPICIOUS MOMENT"} ✦
            </p>
            <h3 className={`text-gold-gradient text-3xl font-light sm:text-5xl ${fontClass}`}>
              {t.scratchReveal}
            </h3>
            <p className={`mt-3 text-base text-blush sm:text-xl ${fontClass}`}>
              {t.scratchDate}
            </p>
          </div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              onPointerDown={onDown}
              onPointerMove={scratch}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
            />
          )}
        </div>
      </div>
    </section>
  );
}
