import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { profile } from "@/data/portfolio";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useLanguage();
  const [copyState, setCopyState] = useState("idle");
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyState("idle"), 4000);
  }
  return (
    <section id="contacto" className="contact-section">
      <div className="section-shell">
        <Reveal>
          <div className="contact-kicker">
            <span className="eyebrow">{t("¿TIENES UNA IDEA EN MENTE?")}</span>
            <Sparkles size={22} />
          </div>
          <a className="contact-title" href={`mailto:${profile.email}`}>
            <h2>
              {t("Hagamos algo")}
              <br />
              <span>{t("que se sienta diferente.")}</span>
            </h2>
            <span className="contact-arrow">
              <ArrowUpRight strokeWidth={1} />
            </span>
          </a>
          <div className="contact-bottom">
            <p>
              {t("Un producto, una colaboración o una buena conversación.")}
              <br />
              {t("Todo empieza con un hola.")}
            </p>
            <div className="email-area">
              <div className="email-row">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t("Copiar correo electrónico")}
                      onClick={copyEmail}
                    >
                      {copyState === "copied" ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t("Copiar correo")}</TooltipContent>
                </Tooltip>
              </div>
              <span className="copy-feedback" role="status">
                {copyState === "copied"
                  ? t("Correo copiado. ¡Hablemos!")
                  : copyState === "failed"
                    ? t("Puedes seleccionar el correo y copiarlo manualmente.")
                    : ""}
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
