import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from "./ProjectModal";
import bgImg from './assets/bg.png';

// --------- SPRITES DEL PERSONAJE ---------
// Frente
import front0 from './assets/00_Fish_Front.png';
import front1 from './assets/01_Fish_Front.png';
import front2 from './assets/02_Fish_Front.png';
import front3 from './assets/03_Fish_Front.png';
import front4 from './assets/04_Fish_Front.png';
import front5 from './assets/05_Fish_Front.png';
// Derecha
import right0 from './assets/06_Fish_Right.png';
import right1 from './assets/07_Fish_Right.png';
import right2 from './assets/08_Fish_Right.png';
import right3 from './assets/09_Fish_Right.png';
import right4 from './assets/10_Fish_Right.png';
import right5 from './assets/11_Fish_Right.png';
// Izquierda
import left0 from './assets/12_Fish_Left.png';
import left1 from './assets/13_Fish_Left.png';
import left2 from './assets/14_Fish_Left.png';
import left3 from './assets/15_Fish_Left.png';
import left4 from './assets/16_Fish_Left.png';
import left5 from './assets/17_Fish_Left.png';
// Espalda
import back0 from './assets/18_Fish_Back.png';
import back1 from './assets/19_Fish_Back.png';
import back2 from './assets/20_Fish_Back.png';
import back3 from './assets/21_Fish_Back.png';
import back4 from './assets/22_Fish_Back.png';
import back5 from './assets/23_Fish_Back.png';

// --------- SPRITES DE PROYECTOS ---------
import arcadeImg from "./assets/arcade.png";
import pcImg from "./assets/pc.png";
import bookImg from "./assets/book.png";

const SPRITES = {
  front: [front0, front1, front2, front3, front4, front5],
  right: [right0, right1, right2, right3, right4, right5],
  left:  [left0, left1, left2, left3, left4, left5],
  back:  [back0, back1, back2, back3, back4, back5]
};

const projects = [
  {
    id: 1,
    title: "Mi Campo (iOS)",
    desc: "App agrícola inteligente para diagnóstico de cultivos.",
    pos: { x: 60, y: 230 },
    img: pcImg,
    tags: ["SwiftUI", "ML", "UX"],
    link: "https://github.com/OrihuelaAraiza/mi-campo"
  },
  {
    id: 2,
    title: "UPocket",
    desc: "App universitaria para gestión escolar.",
    pos: { x: 200, y: 40 },
    img: arcadeImg,
    tags: ["SwiftUI", "UI Custom"],
    link: "https://github.com/OrihuelaAraiza/upocket"
  },
  {
    id: 3,
    title: "Portafolio Web Animado",
    desc: "Portfolio interactivo con animaciones, transiciones y UI moderna.",
    pos: { x: 360, y: 220 },
    img: bookImg,
    tags: ["React", "TailwindCSS", "Framer Motion"],
    link: "https://jp-portafolio.vercel.app/"
  }
];

const ROOM_WIDTH = 500;
const ROOM_HEIGHT = 420;
const AVATAR_SIZE = 100;
const MOVE_STEP = 24;

export default function GameRoom() {
  const [avatar, setAvatar] = useState({ x: 420, y: 340 });
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);

  // Dirección actual y frame de animación
  const [direction, setDirection] = useState("front");
  const [moving, setMoving] = useState(false);
  const [frame, setFrame] = useState(0);

  // Animación automática de caminata
  useEffect(() => {
    if (!moving) return;
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % SPRITES[direction].length);
    }, 110);
    return () => clearInterval(interval);
  }, [moving, direction]);

  // Movimiento y animación
  useEffect(() => {
    const handleKey = (e) => {
      let { x, y } = avatar;
      let newDirection = direction;
      let hasMoved = false;

      if (open !== null) return;

      if (["ArrowLeft", "a", "A"].includes(e.key)) {
        x = Math.max(x - MOVE_STEP, 0);
        newDirection = "left";
        hasMoved = true;
      }
      if (["ArrowRight", "d", "D"].includes(e.key)) {
        x = Math.min(x + MOVE_STEP, ROOM_WIDTH - AVATAR_SIZE);
        newDirection = "right";
        hasMoved = true;
      }
      if (["ArrowUp", "w", "W"].includes(e.key)) {
        y = Math.max(y - MOVE_STEP, 0);
        newDirection = "back";
        hasMoved = true;
      }
      if (["ArrowDown", "s", "S"].includes(e.key)) {
        y = Math.min(y + MOVE_STEP, ROOM_HEIGHT - AVATAR_SIZE);
        newDirection = "front";
        hasMoved = true;
      }

      if (hasMoved) {
        setAvatar({ x, y });
        setDirection(newDirection);
        setMoving(true);
        setFrame(f => (f + 1) % SPRITES[newDirection].length);
      }

      let hovering = null;
      projects.forEach((proj) => {
        const dx = Math.abs(proj.pos.x - x);
        const dy = Math.abs(proj.pos.y - y);
        if (dx < 48 && dy < 48) hovering = proj.id;
      });
      setHovered(hovering);

      if (e.key === "Enter" && hovering !== null) setOpen(hovering);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [avatar, open, direction]);

  useEffect(() => {
    const handleKeyUp = () => {
      setMoving(false);
      setFrame(0);
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[90vh] w-full"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <h2 className="text-4xl font-extrabold text-accent mb-2 text-center">Explora mis Videojuegos</h2>
      <p className="text-center text-light/70 mb-8">
        Usa <b>flechas</b> o <b>WASD</b> para moverte. Acércate a un objeto y presiona <b>Enter</b> para ver cada proyecto.
      </p>

      {/* ----------- ZOOM aplicado aquí ----------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: ROOM_WIDTH * 2.5, // Para centrar el zoom
          height: ROOM_HEIGHT * 2.2,
        }}
      >
        <div
          className="relative rounded-2xl shadow-xl border-4 border-orange/30 overflow-hidden"
          style={{
            width: ROOM_WIDTH,
            height: ROOM_HEIGHT,
            background: `#181820 url(${bgImg}) center/cover`,
            transform: "scale(2.2)",          // <<< ZOOM aquí
            transformOrigin: "center center",  // <<< Centrado
            margin: "0 auto"
          }}
        >
          {/* Proyectos */}
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

          {/* AVATAR */}
          <motion.img
            src={SPRITES[direction][frame]}
            alt="Avatar"
            className="absolute z-30"
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              left: avatar.x,
              top: avatar.y,
              pointerEvents: "none"
            }}
          />

          {/* Modal */}
          <AnimatePresence>
            {open !== null && (
              <ProjectModal
                project={projects.find((p) => p.id === open)}
                onClose={() => setOpen(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}