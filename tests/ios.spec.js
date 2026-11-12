import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

async function openIOS(page) {
  await page.goto("/#ios");
  await expect(
    page.getByRole("heading", {
      name: "Apps nativas. Detalles que se sienten.",
    }),
  ).toBeVisible();
}

test("iOS walkthrough preserves chapter, theme and type size across languages", async ({
  page,
}) => {
  await openIOS(page);
  const screen = page.locator(".ios-phone img");
  await page.getByRole("tab", { name: "03 Recorrer" }).click();
  await page.getByLabel("Apariencia").selectOption("dark");
  await page.getByLabel("Tamaño de texto").selectOption("large");
  await expect(screen).toHaveAttribute("src", /journey-es-dark-large.webp/);
  await expect
    .poll(() => screen.evaluate((img) => img.complete && img.naturalWidth > 0))
    .toBe(true);
  await page
    .locator(".site-header")
    .getByRole("button", { name: "English", exact: true })
    .click();
  await expect(page.getByRole("tab", { name: "03 Explore" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(screen).toHaveAttribute("src", /journey-en-dark-large.webp/);
  await expect(page.getByLabel("Appearance")).toHaveValue("dark");
  await expect(page.getByLabel("Text size", { exact: true })).toHaveValue(
    "large",
  );
  await expect(page.locator("#ios")).toContainText(
    "Small steps leave a trace.",
  );
  await page.getByRole("tab", { name: "01 Begin" }).click();
  await expect(screen).toHaveAttribute("src", /welcome-en-dark-large.webp/);
});

test("real clips load on demand, play and stop when leaving the viewer", async ({
  page,
}) => {
  const mediaRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("/videos/loop-"))
      mediaRequests.push(request.url());
  });
  await openIOS(page);
  expect(mediaRequests).toEqual([]);
  await page
    .getByRole("button", { name: "Reproducir: Loop", exact: true })
    .click();
  const video = page.locator(".ios-phone video");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).toHaveJSProperty("controls", false);
  await expect(video).toHaveJSProperty("loop", true);
  await expect(video).toHaveJSProperty("muted", true);
  await expect
    .poll(() => video.evaluate((v) => v.currentTime), { timeout: 15000 })
    .toBeGreaterThan(0.2);
  await expect(video).toHaveJSProperty("videoWidth", 600);
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(video).not.toBeInViewport();
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("tab", { name: "01 Empezar" }).click();
  await expect(video).toHaveCount(0);
  await expect(page.locator(".ios-phone img")).toHaveAttribute(
    "src",
    /welcome-/,
  );
});

test("native lab links to implementation and comparison uses real accessibility captures", async ({
  page,
}) => {
  await openIOS(page);
  const comparison = page.locator(".ios-lab article").nth(1);
  await comparison
    .getByRole("button", { name: "Ver con texto grande" })
    .click();
  await expect(comparison.locator("img")).toHaveAttribute(
    "src",
    /comparison-large.webp/,
  );
  await comparison
    .getByRole("button", { name: "Cómo está construido" })
    .click();
  await expect(page.locator("#ios-engineering")).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Accesibilidad", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.locator(".ios-decision[data-state=active] code"),
  ).toContainText("dynamicTypeSize");
  const loopy = page.locator(".ios-lab article").first();
  await loopy.getByRole("button", { name: /^Reproducir:/ }).click();
  await expect
    .poll(() => loopy.locator("video").evaluate((v) => v.currentTime), {
      timeout: 15000,
    })
    .toBeGreaterThan(0.2);
  await loopy.getByRole("button", { name: /^Pausar:/ }).click();
  await expect(loopy.locator("video")).toHaveJSProperty("paused", true);
});

test("Loop case has its own media, source excerpts, and restores the showcase trigger", async ({
  page,
}) => {
  await openIOS(page);
  const trigger = page.getByRole("button", { name: "Abrir caso de Loop" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Decisiones de desarrollo iOS" }),
  ).toBeVisible();
  await dialog.locator("summary").filter({ hasText: "Persistencia" }).click();
  await expect(dialog.locator("details[open] code")).toContainText(
    "context.rollback()",
  );
  await expect(dialog.locator("video")).toHaveAttribute(
    "src",
    "/videos/loop-preview.mp4",
  );
  await expect(dialog.locator("video")).toHaveAttribute(
    "poster",
    /loop\/welcome-/,
  );
  await expect(dialog.locator(".detail-video")).not.toContainText("Gameplay");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

for (const theme of ["light", "dark"]) {
  test(`native states pass accessibility checks in ${theme}`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    await openIOS(page);
    for (const name of ["01 Empezar", "02 Retomar", "03 Recorrer"]) {
      await page.getByRole("tab", { name }).click();
      const results = await new AxeBuilder({ page })
        .include("#ios")
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
    }
  });
}

test("media failures expose an honest download fallback", async ({ page }) => {
  await page.route("**/videos/loop-preview.mp4", (route) => route.abort());
  await openIOS(page);
  await page
    .getByRole("button", { name: "Reproducir: Loop", exact: true })
    .click();
  await expect(page.locator(".ios-phone").getByRole("alert")).toContainText(
    "No se pudo reproducir el video.",
  );
  await expect(page.locator(".ios-phone").getByRole("link")).toHaveAttribute(
    "href",
    "/videos/loop-preview.mp4",
  );
});

test("every screenshot variant resolves to an image rather than the SPA fallback", async ({
  request,
}) => {
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/ios-media-sources.json", import.meta.url),
      "utf8",
    ),
  );
  for (const { asset } of manifest) {
    const response = await request.get(asset);
    expect(response.ok(), asset).toBe(true);
    expect(response.headers()["content-type"], asset).toContain("image/webp");
  }
});
