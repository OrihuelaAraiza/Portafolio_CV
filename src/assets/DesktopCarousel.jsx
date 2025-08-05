import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Carousel estilo laptop/mockup desktop para proyectos web
export function DesktopCarousel({ images, delay = 3500 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % images.length), delay);
    return () => clearInterval(interval);
  }, [images.length, delay]);

  return (
    <div className="relative w-[400px] h-[260px] bg-dark flex items-center justify-center rounded-2xl shadow-2xl border-4 border-darker overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-dark/70 rounded-2xl z-10 pointer-events-none" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={idx}
          src={images[idx]}
          alt=""
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.42 }}
        />
      </AnimatePresence>
      {/* Indicadores */}
      <div className="absolute bottom-2 left-0 w-full flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === idx ? "bg-orange" : "bg-light/30"} transition-all`}
            style={{ boxShadow: i === idx ? "0 0 7px #ff7f11bb" : "none" }}
          />
        ))}
      </div>
    </div>
  );
}