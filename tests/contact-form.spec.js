import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// El formulario no envía nada por la red: valida en el navegador y prepara el
// correo. Lo que se prueba es la validación accesible y que el mailto salga
// bien armado, no que llegue un mensaje.

const goToForm = async (page) => {
  await page.goto("/");
  await page.locator(".contact-form").scrollIntoViewIfNeeded();
};

const fill = async (page, { name, email, message }) => {
  if (name !== undefined) await page.getByLabel("Tu nombre").fill(name);
  if (email !== undefined) await page.getByLabel("Tu correo").fill(email);
  if (message !== undefined) await page.getByLabel("Tu mensaje").fill(message);
};

test("no marca errores antes del primer envío", async ({ page }) => {
  await goToForm(page);
  await fill(page, { email: "esto-no-es-un-correo" });
  await page.getByLabel("Tu mensaje").click();

  // Corregir a alguien mientras todavía está escribiendo es hostil: el campo
  // solo se marca cuando ya intentó enviar.
  await expect(page.getByLabel("Tu correo")).not.toHaveAttribute("aria-invalid");
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("al enviar vacío señala los campos y mueve el foco al primero", async ({
  page,
}) => {
  await goToForm(page);
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();

  await expect(page.getByLabel("Tu nombre")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Tu correo")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Tu mensaje")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  // El foco va al primer campo con problema, no se queda en el botón.
  await expect(page.getByLabel("Tu nombre")).toBeFocused();

  // Cada error se anuncia y queda enlazado a su campo.
  const alerts = page.getByRole("alert");
  await expect(alerts).toHaveCount(3);
  const describedBy = await page
    .getByLabel("Tu correo")
    .getAttribute("aria-describedby");
  expect(describedBy).toBe("email-error");
  await expect(page.locator("#email-error")).toContainText("correo");
});

test("rechaza un correo mal formado y lo acepta al corregirlo", async ({
  page,
}) => {
  await goToForm(page);
  await fill(page, {
    name: "Ana",
    email: "ana@",
    message: "Quiero hablar de un rediseño para nuestro producto.",
  });
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();

  await expect(page.getByLabel("Tu correo")).toBeFocused();
  await expect(page.locator("#email-error")).toBeVisible();

  // Tras el primer envío sí se corrige en vivo.
  await page.getByLabel("Tu correo").fill("ana@estudio.mx");
  await expect(page.locator("#email-error")).toBeHidden();
  await expect(page.getByLabel("Tu correo")).not.toHaveAttribute("aria-invalid");
});

test("pide algo más que dos palabras en el mensaje", async ({ page }) => {
  await goToForm(page);
  await fill(page, { name: "Ana", email: "ana@estudio.mx", message: "Hola" });
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();

  await expect(page.getByLabel("Tu mensaje")).toBeFocused();
  await expect(page.locator("#message-error")).toContainText("contexto");
});

test("prepara el correo con asunto y cuerpo al enviar datos válidos", async ({
  page,
}) => {
  await goToForm(page);
  // El componente abre el cliente creando un enlace y pulsándolo; se intercepta
  // para no lanzar el cliente de correo real durante la prueba.
  await page.evaluate(() => {
    window.__mailto = null;
    const click = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (this.href.startsWith("mailto:")) {
        window.__mailto = this.href;
        return;
      }
      return click.call(this);
    };
  });

  await fill(page, {
    name: "Ana Torres",
    email: "ana@estudio.mx",
    message: "Queremos rediseñar el panel de nuestro producto para este año.",
  });
  await page.getByLabel("De qué se trata").selectOption("Una app iOS");
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();

  const href = await page.evaluate(() => window.__mailto);
  expect(href).toBeTruthy();
  const url = new URL(href);
  expect(url.pathname).toBe("orihuelaaraizajuanpablo@gmail.com");
  expect(url.searchParams.get("subject")).toBe("Una app iOS — Ana Torres");
  const body = url.searchParams.get("body");
  expect(body).toContain("rediseñar el panel");
  expect(body).toContain("Ana Torres");
  expect(body).toContain("ana@estudio.mx");

  // Y queda una confirmación con el mensaje a la vista por si no hay cliente.
  // La sección ya tiene otro role="status" para el aviso de copiar correo.
  const status = page.locator(".form-sent");
  await expect(status).toHaveAttribute("role", "status");
  await expect(status).toContainText("Ana Torres");
  await expect(status.getByRole("link")).toHaveAttribute("href", href);
});

test("respeta el límite de caracteres del mensaje", async ({ page }) => {
  await goToForm(page);
  await page.getByLabel("Tu mensaje").fill("a".repeat(1200));
  const value = await page.getByLabel("Tu mensaje").inputValue();
  expect(value).toHaveLength(900);
});

test("pasa las comprobaciones WCAG AA con los errores visibles", async ({
  page,
}) => {
  await goToForm(page);
  await page.getByRole("button", { name: /Enviar mensaje/ }).click();
  await expect(page.getByRole("alert")).toHaveCount(3);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .include(".contact-form")
    .analyze();
  expect(results.violations).toEqual([]);
});
