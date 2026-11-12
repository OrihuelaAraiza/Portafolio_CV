import { useEffect, useRef, useState } from "react";
import { useAppearance } from "@/hooks/useAppearance";

export default function LoopOrbit() {
  const canvas = useRef(null);
  const engine = useRef(null);
  const { motionDisabled } = useAppearance();
  const reduced = useRef(motionDisabled);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    reduced.current = motionDisabled;
    engine.current?.setReduced(motionDisabled);
  }, [motionDisabled]);
  useEffect(() => {
    let cancelled = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const { createLoopOrbit } = await import("./createLoopOrbit");
          if (cancelled) return;
          engine.current = createLoopOrbit(canvas.current, {
            reduced: reduced.current,
            onLost: () => {
              if (!cancelled) setStatus("fallback");
            },
          });
          setStatus("ready");
        } catch {
          if (!cancelled) setStatus("fallback");
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(canvas.current);
    return () => {
      cancelled = true;
      observer.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);
  return (
    <div className="loop-orbit" aria-hidden="true" data-scene-status={status}>
      <span className="loop-orbit-fallback" />
      <canvas ref={canvas} />
    </div>
  );
}
