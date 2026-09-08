// Fuente única de la identidad pública del sitio.
//
// El dominio se declara aquí y de aquí lo toman el canonical, las etiquetas
// OpenGraph, el JSON-LD, robots.txt y sitemap.xml, que genera
// plugins/vite-plugin-seo.js durante el build. Cambiar de dominio es cambiar
// esta línea.
export const site = {
  url: "https://juanpabloorihuela.vercel.app",
  locale: "es_MX",
  lang: "es",
  title: "Juan Pablo Orihuela — Frontend Developer & UI/UX",
  description:
    "Juan Pablo Orihuela, CTO de ROMI e iOS Developer en e-tribe para Grupo Salinas, en Ciudad de México. Diseño UI/UX, React, Next.js y SwiftUI: proyectos, interfaces y experiencias digitales construidas con intención.",
  // Texto de la tarjeta al compartir el enlace, distinto del meta description.
  social: {
    title: "Juan Pablo Orihuela — Frontend Developer & UI/UX",
    description:
      "Diseño y código para crear interfaces con intención. Explora mi trabajo en web, iOS y experiencias interactivas.",
  },
  ogImage: "/og-image.png",
  ogImageSize: { width: 1200, height: 630 },
  jobTitle: "Frontend Developer & UI/UX",
  city: "Ciudad de México",
  country: "MX",
  // Rutas que vercel.json redirige a la SPA y que la aplicación entiende.
  routes: ["/", "/web", "/apps", "/games", "/about"],
};

// Une el dominio con una ruta o recurso, sin barras duplicadas.
export const absolute = (path = "/") =>
  `${site.url.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`.replace(
    /\/$/,
    path === "/" ? "/" : "",
  );
