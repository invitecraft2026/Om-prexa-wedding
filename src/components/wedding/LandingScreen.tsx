import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { FloatingPetals } from "./FloatingPetals";
import { MusicToggle } from "./MusicToggle";
import { OrnamentDivider } from "./Ornaments";

interface LandingScreenProps {
  lang: Lang;
  onOpen: () => void;
}

export function LandingScreen({ lang, onOpen }: LandingScreenProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-deep">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/bride_and_groom.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.025 40 / 0.55) 0%, oklch(0.18 0.025 40 / 0.35) 40%, oklch(0.18 0.025 40 / 0.7) 100%)",
        }}
      />

      <FloatingPetals count={20} />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <MusicToggle />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <OrnamentDivider className="mb-8 opacity-90" />
        <p
          className={`mb-4 text-sm italic tracking-[0.3em] text-gold-light/90 sm:text-base ${fontClass}`}
        >
          {t.invite}
        </p>
        <h1
          className={`mb-6 text-gold-gradient text-5xl font-light tracking-wide sm:text-7xl md:text-8xl ${fontClass}`}
          style={{ lineHeight: 1.1 }}
        >
          {t.aSacredUnion}
        </h1>
        <p className="mb-12 font-ornament text-sm tracking-[0.4em] text-gold-light/85 sm:text-base">
          {t.dateRange}
        </p>
        <button
          onClick={onOpen}
          className="group animate-pulse-gold rounded-sm border border-gold/70 px-10 py-3.5 font-ornament text-xs tracking-[0.3em] text-gold-light backdrop-blur-md transition-all hover:scale-[1.03] hover:border-gold hover:bg-white/10 sm:text-sm"
          style={{
            background: "oklch(1 0 0 / 0.08)",
          }}
        >
          {t.tapButton}
        </button>
        <OrnamentDivider className="mt-12 opacity-70" />
      </div>
    </div>
  );
}
