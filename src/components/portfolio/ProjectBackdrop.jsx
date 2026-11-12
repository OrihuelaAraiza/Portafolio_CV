import { useEffect, useRef, useState } from "react";
import { useAppearance } from "@/hooks/useAppearance";
import "./project-backdrop.css";

export default function ProjectBackdrop({ kind }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { motionDisabled } = useAppearance();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <span
      ref={ref}
      className={`project-backdrop backdrop-${kind}`}
      aria-hidden="true"
      data-moving={visible && !motionDisabled ? "true" : "false"}
    >
      <span className="backdrop-wash" />
      <span className="backdrop-lines" />
      <span className="backdrop-orbit orbit-one" />
      <span className="backdrop-orbit orbit-two" />
      <span className="backdrop-orbit orbit-three" />
    </span>
  );
}
