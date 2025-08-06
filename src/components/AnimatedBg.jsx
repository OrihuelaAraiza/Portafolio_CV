import React from "react";

export default function AnimatedBg() {
  // 80 partículas animadas con CSS puro y Tailwind
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent opacity-10 blur-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${24 + Math.random() * 24}px`,
            height: `${24 + Math.random() * 48}px`,
            animation: `floaty 5s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`
          }}
        />
      ))}
      {/* CSS extra para animación */}
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
}