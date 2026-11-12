import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppearance } from "@/hooks/useAppearance";
import { projects } from "@/data/portfolio";
import Asterisk from "./Asterisk";
import Reveal from "./Reveal";

// El hilo del portafolio dicho en cuatro frases. Los asteriscos marcan las
// palabras que llevan el acento; la traducción conserva la misma marca.
const statement =
  "Me formé haciendo *videojuegos.* Ahí aprendí que cada acción merece *una respuesta.* Hoy llevo esa idea a *iOS y la web:* interfaces claras, rápidas y *con intención,* donde el movimiento explica en lugar de adornar.";

const facts = [
  { value: projects.length, label: "proyectos documentados", detail: "iOS · Web · Unity" },
  { value: 4, label: "plataformas", detail: "Web · iOS · visionOS · Unity" },
  { value: 2, label: "reconocimientos en hackathons", detail: "iOS Lab · Enactus" },
];

function parse(text) {
  const words = [];
  let accent = false;
  for (const raw of text.split(" ")) {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*");
    if (opens) accent = true;
    words.push({ text: raw.replace(/\*/g, ""), accent });
    if (closes) accent = false;
  }
  return words;
}

function Word({ word, range, progress, reduce }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      className={word.accent ? "prologue-accent" : undefined}
      style={reduce ? undefined : { opacity }}
    >
      {word.text}{" "}
    </motion.span>
  );
}

function Count({ value }) {
  const { motionDisabled: reduce } = useAppearance();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    const node = ref.current;
    const format = (n) => String(Math.round(n)).padStart(2, "0");
    if (reduce || !inView) {
      node.textContent = format(reduce ? value : 0);
      return;
    }
    // Conteo con salida suave; no justifica cargar el animador de Motion.
    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / 1400, 1);
      node.textContent = format(value * (1 - (1 - progress) ** 4));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);
  return <span ref={ref}>{String(value).padStart(2, "0")}</span>;
}

export default function Prologue() {
  const { t } = useLanguage();
  const { motionDisabled: reduce } = useAppearance();
  const target = useRef(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.82", "end 0.5"],
  });
  const words = parse(t(statement));
  return (
    <section id="prologo" className="prologue section-shell">
      <Reveal className="prologue-head">
        <h2 className="eyebrow">
          <span className="section-index">00 /</span> {t("PRÓLOGO")}
        </h2>
        <span className="eyebrow prologue-note">
          <Asterisk /> {t("DEL JUEGO A LA INTERFAZ")}
        </span>
      </Reveal>
      <p ref={target} className="prologue-statement">
        {words.map((word, index) => (
          <Word
            key={`${index}-${word.text}`}
            word={word}
            progress={scrollYProgress}
            reduce={reduce}
            range={[index / words.length, (index + 1.5) / words.length]}
          />
        ))}
      </p>
      <Reveal>
        <dl className="prologue-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>
                <Count value={fact.value} />
              </dt>
              <dd>
                {t(fact.label)}
                <small>{fact.detail}</small>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
