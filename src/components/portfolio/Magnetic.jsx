import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAppearance } from "@/hooks/useAppearance";

// El contenido se deja atraer por el puntero y vuelve con un muelle. Solo con
// ratón: en táctil no hay «acercarse» y el desplazamiento estorbaría al toque.
export default function Magnetic({ children, strength = 0.28, className = "" }) {
  const { motionDisabled: reduce } = useAppearance();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 190, damping: 14, mass: 0.4 });
  function move(event) {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  }
  function release() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.span
      className={`magnetic ${className}`}
      style={reduce ? undefined : { x: springX, y: springY }}
      onPointerMove={move}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
