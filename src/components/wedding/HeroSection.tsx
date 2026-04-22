import { useEffect, useState } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { MandalaFrame, OrnamentDivider } from "./Ornaments";
import { FloatingPetals } from "./FloatingPetals";

const TARGET = new Date("2026-05-09T10:00:00+05:30").getTime();

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const mins = Math.floor((diff / 60_000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return [days, hours, mins, secs];
}

interface HeroProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const [d, h, m, s] = useCountdown();
  const values = [d, h, m, s];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden warm-radial px-6 py-32">
      <FloatingPetals count={22} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <MandalaFrame className="mx-auto mb-6 h-24 w-24 opacity-80 sm:h-28 sm:w-28" />

        <p
          className={`mb-6 text-sm italic tracking-[0.3em] text-gold-light/80 sm:text-base ${fontClass}`}
        >
          {t.invite}
        </p>

        <h1
          className={`text-gold-gradient mb-8 font-light leading-[1.05] tracking-wide ${fontClass}`}
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          {t.brideGroom}
        </h1>

        <p
          className={`mx-auto mb-12 max-w-2xl text-balance text-base italic leading-relaxed text-blush sm:text-lg ${
            lang === "gu" ? "font-gujarati" : "font-body"
          }`}
        >
          {t.heroSubtitle}
        </p>

        <OrnamentDivider className="mb-10" />

        <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className="glass-panel rounded-sm px-2 py-4 sm:px-4 sm:py-6"
            >
              <div
                className="font-display text-3xl font-light text-gold-light sm:text-5xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {String(v).padStart(2, "0")}
              </div>
              <div
                className={`mt-1 text-[10px] tracking-[0.25em] text-muted-foreground sm:text-xs ${
                  lang === "gu" ? "font-gujarati" : ""
                }`}
              >
                {t.countdownLabel[i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
