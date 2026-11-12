import { test, expect } from "@playwright/test";

test("simulator playback follows visibility, manual pause and global motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#ios");
  const video = page.locator(".ios-phone video");
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(.2);
  await expect(video).toHaveJSProperty("controls", false);
  await page.getByRole("button", { name: "Pausar: Loop", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: "Reproducir: Loop", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", false);
  await page.getByRole("button", { name: "Pausar animaciones", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
});

test("project backgrounds animate only while visible and motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#proyectos");
  const background = page.locator('[data-project-id="loop"] .project-backdrop');
  await background.scrollIntoViewIfNeeded();
  await expect(background).toHaveAttribute("data-moving", "true");
  const orbit = background.locator(".orbit-one");
  const before = await orbit.evaluate((el) => getComputedStyle(el).rotate);
  await expect.poll(() => orbit.evaluate((el) => getComputedStyle(el).rotate)).not.toBe(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(background).toHaveAttribute("data-moving", "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(background).toHaveAttribute("data-moving", "false");
});

test("Loop's 3D scene pauses offscreen and survives unavailable WebGL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#ios");
  const scene = page.locator(".loop-orbit");
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-status", "ready", { timeout: 15000 });
  await expect(scene.locator("canvas")).toHaveAttribute("data-motion", "running");
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(scene.locator("canvas")).toHaveAttribute("data-motion", "paused");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.call(this, type, ...args);
    };
  });
  await page.reload();
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-scene-status", "fallback");
  await expect(page.locator(".loop-orbit-fallback")).toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir caso de Loop" })).toBeEnabled();
});

test("the visible presentation omits capture and verification notices in both languages", async ({ page }) => {
  for (const language of ["es", "en"]) {
    await page.goto(`/?lang=${language}#ios`);
    await expect(page.locator(".ios-showcase")).toBeVisible();
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/REAL CAPTURE|CAPTURA REAL|Datos ficticios|Synthetic data|Medios de simulador|Simulator media|Fragmento del corte mostrado|El repositorio público conserva/);
    await page.getByRole("button", { name: language === "es" ? "Abrir caso de Loop" : "Open Loop case study" }).click();
    await expect(page.getByRole("dialog").locator(".detail-evidence")).toHaveCount(0);
    await expect(page.getByRole("dialog").locator("video")).toHaveJSProperty("controls", false);
  }
});
