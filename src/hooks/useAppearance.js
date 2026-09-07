import { createContext, useContext } from "react";

export const AppearanceContext = createContext(null);
export function useAppearance() {
  const value = useContext(AppearanceContext);
  if (!value) throw new Error("AppearanceProvider is required");
  return value;
}
