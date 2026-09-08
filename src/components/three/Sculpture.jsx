import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useRef, useState } from "react";
import { useAppearance } from "@/hooks/useAppearance";
import Asterisk from "@/components/portfolio/Asterisk";

export default function Sculpture({ progress }) {
  const { t } = useLanguage();
  const canvas = useRef(null);
  const engine = useRef(null);
  const { theme, motionDisabled } = useAppearance();
  const latest = useRef({ theme, motionDisabled });
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    latest.current = { theme, motionDisabled };
    engine.current?.setTheme(theme);
    engine.current?.setReduced(motionDisabled);
  }, [theme, motionDisabled]);
  useEffect(() => {
    let cancelled = false;
    let started = false;
    const target = canvas.current;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();
        try {
          const { createSculpture } = await import("./createSculpture");
          if (cancelled) return;
          engine.current = createSculpture(target, {
            theme: latest.current.theme,
            reduced: latest.current.motionDisabled,
            progress,
            onLost: (lost) => setStatus(lost ? "fallback" : "ready"),
          });
          setStatus("ready");
        } catch {
          if (!cancelled) setStatus("fallback");
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [progress]);
  return (
    <div className="sculpture-container" data-scene-status={status}>
      <canvas
        ref={canvas}
        aria-label={t(
          "Escultura 3D de un nudo orbital, con anillos y formas geométricas",
        )}
        role="img"
        className={status === "fallback" ? "sculpture-hidden" : ""}
      />
      {status !== "ready" && (
        <div className="sculpture-fallback" aria-hidden="true">
          <span>
            <Asterisk />
          </span>
          <small>
            {status === "loading"
              ? t("DANDO FORMA A LA IDEA")
              : t("DISEÑO · CÓDIGO · MOVIMIENTO")}
          </small>
        </div>
      )}
    </div>
  );
}
