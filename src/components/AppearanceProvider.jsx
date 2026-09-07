import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { AppearanceContext } from "@/hooks/useAppearance";

export default function AppearanceProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const [paused, setPaused] = useState(() => {
    try {
      return localStorage.getItem("jp-motion") === "paused";
    } catch {
      return false;
    }
  });
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const motionDisabled = Boolean(systemReduced || paused);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(preference.matches);
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved = null;
      try {
        saved = localStorage.getItem("jp-theme");
      } catch {
        /* Storage is optional. */
      }
      if (saved !== "light" && saved !== "dark")
        setTheme(systemTheme.matches ? "dark" : "light");
    };
    systemTheme.addEventListener("change", sync);
    return () => systemTheme.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#131514" : "#f8f7f4");
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionDisabled
      ? "reduced"
      : "full";
  }, [motionDisabled]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("jp-theme", next);
    } catch {
      /* Keep the in-memory preference. */
    }
  }
  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem("jp-motion", next ? "paused" : "full");
    } catch {
      /* Keep the in-memory preference. */
    }
  }
  return (
    <AppearanceContext.Provider
      value={{
        theme,
        toggleTheme,
        motionDisabled,
        systemReduced,
        toggleMotion,
      }}
    >
      <MotionConfig reducedMotion={motionDisabled ? "always" : "never"}>
        {children}
      </MotionConfig>
    </AppearanceContext.Provider>
  );
}
