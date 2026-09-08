import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "playwright-report", "test-results"]),
  {
    files: ["**/*.{js,jsx,mjs}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    rules: {
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    },
  },
  {
    // Herramientas y pruebas: corren en Node, no en el navegador. Los archivos
    // de prueba necesitan además los globales del navegador porque el cuerpo de
    // page.evaluate() se escribe en el mismo archivo.
    files: [
      "scripts/**/*.{js,mjs}",
      "plugins/**/*.js",
      "tests/**/*.js",
      "*.config.{js,mjs}",
    ],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: { "react-refresh/only-export-components": "off" },
  },
  {
    files: ["src/components/ui/button.jsx"],
    rules: {
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["buttonVariants"] },
      ],
    },
  },
]);
