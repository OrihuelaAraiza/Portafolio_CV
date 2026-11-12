import { useLanguage } from "@/hooks/useLanguage";
import { useAppearance } from "@/hooks/useAppearance";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profile } from "@/data/portfolio";
import Line from "./Line";
import Reveal from "./Reveal";

const filters = [
  { id: "featured", label: "Selección" },
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "games", label: "Videojuegos" },
  { id: "mobile", label: "iOS & Mobile" },
];
const matches = (project, filter) =>
  filter === "all" || (filter === "featured" ? project.featured : project.category === filter);
// La portada se inclina hacia el puntero y un foco de luz lo sigue. Todo va por
// variables CSS sobre el propio botón: mover el ratón no vuelve a renderizar.
function tilt(event) {
  if (event.pointerType !== "mouse") return;
  const art = event.currentTarget;
  const box = art.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  art.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
  art.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  art.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
  art.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
}
function settle(event) {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
}

function ProjectCard({ project, onOpen, index }) {
  const { t } = useLanguage();
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
        onPointerMove={reduce ? undefined : tilt}
        onPointerLeave={reduce ? undefined : settle}
        data-cursor={t("Ver")}
        data-project-id={project.id}
        aria-label={t("Ver proyecto {title}", { title: project.title })}
      >
        <span className="project-art-top">
          <span>{project.categoryLabel}</span>
          <span>{project.year}</span>
        </span>
        <span className="project-glow" aria-hidden="true" />
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
                data-cover=""
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
              <span>{project.live ? new URL(project.live).hostname : project.stack.slice(0, 2).join(" · ")}</span>
            </div>
            <img
              data-cover=""
              src={project.cover}
              alt={t("Captura real de {title}", { title: project.title })}
              width="1440"
              height="1000"
              loading="lazy"
            />
          </div>
        )}
        <span className="project-open">
          <ArrowUpRight size={20} />
          <span>{t("Explorar proyecto")}</span>
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
      {project.proof && <p className="project-proof">{project.proof}</p>}
      <div className="project-card-meta">
        <span>{project.role}</span>
        <span>{project.status}</span>
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
  const { t, projects } = useLanguage();
  const [filter, setFilter] = useState(
    () =>
      ({ "/web": "web", "/apps": "mobile" })[window.location.pathname] || "featured",
  );
  return (
    <section id="proyectos" className="work-section section-shell">
      <Reveal>
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="section-index">01 /</span>{" "}
              {t("TRABAJO SELECCIONADO")}
            </span>
            <h2>
              <Line>{t("Del concepto")}</Line>{" "}
              <Line delay={0.1}>
                {t("a la")}{" "}
                <span className="serif-word">{t("experiencia.")}</span>
              </Line>
            </h2>
          </div>
          <p>
            {t("Productos reales, exploraciones y muchas")}
            <br className="desktop-break" />{" "}
            {t("decisiones detrás de cada píxel.")}
          </p>
        </div>
      </Reveal>
      <Tabs value={filter} onValueChange={setFilter}>
        <div className="work-toolbar">
          <TabsList
            className="project-filters"
            aria-label={t("Filtrar proyectos")}
          >
            {filters.map(({ id, label }) => (
              <TabsTrigger key={id} value={id}>
                {t(label)}
                <span>
                  {projects.filter((project) => matches(project, id)).length.toString().padStart(2, "0")}
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
            {t("Todo en GitHub")} <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="selection-note" aria-live="polite">
          {filter === "featured"
            ? t("Empieza por estos cuatro: producto, datos, interacción y videojuegos.")
            : t("{count} proyectos · Abre una ficha para explorar decisiones, capturas y código.", { count: projects.filter((project) => matches(project, filter)).length })}
        </p>
        {filters.map(({ id }) => (
          <TabsContent key={id} value={id} className="project-grid">
            {projects
              .filter((project) => matches(project, id))
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
        {t("Explorar todos mis repositorios")} <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
