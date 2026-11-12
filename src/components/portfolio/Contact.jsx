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
import DitherField from "@/components/fx/DitherField";
import Asterisk from "./Asterisk";
import ContactForm from "./ContactForm";
import Line from "./Line";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";
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
      <DitherField className="contact-field" />
      <Marquee className="contact-marquee" speed={70} direction={1}>
        {["Hablemos", "Let’s talk", "Construyamos algo"].map((phrase) => (
          <span key={phrase} aria-hidden="true">
            {phrase} <Asterisk />
          </span>
        ))}
      </Marquee>
      <div className="section-shell contact-shell">
        <Reveal>
          <div className="contact-kicker">
            <span className="eyebrow">{t("¿TIENES UNA IDEA EN MENTE?")}</span>
            <Sparkles size={22} />
          </div>
          <a className="contact-title" href={`mailto:${profile.email}`}>
            <h2>
              <Line>{t("Hagamos algo")}</Line>{" "}
              <Line delay={0.1}>
                <span className="contact-serif">
                  {t("que se sienta diferente.")}
                </span>
              </Line>
            </h2>
            <Magnetic strength={0.35}>
              <span className="contact-arrow">
                <ArrowUpRight strokeWidth={1} />
              </span>
            </Magnetic>
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
