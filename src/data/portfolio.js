export const profile = {
  name: "Juan Pablo Orihuela",
  email: "orihuelaaraizajuanpablo@gmail.com",
  github: "https://github.com/OrihuelaAraiza",
  linkedin: "https://www.linkedin.com/in/juan-pablo-orihuela-araiza-65a566325/",
};

// Curated from public repositories and existing portfolio assets. See docs/content-sources.md.
const previousProjects = [
  {
    id: "romi",
    number: "01",
    title: "ROMI",
    subtitle: "Una experiencia digital para acercar la salud.",
    category: "web",
    categoryLabel: "Plataforma de salud",
    year: "2026",
    theme: "romi",
    role: "CTO · Desarrollo frontend",
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

// Selection is editorial: frontend first, with game development as a differentiator.
// Project dates identify documented versions, not employment start dates.
const recentProjects = [
  {
    id: "nexo-crm",
    title: "Nexo CRM",
    subtitle: "De una tabla de datos a una decisión clara.",
    category: "web",
    categoryLabel: "Dashboard · Visualización de datos",
    year: "2026",
    theme: "nexo",
    featured: true,
    role: "Frontend · UI de producto",
    stack: ["JavaScript", "Chart.js", "Gemini", "Cloudflare Workers"],
    cover: "/projects/nexo.webp",
    screens: [
      { src: "/projects/nexo.webp", label: "Resumen de negocio con datos de ejercicio" },
      { src: "/projects/nexo-clientes.webp", label: "Tabla de clientes y acciones de seguimiento" },
    ],
    live: "https://nexo-electrodomesticos-crm.jp-orihuela.chatgpt.site",
    description: "Un CRM analítico que convierte un CSV de electrodomésticos en filtros, segmentos, comparativas y visualizaciones interactivas. La interfaz conecta el análisis con acciones de seguimiento.",
    challenge: "Mantener el mismo contexto entre gráficas, tablas, fichas y consultas para que explorar los datos no obligue a empezar de nuevo.",
    design: "Filtros compartidos, vistas guardadas, selección de audiencias y tarjetas en móvil. Las visualizaciones ofrecen tablas como alternativa al canvas.",
    engineering: "Cálculos locales sobre el CSV y un agente Gemini con herramientas de lectura. Las gráficas del chat se construyen con resultados verificados de esas herramientas; las consultas guiadas funcionan sin IA.",
    proof: "Filtros compartidos, gráficas y tablas que conservan el contexto.",
    verification: "Pruebas de analítica, consultas y visualizaciones en el repositorio; comparación, exportación y estados vacíos documentados en el README.",
    scope: "Ejercicio con 1,000 pedidos y correos de ejemplo. Notas y campañas se guardan por navegador; no se envían campañas ni se sincronizan entre equipos.",
    status: "Demo analítica pública",
  },
  {
    id: "brassbound",
    title: "Brassbound",
    subtitle: "Un universo de recetas, convertido en una interfaz explorable.",
    category: "web",
    categoryLabel: "Web interactiva · Minecraft",
    year: "2026",
    theme: "brassbound",
    featured: true,
    role: "Frontend · Diseño de interacción",
    stack: ["JavaScript", "CSS 3D", "Vinext", "Cloudflare D1"],
    cover: "/projects/brassbound.webp",
    screens: [
      { src: "/projects/brassbound.webp", label: "Mesa de trabajo de All the Mods 10" },
      { src: "/projects/brassbound-tutoriales.webp", label: "Biblioteca de tutoriales paso a paso" },
    ],
    live: "https://brassbound-atm10-jp.jp-orihuela.chatgpt.site",
    repo: "https://github.com/OrihuelaAraiza/brassbound-atm10",
    description: "Guía en español para All the Mods 10 8.1. Une un atlas de objetos, recetas, tutoriales y construcciones ilustradas en una experiencia web inspirada en Minecraft.",
    challenge: "Hacer navegable la complejidad de un modpack: pasar de buscar un objeto a entender sus materiales, usos y siguiente paso.",
    design: "Una mesa de trabajo como punto de entrada, búsqueda por intención y lecciones visuales por pasos. La estética del juego acompaña jerarquías y controles de una web.",
    engineering: "Catálogos y módulos JavaScript, escenas ilustrativas con CSS 3D y progreso compartido mediante D1. La reproducción se controla y respeta movimiento reducido.",
    proof: "Búsqueda, recetas y tutoriales 3D dentro del mismo recorrido.",
    verification: "El repositorio incluye pruebas de datos, tutoriales y perfiles. Cada lección conserva sus fuentes y la versión del modpack que documenta.",
    scope: "El progreso se registra manualmente. No hay conexión al servidor de Minecraft; las escenas son ilustraciones, no una simulación del juego ni el motor Ponder.",
    status: "Guía web pública",
  },
  {
    id: "we-can-fix-this",
    title: "We Can Fix This",
    subtitle: "Cooperar, reparar y responder a una nave en crisis.",
    category: "games",
    categoryLabel: "Videojuego · Cooperativo local",
    year: "2026",
    theme: "wcft",
    featured: true,
    role: "Desarrollo de videojuegos · Proyecto colaborativo",
    stack: ["Unity", "C#", "Input System", "URP"],
    cover: "/videos/trailer-poster.webp",
    screens: [
      { src: "/videos/trailer-poster.webp", label: "Fotograma del tráiler aportado en mayo de 2026" },
      { src: "/videos/gameplay-poster.webp", label: "Fotograma del gameplay aportado en mayo de 2026" },
    ],
    video: "/videos/we-can-fix-this-gameplay.mp4",
    repo: "https://github.com/OrihuelaAraiza/We_Can_Fix_This_",
    description: "Prototipo cooperativo local para 1–4 jugadores. La tripulación de una nave averiada coordina roles y repara estaciones antes de que se agote la integridad de la nave.",
    challenge: "Hacer legibles los fallos simultáneos y conservar la selección de roles y dispositivos al pasar del lobby a la partida.",
    design: "Roles con habilidades diferenciadas, estaciones reparables y feedback de la integridad de la nave. El video permite observar la interacción del prototipo.",
    engineering: "Unity y C# con Input System. El código documenta eventos de estado en RepairStation, un registro de estaciones activas y drenaje centralizado en ShipHealth.",
    proof: "Gameplay real y código de estados, roles e interacción.",
    verification: "El repositorio documenta pruebas EditMode para estaciones, salud de la nave, escenas, jugadores y generación de layout. No se ejecutaron desde el portafolio.",
    scope: "Proyecto colaborativo en desarrollo. Los videos de mayo documentan una versión anterior; no se ofrece una build jugable ni se atribuye autoría individual de todos los sistemas.",
    status: "Prototipo Unity · 1–4 jugadores",
  },
  {
    id: "loop",
    title: "Loop",
    subtitle: "Volver a un proyecto también es avanzar.",
    category: "mobile",
    categoryLabel: "App iOS · Producto personal",
    year: "2026",
    theme: "loop",
    role: "Desarrollo iOS · Diseño de interacción",
    stack: ["SwiftUI", "SwiftData", "StoreKit 2"],
    cover: "/projects/loop-detalle.webp",
    screens: [
      { src: "/projects/loop-detalle.webp", label: "Detalle de proyecto con datos ficticios de prueba" },
      { src: "/projects/loop-ruta.webp", label: "Recorrido e ideas con datos ficticios de prueba" },
    ],
    repo: "https://github.com/OrihuelaAraiza/loop",
    description: "Una app nativa para registrar intentos, fotos e ideas de proyectos personales y retomar donde te quedaste. El progreso se presenta como un recorrido, sin rachas ni presión por volver.",
    challenge: "Conservar el contexto de un proyecto entre sesiones y dar valor a avances pequeños sin convertirlos en una obligación.",
    design: "Bienvenida breve, pistas para retomar, comparación de fotos y una mascota con gestos. El movimiento y la personalización acompañan las acciones de la persona.",
    engineering: "SwiftUI y SwiftData, biblioteca local, respaldos con fotos y restauración validada. Incluye StoreKit 2, español e inglés y ajustes de accesibilidad.",
    proof: "Persistencia local, respaldos y una interacción con identidad propia.",
    verification: "Capturas de simulador del Bloque I, con datos sintéticos. El repositorio documenta pruebas de interfaz, migración y restauración, con sus límites.",
    scope: "En desarrollo, todavía sin publicación en App Store. Las capturas no acreditan el cierre de los requisitos de lanzamiento.",
    status: "iOS · En desarrollo",
  },
  {
    id: "romimente",
    title: "ROMImente",
    subtitle: "Dar continuidad a flujos de trabajo complejos.",
    category: "web",
    categoryLabel: "Prototipo · Flujos por perfil",
    year: "2026",
    theme: "romimente",
    role: "Frontend · Prototipado de producto",
    stack: ["JavaScript", "CSS", "IndexedDB", "Vite"],
    cover: "/projects/romimente.webp",
    screens: [{ src: "/projects/romimente.webp", label: "Dashboard del prototipo con perfiles ficticios" }],
    repo: "https://github.com/OrihuelaAraiza/romimente-amparo-demo",
    description: "Demo navegable para Clínica El Amparo que explora agenda, expedientes, recursos y un portal de paciente. Un ejercicio de arquitectura de información y continuidad entre perfiles.",
    challenge: "Organizar formularios extensos, documentos y seguimiento sin perder la relación entre una persona, su expediente y sus tareas.",
    design: "Navegación por contexto, formularios por secciones, notas versionadas y vistas diferenciadas para profesionales y pacientes.",
    engineering: "Interfaz en JavaScript con persistencia local e IndexedDB para archivos. Playwright cubre recorridos del demo, formularios y estados entre vistas.",
    proof: "Flujos por perfil, formularios y persistencia del prototipo.",
    verification: "Pruebas de navegador disponibles en el repositorio. La captura procede de una sesión local con el perfil de demostración.",
    scope: "Solo datos ficticios. Sin autenticación real, servidor clínico ni sincronización; no es un sistema autorizado para atención clínica.",
    status: "Demo con datos ficticios",
  },
];

export const projects = [
  recentProjects[0],
  recentProjects[1],
  { ...previousProjects[0], featured: true, proof: "Navegación multilingüe y componentes para un ecosistema de salud." },
  recentProjects[2],
  recentProjects[3],
  recentProjects[4],
  ...previousProjects.slice(1),
].map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));

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
    name: "Visuaid",
    type: "iOS · SwiftUI · Vision",
    description:
      "Un asistente visual que detecta color, texto y formas con la cámara y los lee en voz alta. Incluye filtros de corrección para daltonismo.",
    href: "https://github.com/OrihuelaAraiza/VisualAid",
    icon: "eye",
  },
  {
    number: "03",
    name: "B-lance",
    type: "Web · React · TypeScript · Motion",
    description:
      "Maqueta de contención emocional para jóvenes: un check-in de dos minutos, rutas de autorregulación y una pausa sensorial guiada. Un prototipo, no una herramienta clínica.",
    href: "https://github.com/OrihuelaAraiza/B-Lance",
    icon: "pulse",
  },
  {
    number: "04",
    name: "AR Labs",
    type: "Unity · AR Foundation · ARKit",
    description:
      "Laboratorios de realidad aumentada para iPad: seguimiento simultáneo de imágenes, con un objeto 3D anclado a cada marcador.",
    href: "https://github.com/OrihuelaAraiza/VR",
    icon: "ar",
  },
];
