import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { MusicToggle } from "./MusicToggle";

interface NavBarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}


export function NavBar({ lang, setLang,audioRef }: NavBarProps) {
  const t = translations[lang];

  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl"
      style={{
        /* lighter warm brown premium navbar */
        background: "oklch(0.32 0.025 40 / 0.88)",
        borderColor: "oklch(0.72 0.13 75 / 0.35)",
        boxShadow: "0 4px 30px oklch(0.18 0.02 40 / 0.15)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-ornament text-base tracking-[0.25em] text-gold-light sm:text-lg">
          {t.monogram}
        </span>

        <div className="flex items-center gap-3">
          <MusicToggle audioRef={audioRef} />

          <div className="flex items-center gap-1 rounded-full border border-gold/30 bg-white/5 p-1">
            {(["en", "gu"] as Lang[]).map((l) => {
              const active = lang === l;

              return (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-xs font-medium tracking-wider transition-all ${
                    active
                      ? "bg-gold/20 text-gold-light"
                      : "text-muted-foreground hover:text-gold-light"
                  }`}
                  aria-pressed={active}
                >
                  {l === "en" ? "EN" : "ગુ"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}