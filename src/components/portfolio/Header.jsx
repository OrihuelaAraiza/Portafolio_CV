import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Menu,
  Moon,
  Search,
  Sun,
  Pause,
  Play,
} from "lucide-react";
import { useAppearance } from "@/hooks/useAppearance";
import Asterisk from "./Asterisk";
import LanguageSwitch from "./LanguageSwitch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

// La tecla del atajo cambia según el sistema. Se resuelve una sola vez: el
// portafolio se renderiza siempre en el navegador, no hay hidratación que
// pueda discrepar.
const isApple =
  typeof navigator !== "undefined" &&
  /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
const shortcutLabel = isApple ? "⌘K" : "Ctrl K";

const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#enfoque", label: "Mi enfoque" },
  { href: "#sobre-mi", label: "Sobre mí" },
];

export default function Header({ onOpenPalette }) {
  const { t } = useLanguage();
  const { theme, toggleTheme, motionDisabled, systemReduced, toggleMotion } =
    useAppearance();
  const [active, setActive] = useState("");
  const destination = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#inicio"
          className="wordmark"
          aria-label={t("JP Orihuela, inicio")}
        >
          jp
          <Asterisk className="logo-star" />
          <span className="wordmark-name">
            Juan Pablo
            <br />
            Orihuela
          </span>
        </a>
        <nav className="desktop-nav" aria-label={t("Navegación principal")}>
          {navLinks.map((link) => (
            <a
              className={active === link.href ? "active" : ""}
              aria-current={active === link.href ? "location" : undefined}
              key={link.href}
              href={link.href}
            >
              {t(link.label)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitch />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="palette-trigger"
                onClick={onOpenPalette}
                aria-label={t("Buscar en el portafolio, atajo {shortcut}", {
                  shortcut: shortcutLabel,
                })}
              >
                <Search size={15} aria-hidden="true" />
                <kbd aria-hidden="true">{shortcutLabel}</kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {t("Proyectos, secciones y acciones")}
            </TooltipContent>
          </Tooltip>
          <div className="appearance-controls">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="appearance-button motion-toggle"
                  size="icon"
                  variant="ghost"
                  onClick={toggleMotion}
                  disabled={systemReduced}
                  aria-label={
                    systemReduced
                      ? t("Movimiento reducido por el sistema")
                      : motionDisabled
                        ? t("Activar animaciones")
                        : t("Pausar animaciones")
                  }
                  aria-pressed={motionDisabled}
                >
                  {motionDisabled ? <Play size={15} /> : <Pause size={15} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {systemReduced
                  ? t("Respeta tu preferencia de movimiento reducido")
                  : motionDisabled
                    ? t("Activar animaciones")
                    : t("Pausar animaciones")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="appearance-button theme-toggle"
                  size="icon"
                  variant="ghost"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "dark"
                      ? t("Activar tema claro")
                      : t("Activar tema oscuro")
                  }
                >
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme === "dark" ? t("Tema claro") : t("Tema oscuro")}
              </TooltipContent>
            </Tooltip>
          </div>
          <a className="header-contact" href="#contacto">
            {t("Hablemos")} <ArrowUpRight size={16} />
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu-trigger"
                aria-label={t("Abrir menú")}
              >
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="mobile-menu"
              onCloseAutoFocus={(event) => {
                if (!destination.current) return;
                event.preventDefault();
                const section = document.querySelector(destination.current);
                destination.current = null;
                // Move focus to the destination after Radix releases the body scroll lock.
                requestAnimationFrame(() => {
                  section?.setAttribute("tabindex", "-1");
                  section?.focus({ preventScroll: true });
                  section?.scrollIntoView({ block: "start" });
                });
              }}
            >
              <DialogTitle>{t("Explora el portafolio")}</DialogTitle>
              <DialogDescription>
                {t("Diseño, código y un poco de mí.")}
              </DialogDescription>
              <nav aria-label={t("Navegación móvil")}>
                {[...navLinks, { href: "#contacto", label: "Hablemos" }].map(
                  (link) => (
                    <DialogClose key={link.href} asChild>
                      <a
                        href={link.href}
                        onClick={() => {
                          destination.current = link.href;
                        }}
                      >
                        {t(link.label)}
                        <ArrowUpRight />
                      </a>
                    </DialogClose>
                  ),
                )}
              </nav>
              <div className="mobile-menu-preferences">
                <LanguageSwitch />
                <Button
                  variant="ghost"
                  disabled={systemReduced}
                  onClick={toggleMotion}
                  aria-pressed={motionDisabled}
                >
                  {motionDisabled ? <Play size={15} /> : <Pause size={15} />}
                  {systemReduced
                    ? t("Movimiento reducido por el sistema")
                    : motionDisabled
                      ? t("Activar animaciones")
                      : t("Pausar animaciones")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
