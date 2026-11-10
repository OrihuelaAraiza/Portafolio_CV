import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/portfolio.js";
import { readFileSync } from "node:fs";

const english = JSON.parse(readFileSync(new URL("../src/data/en.json", import.meta.url), "utf8"));

test("curates frontend first and exposes the complete archive and game case", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-project-id]")).toHaveCount(4);
  expect(await page.locator("[data-project-id]").evaluateAll((cards) => cards.map((card) => card.dataset.projectId)))
    .toEqual(["nexo-crm", "brassbound", "romi", "we-can-fix-this"]);
  await page.getByRole("tab", { name: /^Todos/ }).click();
  await expect(page.locator("[data-project-id]")).toHaveCount(11);
  for (const img of await page.locator("#proyectos img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.getByRole("tab", { name: /^Videojuegos/ }).click();
  await expect(page.locator("[data-project-id]")).toHaveCount(1);
  const trigger = page.getByRole("button", { name: "Ver proyecto We Can Fix This", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("cooperativo local para 1–4 jugadores");
  await expect(dialog.getByRole("link", { name: "Código", exact: true })).toHaveAttribute("href", /We_Can_Fix_This_/);
  await expect(dialog.getByRole("link", { name: "Visitar proyecto" })).toHaveCount(0);
  await expect(dialog.locator("video")).toHaveAttribute("preload", "none");
  expect(await dialog.locator("video").evaluate((video) => video.paused)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect(errors).toEqual([]);
});

test("new case studies support direct links, translated evidence and accessible themes", async ({ page }) => {
  for (const [id, theme] of [["nexo-crm", "light"], ["brassbound", "dark"], ["loop", "light"], ["romimente", "dark"], ["we-can-fix-this", "dark"]]) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto(`/?project=${id}&lang=en`);
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: "Evidence to explore" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Project scope" })).toBeVisible();
    await expect(dialog.locator(".detail-gallery img")).toBeVisible();
    await expect.poll(() => dialog.locator(".detail-gallery img").evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([]);
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page.getByRole("tab", { name: /^Selected/ })).toHaveAttribute("data-state", "active");
  }
});

test("the new catalog has complete English copy and resolved local media", async ({ request }) => {
  for (const project of projects.filter((project) => project.verification)) {
    for (const field of ["subtitle", "categoryLabel", "role", "description", "challenge", "design", "engineering", "proof", "verification", "scope", "status"]) {
      expect(english[project[field]], `${project.id}.${field}`).toBeTruthy();
    }
    for (const screen of project.screens) {
      expect(english[screen.label]).toBeTruthy();
      const response = await request.get(screen.src);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/webp");
    }
  }
});

test("the reel case returns focus and remains linked from legacy games navigation", async ({ page }) => {
  await page.goto("/games");
  await expect(page.locator("#laboratorio")).toBeInViewport();
  const trigger = page.getByRole("button", { name: "Explorar el caso técnico" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toContainText("RepairStation");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("a command can open an archived project without changing the selected filter", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Buscar en el portafolio/ }).click();
  await page.getByRole("combobox").fill("brevemente");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "BreveMente" })).toBeVisible();
  await page.keyboard.press("Escape");
  const selected = page.getByRole("tab", { name: /^Selección/ });
  await expect(selected).toHaveAttribute("data-state", "active");
  await expect(selected).toBeFocused();
  await expect(page.locator("[data-project-id]")).toHaveCount(4);
});
