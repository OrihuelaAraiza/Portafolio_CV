import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="section-shell footer">
      <a
        href="#inicio"
        className="wordmark footer-logo"
        aria-label="Volver al inicio"
      >
        jp<span className="logo-star">✳</span>
      </a>
      <p>
        © {new Date().getFullYear()} Juan Pablo Orihuela.
        <br />
        <span>Diseñado con intención. Construido con cuidado.</span>
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
        <a href="#inicio" className="back-top" aria-label="Volver arriba">
          <ArrowRight size={20} />
        </a>
      </div>
    </footer>
  );
}
