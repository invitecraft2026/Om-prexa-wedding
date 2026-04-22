import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { OrnamentDivider, MandalaFrame } from "./Ornaments";
import { FloatingPetals } from "./FloatingPetals";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";

  return (
    <footer className="relative overflow-hidden warm-radial px-6 py-24 text-center">
      <FloatingPetals count={14} />
      <div className="relative z-10 mx-auto max-w-2xl">
        <MandalaFrame className="mx-auto mb-6 h-20 w-20 opacity-70" />
        <OrnamentDivider className="mb-8" />
        <p
          className={`mb-8 text-balance text-lg italic text-blush sm:text-2xl ${
            lang === "gu" ? "font-gujarati" : "font-body"
          }`}
        >
          {t.closing}
        </p>
        <h3
          className={`text-gold-gradient mb-6 text-5xl font-light sm:text-7xl ${fontClass}`}
        >
          {t.brideGroom}
        </h3>
        <OrnamentDivider className="mb-6" />
        <p className="font-ornament text-xs tracking-[0.4em] text-gold sm:text-sm">
          {t.samvat}
        </p>
        <p className={`mt-2 text-xs tracking-[0.3em] text-muted-foreground ${fontClass}`}>
          {t.dateRange}
        </p>
      </div>
    </footer>
  );
}
