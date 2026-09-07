import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Box, Code2, MousePointer2 } from "lucide-react";
import { FiFigma as Figma } from "react-icons/fi";
import { useAppearance } from "@/hooks/useAppearance";
import Sculpture from "@/components/three/Sculpture";
import Reveal from "./Reveal";

const stages = [
  {
    number: "01",
    name: "La intención",
    title: "Primero, una buena pregunta.",
    text: "Antes del primer píxel está la persona que va a usarlo. Entender el contexto, ordenar las ideas y encontrar lo que de verdad importa.",
    tags: "FLUJOS · JERARQUÍA · CONTEXTO",
    icon: MousePointer2,
  },
  {
    number: "02",
    name: "El sistema",
    title: "Después, todo encuentra su lugar.",
    text: "La forma deja de ser un boceto. Tipografía, componentes y estados empiezan a hablar el mismo idioma, del prototipo a la interfaz.",
    tags: "FIGMA · UI SYSTEMS · COMPONENTES",
    icon: Figma,
  },
  {
    number: "03",
    name: "La experiencia",
    title: "Y entonces, cobra vida.",
    text: "El movimiento conecta una acción con su respuesta. Mi formación en animación y videojuegos se encuentra con el frontend: ritmo, profundidad y atención al detalle.",
    tags: "REACT · THREE.JS · INTERACCIÓN",
    icon: Code2,
  },
];

function StoryStep({ stage, reduced }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [42, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.45, 1]);
  const Icon = stage.icon;
  return (
    <article ref={ref} className="story-step" id={`enfoque-${stage.number}`}>
      <motion.div style={reduced ? undefined : { y, opacity }}>
        <div className="story-step-top">
          <span className="eyebrow">
            {stage.number} / {stage.name}
          </span>
          <Icon size={23} aria-hidden="true" />
        </div>
        <h3>{stage.title}</h3>
        <p>{stage.text}</p>
        <span className="eyebrow story-tags">{stage.tags}</span>
      </motion.div>
    </article>
  );
}

export default function Approach() {
  const timeline = useRef(null);
  const { motionDisabled } = useAppearance();
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({
    target: timeline,
    offset: ["start 50%", "end 85%"],
  });
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(2, Math.floor(Math.max(0, value) * 3));
    setChapter((current) => (current === next ? current : next));
  });
  return (
    <section
      id="enfoque"
      className={`approach-section scrolly-section ${motionDisabled ? "motion-static" : ""}`}
    >
      <div className="section-shell">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-index">02 /</span> DE LA IDEA A LO QUE
                SIENTES
              </span>
              <h2>
                El detalle no es el final.
                <br />
                Es <span className="serif-word">el punto de partida.</span>
              </h2>
            </div>
            <span className="scrolly-hint">
              TRES MOMENTOS. UNA EXPERIENCIA. <ArrowDown size={16} />
            </span>
          </div>
        </Reveal>
        <div ref={timeline} className="story-layout">
          <div className="story-visual">
            <div className="scene-toolbar">
              <span>
                <Box size={14} /> INTERACTION STUDY / 001
              </span>
              <span className="scene-live">
                <i /> 3D EN TIEMPO REAL
              </span>
            </div>
            <Sculpture progress={scrollYProgress} />
            <div className="scene-bottom">
              <span>
                {motionDisabled
                  ? "FORMA · MATERIAL · MOVIMIENTO"
                  : ["01 / ESTRUCTURA", "02 / MATERIAL", "03 / MOVIMIENTO"][
                      chapter
                    ]}
              </span>
              <span>THREE.JS ↗</span>
            </div>
            <div className="scene-progress" aria-hidden="true">
              {stages.map((stage, index) => (
                <span
                  key={stage.number}
                  className={index === chapter ? "active" : ""}
                />
              ))}
            </div>
          </div>
          <div className="story-copy">
            {stages.map((stage) => (
              <StoryStep
                key={stage.number}
                stage={stage}
                reduced={motionDisabled}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
