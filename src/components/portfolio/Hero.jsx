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
  Smartphone,
  MapPin,
  Download,
  Gamepad2,
} from "lucide-react";
import { FiFigma as Figma } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import DitherField from "@/components/fx/DitherField";
import Asterisk from "./Asterisk";
import Line from "./Line";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";
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
      className="hero-visual native-hero"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="canvas-label">
        <span className="crosshair">+</span>{" "}
        {t("NATIVO EN iOS. CREATIVO EN LA WEB.")}
      </div>
      <div className="canvas-grid" aria-hidden="true" />
      <motion.div
        className="composition"
        style={reduce ? undefined : { rotateX, rotateY }}
      >
        <motion.div
          className="mini-window native-web"
          style={reduce ? undefined : { y: backY, rotate: -7 }}
        >
          <div className="window-chrome">
            <i />
            <i />
            <i />
            <span>nexo · web & interaction</span>
          </div>
          <img
            src="/projects/nexo.webp"
            alt={t("Vista de Nexo CRM y sus visualizaciones de datos")}
            width="1440"
            height="1000"
          />
        </motion.div>
        <motion.div
          className="native-phone"
          style={reduce ? undefined : { y: frontY, rotate: 5 }}
        >
          <a href="#ios" aria-label={t("Explorar Loop, mi app iOS")}>
            <img
              src="/projects/loop/resume-es-light-normal.webp"
              alt={t("Loop: proyectos, Loopy y una pista para retomar")}
              width="600"
              height="1304"
              fetchPriority="high"
            />
          </a>
        </motion.div>
        <a className="native-app-label" href="#ios">
          <img src="/projects/loop/icon.webp" width="44" height="44" alt="" />
          <span>
            <strong>loop</strong>
            <small>SwiftUI · SwiftData</small>
          </span>
          <ArrowUpRight size={16} />
        </a>
        <div className="design-chip">
          <Smartphone aria-hidden="true" size={16} />
          <span>{t("Una idea. Una app propia.")}</span>
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
    <section ref={target} id="inicio" className="hero">
      <DitherField className="hero-field" />
      <div className="section-shell hero-shell">
        <Reveal className="hero-kicker">
          <TypewriterRole />
          <span className="eyebrow hero-edition">{t("PORTAFOLIO / 2026")}</span>
        </Reveal>
        <div className="hero-main">
          <div className="hero-copy">
            <h1>
              <Line delay={0.05}>{t("Interfaces")}</Line>
              <Line delay={0.16}>
                {t("con")}{" "}
                <span className="accent-word">
                  {t("intención")}
                  <span className="period">.</span>
                </span>
              </Line>
            </h1>
            <Reveal delay={0.3}>
              <p className="hero-intro">
                {t("Soy")} <strong>Juan Pablo Orihuela.</strong>{" "}
                {t(
                  "Desarrollo apps iOS con SwiftUI y experiencias web con React. Cuido la estructura del producto, sus interacciones y los detalles que hacen agradable usarlo.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.4} className="hero-ctas">
              <Magnetic>
                <Button asChild className="primary-cta">
                  <a href="#ios">
                    {t("Explorar mi trabajo iOS")} <ArrowDown size={17} />
                  </a>
                </Button>
              </Magnetic>
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
            <Reveal delay={0.5}>
              <a className="hero-game-link" href="#laboratorio">
                <Gamepad2 size={18} aria-hidden="true" />
                <span>
                  {t("Mi lado gamer, en código")}{" "}
                  <small>{t("Ver reel · 43 s")}</small>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
          <Reveal className="hero-visual-wrap" delay={0.25}>
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
      </div>
    </section>
  );
}

const tools = [
  { name: "Swift / SwiftUI", icon: <Smartphone /> },
  { name: "SwiftData" },
  { name: "StoreKit 2" },
  { name: "React", icon: <Code2 /> },
  { name: "Next.js", className: "next-logo" },
  { name: "TypeScript", icon: <b className="ts-logo">TS</b> },
  { name: "Tailwind CSS" },
  { name: "Motion", icon: <i />, className: "motion-logo" },
  { name: "Three.js" },
  { name: "Figma", icon: <Figma aria-hidden="true" /> },
  { name: "Unity / C#", icon: <Gamepad2 /> },
];

export function StackStrip() {
  const { t } = useLanguage();
  return (
    <div className="stack-strip">
      <div className="section-shell stack-inner">
        <span className="eyebrow">{t("MI CAJA DE HERRAMIENTAS")}</span>
        <Marquee className="stack-marquee" speed={38}>
          {tools.map((tool) => (
            <span key={tool.name} className="stack-item">
              <span className={tool.className}>
                {tool.icon} {tool.name}
              </span>
              <Asterisk className="stack-star" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
