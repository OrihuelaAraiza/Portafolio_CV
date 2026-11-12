import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import "./video.css";

// Callers may autoplay only after an explicit play action; no eager media fetch.
export default function ProjectVideo({
  media,
  className = "",
  autoPlay = false,
  ...props
}) {
  const ref = useRef(null);
  const [failedSource, setFailedSource] = useState(null);
  const { t } = useLanguage();
  useEffect(() => {
    const video = ref.current;
    const pause = () => video.pause();
    const visibility = () => {
      if (document.hidden) pause();
    };
    // Start once, after the requested player is visible. This also survives
    // StrictMode's setup/cleanup cycle without leaving autoplay paused at 0.
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause();
      else if (autoPlay && !started && !document.hidden) {
        started = true;
        video.play().catch(() => {}); // Native controls remain available.
      }
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [media.src, autoPlay]);
  return (
    <>
      <video
        ref={ref}
        className={className}
        src={media.src}
        poster={media.poster}
        aria-label={media.label}
        controls
        playsInline
        preload="none"
        onError={() => setFailedSource(media.src)}
        onPlay={() =>
          document.querySelectorAll("video").forEach((video) => {
            if (video !== ref.current) video.pause();
          })
        }
        {...props}
      />
      {failedSource === media.src && (
        <div className="media-failure" role="alert">
          <p>{t("No se pudo reproducir el video.")}</p>
          <a href={media.src} download>
            {t("Descargar")} · {media.label}
          </a>
        </div>
      )}
    </>
  );
}
