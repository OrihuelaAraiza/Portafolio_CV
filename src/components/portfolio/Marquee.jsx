import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useAppearance } from "@/hooks/useAppearance";

// Cinta continua cuya velocidad acompaña al scroll: avanza sola, acelera con
// la rueda y cambia de sentido al subir. El patrón es el de ScrollVelocity de
// React Bits, reescrito sobre los motion values que el sitio ya carga.
// Con el movimiento pausado se muestra una sola copia, quieta.
export default function Marquee({
  children,
  speed = 46,
  direction = -1,
  className = "",
}) {
  const { motionDisabled: reduce } = useAppearance();
  const root = useRef(null);
  const first = useRef(null);
  const [copies, setCopies] = useState(3);
  const width = useRef(0);
  const heading = useRef(direction);
  const hovered = useRef(false);
  const inView = useInView(root, { margin: "120px" });
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 380,
  });
  const boost = useTransform(velocity, [-1400, 0, 1400], [-4, 0, 4], {
    clamp: false,
  });
  const skew = useTransform(velocity, [-2400, 0, 2400], [5, 0, -5]);

  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      width.current = first.current?.offsetWidth || 0;
      if (!width.current) return;
      setCopies(Math.ceil(root.current.offsetWidth / width.current) + 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(first.current);
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [reduce]);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || !width.current) return;
    const push = boost.get();
    if (push < -0.05) heading.current = -direction;
    else if (push > 0.05) heading.current = direction;
    const pace = hovered.current ? 0.25 : 1;
    const step =
      heading.current * speed * pace * (1 + Math.abs(push)) * (delta / 1000);
    let next = x.get() + step;
    if (next <= -width.current) next += width.current;
    if (next > 0) next -= width.current;
    x.set(next);
  });

  if (reduce)
    return (
      <div className={`marquee marquee-static ${className}`}>
        <div className="marquee-copy">{children}</div>
      </div>
    );
  return (
    <div
      ref={root}
      className={`marquee ${className}`}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {Array.from({ length: copies }, (_, index) => (
          <div
            key={index}
            ref={index === 0 ? first : undefined}
            className="marquee-copy"
            aria-hidden={index > 0 ? "true" : undefined}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
