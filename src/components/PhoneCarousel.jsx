import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PhoneCarousel({ images, autoplay = true, delay = 3300 }) {
  const [index, setIndex] = useState(0);
  const timeout = useRef(null);

  // Cambia de imagen automáticamente
  useEffect(() => {
    if (!autoplay) return;
    timeout.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearTimeout(timeout.current);
  }, [index, images.length, autoplay, delay]);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-[640px] flex items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border-[7px] border-zinc-900 shadow-2xl relative overflow-hidden mb-8">
        {/* Cámara frontal */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-700 rounded-full z-20" />
        <AnimatePresence initial={false}>
          <motion.img
            key={images[index].img}
            src={images[index].img}
            alt={images[index].title}
            className="w-[97%] h-[96%] object-cover rounded-[2rem] shadow-md"
            style={{ objectPosition: "top center", background: "#222" }}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -90 }}
            transition={{ duration: 0.55 }}
            draggable={false}
          />
        </AnimatePresence>
        {/* Controles laterales opcionales */}
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 text-4xl text-zinc-700 hover:text-orange/90 px-2 py-6 z-20"
          onClick={prev}
          aria-label="Anterior"
        >‹</button>
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 text-4xl text-zinc-700 hover:text-orange/90 px-2 py-6 z-20"
          onClick={next}
          aria-label="Siguiente"
        >›</button>
      </div>
      {/* Título y descripción */}
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-xl md:text-2xl text-orange text-center mb-1">
          {images[index].title}
        </h3>
        <p className="text-light/80 text-base md:text-lg text-center max-w-md">{images[index].desc}</p>
      </div>
      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`block w-3 h-3 rounded-full ${
              i === index ? "bg-orange" : "bg-zinc-700"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}