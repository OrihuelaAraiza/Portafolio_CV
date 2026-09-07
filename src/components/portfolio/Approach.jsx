import { Code2, MousePointer2 } from "lucide-react";
import { FiFigma as Figma } from "react-icons/fi";
import Reveal from "./Reveal";

export default function Approach() {
  const stages = [
    {
      number: "01",
      title: "Entender antes de diseñar.",
      text: "El contexto importa. Empiezo por las personas, lo que necesitan hacer y los puntos donde la experiencia se complica.",
      tags: "FLUJOS · JERARQUÍA · CONTEXTO",
      icon: MousePointer2,
    },
    {
      number: "02",
      title: "Diseñar un sistema.",
      text: "Conecto tipografía, componentes y estados en un lenguaje visual consistente. Cada decisión debe ayudar a usar el producto.",
      tags: "FIGMA · UI SYSTEMS · PROTOTIPADO",
      icon: Figma,
    },
    {
      number: "03",
      title: "Construir la sensación.",
      text: "Llevo el diseño al navegador con componentes reutilizables, layouts adaptables y movimiento que acompaña las acciones.",
      tags: "REACT · ACCESIBILIDAD · MOTION",
      icon: Code2,
    },
  ];
  return (
    <section id="enfoque" className="approach-section">
      <div className="section-shell">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="section-index">02 /</span> CÓMO PIENSO Y
                CONSTRUYO
              </span>
              <h2>
                El detalle no es el final.
                <br />
                Es <span className="serif-word">el punto de partida.</span>
              </h2>
            </div>
            <span className="approach-asterisk" aria-hidden="true">
              ✳
            </span>
          </div>
        </Reveal>
        <div className="approach-grid">
          {stages.map(({ number, title, text, tags, icon: Icon }, index) => (
            <Reveal key={number} delay={index * 0.08}>
              <div className="approach-top">
                <span className="eyebrow">{number}</span>
                <Icon size={25} strokeWidth={1.5} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="eyebrow approach-tags">{tags}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
