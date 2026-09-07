import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const navLinks = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#enfoque", label: "Mi enfoque" },
  { href: "#sobre-mi", label: "Sobre mí" },
];

export default function Header() {
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
        <a href="#inicio" className="wordmark" aria-label="JP Orihuela, inicio">
          jp<span className="logo-star">✳</span>
          <span className="wordmark-name">
            Juan Pablo
            <br />
            Orihuela
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              className={active === link.href ? "active" : ""}
              aria-current={active === link.href ? "location" : undefined}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-contact" href="#contacto">
            Hablemos <ArrowUpRight size={16} />
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mobile-menu-trigger"
                aria-label="Abrir menú"
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
              <DialogTitle>Explora el portafolio</DialogTitle>
              <DialogDescription>
                Diseño, código y un poco de mí.
              </DialogDescription>
              <nav aria-label="Navegación móvil">
                {[...navLinks, { href: "#contacto", label: "Hablemos" }].map(
                  (link) => (
                    <DialogClose key={link.href} asChild>
                      <a
                        href={link.href}
                        onClick={() => {
                          destination.current = link.href;
                        }}
                      >
                        {link.label}
                        <ArrowUpRight />
                      </a>
                    </DialogClose>
                  ),
                )}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
