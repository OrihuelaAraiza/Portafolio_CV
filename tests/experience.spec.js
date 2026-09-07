import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("follows the system theme, persists a chosen theme, and works without storage", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Activar tema oscuro" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Activar tema claro" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Activar tema claro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("lets visitors pause typing and motion and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const text = page.locator(".typewriter-text");
  await expect(text).toHaveText("CTO @ ROMI");
  await expect(text).not.toHaveText("CTO @ ROMI", { timeout: 6000 });
  await page.getByRole("button", { name: "Pausar animaciones" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  const pausedText = await text.textContent();
  await page.waitForTimeout(2400);
  await expect(text).toHaveText(pausedText);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Activar animaciones" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Activar animaciones" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Movimiento reducido por el sistema" }),
  ).toBeDisabled();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});

test("plays both supplied videos on demand and pauses playback off screen", async ({
  page,
}) => {
  const mediaRequests = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  const playTrailer = page.getByRole("button", {
    name: "Reproducir tráiler de We Can Fix This",
  });
  await playTrailer.scrollIntoViewIfNeeded();
  expect(mediaRequests).toEqual([]);
  await playTrailer.click();
  const video = page.locator("video");
  await expect
    .poll(() => video.evaluate((v) => v.currentTime), { timeout: 15000 })
    .toBeGreaterThan(0.2);
  await expect(video).toHaveJSProperty("paused", false);
  await expect(video).toHaveJSProperty("videoWidth", 832);
  await page.getByRole("tab", { name: "Gameplay" }).click();
  await expect(video).toHaveCount(0);
  await page
    .getByRole("button", { name: "Reproducir gameplay de We Can Fix This" })
    .click();
  await expect
    .poll(() => video.evaluate((v) => v.currentTime), { timeout: 15000 })
    .toBeGreaterThan(0.2);
  await expect(video).toHaveJSProperty("videoWidth", 736);
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
  expect(
    mediaRequests.some((url) => url.endsWith("we-can-fix-this-trailer.mp4")),
  ).toBeTruthy();
  expect(
    mediaRequests.some((url) => url.endsWith("we-can-fix-this-gameplay.mp4")),
  ).toBeTruthy();
});

test("renders the 3D story across scroll stages and keeps it usable without WebGL", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  // Move the story's start to the middle of the viewport, then traverse it like a visitor.
  await page.locator(".story-layout").evaluate((el) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(
      0,
      window.scrollY + el.getBoundingClientRect().top - innerHeight * 0.5,
    );
  });
  const scene = page.locator(".sculpture-container");
  const canvas = scene.locator("canvas");
  await expect(scene).toHaveAttribute("data-scene-status", "ready", {
    timeout: 15000,
  });
  await expect(canvas).toHaveAttribute("data-rendered", "true");
  await expect(canvas).toHaveAttribute("data-stage", "wireframe");
  await page.locator("#enfoque-02").evaluate(
    (el, offset) => {
      window.scrollTo(
        0,
        window.scrollY + el.getBoundingClientRect().top - innerHeight * offset,
      );
    },
    isMobile ? 0.5 : 0.15,
  );
  await expect(canvas).toHaveAttribute("data-stage", "material");
  await page.locator("#enfoque-03").evaluate((el) => {
    window.scrollTo(
      0,
      window.scrollY + el.getBoundingClientRect().top - innerHeight * 0.15,
    );
  });
  await expect(canvas).toHaveAttribute("data-stage", "motion");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl")
        ? null
        : original.call(this, type, ...args);
    };
  });
  await page.reload();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-status", "fallback");
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Y entonces, cobra vida." }),
  ).toBeVisible();
});

test("shows the current roles and passes dark theme accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("#sobre-mi")).toContainText("CTO de ROMI");
  await expect(page.locator("#sobre-mi")).toContainText(
    "iOS Developer en e-tribe",
  );
  await expect(page.locator("#sobre-mi")).toContainText("Grupo Salinas");
  for (const modal of [false, true]) {
    if (modal) {
      await page
        .getByRole("button", { name: "Ver proyecto ROMI", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toContainText("CTO");
    }
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
  }
});

test("offers a download when a video cannot load", async ({ page }) => {
  await page.route("**/videos/*.mp4", (route) => route.abort());
  await page.goto("/");
  await page
    .getByRole("button", { name: "Reproducir tráiler de We Can Fix This" })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "No se pudo reproducir el video.",
  );
  await expect(
    page.getByRole("link", { name: "Descargar tráiler" }),
  ).toHaveAttribute("href", "/videos/we-can-fix-this-trailer.mp4");
});
