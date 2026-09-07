import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders the portfolio, loads real captures, and has no overflow or runtime errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Interfacescon intención.",
  );
  await expect(
    page.getByRole("button", { name: /^Ver proyecto / }),
  ).toHaveCount(6);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBeTruthy();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("filters projects, navigates the gallery, and restores focus after Escape", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "iOS & Mobile" }).click();
  await expect(
    page.getByRole("button", { name: /^Ver proyecto / }),
  ).toHaveCount(2);
  const trigger = page.getByRole("button", {
    name: "Ver proyecto Mi Campo",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Mi Campo", exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(/project=mi-campo/);
  await expect(dialog.getByRole("img", { name: /^Mi Campo:/ })).toHaveAttribute(
    "alt",
    /Clima y cultivos/,
  );
  await dialog.getByRole("button", { name: "Siguiente captura" }).click();
  await expect(dialog.getByRole("img", { name: /^Mi Campo:/ })).toHaveAttribute(
    "alt",
    /diagnóstico/,
  );
  await dialog.getByRole("button", { name: "Captura anterior" }).click();
  await expect(dialog.getByRole("img", { name: /^Mi Campo:/ })).toHaveAttribute(
    "alt",
    /Clima y cultivos/,
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page).not.toHaveURL(/project=/);
  await page.getByRole("tab", { name: "Web", exact: false }).click();
  await expect(
    page.getByRole("button", { name: /^Ver proyecto / }),
  ).toHaveCount(4);
});

test("supports direct project links, browser back, and legacy entry points", async ({
  page,
}) => {
  await page.goto("/?project=one-pharmacy");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "One Pharmacy", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cerrar", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Ver proyecto ROMI", exact: true })
    .click();
  await page.goBack();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.goto("/apps");
  await expect(page.getByRole("tab", { name: "iOS & Mobile" })).toHaveAttribute(
    "data-state",
    "active",
  );
  await expect(
    page.getByRole("button", { name: /^Ver proyecto / }),
  ).toHaveCount(2);
});

test("provides a working CV download and accurate contact feedback", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Descargar CV", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("JuanPabloOrihuela_CV.pdf");
  expect(await download.failure()).toBeNull();
  await page.getByRole("button", { name: "Copiar correo electrónico" }).click();
  await expect(page.getByRole("status")).toContainText("Correo copiado");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "orihuelaaraizajuanpablo@gmail.com",
  );
});

test("meets automated WCAG AA checks on the page and project dialog", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Ver proyecto ROMI", exact: true })
    .click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "ROMI", exact: true }),
  ).toBeVisible();
  const modalResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    modalResults.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("mobile navigation reaches the chosen section and closes the menu", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "The mobile menu is specific to narrow viewports.");
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navegación móvil" })
    .getByRole("link", { name: "Sobre mí" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#sobre-mi$/);
  await expect
    .poll(() =>
      page
        .locator("#sobre-mi")
        .evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeLessThan(120);
  await expect(page.locator("#sobre-mi")).toBeFocused();
});
