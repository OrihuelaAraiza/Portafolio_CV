import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";

// Sprites/Assets
import avatarImg from "./assets/avatar.png";
import arcadeImg from "./assets/arcade.png";
import pcImg from "./assets/pc.png";
import bookImg from "./assets/book.png";

// ¡Tus proyectos! Puedes meter los de gameProjects.js aquí:
const projects = [
  {
    id: 1,
    title: "Mi Campo (iOS)",
    desc: "App agrícola inteligente para diagnóstico de cultivos.",
    pos: { x: 110, y: 260 },
    img: pcImg,
    tags: ["SwiftUI", "ML", "UX"],
    link: "https://github.com/OrihuelaAraiza/mi-campo"
  },
  {
    id: 2,
    title: "UPocket",
    desc: "App universitaria para gestión escolar.",
    pos: { x: 420, y: 90 },
    img: arcadeImg,
    tags: ["SwiftUI", "UI Custom"],
    link: "https://github.com/OrihuelaAraiza/upocket"
  },
  {
    id: 3,
    title: "Portafolio Web Animado",
    desc: "Portfolio interactivo con animaciones, transiciones y UI moderna.",
    pos: { x: 700, y: 220 },
    img: bookImg,
    tags: ["React", "TailwindCSS", "Framer Motion"],
    link: "https://jp-portafolio.vercel.app/"
  }
];

// Tamaño del room
const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 420;
const AVATAR_SIZE = 48;
const MOVE_STEP = 32;

export default function GameRoom() {
  // Estado de avatar y modal
  const [avatar, setAvatar] = useState({ x: 420, y: 340 });
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);
  const roomRef = useRef();

  // Keyboard movement
  useEffect(() => {
    const handleKey = (e) => {
      let { x, y } = avatar;
      if (open !== null) return; // Deshabilita movimiento si está abierto el modal

      if (["ArrowUp", "w", "W"].includes(e.key)) y = Math.max(y - MOVE_STEP, 0);
      if (["ArrowDown", "s", "S"].includes(e.key)) y = Math.min(y + MOVE_STEP, ROOM_HEIGHT - AVATAR_SIZE);
      if (["ArrowLeft", "a", "A"].includes(e.key)) x = Math.max(x - MOVE_STEP, 0);
      if (["ArrowRight", "d", "D"].includes(e.key)) x = Math.min(x + MOVE_STEP, ROOM_WIDTH - AVATAR_SIZE);

      setAvatar({ x, y });

      // Checa si está cerca de un objeto (proyecto)
      projects.forEach((proj) => {
        const dx = Math.abs(proj.pos.x - x);
        const dy = Math.abs(proj.pos.y - y);
        if (dx < 48 && dy < 48) setHovered(proj.id);
        else if (hovered === proj.id) setHovered(null);
      });

      // Abrir modal con Enter
      if (e.key === "Enter" && hovered !== null) setOpen(hovered);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [avatar, hovered, open]);

  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[90vh] w-full"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h2 className="text-4xl font-extrabold text-accent mb-2 text-center">Explora mis Videojuegos</h2>
      <p className="text-center text-light/70 mb-8">Usa <b>flechas</b> o <b>WASD</b> para moverte. Acércate a un objeto y presiona <b>Enter</b> para ver cada proyecto.</p>
      
      {/* ROOM */}
      <div
        ref={roomRef}
        className="relative rounded-2xl shadow-xl border-4 border-orange/30 bg-[url(/bg_pixelroom.png)] bg-cover mx-auto"
        style={{
          width: ROOM_WIDTH,
          height: ROOM_HEIGHT,
          background: "#181820 url('/bg_pixelroom.png') center/cover",
          margin: "0 auto"
        }}
      >
        {/* Renderiza los proyectos como objetos */}
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            style={{
              position: "absolute",
              left: proj.pos.x,
              top: proj.pos.y,
              zIndex: hovered === proj.id ? 20 : 10,
              filter: hovered === proj.id ? "drop-shadow(0 0 18px #FF7F11)" : "none"
            }}
            animate={{ scale: hovered === proj.id ? 1.12 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(proj.id)}
          >
            <img
              src={proj.img}
              alt={proj.title}
              className="w-16 h-16 select-none cursor-pointer"
              draggable={false}
            />
            {/* Tooltip */}
            {hovered === proj.id && (
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-accent/90 text-dark text-xs rounded shadow"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {proj.title} <span className="ml-1">↵</span>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Avatar */}
        <motion.img
          src={avatarImg}
          alt="Avatar"
          className="absolute z-30"
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            left: avatar.x,
            top: avatar.y,
            pointerEvents: "none"
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Modal/Card del Proyecto */}
        <AnimatePresence>
          {open !== null && (
            <ProjectModal
              project={projects.find((p) => p.id === open)}
              onClose={() => setOpen(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}