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
      {/* Background gradient verde escuro com metálico preto */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031403] via-[#0a1f0a] to-[#031403]" />
      {/* Overlay metálico preto intensificado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/60 via-[#1a1a1a]/50 to-[#000000]/70" />
      {/* Efeito metálico verde escuro */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1a3d1a]/40 to-[#0f2a0f]/50" />
      {/* Brilho metálico superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d5a2d]/30 via-transparent to-transparent" />
      {/* Reflexo metálico lateral */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a1a1a]/30 to-transparent" />
      {/* Sexta camada para efeito metálico mais profundo */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#000000]/80 via-transparent to-[#1a3d1a]/30" />

      {/* Grid pattern metálico escuro */}
      <div className="absolute inset-0 opacity-30">
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
                stroke="rgba(45, 90, 45, 0.5)"
                strokeWidth="0.6"
                opacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Mouse gradient effect escuro */}
      <div
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-opacity duration-300 z-10"
        style={{
          left: mouseGradientStyle.left,
          top: mouseGradientStyle.top,
          opacity: mouseGradientStyle.opacity,
          background:
            "radial-gradient(circle, rgba(45, 90, 45, 0.2), rgba(26, 26, 26, 0.15), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
}
