import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const clips = [
  {
    id: "trailer",
    label: "Tráiler",
    length: "00:43",
    source: "/videos/we-can-fix-this-trailer.mp4",
    poster: "/videos/trailer-poster.webp",
    audio: true,
  },
  {
    id: "gameplay",
    label: "Gameplay",
    length: "02:21",
    source: "/videos/we-can-fix-this-gameplay.mp4",
    poster: "/videos/gameplay-poster.webp",
    audio: false,
  },
];

export default function GameReel() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("trailer");
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef(null);
  const clip = clips.find((item) => item.id === selected);
  useEffect(() => {
    const player = video.current;
    if (!started || !player) return;
    // Reels never autoplay on page load and stop when the player leaves the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) player.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(player);
    const pauseHidden = () => {
      if (document.hidden) player.pause();
    };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseHidden);
      player.pause();
    };
  }, [started, selected]);
  function selectClip(value) {
    setSelected(value);
    setStarted(false);
    setFailed(false);
  }
  return (
    <article className="game-reel">
      <div className="reel-intro">
        <div>
          <span className="eyebrow">{t("UNITY · C# · MULTIJUGADOR")}</span>
          <h3>
            We Can Fix This<span>_</span>
          </h3>
        </div>
        <a
          className="text-link"
          href="https://github.com/OrihuelaAraiza/We_Can_Fix_This_"
          target="_blank"
          rel="noreferrer"
        >
          {t("Explorar el código")} <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="reel-screen" id="game-reel-player">
        {started ? (
          <video
            ref={video}
            key={clip.id}
            controls
            autoPlay
            playsInline
            preload="none"
            src={clip.source}
            poster={clip.poster}
            aria-label={t("{clip} de We Can Fix This", { clip: t(clip.label) })}
            onError={() => setFailed(true)}
          >
            {t("Tu navegador no puede reproducir este video.")}
          </video>
        ) : (
          <Button
            variant="ghost"
            className="reel-cover"
            onClick={() => setStarted(true)}
            aria-label={t("Reproducir {clip} de We Can Fix This", {
              clip: t(clip.label).toLowerCase(),
            })}
          >
            <img
              src={clip.poster}
              alt=""
              width="832"
              height="464"
              loading="lazy"
            />
            <span className="reel-shade" />
            <span className="reel-play">
              <Play size={26} fill="currentColor" />
              <span>
                {t("VER")} {t(clip.label).toUpperCase()}
                <small>{clip.length}</small>
              </span>
            </span>
            <span className="reel-corner">
              {t("UN MUNDO QUE RESPONDE A LO QUE HACES.")}
            </span>
          </Button>
        )}
        {failed && (
          <div className="video-error" role="alert">
            <p>{t("No se pudo reproducir el video.")}</p>
            <a href={clip.source} download>
              {t("Descargar")} {t(clip.label).toLowerCase()}
            </a>
          </div>
        )}
      </div>
      <div className="reel-bottom">
        <Tabs value={selected} onValueChange={selectClip}>
          <TabsList
            className="reel-tabs"
            aria-label={t("Seleccionar video de We Can Fix This")}
          >
            {clips.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                aria-controls="game-reel-player"
              >
                {t(item.label)}
                <span>{item.length}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <span className="reel-audio">
          {clip.audio ? <Volume2 size={14} /> : <VolumeX size={14} />}{" "}
          {clip.audio ? t("Con audio") : t("Demo sin audio")}
        </span>
      </div>
      <p className="reel-description">
        {t(
          "Cooperación, sistemas interactivos y respuesta visual. Un prototipo multijugador donde el game design se convierte en una experiencia compartida.",
        )}
      </p>
    </article>
  );
}
