import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaReact, FaJs, FaCss3Alt, FaHtml5, FaGithub, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiSwift, SiUnity, SiFramer } from "react-icons/si";

const skills = [
  { icon: <FaReact />, name: "React", color: "#61dafb" },
  { icon: <SiTailwindcss />, name: "TailwindCSS", color: "#38bdf8" },
  { icon: <SiFramer />, name: "Framer Motion", color: "#ef476f" },
  { icon: <FaJs />, name: "JavaScript", color: "#f7e018" },
  { icon: <SiSwift />, name: "SwiftUI", color: "#fa7343" },
  { icon: <SiUnity />, name: "Unity", color: "#222c37" },
  { icon: <FaGithub />, name: "GitHub", color: "#fff" },
  { icon: <FaFigma />, name: "Figma", color: "#a259ff" },
  { icon: <FaCss3Alt />, name: "CSS", color: "#264de4" },
  { icon: <FaHtml5 />, name: "HTML", color: "#e44d26" },
];

const projects = [
  { title: "Portafolio Web Animado", techs: ["React", "TailwindCSS", "Framer Motion"], desc: "Web personal con animaciones y transiciones modernas.", year: 2024 },
  { title: "Mi Campo - App iOS", techs: ["SwiftUI", "ML", "UX"], desc: "App agrícola inteligente para diagnóstico de cultivos.", year: 2024 },
  { title: "UPocket", techs: ["SwiftUI", "UI Custom"], desc: "App académica universitaria con UI personalizada.", year: 2024 },
];

export default function About() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <motion.section
      key="about"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center w-full px-2"
    >
      <motion.h2
        className="text-5xl sm:text-6xl font-extrabold text-orange mb-8 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Sobre mí
      </motion.h2>
      <motion.div
        className="bg-darker/70 rounded-3xl shadow-xl p-8 max-w-3xl text-lg mb-8 border border-orange/30"
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.22, duration: 0.7, type: "spring" }}
      >
        <p className="mb-2 text-light/90">
          <span className="font-bold text-accent">¡Hola! Soy JP Orihuela,</span> desarrollador frontend apasionado por crear experiencias interactivas que combinan tecnología, diseño y creatividad.
        </p>
        <ul className="list-disc ml-6 mb-2 text-light/80">
          <li>Especializado en <b>React</b> y <b>SwiftUI</b> para web y mobile.</li>
          <li>Fan de las animaciones modernas: <b>Framer Motion</b>, UI dinámica y microinteracciones.</li>
          <li>Ganador en hackathones nacionales y desarrollador de videojuegos indie con Unity.</li>
          <li>Experiencia en UI/UX, diseño responsivo y prototipado con Figma.</li>
        </ul>
        <p className="text-orange font-semibold mb-1">
          ¿Tienes una idea? ¡Colaboremos!  
          <a href="mailto:orihuelaaraizajuanpablo@gmail.com" className="ml-2 underline hover:text-accent">orihuelaaraizajuanpablo@gmail.com</a>
        </p>
      </motion.div>
      <motion.div
        className="mb-10 flex flex-col items-center w-full"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-light mb-5 text-center">Stack y herramientas</h3>
        <div className="flex flex-wrap justify-center gap-5">
          {skills.map(({ icon, name, color }) => (
            <motion.div
              key={name}
              whileHover={{
                scale: 1.17,
                rotate: [0, 6, -6, 0],
                boxShadow: `0 0 18px ${color}`,
                backgroundColor: "#222a",
              }}
              className="flex flex-col items-center px-5 py-3 bg-dark rounded-2xl shadow hover:shadow-accent/20 border border-orange/30 transition-all duration-300 cursor-pointer"
              title={name}
            >
              <span className="text-4xl mb-1" style={{ color }}>{icon}</span>
              <span className="text-sm font-semibold text-light/90">{name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="mb-10 w-full max-w-3xl"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-light mb-5 text-center">Proyectos destacados</h3>
        <ol className="relative border-l-4 border-orange/30 pl-8">
          {projects.map((proj, idx) => (
            <motion.li
              key={proj.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + idx * 0.14, duration: 0.5 }}
              className="mb-6 last:mb-0"
            >
              <span className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-orange/80 shadow-accent shadow"></span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-accent">{proj.title}</span>
                <span className="text-light/60 text-xs">{proj.year}</span>
              </div>
              <div className="text-light/80 text-base mb-1">{proj.desc}</div>
              <div className="flex flex-wrap gap-2">
                {proj.techs.map((t) => (
                  <span
                    key={t}
                    className="bg-orange/20 text-orange px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-light/70 text-sm">¿Quieres ver mi código o platicar?  
          <a href="mailto:orihuelaaraizajuanpablo@gmail.com" className="text-orange font-semibold ml-2 hover:underline">¡Hablemos!</a>
        </span>
      </motion.div>
    </motion.section>
  );
}