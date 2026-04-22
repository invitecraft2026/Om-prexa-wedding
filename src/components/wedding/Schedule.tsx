import { useState } from "react";
import type { Lang } from "@/data/translations";
import { translations, schedule } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";

type DayKey = "day1" | "day2" | "day3";

const dayAccent: Record<DayKey, string> = {
  day1: "oklch(0.74 0.17 60)", // marigold
  day2: "oklch(0.7 0.09 30)",  // rose
  day3: "oklch(0.72 0.13 75)", // gold
};

interface ScheduleProps {
  lang: Lang;
}

export function Schedule({ lang }: ScheduleProps) {
  const [active, setActive] = useState<DayKey>("day1");
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const items = schedule[active];
  const accent = dayAccent[active];

  const dayLabels: Record<DayKey, string> = {
    day1: t.day1,
    day2: t.day2,
    day3: t.day3,
  };

  return (
    <section className="relative bg-deep px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className={`text-gold-gradient mb-3 text-4xl font-light sm:text-6xl ${fontClass}`}>
            {t.celebrationsTitle}
          </h2>
          <p className={`text-sm italic text-muted-foreground sm:text-base ${fontClass}`}>
            {t.celebrationsSubtitle}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {(["day1", "day2", "day3"] as DayKey[]).map((d) => {
            const isActive = active === d;
            return (
              <button
                key={d}
                onClick={() => setActive(d)}
                className={`rounded-full border px-4 py-2 font-ornament text-[10px] tracking-[0.2em] transition-all sm:px-6 sm:py-2.5 sm:text-xs ${
                  isActive
                    ? "border-gold bg-gold/15 text-gold-light shadow-[0_0_20px_oklch(0.72_0.13_75/0.3)]"
                    : "border-gold/25 text-muted-foreground hover:border-gold/60 hover:text-gold-light"
                }`}
              >
                {dayLabels[d]}
                {d === "day3" && (
                  <span className={`ml-2 text-rose ${fontClass}`}>✦ {t.day3Sub}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="relative pl-6 sm:pl-10">
          <div
            className="absolute bottom-0 left-2 top-0 w-px sm:left-4"
            style={{
              background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
            }}
          />
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li
                key={`${active}-${idx}`}
                className="group relative animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 60}ms`, animationDuration: "600ms" }}
              >
                <span
                  className="absolute -left-[18px] top-6 h-3 w-3 rounded-full ring-4 ring-deep sm:-left-[26px]"
                  style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
                />
                <div
                  className="rounded-sm border border-gold/25 bg-white/[0.03] px-5 py-4 transition-all hover:border-gold/60 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_oklch(0.72_0.13_75/0.15)] sm:px-6 sm:py-5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3
                      className={`text-xl text-gold-light sm:text-2xl ${fontClass}`}
                    >
                      {lang === "gu" ? item.gu : item.en}
                    </h3>
                    <span
                      className="font-ornament text-xs tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      {item.time}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm text-muted-foreground ${
                      lang === "gu" ? "font-gujarati" : ""
                    }`}
                  >
                    📍 {lang === "gu" ? item.locGu : item.locEn}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
