import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAppearance } from "@/hooks/useAppearance";
import { useLanguage } from "@/hooks/useLanguage";
import "./effects.css";

// Capa de efectos que se carga en tiempo ocioso. Nada de lo que hay aquí es
// necesario para leer o navegar el portafolio: si el chunk no llega, la página
// es la misma con scroll nativo y sin adornos.

// Scroll suave con Lenis. La posición sigue siendo la del documento —anclas,
// teclado, lectores y scrollIntoView funcionan igual—; solo se interpola la
// rueda. Se apaga con el movimiento pausado y mientras hay un diálogo abierto.
function SmoothScroll() {
  const { motionDisabled } = useAppearance();
  useEffect(() => {
    if (motionDisabled) return;
    const lenis = new Lenis({
      lerp: 0.115,
      wheelMultiplier: 1,
      autoRaf: true,
      prevent: (node) =>
        Boolean(
          node.closest?.('[role="dialog"], [cmdk-root], video, textarea'),
        ),
      virtualScroll: () => !document.body.hasAttribute("data-scroll-locked"),
    });
    // Keep an anchor's destination accurate while deferred sections change
    // the page height. The next user interaction releases that destination.
    let anchorTarget = null;
    function scrollToAnchor() {
      if (!anchorTarget?.isConnected) return;
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      lenis.resize();
      lenis.scrollTo(
        anchorTarget.getBoundingClientRect().top + window.scrollY - padding,
      );
    }
    const resize = new ResizeObserver(scrollToAnchor);
    resize.observe(document.body);
    const releaseAnchor = () => {
      anchorTarget = null;
    };
    const interruptions = ["wheel", "touchstart", "pointerdown", "keydown"];
    interruptions.forEach((type) =>
      window.addEventListener(type, releaseAnchor, { passive: true }),
    );
    // Las anclas se resuelven aquí y no con la opción `anchors` de Lenis: así
    // no compiten el salto nativo y la interpolación, el hash se sigue
    // escribiendo en la URL y, desde el teclado, el foco viaja con el scroll.
    // El destino se calcula con la posición real del documento, no con la que
    // Lenis tenga interpolada en ese instante.
    function onClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || link.closest('[role="dialog"]')) return;
      const target = document.getElementById(
        decodeURIComponent(link.hash.slice(1)),
      );
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== link.hash)
        window.history.pushState(window.history.state, "", link.hash);
      anchorTarget = target;
      scrollToAnchor();
      if (event.detail === 0) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
    document.addEventListener("click", onClick);
    document.documentElement.classList.add("has-smooth-scroll");
    return () => {
      resize.disconnect();
      interruptions.forEach((type) =>
        window.removeEventListener(type, releaseAnchor),
      );
      document.removeEventListener("click", onClick);
      document.documentElement.classList.remove("has-smooth-scroll");
      lenis.destroy();
    };
  }, [motionDisabled]);
  return null;
}

// Un punto que sigue al ratón y se convierte en etiqueta sobre lo que se puede
// abrir. El cursor del sistema no se oculta: esto lo acompaña.
function Cursor() {
  const { motionDisabled } = useAppearance();
  const [label, setLabel] = useState("");
  const [state, setState] = useState("hidden");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });
  const fine = useRef(
    typeof matchMedia === "function" &&
      matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const enabled = fine.current && !motionDisabled;
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let seen = false;
    function read(element) {
      const target = element?.closest?.("[data-cursor]");
      if (target) {
        setLabel(target.dataset.cursor);
        setState("label");
      } else if (
        element?.closest?.(
          "a, button, [role='tab'], input, select, textarea, label",
        )
      )
        setState("link");
      else setState("idle");
    }
    function move(event) {
      if (event.pointerType !== "mouse") return;
      seen = true;
      x.set(event.clientX);
      y.set(event.clientY);
      read(event.target);
    }
    // Al hacer scroll el contenido pasa bajo un puntero quieto: se vuelve a
    // leer qué hay debajo, una vez por fotograma.
    function scroll() {
      if (frame || !seen) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read(document.elementFromPoint(x.get(), y.get()));
      });
    }
    const hide = () => setState("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, x, y]);
  if (!enabled) return null;
  return (
    <motion.div
      className="cursor-follower"
      data-state={state}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <span className="cursor-shape">
        <span className="cursor-text">{label}</span>
      </span>
    </motion.div>
  );
}

const chapters = [
  { id: "inicio", label: "Inicio" },
  { id: "prologo", label: "Prólogo" },
  { id: "ios", label: "iOS" },
  { id: "proyectos", label: "Proyectos" },
  { id: "laboratorio", label: "Videojuegos" },
  { id: "enfoque", label: "Mi enfoque" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

// El portafolio como capítulos: un riel al margen dice en cuál estás. Repite la
// navegación de la cabecera, así que queda fuera del árbol de accesibilidad y
// del orden de tabulación; con ratón, cada marca lleva a su sección.
function ChapterRail() {
  const { t } = useLanguage();
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="chapter-rail" data-chapter={active} aria-hidden="true">
      {chapters.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          tabIndex={-1}
          className={active === chapter.id ? "active" : ""}
        >
          <span className="chapter-label">
            {String(index).padStart(2, "0")} {t(chapter.label)}
          </span>
          <i />
        </a>
      ))}
    </div>
  );
}

export default function Effects() {
  return (
    <>
      <SmoothScroll />
      <ChapterRail />
      <Cursor />
    </>
  );
}
