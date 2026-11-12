import { useRef, useState } from "react";
import { revealChange } from "@/lib/viewTransition";
import { ArrowUpRight, ArrowRight, Play, Code2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppearance } from "@/hooks/useAppearance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chapters, decisions, lab, sourceRoot } from "@/data/ios";
import SimulatorPreview from "./SimulatorPreview";
import LoopOrbit from "@/components/three/LoopOrbit";
import CodeEditor from "./CodeEditor";
import "./ios.css";

export default function IOSShowcase({ onOpen }) {
  const { language, projects } = useLanguage();
  const { theme } = useAppearance();
  const [chapter, setChapter] = useState("resume");
  const [captureTheme, setCaptureTheme] = useState(theme);
  const [size, setSize] = useState("normal");
  const [preview, setPreview] = useState(true);
  const [decision, setDecision] = useState("storage");
  const [comparisonLarge, setComparisonLarge] = useState(false);
  const screenRef = useRef(null);
  const comparisonRef = useRef(null);
  const local = (pair) => pair[language === "en" ? 1 : 0];
  const current = chapters.find((item) => item.id === chapter);
  const screen = `/projects/loop/${chapter}-${language}-${captureTheme}-${size}.webp`;
  const loop = projects.find((project) => project.id === "loop");
  const openDecision = (id) => {
    setDecision(id);
    requestAnimationFrame(() => {
      const element = document.getElementById("ios-engineering");
      element?.focus({ preventScroll: true });
      element?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };
  return (
    <>
      <div className="ios-heading">
        <span className="eyebrow">
          <span className="section-index">01 /</span>{" "}
          {local(["HECHO PARA iOS", "BUILT FOR iOS"])}
        </span>
        <span className="ios-platform">
          SwiftUI <span aria-hidden="true">/</span> SwiftData{" "}
          <span aria-hidden="true">/</span> StoreKit 2
        </span>
      </div>
      <div className="ios-intro">
        <h2>
          {local(["Apps nativas.", "Native apps."])}
          <br />
          <span className="serif-word">
            {local(["Detalles que se sienten.", "Details you can feel."])}
          </span>
        </h2>
        <p>
          {local([
            "Del estado de una vista a lo que queda guardado. Diseño y desarrollo experiencias que se sienten propias del iPhone.",
            "From a view’s state to what gets saved. I design and build experiences that feel at home on iPhone.",
          ])}
        </p>
      </div>
      <div className="ios-showcase">
        <div className="ios-device-stage">
          <LoopOrbit />
          <div className="ios-screen" id="ios-screen" ref={screenRef}>
            {preview ? (
              <SimulatorPreview
                frameClassName="ios-phone"
                media={{
                  src: "/videos/loop-preview.mp4",
                  poster: "/projects/loop/welcome-es-light-normal.webp",
                  label: "Loop",
                }}
              />
            ) : (
              <div className="ios-phone">
                <img
                  src={screen}
                  width="600"
                  height="1304"
                  alt={`Loop: ${local(current.label)} · ${local(captureTheme === "dark" ? ["oscuro", "dark"] : ["claro", "light"])} · ${local(size === "large" ? ["texto grande", "large text"] : ["texto normal", "normal text"])}`}
                />
              </div>
            )}
          </div>
        </div>
        <div className="ios-showcase-copy">
          <div className="ios-app-name">
            <img
              src="/projects/loop/icon.webp"
              alt=""
              width="54"
              height="54"
              loading="lazy"
            />
            <div>
              <h3>
                loop<span aria-hidden="true">↗</span>
              </h3>
              <span>
                {local([
                  "PRODUCTO PERSONAL · EN DESARROLLO",
                  "PERSONAL PRODUCT · IN DEVELOPMENT",
                ])}
              </span>
            </div>
          </div>
          <p className="ios-app-statement">
            {local([
              "Volver a un proyecto también es avanzar.",
              "Returning to a project is progress, too.",
            ])}
          </p>
          <p className="ios-app-description">
            {local([
              "Un lugar para tus hobbies, fotos e ideas. Sin cuenta, con datos locales y una pista para la próxima vez.",
              "A place for your hobbies, photos and ideas. No account, local data and a clue for next time.",
            ])}
          </p>
          <Tabs
            value={chapter}
            onValueChange={(value) => {
              revealChange(
                () => {
                  setChapter(value);
                  setPreview(false);
                },
                { target: screenRef.current, key: `chapter-${value}` },
              );
            }}
          >
            <TabsList
              className="ios-chapters"
              aria-label={local(["Recorrido de Loop", "Loop walkthrough"])}
            >
              {chapters.map((item, i) => (
                <TabsTrigger key={item.id} value={item.id}>
                  <span>0{i + 1}</span>
                  {local(item.label)}
                </TabsTrigger>
              ))}
            </TabsList>
            {chapters.map((item) => (
              <TabsContent
                className="ios-chapter-story"
                key={item.id}
                value={item.id}
              >
                <h4>{local(item.title)}</h4>
                <p>{local(item.text)}</p>
                <span className="eyebrow">{item.tag}</span>
              </TabsContent>
            ))}
          </Tabs>
          <div className="ios-capture-controls">
            <label>
              {local(["Apariencia", "Appearance"])}
              <select
                aria-label={local(["Apariencia", "Appearance"])}
                value={captureTheme}
                onChange={(e) => {
                  const value = e.target.value;
                  revealChange(
                    () => {
                      setCaptureTheme(value);
                      setPreview(false);
                    },
                    { target: screenRef.current },
                  );
                }}
              >
                <option value="light">{local(["Claro", "Light"])}</option>
                <option value="dark">{local(["Oscuro", "Dark"])}</option>
              </select>
            </label>
            <label>
              {local(["Tamaño de texto", "Text size"])}
              <select
                aria-label={local(["Tamaño de texto", "Text size"])}
                value={size}
                onChange={(e) => {
                  const value = e.target.value;
                  revealChange(
                    () => {
                      setSize(value);
                      setPreview(false);
                    },
                    { target: screenRef.current },
                  );
                }}
              >
                <option value="normal">{local(["Normal", "Default"])}</option>
                <option value="large">
                  {local(["Grande · Dynamic Type", "Large · Dynamic Type"])}
                </option>
              </select>
            </label>
          </div>
          <div className="ios-actions">
            <button
              className="ios-play"
              aria-pressed={preview}
              onClick={() => {
                setPreview((value) => !value);
                document
                  .getElementById("ios-screen")
                  ?.scrollIntoView({ behavior: "instant", block: "center" });
              }}
            >
              <Play size={15} />
              {preview
                ? local(["Explorar pantallas", "Explore screens"])
                : local(["Ver en movimiento", "See it in motion"])}
            </button>
            <button
              className="text-link"
              onClick={(event) => onOpen(loop, event.currentTarget)}
            >
              {local(["Abrir caso de Loop", "Open Loop case study"])}{" "}
              <ArrowUpRight size={16} />
            </button>
          </div>
          <a
            className="ios-source-link"
            href={loop.repo}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={14} />
            {local(["Repositorio público", "Public repository"])}{" "}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="ios-engineering" id="ios-engineering" tabIndex={-1}>
        <div className="ios-engineering-heading">
          <span className="eyebrow">
            {local(["DETRÁS DE LA INTERFAZ", "BEHIND THE INTERFACE"])}
          </span>
          <h3>
            {local([
              "Decisiones que sostienen la experiencia.",
              "Decisions that support the experience.",
            ])}
          </h3>
        </div>
        <Tabs value={decision} onValueChange={setDecision}>
          <TabsList
            className="ios-decision-tabs"
            aria-label={local([
              "Decisiones de desarrollo iOS",
              "iOS development decisions",
            ])}
          >
            {decisions.map((item) => (
              <TabsTrigger value={item.id} key={item.id}>
                {local(item.label)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="ios-decision-panels">
            {decisions.map((item) => (
              <TabsContent
                className="ios-decision"
                key={item.id}
                value={item.id}
              >
                <div>
                  <h4>{local(item.title)}</h4>
                  <p>{local(item.text)}</p>
                  <a
                    className="text-link"
                    href={`${sourceRoot}${item.file.split("/").at(-1)}`}
                    download
                  >
                    {local([
                      "Descargar fragmento Swift",
                      "Download Swift excerpt",
                    ])}{" "}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <CodeEditor
                  file={item.file}
                  code={item.code}
                  line={item.line}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
      <div className="ios-lab-heading">
        <span className="eyebrow">
          {local(["LABORATORIO NATIVO", "NATIVE LAB"])}
        </span>
        <h3>
          {local([
            "El comportamiento también se diseña.",
            "Behavior is designed, too.",
          ])}
        </h3>
      </div>
      <div className="ios-lab">
        {lab.map((item) => (
          <article key={item.id}>
            <div
              className="ios-lab-media"
              id={`ios-lab-${item.id}`}
              ref={item.id === "comparison" ? comparisonRef : undefined}
            >
              {item.src ? (
                <SimulatorPreview
                  media={{ ...item, label: local(item.title) }}
                />
              ) : (
                <img
                  src={
                    item.id === "comparison" && comparisonLarge
                      ? "/projects/loop/comparison-large.webp"
                      : item.poster
                  }
                  alt={local(item.title)}
                  width="600"
                  height="1304"
                  loading="lazy"
                />
              )}
            </div>
            <h4>{local(item.title)}</h4>
            <p>{local(item.text)}</p>
            {!item.src && (
              <button
                className="text-link"
                aria-pressed={comparisonLarge}
                onClick={() =>
                  revealChange(() => setComparisonLarge((value) => !value), {
                    target: comparisonRef.current,
                  })
                }
              >
                {comparisonLarge
                  ? local(["Ver lado a lado", "View side by side"])
                  : local([
                      "Ver con texto grande",
                      "View with large text",
                    ])}{" "}
                <ArrowRight size={14} />
              </button>
            )}
            <button
              className="ios-how"
              onClick={() => openDecision(item.decision)}
            >
              {local(["Cómo está construido", "How it’s built"])}{" "}
              <ArrowUpRight size={13} />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
