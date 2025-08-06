// src/components/FogGlow.jsx
import React from "react";

export default function FogGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
      style={{
        mixBlendMode: "lighten",
        opacity: 0.14, // puedes ajustar
        filter: "blur(20px)",
        background: `
          radial-gradient(ellipse 70% 40% at 70% 20%, #fff5b5 40%, transparent 100%),
          radial-gradient(ellipse 45% 25% at 20% 80%, #ffbdff 25%, transparent 100%),
          linear-gradient(120deg, #4fc3f7 1%, transparent 85%)
        `,
        animation: "fogMove 26s ease-in-out infinite"
      }}
    />
  );
}

// Y en tu CSS global o tailwind.css (dentro de @layer utilities por ejemplo):
/*
@keyframes fogMove {
  0% { background-position: 0% 0%, 100% 100%, 0% 0%; }
  50% { background-position: 50% 40%, 60% 60%, 100% 0%; }
  100% { background-position: 0% 0%, 100% 100%, 0% 0%; }
}
*/