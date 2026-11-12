import { ChevronRight, FileCode2, PanelLeft } from "lucide-react";
import { SiSwift } from "react-icons/si";
import { useLanguage } from "@/hooks/useLanguage";
import "./code-editor.css";

// A small Swift tokenizer keeps the excerpt as selectable text, with no HTML
// injection or syntax-highlighting dependency in the initial page bundle.
const tokens =
  /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|@\w+|\b(?:private|var|let|do|try|catch|throw|return|if|else|func|struct|class|import|true|false|self|Self)\b|\b\d+(?:\.\d+)?\b|\b[A-Z]\w*\b|\b[a-zA-Z_]\w*(?=\())/g;

function highlight(code) {
  return code.split(tokens).map((token, index) => {
    if (!token) return null;
    let type;
    if (token.startsWith("//")) type = "comment";
    else if (token.startsWith('"')) type = "string";
    else if (/^\d/.test(token)) type = "number";
    else if (
      /^@|^(private|var|let|do|try|catch|throw|return|if|else|func|struct|class|import|true|false|self|Self)$/.test(
        token,
      )
    )
      type = "keyword";
    else if (/^[A-Z]\w*$/.test(token)) type = "type";
    else if (/^[a-zA-Z_]\w*$/.test(token)) type = "function";
    return type ? (
      <span key={index} className={`swift-${type}`}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

export default function CodeEditor({ file, code, line = 1 }) {
  const { language } = useLanguage();
  const english = language === "en";
  const path = file.split("/");
  const filename = path.at(-1);
  const lines = code.split("\n");
  return (
    <div className="xcode-editor">
      <div className="xcode-toolbar">
        <div className="xcode-window-controls" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <PanelLeft size={15} aria-hidden="true" />
        <span className="xcode-project">{path[0]}</span>
        <span className="xcode-readonly">
          {english ? "Source excerpt" : "Fragmento de código"}
        </span>
      </div>
      <div className="xcode-tabbar">
        <div className="xcode-file-tab">
          <SiSwift size={14} aria-hidden="true" />
          <span>{filename}</span>
        </div>
      </div>
      <div className="xcode-breadcrumb" title={file}>
        <FileCode2 size={12} aria-hidden="true" />
        {path.map((part, index) => (
          <span key={index}>
            {index > 0 && <ChevronRight size={10} aria-hidden="true" />}
            {part}
          </span>
        ))}
      </div>
      <div
        className="xcode-source"
        tabIndex={0}
        role="region"
        aria-label={
          english ? "Swift code excerpt" : "Fragmento de código Swift"
        }
      >
        <div className="xcode-gutter" aria-hidden="true">
          {lines.map((_, index) => (
            <span key={index}>{line + index}</span>
          ))}
        </div>
        <pre>
          <code>{highlight(code)}</code>
        </pre>
      </div>
      <div className="xcode-statusbar">
        <span>Swift</span>
        <span>
          {lines.length} {english ? "lines" : "líneas"}
        </span>
        <span>
          UTF-8 <span aria-hidden="true">·</span> LF
        </span>
      </div>
    </div>
  );
}
