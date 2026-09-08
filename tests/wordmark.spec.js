import { test, expect } from "@playwright/test";

// El asterisco de la marca y la flecha de las etiquetas se dibujan como SVG.
// Ninguna de las tres fuentes del portafolio contiene ✳ (U+2733) ni ↗ (U+2197)
// —comprobado midiendo el ancho contra una familia inexistente—, así que
// escritos como texto cada sistema los resuelve por sustitución: en los
// teléfonos aparecen como emoji de color.

const SUSTITUIDOS = { "✳": "asterisco", "↗": "flecha" };

test("la marca dibuja el asterisco, no lo escribe", async ({ page }) => {
  await page.goto("/");

  const header = page.locator(".site-header .wordmark");
  await expect(header).toContainText("jp");
  await expect(header.locator("svg.asterisk")).toHaveCount(1);
  await expect(page.locator(".footer-logo svg.asterisk")).toHaveCount(1);
});

test("no queda ningún carácter sustituible en la página", async ({ page }) => {
  await page.goto("/");
  const found = await page.evaluate((chars) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    const hits = [];
    while (walker.nextNode()) {
      for (const [char, nombre] of Object.entries(chars)) {
        if (walker.currentNode.nodeValue.includes(char)) {
          hits.push(`${nombre} en .${walker.currentNode.parentElement.className}`);
        }
      }
    }
    return hits;
  }, SUSTITUIDOS);
  expect(found).toEqual([]);
});

test("las etiquetas dibujan la flecha como icono", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".portrait-caption svg")).toHaveCount(1);
  await expect(page.locator(".scene-bottom svg")).toHaveCount(1);
});

test("conserva el tamaño y el color que tenía el glifo", async ({ page }) => {
  await page.goto("/");
  const star = page.locator(".site-header svg.asterisk");

  // Mide 0.69em, la proporción que el glifo ocupaba respecto a su font-size.
  // Se comprueba contra el tamaño real porque en móvil .logo-star baja a 29px.
  const box = await star.boundingBox();
  const fontSize = await star.evaluate((node) =>
    parseFloat(getComputedStyle(node).fontSize),
  );
  expect(box.width).toBeCloseTo(fontSize * 0.69, 0);
  expect(Math.abs(box.width - box.height)).toBeLessThan(1);

  // El trazo hereda el color por currentColor, así que sigue el acento del tema.
  const stroke = await star.evaluate((node) => getComputedStyle(node).color);
  expect(stroke).toBe("rgb(216, 70, 25)");
});

test("queda fuera del árbol de accesibilidad", async ({ page }) => {
  await page.goto("/");
  // Es decorativo: el enlace ya se anuncia como "JP Orihuela, inicio".
  await expect(page.locator(".site-header svg.asterisk")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});
