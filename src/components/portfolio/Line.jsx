import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAppearance } from "@/hooks/useAppearance";

// Una línea de titular que sube desde detrás de su propia máscara. Quien se
// observa es el contenedor: la línea interior empieza fuera del recorte y un
// IntersectionObserver sobre ella nunca la daría por visible.
export default function Line({ children, delay = 0, className = "" }) {
  const { motionDisabled: reduce } = useAppearance();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <span ref={ref} className={`line ${className}`}>
      <motion.span
        className="line-inner"
        initial={reduce ? false : { y: "112%", rotate: 2.5 }}
        animate={reduce || inView ? { y: "0%", rotate: 0 } : undefined}
        transition={{ duration: 1.05, delay, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
