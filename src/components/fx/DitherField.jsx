import { useEffect, useRef } from "react";
import { useAppearance } from "@/hooks/useAppearance";

// Fondo tramado en WebGL. El motor (OGL + shader) llega por import() cuando el
// navegador queda ocioso y la sección está cerca: no compite con la primera
// pintura. Si WebGL no existe, el lienzo se queda vacío y la sección conserva
// su fondo plano; nada de lo que se lee depende de él.
export default function DitherField({ className = "" }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const { theme, motionDisabled } = useAppearance();
  const latest = useRef(motionDisabled);

  useEffect(() => {
    latest.current = motionDisabled;
    engine.current?.setReduced(motionDisabled);
  }, [motionDisabled]);

  useEffect(() => {
    engine.current?.setTheme();
  }, [theme]);

  useEffect(() => {
    const target = canvas.current;
    let cancelled = false;
    let idle = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const load = async () => {
          try {
            const { createDitherField } = await import("./createDitherField");
            if (cancelled) return;
            engine.current = createDitherField(target, {
              reduced: latest.current,
            });
          } catch {
            // Sin WebGL el fondo es simplemente el color de la sección.
          }
        };
        idle = window.requestIdleCallback
          ? window.requestIdleCallback(load, { timeout: 1200 })
          : setTimeout(load, 300);
      },
      { rootMargin: "300px" },
    );
    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  return (
    <div className={`dither-field ${className}`} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
