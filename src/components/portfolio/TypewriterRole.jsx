import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { useAppearance } from "@/hooks/useAppearance";

const roles = [
  "CTO @ ROMI",
  "iOS Developer @ e-tribe",
  "Frontend Developer & UI/UX",
  "Creative Developer",
];

export default function TypewriterRole() {
  const { t } = useLanguage();
  const { motionDisabled } = useAppearance();
  const [state, setState] = useState({
    word: 0,
    letters: roles[0].length,
    deleting: true,
  });
  useEffect(() => {
    if (motionDisabled) return;
    const word = roles[state.word];
    const atEnd = state.letters === word.length;
    const atStart = state.letters === 0;
    const delay =
      atEnd && state.deleting ? 2100 : atStart ? 350 : state.deleting ? 30 : 62;
    const timer = setTimeout(() => {
      setState((current) => {
        if (current.deleting && current.letters === 0)
          return {
            word: (current.word + 1) % roles.length,
            letters: 0,
            deleting: false,
          };
        if (!current.deleting && current.letters === roles[current.word].length)
          return { ...current, deleting: true };
        return {
          ...current,
          letters: current.letters + (current.deleting ? -1 : 1),
        };
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [state, motionDisabled]);
  // Keep the animation quiet for assistive technology; the complete roles stay available.
  return (
    <div className="typewriter-role">
      <span className="sr-only">
        {t(
          "CTO en ROMI. iOS Developer en e-tribe para Grupo Salinas. Frontend, UI/UX y desarrollo creativo.",
        )}
      </span>
      <span className="editor-prompt" aria-hidden="true">
        &gt;
      </span>
      <span className="typewriter-text" aria-hidden="true">
        {motionDisabled
          ? roles[state.word]
          : roles[state.word].slice(0, state.letters)}
        <span className="typing-caret" />
      </span>
    </div>
  );
}
