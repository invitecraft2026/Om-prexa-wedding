import { useEffect, useState } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";
import { FloatingPetals } from "./FloatingPetals";
import ganeshImg from "/ganesh.png"; // ← put your image in src/assets/ and rename if needed

const TARGET = Date.UTC(2026, 4, 9, 7, 0, 0);

function calc(now: number) {
  const diff = Math.max(0, TARGET - now);
  return [
    Math.floor(diff / 86_400_000),
    Math.floor((diff / 3_600_000) % 24),
    Math.floor((diff / 60_000) % 60),
    Math.floor((diff / 1000) % 60),
  ];
}

function useCountdown() {
  const [values, setValues] = useState<number[] | null>(null);
  useEffect(() => {
    setValues(calc(Date.now()));
    const id = window.setInterval(() => setValues(calc(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return values;
}

interface HeroProps {
  lang: Lang;
}

export function HeroSection({ lang }: HeroProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const countdown = useCountdown();
  const display = countdown ?? [null, null, null, null];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden warm-radial px-6 py-32">
      <FloatingPetals count={22} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">

        {/* Ganesh image — swap filename in the import above if yours differs */}
        <img
          src={ganeshImg}
          alt="Shree Ganesh"
          className="mx-auto mb-6 h-24 w-24 object-contain opacity-90 sm:h-32 sm:w-32"
          style={{
            filter: "drop-shadow(0 0 18px oklch(0.72 0.13 75 / 0.55))",
          }}
        />

        <p
          className={`mb-6 text-sm italic tracking-[0.3em] text-gold-light/80 sm:text-base ${fontClass}`}
        >
          {t.invite}
        </p>

        <h1
          className={`text-gold-gradient mb-8 font-light leading-[1.05] tracking-wide ${fontClass}`}
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          {lang === "gu" ? "પ્રેક્ષા & ઓમ" : "Om & Prexa"}
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
          {display.map((v, i) => {
            const isZero = v === 0;
            return (
              <div
                key={i}
                className="glass-panel rounded-sm px-2 py-4 sm:px-4 sm:py-6"
                style={{ opacity: isZero ? 0.45 : 1, transition: "opacity 0.6s ease" }}
              >
                <div
                  className="font-display text-3xl font-light text-gold-light sm:text-5xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {v === null ? "—" : String(v).padStart(2, "0")}
                </div>
                <div
                  className={`mt-1 text-[10px] tracking-[0.25em] text-muted-foreground sm:text-xs ${
                    lang === "gu" ? "font-gujarati" : ""
                  }`}
                >
                  {t.countdownLabel[i]}
                </div>
              </div>
            );
          })}
        </div>

        {countdown && countdown[1] === 0 && countdown[0] > 0 && (
          <p className="mt-6 font-ornament text-xs tracking-[0.2em] text-gold-light/40">
            {lang === "gu" ? `${countdown[0]} દિવસ બાકી` : `${countdown[0]} days to go`}
          </p>
        )}
      </div>
    </section>
  );
}