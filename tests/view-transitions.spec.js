import { test, expect } from "@playwright/test";

// La ficha se abre con una transición de elemento compartido cuando el
// navegador la soporta. Lo que no puede pasar es que la falta de soporte, el
// movimiento reducido o la propia animación dejen la ficha sin abrir.

const openFirstProject = async (page) => {
  await page.getByRole("button", { name: "Ver proyecto ROMI", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "ROMI" })).toBeVisible();
  await expect(page).toHaveURL(/project=romi/);
};

// La configuración de Playwright fuerza prefers-reduced-motion en todo el
// portafolio, así que la transición real solo se puede comprobar en un contexto
// que declare lo contrario.
test.describe("con movimiento completo", () => {
  test.use({ reducedMotion: "no-preference" });

  test("inicia la transición compartida al abrir la ficha", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => {
      const original = document.startViewTransition.bind(document);
      window.__calls = 0;
      document.startViewTransition = (callback) => {
        window.__calls += 1;
        return original(callback);
      };
    });

    await openFirstProject(page);
    expect(await page.evaluate(() => window.__calls)).toBe(1);

    // La captura de la ficha es la que lleva el nombre mientras está visible.
    await expect(page.getByRole("img", { name: /^ROMI:/ })).toHaveCSS(
      "view-transition-name",
      "project-cover",
    );
  });

  test("suelta el nombre de la tarjeta al terminar", async ({ page }) => {
    await page.goto("/");
    await openFirstProject(page);
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document.querySelector(".project-card [data-cover]").style
              .viewTransitionName,
        ),
      )
      .toBe("");
  });
});

test("abre la ficha en navegadores sin View Transitions", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Document.prototype, "startViewTransition", {
      value: undefined,
      configurable: true,
    });
  });
  await page.goto("/");
  expect(
    await page.evaluate(() => document.startViewTransition),
  ).toBeUndefined();

  await openFirstProject(page);
});

test("no anima cuando el visitante pausa el movimiento", async ({ page }) => {
  await page.goto("/");
  // El portafolio ya arranca con reducedMotion: "reduce" en la configuración,
  // así que openProject debe tomar el camino directo sin iniciar transición.
  const started = await page.evaluate(() => {
    let calls = 0;
    const original = document.startViewTransition?.bind(document);
    document.startViewTransition = (callback) => {
      calls += 1;
      return original ? original(callback) : { finished: Promise.resolve() };
    };
    window.__transitionCalls = () => calls;
    return true;
  });
  expect(started).toBeTruthy();

  await openFirstProject(page);
  expect(await page.evaluate(() => window.__transitionCalls())).toBe(0);
});
