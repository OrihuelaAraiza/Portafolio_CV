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
  title: "Juan Pablo Orihuela — iOS & Frontend Developer",
  description:
    "Juan Pablo Orihuela, iOS y frontend developer en Ciudad de México. SwiftUI, SwiftData y React: explora Loop, productos web y videojuegos, con demos y decisiones de implementación.",
  // Texto de la tarjeta al compartir el enlace, distinto del meta description.
  social: {
    title: "Juan Pablo Orihuela — iOS & Frontend Developer",
    description:
      "Apps iOS y experiencias web con intención. Loop, SwiftUI, React y videojuegos: proyectos, interacciones y código de Juan Pablo Orihuela.",
  },
  ogImage: "/og-image.png",
  ogImageSize: { width: 1200, height: 630 },
  jobTitle: "iOS & Frontend Developer",
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
