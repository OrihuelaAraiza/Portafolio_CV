import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const languageButton = (page, name) =>
  page.locator(".site-header").getByRole("button", { name, exact: true });

// Changing language must preserve the visitor's work, not remount the page.
test("switches all sections and remembers the preference after reload", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await languageButton(page, "English").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(languageButton(page, "English")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "with intention.",
  );
  await expect(page.locator("#proyectos h2")).toContainText("From concept");
  await expect(page.locator("#enfoque h2")).toContainText("starting point");
  await expect(page.locator("#laboratorio h2")).toContainText("Curiosity");
  await expect(page.locator("#sobre-mi h2")).toContainText("designer’s eye");
  await expect(page.locator("#contacto h2")).toContainText("feels different");
  await expect(page.locator(".footer p")).toContainText("Built with care");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /based in Mexico City/,
  );
  await expect(
    page.getByRole("link", { name: "Download CV", exact: true }),
  ).toHaveAttribute("hreflang", "es");
  expect(await page.evaluate(() => localStorage.getItem("jp-language"))).toBe(
    "en",
  );
  await page.goto("/"); // No URL hint: this must use the stored preference.
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(languageButton(page, "English")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await languageButton(page, "Español").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#proyectos h2")).toContainText("Del concepto");
  expect(errors).toEqual([]);
});

test("keeps project filters, the open gallery and its screenshot across languages", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "iOS & Mobile" }).click();
  await languageButton(page, "English").click();
  await expect(page.getByRole("tab", { name: "iOS & Mobile" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("[data-project-id]")).toHaveCount(2);
  const trigger = page.getByRole("button", {
    name: "View project Mi Campo",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("smart farming prototype");
  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  await expect(dialog.locator("figcaption")).toContainText(
    "Diagnostic interface",
  );
  await dialog.getByRole("button", { name: "Español", exact: true }).click();
  await expect(dialog.locator("figcaption")).toContainText(
    "Interfaz de diagnóstico",
  );
  await expect(dialog.locator(".gallery-controls")).toContainText("2 / 3");
  await expect(page).toHaveURL(/project=mi-campo/);
  await expect(dialog).toContainText("Prototipo colaborativo");
  await dialog.getByRole("button", { name: "English", exact: true }).click();
  await expect(dialog.locator(".gallery-controls")).toContainText("2 / 3");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page).not.toHaveURL(/project=/);
  await expect(page).toHaveURL(/lang=en/);
});

test("translates validation and the prepared email without losing form input", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Tu nombre").fill("Ana Torres");
  await page.getByLabel("Tu correo").fill("ana@");
  await page.getByLabel("De qué se trata").selectOption("Una app iOS");
  await page
    .getByLabel("Tu mensaje")
    .fill("Quiero hablar de una aplicación para mi proyecto.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await languageButton(page, "English").click();
  await expect(page.getByLabel("Your name")).toHaveValue("Ana Torres");
  await expect(page.getByLabel("Your email")).toHaveValue("ana@");
  await expect(page.getByLabel("What’s it about?")).toHaveValue("Una app iOS");
  await expect(page.locator("#email-error")).toContainText(
    "Check your email address",
  );
  await expect(page.getByLabel("Your message")).toHaveValue(
    "Quiero hablar de una aplicación para mi proyecto.",
  );
  await page.getByLabel("Your email").fill("ana@example.com");
  await page.evaluate(() => {
    const click = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (this.href.startsWith("mailto:")) {
        window.__mailto = this.href;
        return;
      }
      return click.call(this);
    };
  });
  await page.getByRole("button", { name: "Prepare email" }).click();
  const href = await page.evaluate(() => window.__mailto);
  const email = new URL(href);
  expect(email.searchParams.get("subject")).toBe("An iOS app — Ana Torres");
  expect(email.searchParams.get("body")).toContain(
    "Quiero hablar de una aplicación",
  );
  await expect(page.locator(".form-sent")).toContainText(
    "If your email app didn’t open",
  );
});

test("English command search opens a localized project and restores focus", async ({
  page,
}) => {
  await page.goto("/?lang=en");
  await page.getByRole("button", { name: /Search the portfolio/ }).click();
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await palette.getByRole("combobox").fill("healthcare");
  await expect(palette.getByRole("option")).toHaveCount(1);
  await palette.getByRole("option").click();
  const project = page.getByRole("dialog");
  await expect(project).toContainText("The challenge");
  await expect(project).toContainText("healthcare ecosystem");
  await project.getByRole("button", { name: "Close", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "View project ROMI", exact: true }),
  ).toBeFocused();
});

test("explicit language links override storage and retain legacy project routing", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("jp-language", "es"));
  await page.goto("/apps?lang=en&project=upocket");
  const dialog = page.getByRole("dialog");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(dialog).toContainText("Student dashboard");
  await expect(dialog).toContainText("iOS prototype");
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("tab", { name: "iOS & Mobile" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page).toHaveURL(/lang=en/);
  await page.goto("/?lang=unsupported");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("language switching works when local storage is blocked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await languageButton(page, "English").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "with intention",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await languageButton(page, "Español").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("English mobile menu reaches its section after switching language", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile menu only");
  await page.goto("/");
  await languageButton(page, "English").click();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About me" })
    .click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.locator("#sobre-mi")).toBeFocused();
  await expect(page).toHaveURL(/lang=en#sobre-mi/);
});

for (const theme of ["light", "dark"]) {
  test(`English page and gallery meet automated WCAG AA checks in ${theme} theme`, async ({
    page,
  }) => {
    await page.addInitScript(
      (value) => localStorage.setItem("jp-theme", value),
      theme,
    );
    await page.goto("/?lang=en");
    const audit = () =>
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
    expect((await audit()).violations).toEqual([]);
    await page
      .getByRole("button", { name: "View project ROMI", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText("The challenge");
    expect((await audit()).violations).toEqual([]);
  });
}

test("both languages fit narrow phones, tablets and desktop headers", async ({
  page,
}) => {
  for (const width of [320, 375, 680, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ["es", "en"]) {
      await page.goto(`/?lang=${language}`);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth > innerWidth,
        header:
          document.querySelector(".header-inner").scrollWidth >
          document.querySelector(".header-inner").clientWidth,
      }));
      expect(overflow, `${width}px / ${language}`).toEqual({
        page: false,
        header: false,
      });
      await expect(languageButton(page, "English")).toBeInViewport();
      await expect(languageButton(page, "Español")).toBeInViewport();
    }
  }
});
