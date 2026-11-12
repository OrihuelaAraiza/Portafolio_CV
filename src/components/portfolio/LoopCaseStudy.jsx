import { useLanguage } from "@/hooks/useLanguage";
import { decisions, sourceRoot } from "@/data/ios";

export default function LoopCaseStudy() {
  const { language } = useLanguage();
  const local = (pair) => pair[language === "en" ? 1 : 0];
  return (
    <div className="loop-case-study">
      <h3>
        {local(["Decisiones de desarrollo iOS", "iOS development decisions"])}
      </h3>
      {decisions.map((item) => (
        <details key={item.id}>
          <summary>
            {local(item.label)} · {local(item.title)}
          </summary>
          <p>{local(item.text)}</p>
          <pre
            tabIndex={0}
            aria-label={local([
              "Fragmento de código Swift",
              "Swift code excerpt",
            ])}
          >
            <code>{item.code}</code>
          </pre>
          <a
            className="text-link"
            href={`${sourceRoot}${item.file.split("/").at(-1)}`}
            download
          >
            {local(["Descargar fragmento Swift", "Download Swift excerpt"])}
          </a>
        </details>
      ))}
    </div>
  );
}
