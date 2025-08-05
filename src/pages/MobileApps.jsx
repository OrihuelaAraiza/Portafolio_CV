import { motion } from "framer-motion";
import { PhoneCarousel } from "../components/PhoneCarousel";
import imgDiagCultivos from "../assets/apps/IMG_5934.PNG";
import imgDashboardEscolar from "../assets/apps/IMG_5931.PNG";
import imgUPocketSplash from "../assets/apps/IMG_5930.PNG";
import imgCultivoSplash from "../assets/apps/IMG_5932.PNG";
import imgClimaCultivos from "../assets/apps/IMG_5933.PNG";
import imgMarketplace from "../assets/apps/IMG_5935.PNG";

// Imágenes por proyecto
const agroScreens = [
  { img: imgDiagCultivos, title: "Diagnóstico de Cultivos", desc: "Analiza la salud de tus plantas y recibe recomendaciones automáticas." },
  { img: imgCultivoSplash, title: "Splash Cultivos", desc: "Pantalla de inicio minimalista para app agrícola." },
  { img: imgClimaCultivos, title: "Clima y Mis Cultivos", desc: "Consulta el clima y administra todos tus cultivos." },
  { img: imgMarketplace, title: "Marketplace Agro", desc: "Compra y vende productos agrícolas de manera sencilla y rápida." },
];

const upocketScreens = [
  { img: imgDashboardEscolar, title: "Dashboard Escolar", desc: "Visualiza tus clases, asistencias y calificaciones." },
  { img: imgUPocketSplash, title: "UPocket Splash", desc: "Pantalla de bienvenida animada con branding." },
];

export default function MobileApps() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-screen py-16 bg-dark w-full"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-32 px-3">
        {/* Smart Cultivos */}
        <section className="flex flex-col items-center gap-8">
          <h2 className="text-4xl font-extrabold text-orange text-center">Mi Campo</h2>
          <p className="text-light/80 text-lg mb-2 text-center max-w-2xl">
            Plataforma móvil integral para agricultura inteligente: diagnóstico automático, clima, manejo de cultivos y mercado digital. Experiencia 100% iOS, optimizada para campo y comunidad.
          </p>
          <PhoneCarousel images={agroScreens} autoplay={true} delay={3700} />
        </section>
        {/* UPocket */}
        <section className="flex flex-col items-center gap-8">
          <h2 className="text-4xl font-extrabold text-orange text-center">UPocket</h2>
          <p className="text-light/80 text-lg mb-2 text-center max-w-2xl">
            Aplicación escolar para gestión académica. Dashboard inteligente y branding moderno.
          </p>
          <PhoneCarousel images={upocketScreens} autoplay={true} delay={3700} />
        </section>
      </div>
    </motion.section>
  );
}