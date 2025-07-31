"use client";

import { useEffect, useState } from "react";

interface HeroBackgroundProps {
  children: React.ReactNode;
}

export function HeroBackground({ children }: HeroBackgroundProps) {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: "0px",
    top: "0px",
    opacity: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background gradient verde metálico melhorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0a] via-[#1a3d1a] to-[#0f2a0f]" />
      {/* Overlay metálico verde intensificado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a2d]/30 via-[#4a7c4a]/25 to-[#1e4d1e]/35" />
      {/* Efeito metálico adicional */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#6b9e6b]/15 to-[#3d6b3d]/25" />
      {/* Brilho metálico superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7ab87a]/10 via-transparent to-transparent" />
      {/* Reflexo metálico lateral */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5a8a5a]/5 to-transparent" />

      {/* Grid pattern metálico */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="rgba(74, 124, 74, 0.2)"
                strokeWidth="0.3"
                opacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Mouse gradient effect */}
      <div
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-opacity duration-300 z-10"
        style={{
          left: mouseGradientStyle.left,
          top: mouseGradientStyle.top,
          opacity: mouseGradientStyle.opacity,
          background:
            "radial-gradient(circle, rgba(74, 124, 74, 0.08), rgba(45, 90, 45, 0.06), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  );
}
