import React from "react";
import { PhoneCarousel } from "../components/PhoneCarousel"; // ajusta el path
import imgDiagCultivos from "../assets/apps/IMG_5934.PNG";
import imgDashboardEscolar from "../assets/apps/IMG_5931.PNG";
import imgUPocketSplash from "../assets/apps/IMG_5930.PNG";
import imgCultivoSplash from "../assets/apps/IMG_5932.PNG";
import imgClimaCultivos from "../assets/apps/IMG_5933.PNG";
import imgMarketplace from "../assets/apps/IMG_5935.PNG";

// Datos agrupados por proyecto
const agroScreens = [
  {
    img: imgDiagCultivos,
    title: "Diagnóstico de Cultivos",
    desc: "Analiza la salud de tus plantas y recibe recomendaciones automáticas.",
  },
  {
    img: imgCultivoSplash,
    title: "Splash Cultivos",
    desc: "Pantalla de inicio minimalista para app agrícola.",
  },
  {
    img: imgClimaCultivos,
    title: "Clima y Mis Cultivos",
    desc: "Consulta el clima y administra todos tus cultivos.",
  },
  {
    img: imgMarketplace,
    title: "Marketplace Agro",
    desc: "Compra y vende productos agrícolas de manera sencilla y rápida.",
  },
];

const upocketScreens = [
  {
    img: imgDashboardEscolar,
    title: "Dashboard Escolar",
    desc: "Visualiza tus clases, asistencias y calificaciones.",
  },
  {
    img: imgUPocketSplash,
    title: "UPocket Splash",
    desc: "Pantalla de bienvenida animada con branding.",
  },
];

export default function MobileApps() {
  return (
    <div className="min-h-screen py-16 bg-dark w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-32">
        {/* PROYECTO: Cultivos Smart */}
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange text-center mb-2">Smart Cultivos</h2>
          <p className="text-light/80 text-lg mb-4 max-w-2xl text-center">
            Plataforma móvil integral para agricultura inteligente: diagnóstico automático, clima, manejo de cultivos y mercado digital.
          </p>
          <PhoneCarousel images={agroScreens} />
        </section>

        {/* PROYECTO: UPocket */}
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange text-center mb-2">UPocket</h2>
          <p className="text-light/80 text-lg mb-4 max-w-2xl text-center">
            Aplicación escolar para gestión académica. Dashboard inteligente y branding moderno.
          </p>
          <PhoneCarousel images={upocketScreens} />
        </section>
      </div>
    </div>
  );
}