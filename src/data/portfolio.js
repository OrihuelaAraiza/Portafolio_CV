export const profile = {
  name: "Juan Pablo Orihuela",
  email: "orihuelaaraizajuanpablo@gmail.com",
  github: "https://github.com/OrihuelaAraiza",
  linkedin: "https://www.linkedin.com/in/juan-pablo-orihuela-araiza-65a566325/",
};

// Curated from public repositories and existing portfolio assets. See docs/content-sources.md.
export const projects = [
  {
    id: "romi",
    number: "01",
    title: "ROMI",
    subtitle: "Una experiencia digital para acercar la salud.",
    category: "web",
    categoryLabel: "Plataforma de salud",
    year: "2026",
    theme: "romi",
    role: "Desarrollo frontend",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    cover: "/projects/romi.webp",
    screens: [
      { src: "/projects/romi.webp", label: "Página de inicio" },
      { src: "/projects/romi-community.webp", label: "Ecosistema y comunidad" },
    ],
    live: "https://romiweb.vercel.app/es",
    repo: "https://github.com/OrihuelaAraiza/ROMI_Web",
    description:
      "La presencia web de un ecosistema de salud que conecta orientación, atención médica e investigación. Una interfaz que necesita transmitir confianza desde el primer contacto.",
    challenge:
      "Organizar una oferta amplia de servicios y recursos para que pacientes y profesionales encuentren su siguiente paso.",
    design:
      "Jerarquía editorial, recorridos por secciones y llamadas a la acción diferenciadas según el contexto de cada visitante.",
    engineering:
      "Componentes en Next.js y TypeScript, navegación multilingüe, visualización geográfica e integración de los puntos de entrada a Chat ROMI.",
    status: "Sitio web",
  },
  {
    id: "one-pharmacy",
    number: "02",
    title: "One Pharmacy",
    subtitle: "Del catálogo al carrito, con claridad.",
    category: "web",
    categoryLabel: "E-commerce",
    year: "2026",
    theme: "pharmacy",
    role: "Frontend · Interacción",
    stack: ["React", "Next.js", "Radix UI", "Motion"],
    cover: "/projects/one-pharmacy.webp",
    screens: [
      { src: "/projects/one-pharmacy.webp", label: "Catálogo de productos" },
      { src: "/projects/one-pharmacy-home.webp", label: "Página de inicio" },
    ],
    live: "https://one-pharmacy-liard.vercel.app",
    repo: "https://github.com/OrihuelaAraiza/One_Pharmacy",
    description:
      "Una experiencia de farmacia digital con catálogo, búsqueda, sucursales y recorridos para pacientes y profesionales de la salud.",
    challenge:
      "Dar coherencia a la exploración de productos, las diferencias de precio por sucursal y el recorrido de compra.",
    design:
      "Filtros, tarjetas de producto y un carrito persistente que mantienen el contexto mientras la persona explora.",
    engineering:
      "Una interfaz React con cuentas por perfil, checkout, historial de pedidos y paneles de gestión. El enlace permite explorar la implementación de demostración.",
    status: "Demo web",
  },
  {
    id: "brevemente",
    number: "03",
    title: "BreveMente",
    subtitle: "Menos fricción. Más espacio para acompañar.",
    category: "web",
    categoryLabel: "Producto digital",
    year: "2026",
    theme: "breve",
    role: "Frontend · UI de producto",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "FullCalendar"],
    cover: "/projects/brevemente.webp",
    screens: [
      { src: "/projects/brevemente.webp", label: "Inicio de la plataforma" },
    ],
    live: "https://brevemente-blond.vercel.app",
    repo: "https://github.com/OrihuelaAraiza/Brevemente",
    description:
      "Un prototipo de plataforma clínica que reúne agenda, pacientes y herramientas de consulta en una misma experiencia de producto.",
    challenge:
      "Dar orden a flujos de trabajo con mucha información y diferentes necesidades según el rol de la persona.",
    design:
      "Navegación consistente, jerarquías de información y componentes reutilizables para conectar agenda, expedientes y seguimiento.",
    engineering:
      "Next.js, shadcn/ui y FullCalendar. La demostración usa datos de ejemplo y persistencia local en el navegador; no representa un sistema clínico en producción.",
    status: "Prototipo interactivo",
  },
  {
    id: "book-digital",
    number: "04",
    title: "Book Digital",
    subtitle: "Dejar que la fotografía cuente la historia.",
    category: "web",
    categoryLabel: "Diseño editorial",
    year: "2025",
    theme: "book",
    role: "Diseño · Desarrollo frontend",
    stack: ["React", "JavaScript", "CSS", "Vite"],
    cover: "/projects/book-digital.webp",
    screens: [
      {
        src: "/projects/book-digital.webp",
        label: "Portada del book fotográfico",
      },
      { src: "/projects/book-detail.webp", label: "Exploración fotográfica" },
    ],
    live: "https://book-digital.vercel.app",
    repo: "https://github.com/OrihuelaAraiza/Book-Digital",
    description:
      "Un archivo personal de fotografía: prácticas, exploraciones y proyectos visuales presentados como una experiencia web.",
    challenge:
      "Mostrar imágenes con suficiente presencia sin convertir la navegación en un obstáculo para descubrir el trabajo.",
    design:
      "La fotografía ocupa el primer plano. El espacio, la composición y una interfaz contenida acompañan el recorrido visual.",
    engineering:
      "Aplicación React con Vite, galerías de imágenes y una composición adaptable a distintos tamaños de pantalla.",
    status: "Sitio web",
  },
  {
    id: "mi-campo",
    number: "05",
    title: "Mi Campo",
    subtitle: "Herramientas cercanas para el trabajo en el campo.",
    category: "mobile",
    categoryLabel: "App iOS · Hackathon",
    year: "2025",
    theme: "campo",
    role: "Desarrollo iOS · Proyecto en equipo",
    stack: ["Swift", "SwiftUI", "iOS"],
    cover: "/projects/campo-clima.webp",
    screens: [
      { src: "/projects/campo-clima.webp", label: "Clima y cultivos" },
      {
        src: "/projects/campo-diagnostico.webp",
        label: "Interfaz de diagnóstico",
      },
      { src: "/projects/campo-market.webp", label: "Mercado agrícola" },
    ],
    repo: "https://github.com/OrihuelaAraiza/Mi_Campo",
    description:
      "Prototipo colaborativo de agricultura inteligente desarrollado en un hackathon en Guadalajara. Reúne información del clima, cultivos y mercado en una aplicación móvil.",
    challenge:
      "Concentrar herramientas agrícolas en una experiencia que se pueda consultar y recorrer desde el teléfono.",
    design:
      "Navegación por tareas, información del clima y acceso visible a la captura de imágenes y a la comunidad.",
    engineering:
      "Interfaz nativa en SwiftUI. Proyecto realizado junto a José Manuel Amador García y Rodrigo López Moreno; las capturas muestran el prototipo existente.",
    status: "Prototipo iOS",
  },
  {
    id: "upocket",
    number: "06",
    title: "UPocket",
    subtitle: "La vida universitaria, a la mano.",
    category: "mobile",
    categoryLabel: "App iOS · Educación",
    year: "Prototipo",
    theme: "upocket",
    role: "Desarrollo iOS",
    stack: ["SwiftUI", "iOS", "Diseño de interacción"],
    cover: "/projects/upocket-dashboard.webp",
    screens: [
      {
        src: "/projects/upocket-dashboard.webp",
        label: "Panel del estudiante",
      },
      { src: "/projects/upocket-splash.webp", label: "Pantalla de bienvenida" },
    ],
    description:
      "Una aplicación escolar con un panel para consultar clases, asistencias y calificaciones, desarrollada en el contexto de la Universidad Panamericana.",
    challenge:
      "Reunir la información de la jornada académica en un punto de entrada claro y fácil de consultar.",
    design:
      "Un dashboard con jerarquía entre clases, asistencias y calificaciones, acompañado de una identidad visual propia.",
    engineering:
      "Vistas nativas y estados de interfaz en SwiftUI. Las imágenes pertenecen al prototipo incluido en el portafolio original.",
    status: "Prototipo iOS",
  },
];

export const experiments = [
  {
    number: "01",
    name: "SoundVision",
    type: "visionOS · RealityKit · Audio espacial",
    description:
      "Componer música manipulando un grafo 3D. Un prototipo nativo para Apple Vision Pro que explora la relación entre espacio, gesto y sonido.",
    href: "https://github.com/OrihuelaAraiza/SoundVision",
    icon: "audio",
  },
  {
    number: "02",
    name: "We Can Fix This",
    type: "Unity · C# · Game development",
    description:
      "Un prototipo de juego cooperativo multijugador. Otra forma de explorar sistemas interactivos, respuesta visual y experiencias compartidas.",
    href: "https://github.com/OrihuelaAraiza/We_Can_Fix_This_",
    icon: "game",
  },
];
