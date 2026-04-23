import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_SRC = "newsong.mpeg";

interface MusicToggleProps {
  className?: string;
}

export function MusicToggle({ className = "" }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* always start as ON when page loads */
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;
    audio.loop = true;

    if (enabled) {
      audio.play().catch(() => {
        /* browser autoplay may block until user interaction */
      });
    } else {
      audio.pause();
    }
  }, [enabled]);

  const toggle = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        preload="auto"
        loop
      />

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