import { useLanguage } from "@/hooks/useLanguage";
import {
  AudioLines,
  ArrowUpRight,
  Boxes,
  HeartPulse,
  ScanEye,
} from "lucide-react";
import { experiments } from "@/data/portfolio";
import GameReel from "./GameReel";
import Line from "./Line";
import Reveal from "./Reveal";

const icons = { audio: AudioLines, eye: ScanEye, pulse: HeartPulse, ar: Boxes };

export default function Lab({ onOpenProject }) {
  const { t, projects } = useLanguage();
  return (
    <section id="laboratorio" className="lab-section">
      <div className="section-shell">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-index">03 /</span>{" "}
                {t("MÁS ALLÁ DEL NAVEGADOR")}
              </span>
              <h2>
                <Line>{t("La curiosidad")}</Line>{" "}
                <Line delay={0.1}>
                  {t("también")}{" "}
                  <span className="serif-word">{t("se programa.")}</span>
                </Line>
              </h2>
            </div>
            <p>
              {t("Mi formación en animación y videojuegos")}
              <br className="desktop-break" />{" "}
              {t("también vive en lo que construyo.")}
            </p>
          </div>
        </Reveal>
        <Reveal>
          <GameReel />
          <div className="game-bridge">
            <div>
              <span className="eyebrow">{t("DEL JUEGO AL FRONTEND")}</span>
              <h3>{t("Cada acción merece una respuesta.")}</h3>
              <p>
                {t(
                  "Estados claros, feedback inmediato y movimiento con propósito. La misma atención que necesita un jugador para entender una acción también hace más clara una interfaz.",
                )}
              </p>
            </div>
            <button
              className="text-link"
              onClick={(event) =>
                onOpenProject(
                  projects.find((project) => project.id === "we-can-fix-this"),
                  event.currentTarget,
                )
              }
            >
              {t("Explorar el caso técnico")} <ArrowUpRight size={17} />
            </button>
          </div>
        </Reveal>
        <Reveal className="experiments-head">
          <span className="eyebrow">{t("OTRAS EXPLORACIONES")}</span>
          <span className="eyebrow">
            {String(experiments.length).padStart(2, "0")}
          </span>
        </Reveal>
        <div className="experiments">
          {experiments.map((experiment, index) => {
            const Icon = icons[experiment.icon] || AudioLines;
            return (
              <Reveal key={experiment.name} delay={Math.min(index * 0.05, 0.15)}>
                <a
                  className="experiment"
                  href={experiment.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={`experiment-symbol ${experiment.icon}`}>
                    <Icon size={38} strokeWidth={1.3} />
                  </div>
                  <div className="experiment-content">
                    <span className="eyebrow">{t(experiment.type)}</span>
                    <h3>{experiment.name}</h3>
                    <p>{t(experiment.description)}</p>
                  </div>
                  <span className="experiment-link">
                    {t("Ver código")} <ArrowUpRight size={24} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
