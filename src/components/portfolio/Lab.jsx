import { useLanguage } from "@/hooks/useLanguage";
import { AudioLines, Gamepad2, ArrowUpRight } from "lucide-react";
import { experiments } from "@/data/portfolio";
import GameReel from "./GameReel";
import Reveal from "./Reveal";

export default function Lab({ onOpenProject }) {
  const { t, projects } = useLanguage();
  return (
    <section id="laboratorio" className="lab-section section-shell">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="section-index">02 /</span>{" "}
              {t("MÁS ALLÁ DEL NAVEGADOR")}
            </span>
            <h2>
              {t("La curiosidad")}
              <br />
              {t("también")}{" "}
              <span className="serif-word">{t("se programa.")}</span>
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
            <p>{t("Estados claros, feedback inmediato y movimiento con propósito. La misma atención que necesita un jugador para entender una acción también hace más clara una interfaz.")}</p>
          </div>
          <button className="text-link" onClick={(event) => onOpenProject(projects.find((project) => project.id === "we-can-fix-this"), event.currentTarget)}>
            {t("Explorar el caso técnico")} <ArrowUpRight size={17} />
          </button>
        </div>
      </Reveal>
      <div className="experiments">
        {experiments
          .filter((experiment) => experiment.icon !== "game")
          .map((experiment) => (
            <Reveal key={experiment.name}>
              <a
                className="experiment"
                href={experiment.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className={`experiment-symbol ${experiment.icon}`}>
                  {experiment.icon === "audio" ? (
                    <AudioLines size={42} strokeWidth={1.3} />
                  ) : (
                    <Gamepad2 size={42} strokeWidth={1.3} />
                  )}
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
          ))}
      </div>
    </section>
  );
}
