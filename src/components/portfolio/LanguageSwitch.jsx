import { useLanguage } from "@/hooks/useLanguage";
import { revealChange } from "@/lib/viewTransition";

export default function LanguageSwitch() {
  const { language, changeLanguage, t } = useLanguage();
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={t("Idioma del sitio")}
    >
      {[
        { code: "es", label: "Español" },
        { code: "en", label: "English" },
      ].map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={label}
          aria-pressed={language === code}
          onClick={(event) => {
            if (code !== language)
              revealChange(() => changeLanguage(code), {
                kind: "language",
                origin: event.currentTarget,
              });
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
