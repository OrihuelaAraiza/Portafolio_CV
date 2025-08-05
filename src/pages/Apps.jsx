// src/pages/Apps.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCarousel } from "../components/PhoneCarousel";

// MOCKUPS WEB (pon tus imágenes aquí, importa según nombres reales)
import webMockup1 from "../assets/web/web1.png";
import webMockup2 from "../assets/web/web2.png";
import webMockup3 from "../assets/web/web3.png";
import webMockup4 from "../assets/web/web4.png";
import webMockup5 from "../assets/web/web5.png";


// MOCKUPS MOBILE
import imgDiagCultivos from "../assets/apps/IMG_5934.PNG";
import imgDashboardEscolar from "../assets/apps/IMG_5931.PNG";
import imgUPocketSplash from "../assets/apps/IMG_5930.PNG";
import imgCultivoSplash from "../assets/apps/IMG_5932.PNG";
import imgClimaCultivos from "../assets/apps/IMG_5933.PNG";
import imgMarketplace from "../assets/apps/IMG_5935.PNG";

// Proyectos mobile
const mobileProjects = [
  {
    title: "Smart Cultivos",
    desc: "Plataforma móvil para agricultura inteligente: diagnóstico automático, clima y mercado digital.",
    screens: [
      { img: imgDiagCultivos, title: "Diagnóstico", desc: "Analiza la salud de tus plantas." },
      { img: imgCultivoSplash, title: "Splash", desc: "Pantalla de bienvenida agrícola." },
      { img: imgClimaCultivos, title: "Clima y Mis Cultivos", desc: "Consulta clima y administra cultivos." },
      { img: imgMarketplace, title: "Marketplace", desc: "Compra y vende productos agrícolas." },
    ],
    type: "mobile"
  },
  {
    title: "UPocket",
    desc: "App escolar con dashboard, visualización de clases y branding moderno.",
    screens: [
      { img: imgDashboardEscolar, title: "Dashboard", desc: "Tus clases, asistencias y calificaciones." },
      { img: imgUPocketSplash, title: "Splash", desc: "Bienvenida animada y personalizada." },
    ],
    type: "mobile"
  }
];

// Proyectos web (mockups + links)
const webProjects = [
  {
    title: "Book Digital de Fotografía",
    desc: "Recorrido visual por prácticas, tareas y experimentos de fotografía.",
    liveUrl: "https://bookdigital-jp.vercel.app", // Cambia a tu URL real
    githubUrl: "https://github.com/OrihuelaAraiza/Book-Digital", // Cambia a tu repo real
    mockups: [webMockup1, webMockup2, webMockup3, webMockup4, webMockup5],
    type: "web"
  }
];

// Unifica y etiqueta por tipo
const allProjects = [
  ...mobileProjects.map(p => ({ ...p, category: "mobile" })),
  ...webProjects.map(p => ({ ...p, category: "web" })),
];

// Opciones de filtro
const categories = [
  { id: "all", name: "Todos" },
  { id: "mobile", name: "Apps Móviles" },
  { id: "web", name: "Web" }
];

export default function Apps() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen py-16 bg-dark w-full"
    >
      <div className="max-w-5xl mx-auto px-3 flex flex-col gap-24">
        {/* Header con Filtros */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-4xl font-extrabold text-orange text-center">Apps Web & Mobile</h2>
          <p className="text-light/80 text-lg mb-2 text-center max-w-2xl">
            Proyectos desarrollados para web y móvil, integrando UI, animaciones y experiencia de usuario moderna.
          </p>
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 border
                ${filter === cat.id ? 'bg-accent text-dark border-accent' : 'bg-darker text-light/80 border-darker hover:bg-accent/10'}
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        {/* Proyectos filtrados */}
        <div className="flex flex-col gap-24">
          <AnimatePresence>
            {filtered.map((project, idx) => (
              <motion.section
                key={project.title}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, y: 24 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center gap-10"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold text-accent text-center">{project.title}</h3>
                <p className="text-light/80 text-md md:text-lg mb-3 max-w-2xl text-center">{project.desc}</p>
                {/* Mobile: Carousel de screenshots */}
                {project.category === "mobile" && (
                  <PhoneCarousel images={project.screens} autoplay delay={3500} />
                )}
                {/* Web: Carousel de mockups y botones */}
                {project.category === "web" && (
                  <div className="w-full flex flex-col items-center gap-7">
                    <WebMockupCarousel images={project.mockups} />
                    <div className="flex gap-4 justify-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent hover:bg-orange text-dark font-semibold px-5 py-3 rounded-xl shadow transition-all duration-200"
                      >Ver Demo</a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-darker border border-accent hover:bg-accent/10 text-accent font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                      >Código</a>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

// Carousel simple para los mockups web
function WebMockupCarousel({ images }) {
  const [idx, setIdx] = React.useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="w-full flex justify-center">
        <img
          src={images[idx]}
          alt={`Mockup ${idx + 1}`}
          className="rounded-2xl shadow-xl border-2 border-accent bg-dark max-w-xl w-full object-contain"
          style={{ maxHeight: 420, minHeight: 220 }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full border-2 ${idx === i ? "bg-accent border-accent" : "bg-dark border-light/30"} transition-all`}
            aria-label={`Ver mockup ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}