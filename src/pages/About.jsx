// src/pages/About.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedBg from "../components/AnimatedBg";
import avatarPixel from "../assets/avatar.png";
const awards = [
  {
    icon: "🏆",
    title: "Agro Youth Hackathon",
    desc: "2nd place, Best Prototype (2024)",
  },
  {
    icon: "🥈",
    title: "iOS Lab Hackathon",
    desc: "2nd place, App Innovation (2024)",
  },
  {
    icon: "💡",
    title: "Enactus Hackathon",
    desc: "Best Social Impact Project",
  },
  {
    icon: "📈",
    title: "Lead Generation Specialist",
    desc: " Whitefriar (2023)",
  },
];

const education = [
  {
    icon: "🎓",
    degree: "BSc. Animation & Video Game Engineering",
    school: "Universidad Panamericana (2022-2026)",
  },
  {
    icon: "🛠️",
    degree: "Technical Degree in Automated Systems",
    school: "Instituto Politécnico Nacional (2017-2020)",
  },
];

export default function About() {
  useEffect(() => window.scrollTo(0, 0), []);

  // MOTTO animado (simula un typewriter)
  const motto = "Turning Ideas Into Code.";

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-dark overflow-x-hidden">
      {/* Fondo animado */}
      <AnimatedBg />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-3xl mx-auto py-24 px-4 flex flex-col items-center">

        {/* Avatar y nombre */}
        <motion.img
          src={avatarPixel}
          alt="JP Orihuela"
          className="w-28 h-28 mb-4 drop-shadow-2xl animate-float"
          initial={{ opacity: 0, scale: 0.8, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
        />

        <motion.h1
          className="text-4xl font-extrabold text-accent mb-1 text-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.7, type: "spring" }}
        >
          Juan Pablo Orihuela
        </motion.h1>
        <motion.h2
          className="text-lg font-semibold text-light/80 mb-1 text-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.36, duration: 0.7, type: "spring" }}
        >
          Software Engineer & Digital Creative
        </motion.h2>

        {/* Motto animado */}
        <motion.div
          className="text-orange font-bold text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.7, type: "spring" }}
        >
          <span className="typewriter">{motto}</span>
          <style>
            {`
              .typewriter {
                overflow: hidden;
                border-right: .15em solid #FF7F11;
                white-space: nowrap;
                animation: typing 3.2s steps(${motto.length}, end), blink .75s step-end infinite;
              }
              @keyframes typing {
                from { width: 0 }
                to { width: 100% }
              }
              @keyframes blink {
                50% { border-color: transparent }
              }
              .animate-float { animation: float 2.8s ease-in-out infinite; }
              @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
            `}
          </style>
        </motion.div>

        {/* About breve */}
        <motion.p
          className="text-light/90 text-center mb-10 max-w-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.67, duration: 0.5 }}
        >
          Hi! I’m JP, a developer focused on building beautiful apps, games, and digital experiences. <br />
          Always learning, always coding. Let’s create something great together!
        </motion.p>

  {/* ---------- AWARDS / HIGHLIGHTS ---------- */}
<motion.h3
  className="text-2xl font-bold text-orange mb-4 mt-10"
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.25, duration: 0.6, type: "spring" }}
>
  Awards & Highlights
</motion.h3>
<div className="relative w-full max-w-2xl mx-auto flex flex-col gap-8 mb-12">
  {/* Línea vertical animada tipo timeline */}
  <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange/50 via-transparent to-accent/40 rounded-full animate-pulse z-0" />
  {awards.map((item, i) => (
    <motion.div
      key={i}
      className={`
        relative z-10 bg-white/10 backdrop-blur-md border-2 border-orange/40 shadow-xl 
        rounded-2xl px-7 py-5 flex items-center gap-5
        transition-transform duration-300
        hover:scale-[1.035] hover:border-orange hover:shadow-accent/40
        group
      `}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + i * 0.12, duration: 0.5, type: "spring" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Puntero timeline */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-orange/80 shadow-accent shadow-xl flex items-center justify-center animate-bounce">
        <span className="text-2xl drop-shadow-sm">{item.icon}</span>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-light text-lg">{item.title}</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-accent/90 text-white ml-1 font-semibold animate-pulse shadow">
            {item.desc.split(",")[0]}
          </span>
        </div>
        <div className="text-light/70 text-sm">{item.desc.replace(/^.*?, /, "")}</div>
      </div>
    </motion.div>
  ))}
</div>

{/* ---------- EDUCATION ---------- */}
<motion.h3
  className="text-2xl font-bold text-orange mb-4"
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45, duration: 0.6, type: "spring" }}
>
  Education
</motion.h3>
<div className="relative w-full max-w-2xl mx-auto flex flex-col gap-8">
  {/* Línea vertical animada tipo timeline */}
  <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-transparent to-orange/40 rounded-full animate-pulse z-0" />
  {education.map((item, i) => (
    <motion.div
      key={i}
      className={`
        relative z-10 bg-white/10 backdrop-blur-md border-2 border-accent/40 shadow-lg
        rounded-2xl px-7 py-5 flex items-center gap-5
        transition-transform duration-300
        hover:scale-[1.035] hover:border-accent hover:shadow-orange/40
        group
      `}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.48 + i * 0.15, duration: 0.5, type: "spring" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Puntero timeline */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-accent/90 shadow-orange shadow-lg flex items-center justify-center animate-bounce">
        <span className="text-2xl drop-shadow">{item.icon}</span>
      </div>
      {/* Info */}
      <div>
        <div className="font-semibold text-light text-lg">{item.degree}</div>
        <div className="text-light/60 text-sm">{item.school}</div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}