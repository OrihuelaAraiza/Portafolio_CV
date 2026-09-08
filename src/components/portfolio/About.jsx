import { useLanguage } from "@/hooks/useLanguage";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import portrait from "@/assets/home.jpeg";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="sobre-mi" className="about-section">
      <div className="section-shell about-grid">
        <Reveal className="portrait-column">
          <div className="portrait-frame">
            <img
              src={portrait}
              alt="Juan Pablo Orihuela"
              loading="lazy"
              width="736"
              height="491"
            />
            <div className="portrait-label">
              <span>{t("El humano detrás del código.")}</span>
              <ArrowDownRight size={20} />
            </div>
          </div>
          <div className="portrait-caption">
            <span>JUAN PABLO ORIHUELA</span>
            <span>
              {t("CDMX, MÉXICO")}
              <ArrowUpRight size={10} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">
              <span className="section-index">04 /</span>{" "}
              {t("UN POCO SOBRE MÍ")}
            </span>
            <h2>
              {t("Ojo de diseñador.")}
              <br />
              <span className="serif-word">{t("Mente de developer.")}</span>
            </h2>
            <p>
              {t(
                "Me gusta ese punto en el que el diseño deja de ser una imagen y empieza a responder. Ahí es donde trabajo: entre la intención visual y el comportamiento de una interfaz.",
              )}
            </p>
            <p>
              {t("Soy")} <strong>{t("CTO de ROMI")}</strong> {t("e")}{" "}
              <strong>{t("iOS Developer en e-tribe")}</strong>
              {t(", trabajando para el cliente")} <strong>Grupo Salinas</strong>
              {t(
                ". Mi formación en Ingeniería en Animación y Videojuegos en la Universidad Panamericana conecta mi trabajo en web y SwiftUI con una sensibilidad especial por el movimiento y la interacción.",
              )}
            </p>
          </Reveal>
          <Reveal>
            <div className="experience-list">
              <div>
                <span className="experience-year">{t("ACTUALIDAD")}</span>
                <span>
                  <strong>CTO</strong>
                  <small>
                    {t("ROMI · Dirección tecnológica y desarrollo")}
                  </small>
                </span>
                <ArrowUpRight size={18} />
              </div>
              <div>
                <span className="experience-year">{t("ACTUALIDAD")}</span>
                <span>
                  <strong>iOS Developer</strong>
                  <small>{t("e-tribe · Cliente: Grupo Salinas")}</small>
                </span>
                <ArrowUpRight size={18} />
              </div>
              <div>
                <span className="experience-year">2022 — 2026</span>
                <span>
                  <strong>{t("Ingeniería en Animación y Videojuegos")}</strong>
                  <small>Universidad Panamericana</small>
                </span>
              </div>
              <div>
                <span className="experience-year">2024 / 2025</span>
                <span>
                  <strong>{t("Reconocimientos en hackathons")}</strong>
                  <small>
                    {t("2.º lugar iOS Lab · Mejor prototipo Enactus")}
                  </small>
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-links">
            <Button variant="outline" asChild>
              <a
                href="/JuanPabloOrihuela_CV.pdf"
                hrefLang="es"
                title={t("CV en español")}
                download
              >
                {t("Mi CV completo")} <Download size={16} />
              </a>
            </Button>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              {t("Conectar en LinkedIn")} <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
