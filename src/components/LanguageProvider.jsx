import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "@/hooks/useLanguage";
import { projects as originalProjects } from "@/data/portfolio";
import { site } from "@/data/site";
import english from "@/data/en.json";

const supported = (value) => value === "es" || value === "en";

function initialLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (supported(requested)) return requested;
  try {
    const saved = localStorage.getItem("jp-language");
    if (supported(saved)) return saved;
  } catch {
    // The selector still works when browser storage is unavailable.
  }
  return "es";
}

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const t = useCallback(
    (text, variables = {}) => {
      const translated = language === "en" ? (english[text] ?? text) : text;
      return translated.replace(
        /\{(\w+)\}/g,
        (match, key) => variables[key] ?? match,
      );
    },
    [language],
  );

  const changeLanguage = useCallback((next) => {
    if (!supported(next)) return;
    setLanguage(next);
    try {
      localStorage.setItem("jp-language", next);
    } catch {
      // Persistence is optional.
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  useEffect(() => {
    const sync = () => setLanguage(initialLanguage());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t(site.description));
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t(site.social.description));
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", t(site.social.description));
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "en" ? "en_US" : site.locale);
  }, [language, t]);

  const projects = useMemo(
    () =>
      originalProjects.map((project) => ({
        ...project,
        ...Object.fromEntries(
          [
            "subtitle",
            "categoryLabel",
            "year",
            "role",
            "description",
            "challenge",
            "design",
            "engineering",
            "status",
          ].map((key) => [key, t(project[key])]),
        ),
        screens: project.screens.map((screen) => ({
          ...screen,
          label: t(screen.label),
        })),
        stack: project.stack.map((tag) => t(tag)),
      })),
    [t],
  );

  const value = useMemo(
    () => ({ language, changeLanguage, t, projects }),
    [language, changeLanguage, t, projects],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
