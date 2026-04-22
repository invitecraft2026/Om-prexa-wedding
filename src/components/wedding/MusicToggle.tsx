import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC = "sajana.mpeg";
const STORAGE_KEY = "wedding-music-on";

interface MusicToggleProps {
  className?: string;
}

export function MusicToggle({ className = "" }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(stored === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.2; // reduced from 0.45
    if (enabled) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
    window.localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  }, [enabled, ready]);

  const toggle = () => setEnabled((v) => !v);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={enabled ? "Mute background music" : "Play background music"}
        aria-pressed={enabled}
        className={`group inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/40 px-4 py-2 font-ornament text-[0.65rem] tracking-[0.3em] text-gold-light backdrop-blur-md transition-all hover:border-gold hover:bg-black/55 hover:scale-[1.03] sm:text-xs ${className}`}
      >
        {enabled ? (
          <Volume2 className="h-3.5 w-3.5" />
        ) : (
          <VolumeX className="h-3.5 w-3.5 opacity-80" />
        )}
        <span>{enabled ? "MUSIC ON" : "MUSIC OFF"}</span>
      </button>
    </>
  );
}