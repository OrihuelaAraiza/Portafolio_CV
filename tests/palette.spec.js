import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// La paleta ⌘K es el único punto del portafolio que se maneja solo con teclado,
// así que las pruebas cubren el atajo, el filtrado, la activación con Enter y la
// devolución del foco.

const open = async (page) => {
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+k");
  await expect(page.getByRole("dialog", { name: "Paleta de comandos" })).toBeVisible();
};

test("el atajo abre y cierra la paleta", async ({ page }) => {
  await open(page);
  const input = page.getByPlaceholder("Buscar proyectos, secciones o acciones…");
  await expect(input).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("el botón del encabezado también la abre", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Buscar en el portafolio/ }).click();
  await expect(
    page.getByRole("dialog", { name: "Paleta de comandos" }),
  ).toBeVisible();
});

test("filtra por nombre y por tecnología", async ({ page }) => {
  await open(page);
  const input = page.getByPlaceholder("Buscar proyectos, secciones o acciones…");
  const options = page.getByRole("option");

  await input.fill("swift");
  // Los dos proyectos iOS declaran SwiftUI en su stack.
  await expect(options).toHaveCount(2);
  await expect(options.first()).toContainText("Mi Campo");
  await expect(options.nth(1)).toContainText("UPocket");

  await input.fill("pharmacy");
  await expect(options).toHaveCount(1);
  await expect(options.first()).toContainText("One Pharmacy");

  // Sin acentos y sin ruido: el filtro propio evita que "copiar" arrastre
  // proyectos que solo comparten letras sueltas.
  await input.fill("sobre mi");
  await expect(options).toHaveCount(1);
  await expect(options.first()).toContainText("Sobre mí");

  await input.fill("copiar");
  await expect(options).toHaveCount(1);
  await expect(options.first()).toContainText("Copiar mi correo");

  await input.fill("xyzxyz");
  await expect(options).toHaveCount(0);
  await expect(page.getByText("Sin resultados.")).toBeVisible();
});

test("Enter abre la ficha del proyecto resaltado", async ({ page }) => {
  await open(page);
  await page
    .getByPlaceholder("Buscar proyectos, secciones o acciones…")
    .fill("campo");
  await expect(page.getByRole("option")).toHaveCount(1);
  await page.keyboard.press("Enter");

  const detail = page.getByRole("dialog", { name: "Mi Campo" });
  await expect(detail).toBeVisible();
  await expect(page).toHaveURL(/project=mi-campo/);
});

test("las flechas mueven la selección antes de activar", async ({ page }) => {
  await open(page);
  const options = page.getByRole("option");
  await expect(options.first()).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("ArrowDown");
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/project=one-pharmacy/);
});

test("una sección lleva el scroll a su destino", async ({ page }) => {
  await open(page);
  await page
    .getByPlaceholder("Buscar proyectos, secciones o acciones…")
    .fill("Sobre mí");
  await page.keyboard.press("Enter");

  await expect(page.getByRole("dialog")).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(() => {
        const box = document.getElementById("sobre-mi").getBoundingClientRect();
        return Math.abs(box.top) < window.innerHeight;
      }),
    )
    .toBeTruthy();
});

test("cambia el tema desde la paleta", async ({ page }) => {
  await page.goto("/");
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.keyboard.press("ControlOrMeta+k");
  await page
    .getByPlaceholder("Buscar proyectos, secciones o acciones…")
    .fill("tema");
  await page.getByRole("option", { name: /Cambiar a tema/ }).click();

  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
    .not.toBe(before);
});

test("copia el correo y lo confirma sin cerrar la paleta", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await open(page);
  await page
    .getByPlaceholder("Buscar proyectos, secciones o acciones…")
    .fill("copiar");
  const item = page.getByRole("option", { name: /Copiar mi correo/ });
  await item.click();

  // La paleta se queda abierta para que la confirmación sea visible.
  await expect(
    page.getByRole("option", { name: /Correo copiado/ }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "orihuelaaraizajuanpablo@gmail.com",
  );
});

test("devuelve el foco a la tarjeta al cerrar la ficha abierta desde la paleta", async ({
  page,
}) => {
  await open(page);
  await page
    .getByPlaceholder("Buscar proyectos, secciones o acciones…")
    .fill("brevemente");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "BreveMente" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ver proyecto BreveMente", exact: true }),
  ).toBeFocused();
});

test("pasa las comprobaciones WCAG AA en ambos temas", async ({ page }) => {
  for (const theme of ["light", "dark"]) {
    await page.goto("/");
    await page.evaluate((value) => {
      localStorage.setItem("jp-theme", value);
    }, theme);
    await page.reload();
    await page.keyboard.press("ControlOrMeta+k");
    await expect(
      page.getByRole("dialog", { name: "Paleta de comandos" }),
    ).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .include('[role="dialog"]')
      .analyze();
    expect(results.violations, `tema ${theme}`).toEqual([]);
  }
});
