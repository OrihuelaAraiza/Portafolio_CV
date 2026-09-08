import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import seo from "./plugins/vite-plugin-seo.js";

// Las dependencias salen en chunks propios. No reduce la carga inicial —el
// navegador sigue necesitando todas para la portada— pero sí la invalidación:
// al editar un texto del portafolio se vuelve a descargar el chunk de la
// aplicación y no los 150 kB de React, Motion y Radix, que casi nunca cambian.
// Three.js ya viaja aparte porque entra por import() al acercarse a la sección.
const vendors = {
  react: ["react", "react-dom", "scheduler"],
  motion: ["framer-motion", "motion-dom", "motion-utils"],
  radix: ["@radix-ui", "cmdk"],
};

export default defineConfig({
  plugins: [react(), seo()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          const entry = Object.entries(vendors).find(([, packages]) =>
            packages.some((name) => id.includes(`node_modules/${name}`)),
          );
          return entry?.[0];
        },
      },
    },
  },
});
