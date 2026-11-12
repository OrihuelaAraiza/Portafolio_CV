import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
const IOSShowcase = lazy(() => import("./IOSShowcase"));

export default function IOSSection({ onOpen }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id="ios"
      className="ios-section section-shell"
      aria-label={t("Desarrollo iOS")}
    >
      <Suspense
        fallback={
          <p className="ios-loading">{t("Preparando las capturas…")}</p>
        }
      >
        {ready && <IOSShowcase onOpen={onOpen} />}
      </Suspense>
    </section>
  );
}
