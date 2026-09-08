import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FiGithub as Github } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProjectDetail({ project, returnFocus }) {
  const [screen, setScreen] = useState(0);
  const current = project.screens[screen];
  return (
    <DialogContent
      className="project-dialog"
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        (returnFocus || document.querySelector("#proyectos button"))?.focus({
          preventScroll: true,
        });
      }}
    >
      <div className="detail-heading">
        <span className="eyebrow">
          {project.categoryLabel} <span> / {project.year}</span>
        </span>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.description}</DialogDescription>
      </div>
      <figure
        className={`detail-gallery ${project.theme} ${project.category === "mobile" ? "is-mobile" : ""}`}
      >
        <img
          // El mismo nombre que lleva la portada de la tarjeta: el navegador
          // interpola entre ambas al abrir la ficha. Solo se aplica a la primera
          // captura, que es la que la tarjeta mostraba.
          style={screen === 0 ? { viewTransitionName: "project-cover" } : undefined}
          src={current.src}
          alt={`${project.title}: ${current.label}`}
          width={project.category === "mobile" ? 600 : 1440}
          height={project.category === "mobile" ? 1304 : 1000}
        />
        <figcaption>
          <span>{current.label}</span>
          <div className="gallery-controls">
            <Button
              variant="ghost"
              size="icon"
              disabled={project.screens.length < 2}
              aria-label="Captura anterior"
              onClick={() =>
                setScreen(
                  (screen - 1 + project.screens.length) %
                    project.screens.length,
                )
              }
            >
              <ArrowLeft />
            </Button>
            <span aria-live="polite">
              {screen + 1} / {project.screens.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={project.screens.length < 2}
              aria-label="Siguiente captura"
              onClick={() => setScreen((screen + 1) % project.screens.length)}
            >
              <ArrowRight />
            </Button>
          </div>
        </figcaption>
      </figure>
      <div className="detail-meta">
        <span>{project.role}</span>
        <span>{project.status}</span>
      </div>
      <div className="detail-story">
        {[
          ["El reto", project.challenge],
          ["La interfaz", project.design],
          ["La implementación", project.engineering],
        ].map(([title, text], index) => (
          <div key={title}>
            <span className="eyebrow">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="detail-footer">
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="detail-links">
          {project.repo && (
            <Button asChild variant="outline">
              <a href={project.repo} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" /> Código
              </a>
            </Button>
          )}
          {project.live && (
            <Button asChild>
              <a href={project.live} target="_blank" rel="noreferrer">
                Visitar proyecto <ArrowUpRight />
              </a>
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
