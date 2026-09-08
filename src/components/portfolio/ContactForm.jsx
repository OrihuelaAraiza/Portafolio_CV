import { useLanguage } from "@/hooks/useLanguage";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";

// Validación propia en lugar de una librería de formularios: son cuatro campos,
// y el presupuesto de carga inicial no da para veinte kilobytes de dependencia.
// Cada regla devuelve el mensaje de error o null.
const MAX_MESSAGE = 900;

const fields = [
  {
    name: "name",
    label: "Tu nombre",
    type: "text",
    autoComplete: "name",
    placeholder: "Cómo te llamas",
    validate: (value) =>
      value.trim().length === 0
        ? "Escribe tu nombre para saber con quién hablo."
        : value.trim().length < 2
          ? "El nombre parece demasiado corto."
          : null,
  },
  {
    name: "email",
    label: "Tu correo",
    type: "email",
    autoComplete: "email",
    placeholder: "donde te respondo",
    validate: (value) =>
      value.trim().length === 0
        ? "Necesito un correo para poder contestarte."
        : // Comprobación deliberadamente amplia: rechaza lo que claramente no es
          // una dirección sin excluir dominios válidos poco comunes.
          !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? "Revisa el correo: parece que le falta algo."
          : null,
  },
  {
    name: "subject",
    label: "De qué se trata",
    type: "select",
    wide: true,
    options: [
      "Un proyecto web",
      "Una app iOS",
      "Diseño de producto o UI",
      "Una colaboración",
      "Otra cosa",
    ],
    validate: () => null,
  },
  {
    name: "message",
    label: "Tu mensaje",
    type: "textarea",
    wide: true,
    placeholder: "Cuéntame qué tienes en mente.",
    validate: (value) =>
      value.trim().length === 0
        ? "Cuéntame algo, aunque sean dos líneas."
        : value.trim().length < 15
          ? "Un poco más de contexto me ayuda a responderte bien."
          : value.length > MAX_MESSAGE
            ? `El mensaje pasa de ${MAX_MESSAGE} caracteres.`
            : null,
  },
];

const empty = { name: "", email: "", subject: "Un proyecto web", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  // Hasta el primer envío no se marca nada en rojo: corregir a alguien mientras
  // todavía está escribiendo su nombre es hostil.
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(null);
  const form = useRef(null);

  function validateAll(next = values) {
    const found = {};
    for (const field of fields) {
      const message = field.validate(next[field.name]);
      if (message) found[field.name] = message;
    }
    return found;
  }

  function update(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) {
      const message = fields.find((f) => f.name === name).validate(value);
      setErrors((current) => ({ ...current, [name]: message || undefined }));
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const found = validateAll();
    setErrors(found);

    const firstInvalid = fields.find((field) => found[field.name]);
    if (firstInvalid) {
      form.current
        ?.querySelector(`[name="${firstInvalid.name}"]`)
        ?.focus({ preventScroll: false });
      return;
    }

    // Sin servidor: se arma el correo y lo abre el cliente del visitante. El
    // mensaje queda también en pantalla por si no hay cliente configurado.
    const subject = `${t(values.subject)} — ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Un enlace real en lugar de asignar location: el gesto del visitante sigue
    // vigente, no se descarga la página y el mismo href queda visible abajo por
    // si no hay cliente de correo configurado.
    const link = document.createElement("a");
    link.href = href;
    link.click();
    setSent({ subject, body, href });
  }

  const remaining = MAX_MESSAGE - values.message.length;

  return (
    <form ref={form} className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {fields.map((field) => {
          const error = errors[field.name];
          const errorId = `${field.name}-error`;
          const shared = {
            id: field.name,
            name: field.name,
            value: values[field.name],
            "aria-invalid": error ? "true" : undefined,
            "aria-describedby": error ? errorId : undefined,
            onChange: (event) => update(field.name, event.target.value),
          };
          return (
            <p
              key={field.name}
              className={`form-row ${field.wide ? "form-row-wide" : ""}`}
            >
              <label htmlFor={field.name}>{t(field.label)}</label>

              {field.type === "select" ? (
                <select {...shared}>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  {...shared}
                  rows={5}
                  placeholder={t(field.placeholder)}
                  maxLength={MAX_MESSAGE}
                />
              ) : (
                <input
                  {...shared}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={t(field.placeholder)}
                />
              )}

              {field.name === "message" && (
                <span className="form-count" aria-hidden="true">
                  {remaining}
                </span>
              )}

              <span className="form-error" id={errorId} role="alert">
                {error ? t(error) : ""}
              </span>
            </p>
          );
        })}
      </div>

      <div className="form-actions">
        <Button type="submit" className="primary-cta">
          {t("Enviar mensaje")} <Send size={16} aria-hidden="true" />
        </Button>
        <span className="form-note">
          {t(
            "Se abre tu cliente de correo con el mensaje ya escrito. Nada se envía desde esta página.",
          )}
        </span>
      </div>

      {sent && (
        <div className="form-sent" role="status">
          <p>
            {t("Listo,")} <strong>{values.name.trim()}</strong>
            {t(
              ". Si tu cliente de correo no se abrió, escríbeme directo a",
            )}{" "}
            <a href={sent.href}>{profile.email}</a>.
          </p>
          <details>
            <summary>{t("Ver el mensaje que preparé")}</summary>
            <pre>{sent.body}</pre>
          </details>
        </div>
      )}
    </form>
  );
}
