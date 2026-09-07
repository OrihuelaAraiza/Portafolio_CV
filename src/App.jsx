import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { projects } from "@/data/portfolio";
import Header from "@/components/portfolio/Header";
import Hero, { StackStrip } from "@/components/portfolio/Hero";
import Work from "@/components/portfolio/Work";
import Approach from "@/components/portfolio/Approach";
import Lab from "@/components/portfolio/Lab";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
const ProjectDetail = lazy(() => import("@/components/ProjectDetail"));

function Portfolio() {
  const [activeProject, setActiveProject] = useState(
    () =>
      projects.find(
        (project) =>
          project.id ===
          new URLSearchParams(window.location.search).get("project"),
      ) || null,
  );
  const opener = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const reduce = useReducedMotion();
  useEffect(() => {
    function onPopState() {
      setActiveProject(
        projects.find(
          (project) =>
            project.id ===
            new URLSearchParams(window.location.search).get("project"),
        ) || null,
      );
    }
    window.addEventListener("popstate", onPopState);
    const target = {
      "/about": "sobre-mi",
      "/web": "proyectos",
      "/apps": "proyectos",
      "/games": "laboratorio",
    }[window.location.pathname];
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
      : "Juan Pablo Orihuela — Frontend Developer & UI/UX";
  }, [activeProject]);
  function openProject(project, trigger) {
    opener.current = trigger;
    setActiveProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set("project", project.id);
    window.history.pushState({ project: project.id }, "", url);
  }
  function closeProject() {
    setActiveProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState({}, "", url);
  }
  return (
    <TooltipProvider delayDuration={200}>
      <a href="#proyectos" className="skip-link">
        Saltar a los proyectos
      </a>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <Header />
      <main>
        <Hero />
        <StackStrip />
        <Work onOpen={openProject} />
        <Approach />
        <Lab />
        <About />
        <Contact />
      </main>
      <Footer />
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
                <DialogTitle>Cargando proyecto</DialogTitle>
                <DialogDescription>Preparando las capturas…</DialogDescription>
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
    <MotionConfig reducedMotion="user">
      <Portfolio />
    </MotionConfig>
  );
}
