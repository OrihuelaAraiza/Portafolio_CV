import { test, expect } from "@playwright/test";

// Todo lo que sigue lo genera plugins/vite-plugin-seo.js a partir de
// src/data/site.js y src/data/portfolio.js. Las pruebas existen para que un
// cambio de dominio o un proyecto nuevo no dejen el marcado describiendo algo
// que ya no es cierto.

const ORIGIN = "https://juanpabloorihuela.vercel.app";

test("declara canonical, OpenGraph y tarjeta social con imagen", async ({
  page,
}) => {
  await page.goto("/");

  const content = (selector) =>
    page.locator(selector).first().getAttribute("content");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${ORIGIN}/`,
  );
  expect(await content('meta[property="og:url"]')).toBe(`${ORIGIN}/`);
  expect(await content('meta[name="twitter:card"]')).toBe("summary_large_image");
  expect(await content('meta[property="og:image"]')).toBe(
    `${ORIGIN}/og-image.png`,
  );
  // Las dimensiones declaradas evitan que la tarjeta se recorte al compartirla.
  expect(await content('meta[property="og:image:width"]')).toBe("1200");
  expect(await content('meta[property="og:image:height"]')).toBe("630");
  expect(await content('meta[property="og:image:alt"]')).toBeTruthy();
  expect(await content('meta[name="description"]')).toContain("Juan Pablo");
});

test("mantiene la codificación declarada al principio del documento", async ({
  request,
}) => {
  // El navegador solo busca <meta charset> en los primeros 1024 bytes; si la
  // metadata inyectada lo empuja más abajo, los acentos se rompen.
  const html = await (await request.get("/")).text();
  const index = Buffer.from(html, "utf8").indexOf("charset");
  expect(index).toBeGreaterThanOrEqual(0);
  expect(index).toBeLessThan(1024);
});

test("expone la imagen social en 1200 × 630", async ({ request }) => {
  const response = await request.get("/og-image.png");
  expect(response.status()).toBe(200);
  const bytes = Buffer.from(await response.body());
  expect(bytes.subarray(1, 4).toString()).toBe("PNG");
  // La cabecera IHDR guarda el ancho y el alto como enteros de 32 bits.
  expect(bytes.readUInt32BE(16)).toBe(1200);
  expect(bytes.readUInt32BE(20)).toBe(630);
});

test("publica robots.txt apuntando al sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
});

test("publica un sitemap con la portada y los accesos heredados", async ({
  request,
}) => {
  const body = await (await request.get("/sitemap.xml")).text();
  for (const route of ["/", "/web", "/apps", "/games", "/about"]) {
    expect(body).toContain(`<loc>${ORIGIN}${route.replace(/^\/$/, "/")}</loc>`);
  }
  expect(body.match(/<url>/g)).toHaveLength(5);
});

test("describe el perfil y los seis proyectos en JSON-LD", async ({ page }) => {
  await page.goto("/");
  const raw = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const graph = JSON.parse(raw)["@graph"];

  const person = graph.find((node) => node["@type"] === "Person");
  expect(person.name).toBe("Juan Pablo Orihuela");
  expect(person.sameAs).toContain("https://github.com/OrihuelaAraiza");
  expect(person.address.addressLocality).toBe("Ciudad de México");

  const list = graph.find((node) => node["@type"] === "ItemList");
  expect(list.numberOfItems).toBe(6);
  expect(list.itemListElement).toHaveLength(6);

  // Cada proyecto necesita un destino y una imagen absolutos para el rastreador.
  for (const { item } of list.itemListElement) {
    expect(item.name).toBeTruthy();
    expect(item.url).toMatch(/^https:\/\//);
    expect(item.image).toMatch(/^https:\/\/.+\.webp$/);
  }

  // El nombre visible de las fichas y el del marcado no deben divergir.
  const titles = list.itemListElement.map(({ item }) => item.name);
  for (const title of titles) {
    await expect(
      page.getByRole("button", { name: `Ver proyecto ${title}`, exact: true }),
    ).toHaveCount(1);
  }
});
