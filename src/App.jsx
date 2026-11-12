import { useLanguage } from "@/hooks/useLanguage";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import LanguageProvider from "@/components/LanguageProvider";
import AppearanceProvider from "@/components/AppearanceProvider";
import { useAppearance } from "@/hooks/useAppearance";
import Header from "@/components/portfolio/Header";
import Hero, { StackStrip } from "@/components/portfolio/Hero";
import Prologue from "@/components/portfolio/Prologue";
import Work from "@/components/portfolio/Work";
import Approach from "@/components/portfolio/Approach";
import Lab from "@/components/portfolio/Lab";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import IOSSection from "@/components/portfolio/IOSSection";
const CommandPalette = lazy(() => import("@/components/CommandPalette"));
import { site } from "@/data/site";
// El import se guarda aparte para poder precargarlo: la transición compartida
// necesita que la ficha se monte en el mismo fotograma en que se abre, y con el
// chunk todavía en la red React mostraría el estado de carga.
const importProjectDetail = () => import("@/components/ProjectDetail");
const ProjectDetail = lazy(importProjectDetail);
// Scroll suave, cursor y riel de capítulos: adornos que llegan después de la
// primera pintura y que la página no necesita para funcionar.
const Effects = lazy(() => import("@/components/fx/Effects"));

function Portfolio() {
  const { t, projects } = useLanguage();
  const [activeProjectId, setActiveProjectId] = useState(() =>
    new URLSearchParams(window.location.search).get("project"),
  );
  const activeProject =
    projects.find((project) => project.id === activeProjectId) || null;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const opener = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const { motionDisabled: reduce } = useAppearance();
  const [effectsReady, setEffectsReady] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback;
    const show = () => setEffectsReady(true);
    const handle = idle ? idle(show, { timeout: 2000 }) : setTimeout(show, 600);
    return () =>
      idle ? window.cancelIdleCallback(handle) : clearTimeout(handle);
  }, []);
  useEffect(() => {
    const idle = window.requestIdleCallback;
    const preload = () => importProjectDetail();
    const handle = idle ? idle(preload) : setTimeout(preload, 1500);
    return () =>
      idle ? window.cancelIdleCallback(handle) : clearTimeout(handle);
  }, []);
  useEffect(() => {
    function onKeyDown(event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key?.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, []);
  useEffect(() => {
    function onPopState() {
      setActiveProjectId(
        new URLSearchParams(window.location.search).get("project"),
      );
    }
    window.addEventListener("popstate", onPopState);
    const target =
      {
        "/about": "sobre-mi",
        "/web": "proyectos",
        "/apps": "proyectos",
        "/games": "laboratorio",
      }[window.location.pathname] || window.location.hash.slice(1);
    if (target)
      requestAnimationFrame(() =>
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "instant" }),
      );
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    document.title = activeProject
      ? `${activeProject.title} — Juan Pablo Orihuela`
      : site.title;
  }, [activeProject]);
  function openProject(project, trigger) {
    function apply() {
      opener.current = trigger;
      setActiveProjectId(project.id);
      const url = new URL(window.location.href);
      url.searchParams.set("project", project.id);
      window.history.pushState({ project: project.id }, "", url);
    }

    // La portada de la tarjeta y la captura de la ficha comparten un nombre de
    // transición, así que el navegador interpola de una a otra en lugar de
    // hacerlas aparecer y desaparecer. Sin soporte, o con el movimiento
    // reducido, se abre igual sin animar.
    const cover = trigger
      ?.closest?.(".project-card")
      ?.querySelector("[data-cover]");
    if (reduce || !document.startViewTransition || !cover) return apply();

    cover.style.viewTransitionName = "project-cover";
    document.startViewTransition(() => {
      // Se libera antes de montar la ficha: dos elementos no pueden llevar el
      // mismo nombre en el mismo fotograma.
      cover.style.viewTransitionName = "";
      flushSync(apply);
    });
  }
  function closeProject() {
    setActiveProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState({}, "", url);
  }
  return (
    <TooltipProvider delayDuration={200}>
      <a href="#proyectos" className="skip-link">
        {t("Saltar a los proyectos")}
      </a>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <StackStrip />
        <Prologue />
        <IOSSection onOpen={openProject} />
        <Work onOpen={openProject} />
        <Lab onOpenProject={openProject} />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
      {effectsReady && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
      {paletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            open={paletteOpen}
            onOpenChange={setPaletteOpen}
            onOpenProject={openProject}
          />
        </Suspense>
      )}
      <Dialog
        open={!!activeProject}
        onOpenChange={(open) => {
          if (!open) closeProject();
        }}
      >
        {activeProject && (
          <Suspense
            fallback={
              <DialogContent className="detail-loading">
                <DialogTitle>{t("Cargando proyecto")}</DialogTitle>
                <DialogDescription>
                  {t("Preparando las capturas…")}
                </DialogDescription>
              </DialogContent>
            }
          >
            <ProjectDetail
              key={activeProject.id}
              project={activeProject}
              returnFocus={opener.current}
            />
          </Suspense>
        )}
      </Dialog>
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppearanceProvider>
        <Portfolio />
      </AppearanceProvider>
    </LanguageProvider>
  );
}
