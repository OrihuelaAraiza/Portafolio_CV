import web1 from '../assets/web/web1.png';
import web2 from '../assets/web/web2.png';
import web3 from '../assets/web/web3.png';
import web4 from '../assets/web/web4.png';
import web5 from '../assets/web/web5.png';
import web6 from '../assets/web/web6.png';

export const webProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Plataforma completa de comercio electrónico con carrito de compras, sistema de pagos y panel de administración.",
    fullDescription: "Desarrollé una plataforma de e-commerce completa con un enfoque en UX/UI excepcional. La aplicación incluye un sistema de autenticación robusto, carrito de compras persistente, integración de pagos con Stripe, y un panel de administración intuitivo. El diseño es completamente responsivo y optimizado para conversión.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "JWT"],
    image: web1,
    year: "2024",
    category: "fullstack",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Diseño UI/UX centrado en conversión",
      "Optimización de rendimiento (Lighthouse 95+)",
      "Arquitectura escalable y mantenible"
    ],
    color: "#FF4747"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplicación web para gestión de tareas con drag & drop, filtros y colaboración en tiempo real.",
    fullDescription: "Aplicación moderna de gestión de tareas con una interfaz intuitiva y fluida. Implementé drag & drop nativo, filtros avanzados, y sincronización en tiempo real usando Firebase. El diseño minimalista y funcional demuestra mi enfoque en UX limpia y eficiente.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Framer Motion", "React DnD"],
    image: web2,
    year: "2024",
    category: "frontend",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Interfaz drag & drop fluida",
      "Sincronización en tiempo real",
      "Diseño minimalista y funcional"
    ],
    color: "#FF7F11"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard meteorológico con mapas interactivos y pronósticos detallados para múltiples ciudades.",
    fullDescription: "Dashboard meteorológico interactivo con visualizaciones de datos avanzadas. Integré mapas interactivos, gráficos dinámicos y un sistema de favoritos. El diseño prioriza la legibilidad de datos y la experiencia visual atractiva.",
    technologies: ["Vue.js", "OpenWeather API", "Chart.js", "Leaflet", "Vite"],
    image: web3,
    year: "2023",
    category: "frontend",
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Visualización de datos avanzada",
      "Mapas interactivos",
      "Diseño responsive y accesible"
    ],
    color: "#4A90E2"
  },
  {
    id: 4,
    title: "Design System Showcase",
    description: "Sistema de diseño completo con componentes reutilizables, documentación y guías de estilo.",
    fullDescription: "Desarrollé un sistema de diseño completo desde cero, incluyendo componentes reutilizables, tokens de diseño, y documentación exhaustiva. Este proyecto demuestra mi capacidad para crear sistemas escalables y mantener consistencia visual.",
    technologies: ["React", "Storybook", "TypeScript", "Tailwind CSS", "Figma"],
    image: web4,
    year: "2024",
    category: "frontend",
    featured: true,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Sistema de componentes escalable",
      "Documentación completa",
      "Integración con Figma"
    ],
    color: "#9B59B6"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Sitio web portfolio moderno con animaciones fluidas, diseño responsivo y optimización SEO.",
    fullDescription: "Portfolio personal con un diseño único que combina animaciones sofisticadas con un rendimiento excepcional. Implementé lazy loading, optimización de imágenes, y un sistema de routing con transiciones suaves.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite", "React Router"],
    image: web5,
    year: "2024",
    category: "frontend",
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Animaciones fluidas y performantes",
      "SEO optimizado",
      "Rendimiento excepcional"
    ],
    color: "#1ABC9C"
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    description: "Dashboard de analytics con visualizaciones interactivas, filtros avanzados y exportación de datos.",
    fullDescription: "Dashboard de analytics empresarial con visualizaciones de datos complejas. Implementé gráficos interactivos, filtros dinámicos, y capacidades de exportación. El diseño prioriza la claridad de información y la usabilidad.",
    technologies: ["React", "D3.js", "Recharts", "TypeScript", "Zustand"],
    image: web6,
    year: "2024",
    category: "frontend",
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Visualizaciones de datos complejas",
      "Filtros dinámicos avanzados",
      "Interfaz empresarial profesional"
    ],
    color: "#E74C3C"
  }
]; 