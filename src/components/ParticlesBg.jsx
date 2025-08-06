// src/components/ParticlesBg.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="pointer-events-none fixed inset-0 z-20"
      options={{
        fullScreen: { enable: false }, // ya usamos position fixed
        particles: {
          number: { value: 38, density: { enable: true, value_area: 900 } },
          color: { value: "#fff" },
          opacity: {
            value: 0.11,
            random: true,
            anim: { enable: true, speed: 0.7, opacity_min: 0.04, sync: false }
          },
          size: {
            value: 2.4,
            random: true,
            anim: { enable: true, speed: 3, size_min: 1, sync: false }
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: { events: { onhover: { enable: false } } },
        detectRetina: true
      }}
    />
  );
}