import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

interface MusicToggleProps {
  className?: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function MusicToggle({ className = "", audioRef }: MusicToggleProps) {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        audioRef.current?.play().catch(() => {});
      } else {
        audioRef.current?.pause();
      }
      return next;
    });
  };

  return (
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
  );
}