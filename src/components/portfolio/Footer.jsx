import { useLanguage } from "@/hooks/useLanguage";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import { profile } from "@/data/portfolio";
import Asterisk from "./Asterisk";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="section-shell footer">
      <a
        href="#inicio"
        className="wordmark footer-logo"
        aria-label={t("Volver al inicio")}
      >
        jp
        <Asterisk className="logo-star" />
      </a>
      <p>
        © {new Date().getFullYear()} Juan Pablo Orihuela.
        <br />
        <span>{t("Diseñado con intención. Construido con cuidado.")}</span>
      </p>
      <div className="footer-links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" size={16} /> GitHub{" "}
          <ArrowUpRight size={13} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden="true" size={16} /> LinkedIn{" "}
          <ArrowUpRight size={13} />
        </a>
        <a href="#inicio" className="back-top" aria-label={t("Volver arriba")}>
          <ArrowRight size={20} />
        </a>
      </div>
    </footer>
  );
}
