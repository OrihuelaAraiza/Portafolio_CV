import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useAppearance } from "@/hooks/useAppearance";
import { useLanguage } from "@/hooks/useLanguage";
import "./simulator.css";
import "./video.css";

// The clip is the screen itself. Playback controls sit outside its frame.
export default function SimulatorPreview({
  media,
  className = "",
  frameClassName = "",
}) {
  const video = useRef(null);
  const intent = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const { motionDisabled } = useAppearance();
  const { language, t } = useLanguage();
  const local = (es, en) => (language === "en" ? en : es);

  useEffect(() => {
    const player = video.current;
    let visible = false;
    intent.current = null;
    const sync = () => {
      const requested = intent.current ?? !motionDisabled;
      if (visible && !document.hidden && requested)
        player.play().catch(() => {});
      else player.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        sync();
      },
      { threshold: [0, 0.2] },
    );
    observer.observe(player);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      player.pause();
    };
  }, [media.src, motionDisabled]);

  function toggle() {
    const player = video.current;
    intent.current = player.paused;
    if (player.paused) player.play().catch(() => {});
    else player.pause();
  }

  return (
    <div className={`simulator-preview ${className}`}>
      <div className={`simulator-frame ${frameClassName}`}>
        <video
          ref={video}
          data-simulator=""
          src={media.src}
          poster={media.poster}
          aria-label={media.label}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlay={() => {
            setPlaying(true);
            document
              .querySelectorAll("video:not([data-simulator])")
              .forEach((player) => player.pause());
          }}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
        {failed && (
          <div className="media-failure" role="alert">
            <p>{t("No se pudo reproducir el video.")}</p>
            <a href={media.src} download>
              {t("Descargar")}
            </a>
          </div>
        )}
      </div>
      <button
        className="simulator-control"
        onClick={toggle}
        disabled={failed}
        aria-label={`${playing ? local("Pausar", "Pause") : local("Reproducir", "Play")}: ${media.label}`}
      >
        {playing ? (
          <Pause size={13} aria-hidden="true" />
        ) : (
          <Play size={13} aria-hidden="true" />
        )}
        {playing ? local("Pausar", "Pause") : local("Reproducir", "Play")}
      </button>
    </div>
  );
}
