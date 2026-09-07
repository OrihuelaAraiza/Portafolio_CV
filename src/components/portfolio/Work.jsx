import { useAppearance } from "@/hooks/useAppearance";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, profile } from "@/data/portfolio";
import Reveal from "./Reveal";

const filters = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "iOS & Mobile" },
];
function ProjectCard({ project, onOpen, index }) {
  const { motionDisabled: reduce } = useAppearance();
  const mobile = project.category === "mobile";
  return (
    <motion.article
      className="project-card"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
    >
      <Button
        variant="ghost"
        className={`project-art ${project.theme} ${mobile ? "mobile-art" : ""}`}
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`Ver proyecto ${project.title}`}
      >
        <span className="project-art-top">
          <span>{project.categoryLabel}</span>
          <span>{project.year}</span>
        </span>
        {mobile ? (
          <div className="phone-pair">
            <div className="phone-frame phone-secondary">
              <img
                src={project.screens[1].src}
                alt=""
                width="600"
                height="1304"
                loading="lazy"
              />
            </div>
            <div className="phone-frame phone-primary">
              <img
                src={project.cover}
                alt={`${project.title}: ${project.screens[0].label}`}
                width="600"
                height="1304"
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="project-browser">
            <div className="window-chrome">
              <i />
              <i />
              <i />
              <span>{new URL(project.live).hostname}</span>
            </div>
            <img
              src={project.cover}
              alt={`Captura real de ${project.title}`}
              width="1440"
              height="1000"
              loading="lazy"
            />
          </div>
        )}
        <span className="project-open">
          <ArrowUpRight size={20} />
          <span>Explorar proyecto</span>
        </span>
      </Button>
      <div className="project-info">
        <div>
          <h3>
            <button onClick={(event) => onOpen(project, event.currentTarget)}>
              {project.title}
            </button>
            <span>{project.number}</span>
          </h3>
          <p>{project.subtitle}</p>
        </div>
        <ArrowUpRight
          size={23}
          className="project-info-arrow"
          aria-hidden="true"
        />
      </div>
      <div className="tags">
        {project.stack.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Work({ onOpen }) {
  const [filter, setFilter] = useState(
    () =>
      ({ "/web": "web", "/apps": "mobile" })[window.location.pathname] || "all",
  );
  return (
    <section id="proyectos" className="work-section section-shell">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="section-index">01 /</span> TRABAJO SELECCIONADO
            </span>
            <h2>
              Del concepto
              <br />a la <span className="serif-word">experiencia.</span>
            </h2>
          </div>
          <p>
            Productos reales, exploraciones y muchas
            <br className="desktop-break" /> decisiones detrás de cada píxel.
          </p>
        </div>
      </Reveal>
      <Tabs value={filter} onValueChange={setFilter}>
        <div className="work-toolbar">
          <TabsList className="project-filters" aria-label="Filtrar proyectos">
            {filters.map(({ id, label }) => (
              <TabsTrigger key={id} value={id}>
                {label}
                <span>
                  {id === "all"
                    ? projects.length.toString().padStart(2, "0")
                    : projects
                        .filter((project) => project.category === id)
                        .length.toString()
                        .padStart(2, "0")}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <a
            className="text-link github-all"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            Todo en GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        {filters.map(({ id }) => (
          <TabsContent key={id} value={id} className="project-grid">
            {projects
              .filter((project) => id === "all" || project.category === id)
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={onOpen}
                  index={index}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
      <a
        className="text-link mobile-github"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
      >
        Explorar todos mis repositorios <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
