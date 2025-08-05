import React from "react";
import { motion } from "framer-motion";
import ShinyText from "../components/reactbits/TextAnimations/ShinyText/ShinyText";
import homeImg from "../assets/home.jpeg";
import { FaLinkedin, FaGithub, FaInstagram, FaSpotify } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';

const social = [
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/juan-pablo-orihuela-araiza-65a566325/", color: "#0A66C2" },
  { icon: <FaGithub />, href: "https://github.com/OrihuelaAraiza", color: "#fff" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/tu-perfil", color: "#E4405F" },
  { icon: <FaSpotify />, href: "https://open.spotify.com/user/22rl72yqs735gq2anlkcnvtqq?si=9e4c7d835dbb43dal", color: "#1DB954" }
];

export default function Home() {
  return (
    <motion.section
      id="home"
      className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] w-full gap-10 px-4 bg-dark"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -32 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* Columna texto */}
      <motion.div
        className="flex-1 flex flex-col items-center md:items-start gap-6"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1 }}
      >
        <ShinyText
          text="Hi, I'm JP"
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center md:text-left drop-shadow-lg"
          colorFrom="#FF4747"
          colorTo="#FF7F11"
          duration={2.6}
          shineWidth={60}
          shineColor="#fff"
        />
        <h3 className="text-2xl md:text-3xl font-semibold text-orange text-center md:text-left">
          I'm a{" "}
          <span className="text-accent">
            <Typewriter
              words={["Frontend Developer", "iOS Developer", "UI/UX Enthusiast", "Creative Coder"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={85}
              deleteSpeed={48}
              delaySpeed={1200}
            />
          </span>
        </h3>
        <motion.p
          className="text-light/80 max-w-xl text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Creo experiencias interactivas, juegos y apps modernas usando React, SwiftUI, y Unity. 
          Me apasiona el diseño visual, el código elegante y la innovación constante.
        </motion.p>
        <div className="flex gap-5 justify-center md:justify-start mt-2">
          {social.map((s, idx) => (
            <motion.a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              key={s.href}
              whileHover={{ scale: 1.22, color: s.color, textShadow: `0 0 16px ${s.color}` }}
              className="text-2xl p-2 rounded-full bg-darker hover:bg-accent transition-colors shadow-md text-light"
              style={{ transition: "all 0.2s" }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <motion.a
            href="/JuanPabloOrihuela_CV.pdf"
            download="JuanPabloOrihuela_CV.pdf"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(255, 71, 71, 0.3)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent hover:bg-orange text-dark font-bold text-lg px-5 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Download CV
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, x: 80, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.4 }}
      >
        <motion.div
          className="rounded-full overflow-hidden shadow-[0_8px_32px_0_rgba(255,71,71,0.18)] border-4 border-orange w-64 h-64 bg-dark/60 flex items-center justify-center"
          animate={{ y: [0, -12, 0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
          }}
        >
          <img src={homeImg} alt="JP Orihuela" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}