import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}
