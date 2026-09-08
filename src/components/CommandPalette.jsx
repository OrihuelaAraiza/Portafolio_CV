import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Moon,
  Pause,
  Play,
  Sun,
} from "lucide-react";
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects, profile } from "@/data/portfolio";
import { useAppearance } from "@/hooks/useAppearance";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "enfoque", label: "Mi enfoque" },
  { id: "laboratorio", label: "Laboratorio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

// El filtro difuso que trae cmdk puntúa cualquier coincidencia de letras
// sueltas: al escribir "copiar" colocaba UPocket y BreveMente por encima de
// "Copiar mi correo". Con este catálogo de diecisiete comandos la coincidencia
// por subcadena es más predecible, y normalizar los acentos deja que "sobre mi"
// encuentre "Sobre mí" y "diseno" encuentre "Diseño".
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function matchCommand(value, search) {
  const query = normalize(search).trim();
  if (!query) return 1;
  const haystack = normalize(value);
  const at = haystack.indexOf(query);
  if (at === -1) return 0;
  if (at === 0) return 1; // el comando empieza con lo escrito
  if (/[\s·]/.test(haystack[at - 1])) return 0.7; // empieza una palabra
  return 0.4; // aparece dentro de una palabra
}

// Las fichas se abren desde la tarjeta correspondiente cuando está en pantalla,
// para que al cerrar el diálogo el foco vuelva a un elemento que existe.
function cardFor(project) {
  return document.querySelector(
    `[aria-label="Ver proyecto ${CSS.escape(project.title)}"]`,
  );
}

export default function CommandPalette({ open, onOpenChange, onOpenProject }) {
  const { theme, toggleTheme, motionDisabled, systemReduced, toggleMotion } =
    useAppearance();
  const [copied, setCopied] = useState(false);
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);

  // Cierra la paleta y ejecuta la acción después, para que Radix libere el
  // bloqueo de scroll y el foco antes de mover la página o abrir otra ficha.
  const run = useCallback(
    (action) => {
      onOpenChange(false);
      requestAnimationFrame(action);
    },
    [onOpenChange],
  );

  function copyEmail() {
    navigator.clipboard?.writeText(profile.email).then(
      () => {
        setCopied(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), 3000);
      },
      () => {},
    );
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Paleta de comandos"
      description="Busca proyectos, secciones y acciones del portafolio."
      className="command-palette"
      filter={matchCommand}
    >
      <CommandInput placeholder="Buscar proyectos, secciones o acciones…" />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>

        <CommandGroup heading="Proyectos">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.title} ${project.categoryLabel} ${project.stack.join(" ")}`}
              onSelect={() => run(() => onOpenProject(project, cardFor(project)))}
            >
              <span className="command-index">{project.number}</span>
              <span className="command-label">{project.title}</span>
              <span className="command-hint">{project.categoryLabel}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ir a">
          {sections.map((section) => (
            <CommandItem
              key={section.id}
              value={`Ir a ${section.label}`}
              onSelect={() =>
                run(() =>
                  document.getElementById(section.id)?.scrollIntoView({
                    block: "start",
                  }),
                )
              }
            >
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="command-label">{section.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Acciones">
          <CommandItem
            value={theme === "dark" ? "Tema claro" : "Tema oscuro"}
            onSelect={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            <span className="command-label">
              {theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            </span>
          </CommandItem>

          {!systemReduced && (
            <CommandItem
              value={motionDisabled ? "Activar animaciones" : "Pausar animaciones"}
              onSelect={toggleMotion}
            >
              {motionDisabled ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
              <span className="command-label">
                {motionDisabled ? "Activar animaciones" : "Pausar animaciones"}
              </span>
            </CommandItem>
          )}

          <CommandItem value="Copiar correo electrónico" onSelect={copyEmail}>
            {copied ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
            <span className="command-label">
              {copied ? "Correo copiado" : "Copiar mi correo"}
            </span>
            <span className="command-hint">{profile.email}</span>
          </CommandItem>

          <CommandItem
            value="Descargar CV"
            onSelect={() =>
              run(() => {
                const link = document.createElement("a");
                link.href = "/JuanPabloOrihuela_CV.pdf";
                link.download = "";
                link.click();
              })
            }
          >
            <Download size={16} aria-hidden="true" />
            <span className="command-label">Descargar mi CV</span>
          </CommandItem>

          <CommandItem
            value="GitHub repositorios código"
            onSelect={() =>
              run(() => window.open(profile.github, "_blank", "noopener"))
            }
          >
            <Github size={16} aria-hidden="true" />
            <span className="command-label">Abrir GitHub</span>
          </CommandItem>

          <CommandItem
            value="LinkedIn contacto profesional"
            onSelect={() =>
              run(() => window.open(profile.linkedin, "_blank", "noopener"))
            }
          >
            <Linkedin size={16} aria-hidden="true" />
            <span className="command-label">Abrir LinkedIn</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
