import { useLanguage } from "@/hooks/useLanguage";
import { useRef } from "react";
import { useAppearance } from "@/hooks/useAppearance";
import TypewriterRole from "./TypewriterRole";
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  Code2,
  MousePointer2,
  MapPin,
  Download,
} from "lucide-react";
import { FiFigma as Figma } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Reveal from "./Reveal";

function HeroVisual({ scrollProgress }) {
  const { t } = useLanguage();
  const { motionDisabled: reduce } = useAppearance();
  const backY = useTransform(scrollProgress, [0, 1], [0, -65]);
  const frontY = useTransform(scrollProgress, [0, 1], [0, 70]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 25 });
  const springY = useSpring(y, { stiffness: 100, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  function move(event) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  }
  return (
    <div
      className="hero-visual"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="canvas-label">
        <span className="crosshair">+</span> {t("DE LA IDEA A LA INTERFAZ")}
      </div>
      <div className="canvas-grid" aria-hidden="true" />
      <motion.div
        className="composition"
        style={reduce ? undefined : { rotateX, rotateY }}
      >
        <motion.div
          className="mini-window window-back"
          style={reduce ? undefined : { y: backY, rotate: -8 }}
        >
          <div className="window-chrome">
            <i />
            <i />
            <i />
            <span>romi · web experience</span>
          </div>
          <img
            src="/projects/romi.webp"
            alt={t("Vista del sitio ROMI, desarrollado por Juan Pablo")}
            width="1440"
            height="1000"
            fetchPriority="high"
          />
        </motion.div>
        <motion.div
          className="mini-window window-front"
          style={reduce ? undefined : { y: frontY, rotate: 5 }}
        >
          <div className="window-chrome">
            <i />
            <i />
            <i />
            <span>one pharmacy · e-commerce</span>
            <ArrowUpRight size={11} />
          </div>
          <img
            src="/projects/one-pharmacy.webp"
            alt={t("Vista del catálogo de One Pharmacy")}
            width="1440"
            height="1000"
            fetchPriority="high"
          />
        </motion.div>
        <div className="design-chip">
          <Figma aria-hidden="true" size={16} />
          <span>{t("Diseño que se convierte en código.")}</span>
        </div>
        <div className="cursor-chip" aria-hidden="true">
          <MousePointer2 fill="currentColor" size={23} />
          <span>JP</span>
        </div>
      </motion.div>
      <div className="canvas-footer">
        <span>
          <span className="status-dot" /> {t("IDEAS EN MOVIMIENTO")}
        </span>
        <Code2 size={16} />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const target = useRef(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  return (
    <section ref={target} id="inicio" className="hero section-shell">
      <Reveal className="hero-kicker">
        <TypewriterRole />
        <span className="eyebrow hero-edition">{t("PORTAFOLIO / 2026")}</span>
      </Reveal>
      <div className="hero-main">
        <div className="hero-copy">
          <Reveal>
            <h1>
              {t("Interfaces")}
              <br />
              {t("con")}{" "}
              <span className="accent-word">
                {t("intención")}
                <span className="period">.</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-intro">
              {t("Soy")} <strong>Juan Pablo Orihuela.</strong>{" "}
              {t(
                "Conecto diseño y código para crear experiencias digitales que se ven bien. Y se sienten todavía mejor.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="hero-ctas">
            <Button asChild className="primary-cta">
              <a href="#proyectos">
                {t("Explorar mi trabajo")} <ArrowDown size={17} />
              </a>
            </Button>
            <a
              className="text-link"
              href="/JuanPabloOrihuela_CV.pdf"
              hrefLang="es"
              title={t("CV en español")}
              download
            >
              {t("Descargar CV")} <Download size={16} />
            </a>
          </Reveal>
        </div>
        <Reveal className="hero-visual-wrap" delay={0.15}>
          <HeroVisual scrollProgress={scrollYProgress} />
        </Reveal>
      </div>
      <Reveal className="hero-bottom">
        <span className="location">
          <MapPin size={14} /> {t("Ciudad de México")}{" "}
          <span className="slash">/</span>{" "}
          {t("Diseñando para cualquier lugar.")}
        </span>
        <a href="#proyectos" className="scroll-cue">
          {t("UN POCO DE SCROLL, MUCHO QUE VER")} <ArrowDown size={14} />
        </a>
      </Reveal>
    </section>
  );
}

export function StackStrip() {
  const { t } = useLanguage();
  return (
    <div className="stack-strip">
      <div className="section-shell stack-inner">
        <span className="eyebrow">{t("MI CAJA DE HERRAMIENTAS")}</span>
        <div className="stack-names">
          <span>
            <Code2 /> React
          </span>
          <span className="next-logo">Next.js</span>
          <span>
            <b className="ts-logo">TS</b> TypeScript
          </span>
          <span>
            <Figma aria-hidden="true" /> Figma
          </span>
          <span className="motion-logo">
            <i /> Motion
          </span>
          <span>
            SwiftUI <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
