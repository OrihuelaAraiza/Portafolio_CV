// Genera en el build todo lo que contiene el dominio del sitio.
//
// El objetivo es que `src/data/site.js` sea el único lugar donde vive la URL:
// el canonical, las etiquetas OpenGraph, el JSON-LD, robots.txt y sitemap.xml
// se derivan de ahí, y el JSON-LD de proyectos se arma leyendo el mismo
// `portfolio.js` que renderiza la página. Así el marcado estructurado no puede
// quedar describiendo proyectos que ya no existen.
import { site, absolute } from "../src/data/site.js";
import { profile, projects } from "../src/data/portfolio.js";

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

// El enlace canónico de un proyecto: su sitio publicado si existe y, si no, la
// ficha del portafolio, que ya funciona como enlace directo.
const projectUrl = (project) =>
  project.live || `${absolute("/")}?project=${project.id}`;

function structuredData() {
  const person = {
    "@type": "Person",
    "@id": `${absolute("/")}#person`,
    name: profile.name,
    jobTitle: site.jobTitle,
    url: absolute("/"),
    image: absolute(site.ogImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      ...new Set(projects.flatMap((project) => project.stack)),
    ].sort(),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${absolute("/")}#website`,
    url: absolute("/"),
    name: site.title,
    description: site.description,
    inLanguage: site.lang,
    publisher: { "@id": person["@id"] },
  };

  const work = {
    "@type": "ItemList",
    name: "Trabajo seleccionado",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: projectUrl(project),
        image: absolute(project.cover),
        keywords: project.stack.join(", "),
        creator: { "@id": person["@id"] },
        ...(project.repo ? { codeRepository: project.repo } : {}),
      },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [person, website, work] };
}

function robots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absolute("/sitemap.xml")}`,
    "",
  ].join("\n");
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = site.routes.map(
    (route) =>
      `  <url>\n    <loc>${escape(absolute(route))}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <priority>${route === "/" ? "1.0" : "0.6"}</priority>\n  </url>`,
  );
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join("\n") +
    "\n</urlset>\n"
  );
}

export default function seo() {
  const generated = {
    "/robots.txt": { body: robots, type: "text/plain" },
    "/sitemap.xml": { body: sitemap, type: "application/xml" },
  };

  return {
    name: "portafolio-seo",

    // Se inyectan al final del <head>. Vite prepende por omisión, y eso
    // empujaría <meta charset> fuera de los primeros 1024 bytes del documento,
    // que es donde el navegador lo busca antes de adivinar la codificación.
    transformIndexHtml() {
      const image = absolute(site.ogImage);
      const tags = [
        { tag: "title", children: site.title },
        { tag: "meta", attrs: { name: "description", content: site.description } },
        { tag: "meta", attrs: { property: "og:type", content: "website" } },
        { tag: "meta", attrs: { property: "og:title", content: site.social.title } },
        {
          tag: "meta",
          attrs: { property: "og:description", content: site.social.description },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
        },
        { tag: "link", attrs: { rel: "canonical", href: absolute("/") } },
        { tag: "meta", attrs: { property: "og:url", content: absolute("/") } },
        { tag: "meta", attrs: { property: "og:site_name", content: profile.name } },
        { tag: "meta", attrs: { property: "og:locale", content: site.locale } },
        { tag: "meta", attrs: { property: "og:image", content: image } },
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: String(site.ogImageSize.width) },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: String(site.ogImageSize.height) },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: `${profile.name}: interfaces con intención`,
          },
        },
        { tag: "meta", attrs: { name: "twitter:image", content: image } },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(structuredData()),
        },
      ];
      return tags.map((tag) => ({ ...tag, injectTo: "head" }));
    },

    // En desarrollo se sirven desde memoria para poder verificarlos sin build.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = generated[req.url?.split("?")[0]];
        if (!file) return next();
        res.setHeader("Content-Type", `${file.type}; charset=utf-8`);
        res.end(file.body());
      });
    },

    generateBundle() {
      for (const [route, file] of Object.entries(generated)) {
        this.emitFile({
          type: "asset",
          fileName: route.replace(/^\//, ""),
          source: file.body(),
        });
      }
    },
  };
}
