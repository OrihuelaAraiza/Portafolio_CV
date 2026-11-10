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
  title: "Juan Pablo Orihuela — Frontend & Creative Developer",
  description:
    "Juan Pablo Orihuela, frontend developer en Ciudad de México. React, TypeScript y UI/UX con videojuegos como diferenciador: explora Nexo CRM, Brassbound, ROMI y prototipos en Unity.",
  // Texto de la tarjeta al compartir el enlace, distinto del meta description.
  social: {
    title: "Juan Pablo Orihuela — Frontend & Creative Developer",
    description:
      "Interfaces con intención: frontend, visualización de datos y videojuegos. Casos de proyecto, demos y código de Juan Pablo Orihuela.",
  },
  ogImage: "/og-image.png",
  ogImageSize: { width: 1200, height: 630 },
  jobTitle: "Frontend & Creative Developer",
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
