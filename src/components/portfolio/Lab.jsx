import { AudioLines, Gamepad2, ArrowUpRight } from "lucide-react";
import { experiments } from "@/data/portfolio";
import GameReel from "./GameReel";
import Reveal from "./Reveal";

export default function Lab() {
  return (
    <section id="laboratorio" className="lab-section section-shell">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="section-index">03 /</span> MÁS ALLÁ DEL NAVEGADOR
            </span>
            <h2>
              La curiosidad
              <br />
              también <span className="serif-word">se programa.</span>
            </h2>
          </div>
          <p>
            Mi formación en animación y videojuegos
            <br className="desktop-break" /> también vive en lo que construyo.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <GameReel />
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
                  <span className="eyebrow">{experiment.type}</span>
                  <h3>{experiment.name}</h3>
                  <p>{experiment.description}</p>
                </div>
                <span className="experiment-link">
                  Ver código <ArrowUpRight size={24} />
                </span>
              </a>
            </Reveal>
          ))}
      </div>
    </section>
  );
}
