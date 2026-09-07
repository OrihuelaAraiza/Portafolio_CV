import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import portrait from "@/assets/home.jpeg";
import Reveal from "./Reveal";

export default function About() {
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
              <span>El humano detrás del código.</span>
              <ArrowDownRight size={20} />
            </div>
          </div>
          <div className="portrait-caption">
            <span>JUAN PABLO ORIHUELA</span>
            <span>CDMX, MÉXICO ↗</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">
              <span className="section-index">04 /</span> UN POCO SOBRE MÍ
            </span>
            <h2>
              Ojo de diseñador.
              <br />
              <span className="serif-word">Mente de developer.</span>
            </h2>
            <p>
              Me gusta ese punto en el que el diseño deja de ser una imagen y
              empieza a responder. Ahí es donde trabajo: entre la intención
              visual y el comportamiento de una interfaz.
            </p>
            <p>
              Soy frontend developer en <strong>ROMI</strong>, con formación en
              Ingeniería en Animación y Videojuegos en la Universidad
              Panamericana. Construyo para web, exploro interfaces nativas con
              SwiftUI y llevo esa sensibilidad por el movimiento a cada
              proyecto.
            </p>
          </Reveal>
          <Reveal>
            <div className="experience-list">
              <div>
                <span className="experience-year">ACTUALIDAD</span>
                <span>
                  <strong>Frontend Developer</strong>
                  <small>ROMI · Interfaces y experiencias web</small>
                </span>
                <ArrowUpRight size={18} />
              </div>
              <div>
                <span className="experience-year">2022 — 2026</span>
                <span>
                  <strong>Ingeniería en Animación y Videojuegos</strong>
                  <small>Universidad Panamericana</small>
                </span>
              </div>
              <div>
                <span className="experience-year">2024 / 2025</span>
                <span>
                  <strong>Reconocimientos en hackathons</strong>
                  <small>2.º lugar iOS Lab · Mejor prototipo Enactus</small>
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-links">
            <Button variant="outline" asChild>
              <a href="/JuanPabloOrihuela_CV.pdf" download>
                Mi CV completo <Download size={16} />
              </a>
            </Button>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              Conectar en LinkedIn <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
