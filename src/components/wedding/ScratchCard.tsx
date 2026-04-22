import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";
import { CalendarPlus } from "lucide-react";

interface ScratchCardProps {
  lang: Lang;
}

function buildCalendarUrl(lang: "en" | "gu") {
  const title = lang === "gu"
    ? "પ્રેક્ષા & ઓમ — શુભ લગ્ન"
    : "Prexa & Om — Shubh Lagna (Wedding Ceremony)";
  const details = lang === "gu"
    ? "રાધે મેરેજ હૉલ, કૅનાલ રોડ, મોરબી ખાતે લગ્ન સમારોહ"
    : "Wedding ceremony at Radhe Marriage Hall, Canal Road, Morbi";
  const location = "Radhe Marriage Hall, Canal Road, Morbi, Gujarat, India";
  const start = "20260509T070000Z";
  const end   = "20260509T100000Z";
  const params = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${start}/${end}`, details, location });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ~3-4 natural scratch strokes to reveal
const REVEAL_DISTANCE = 320;

export function ScratchCard({ lang }: ScratchCardProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const distanceScratchedRef = useRef(0);  // total px dragged
  const lastPos = useRef<{ x: number; y: number } | null>(null);

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

  const triggerReveal = () => {
    setRevealed(true);
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#c9963a", "#e8c57a", "#d4847a", "#e8922a", "#fdf6ec"],
    });
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    lastPos.current = getPos(e);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    drawCircle(getPos(e));
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const pos = getPos(e);
    drawCircle(pos);

    // Accumulate distance travelled
    if (lastPos.current) {
      const dx = pos.x - lastPos.current.x;
      const dy = pos.y - lastPos.current.y;
      distanceScratchedRef.current += Math.sqrt(dx * dx + dy * dy);
    }
    lastPos.current = pos;

    if (distanceScratchedRef.current >= REVEAL_DISTANCE) {
      triggerReveal();
    }
  };

  const onUp = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const drawCircle = ({ x, y }: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 44, 0, Math.PI * 2);
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
          style={{ boxShadow: "0 20px 60px -20px oklch(0.72 0.13 75 / 0.4)" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep px-6 text-center">
            <p className="mb-2 font-ornament text-xs tracking-[0.3em] text-gold sm:text-sm">
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
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
            />
          )}
        </div>

        <div
          className="mt-8 flex justify-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            pointerEvents: revealed ? "auto" : "none",
          }}
        >
          <a
            href={buildCalendarUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-sm border border-gold/60 bg-white/5 px-7 py-3 font-ornament text-xs tracking-[0.25em] text-gold-light backdrop-blur-md transition-all hover:scale-[1.03] hover:border-gold hover:bg-white/10"
          >
            <CalendarPlus className="h-4 w-4 shrink-0" />
            {lang === "gu" ? "કૅલેન્ડરમાં સાચવો" : "SAVE TO CALENDAR"}
          </a>
        </div>
      </div>
    </section>
  );
}