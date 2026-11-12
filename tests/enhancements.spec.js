import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { experiments, projects } from "../src/data/portfolio.js";

// La capa visual de noviembre de 2026: prólogo, cinta de herramientas, fondo
// tramado, exploraciones y los efectos que llegan en tiempo ocioso. La suite
// arranca con movimiento reducido; lo que depende de animar declara lo
// contrario en su propio bloque.

const english = JSON.parse(
  readFileSync(new URL("../src/data/en.json", import.meta.url), "utf8"),
);

test("el prólogo cuenta el hilo del portafolio en ambos idiomas", async ({
  page,
}) => {
  await page.goto("/");
  const prologue = page.locator("#prologo");
  await expect(prologue.getByRole("heading", { level: 2 })).toHaveText(
    "00 / PRÓLOGO",
  );
  const statement = prologue.locator(".prologue-statement");
  await expect(statement).toContainText("Me formé haciendo videojuegos.");
  await expect(statement).toContainText(
    "donde el movimiento explica en lugar de adornar.",
  );
  // Las marcas de acento son de autoría, no texto visible.
  await expect(statement).not.toContainText("*");
  await expect(statement.locator(".prologue-accent").first()).toHaveText(
    /videojuegos\./,
  );
  // Con movimiento reducido las cifras se muestran completas, sin conteo.
  await expect(prologue.locator("dt")).toHaveText([
    String(projects.length).padStart(2, "0"),
    "04",
    "02",
  ]);

  await page.goto("/?lang=en");
  await expect(statement).toContainText("I trained by making video games.");
  await expect(statement).not.toContainText("*");
  await expect(prologue.locator("dd").first()).toContainText(
    "documented projects",
  );
});

test("la cinta de herramientas queda quieta y completa sin movimiento", async ({
  page,
}) => {
  await page.goto("/");
  const strip = page.locator(".stack-marquee");
  await expect(strip).toHaveClass(/marquee-static/);
  await expect(strip.locator(".marquee-copy")).toHaveCount(1);
  await expect(strip.locator(".stack-item")).toHaveCount(11);
  await expect(strip).toContainText("TypeScript");
  await expect(strip).toContainText("Unity / C#");
});

test("las exploraciones enlazan a sus repositorios y tienen texto en inglés", async ({
  page,
}) => {
  await page.goto("/");
  const links = page.locator(".experiments a.experiment");
  await expect(links).toHaveCount(experiments.length);
  expect(experiments.length).toBe(4);
  for (const [index, experiment] of experiments.entries()) {
    await expect(links.nth(index)).toHaveAttribute("href", experiment.href);
    await expect(links.nth(index)).toContainText(experiment.name);
    expect(experiment.href).toMatch(/^https:\/\/github\.com\/OrihuelaAraiza\//);
    expect(english[experiment.description], experiment.name).toBeTruthy();
  }
});

test("el fondo tramado se dibuja y la portada funciona igual sin WebGL", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const canvas = page.locator(".hero-field canvas");
  await expect(canvas).toHaveAttribute("data-rendered", "true", {
    timeout: 15000,
  });
  // Decorativo: fuera del árbol de accesibilidad y sin capturar el puntero.
  await expect(page.locator(".hero-field")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator(".hero-field")).toHaveCSS("pointer-events", "none");

  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl")
        ? null
        : original.call(this, type, ...args);
    };
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explorar mi trabajo" }),
  ).toBeVisible();
  await page.waitForTimeout(1500);
  await expect(canvas).not.toHaveAttribute("data-rendered", "true");
  expect(errors).toEqual([]);
});

test("el riel de capítulos acompaña sin entrar en la navegación accesible", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "El riel solo se muestra en pantallas anchas.");
  await page.goto("/");
  const rail = page.locator(".chapter-rail");
  await expect(rail).toBeVisible();
  await expect(rail).toHaveAttribute("aria-hidden", "true");
  await expect(rail.locator("a")).toHaveCount(8);
  for (const link of await rail.locator("a").all())
    await expect(link).toHaveAttribute("tabindex", "-1");
  await expect(rail.locator("a.active")).toHaveAttribute("href", "#inicio");
  await page.locator("#proyectos").scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    document.getElementById("proyectos").scrollIntoView({ block: "start" }),
  );
  await expect(rail.locator("a.active")).toHaveAttribute("href", "#proyectos");
  // Con movimiento reducido no hay scroll interpolado ni cursor decorativo.
  await expect(page.locator("html")).not.toHaveClass(/has-smooth-scroll/);
  await expect(page.locator(".cursor-follower")).toHaveCount(0);
});

test.describe("con movimiento completo", () => {
  test.use({ reducedMotion: "no-preference" });

  test("la cinta se duplica para el recorrido y avanza sola", async ({
    page,
  }) => {
    await page.goto("/");
    const strip = page.locator(".stack-marquee");
    await expect(strip).not.toHaveClass(/marquee-static/);
    await expect
      .poll(() => strip.locator(".marquee-copy").count())
      .toBeGreaterThan(1);
    // Solo la primera copia se anuncia; las demás existen para el bucle.
    await expect(strip.locator(".marquee-copy").first()).not.toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await expect(strip.locator(".marquee-copy").nth(1)).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    // Fuera de pantalla la cinta descansa: en móvil hay que llegar a ella.
    await strip.scrollIntoViewIfNeeded();
    const track = strip.locator(".marquee-track");
    const before = await track.evaluate((el) => el.style.transform);
    await expect
      .poll(() => track.evaluate((el) => el.style.transform))
      .not.toBe(before);
  });

  test("el scroll suave lleva las anclas a su sección y mueve el foco", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "La navegación de cabecera es de escritorio.");
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/has-smooth-scroll/, {
      timeout: 10000,
    });
    const link = page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Sobre mí" });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#sobre-mi$/);
    await expect(page.locator("#sobre-mi")).toBeFocused();
    await expect
      .poll(
        () =>
          page
            .locator("#sobre-mi")
            .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
        { timeout: 8000 },
      )
      .toBe(100);
  });

  test("el cambio de tema se abre desde su control y termina aplicado", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.evaluate(() => {
      const original = document.startViewTransition.bind(document);
      window.__themeTransitions = 0;
      document.startViewTransition = (callback) => {
        window.__themeTransitions += 1;
        return original(callback);
      };
    });
    await page
      .locator(".site-header .theme-toggle")
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await page.evaluate(() => window.__themeTransitions)).toBe(1);
    // La marca de la transición se retira al terminar.
    await expect(page.locator("html")).not.toHaveAttribute("data-vt", "theme");
    expect(
      await page.evaluate(() => localStorage.getItem("jp-theme")),
    ).toBe("dark");
  });
});
