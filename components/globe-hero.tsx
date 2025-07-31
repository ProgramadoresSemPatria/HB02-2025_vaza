"use client";

import createGlobe, { COBEOptions } from "cobe";
import { motion } from "framer-motion";
import { Globe as GlobeIcon, MapPin, TrendingUp, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

interface GlobeComponentProps {
  className?: string;
  config?: COBEOptions;
}

function GlobeComponent({
  className,
  config = GLOBE_CONFIG,
}: GlobeComponentProps) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 100); // Mais responsivo no mobile
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[500px] lg:max-w-[800px]",
        className ?? ""
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          e.preventDefault();
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          );
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onPointerMove={(e) => updateMovement(e.clientX)}
        onTouchStart={(e) => {
          e.preventDefault();
          if (e.touches[0]) {
            updatePointerInteraction(
              e.touches[0].clientX - pointerInteractionMovement.current
            );
          }
        }}
        onTouchEnd={() => updatePointerInteraction(null)}
        onTouchMove={(e) => {
          e.preventDefault();
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX);
          }
        }}
      />
    </div>
  );
}

interface LocationData {
  name: string;
  country: string;
  users: number;
  growth: string;
}

interface GlobeHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  locations?: LocationData[];
}

export default function GlobeHero({
  title = "Are you ready to change your life?",
  subtitle = "Turn the dream of leaving your country into a real actionable plan",
  description = "Get your passport, plan your journey, and discover the perfect destination for your new life. We guide you through every step of your international relocation journey.",
  locations = [
    { name: "Toronto", country: "Canadá", users: 125000, growth: "+15%" },
    { name: "Melbourne", country: "Austrália", users: 89000, growth: "+12%" },
    { name: "Berlim", country: "Alemanha", users: 67000, growth: "+18%" },
    { name: "Amsterdã", country: "Holanda", users: 54000, growth: "+22%" },
    { name: "Dublin", country: "Irlanda", users: 98000, growth: "+25%" },
    {
      name: "Wellington",
      country: "Nova Zelândia",
      users: 34000,
      growth: "+20%",
    },
  ],
}: GlobeHeroProps) {
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e1a] via-[#15241a] to-[#0f1a0f]" />
      {/* Subtle secondary color overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#317b22]/5 to-[#317b22]/10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
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
            "radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-6"
          >
            <GlobeIcon className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-200">
              Relocação Internacional
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-4 font-light">
            {subtitle}
          </p>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {description}
          </p>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-4 border border-border rounded-full font-medium hover:bg-background/50 transition-colors">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Globe Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative flex items-center justify-center mb-16"
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[800px] aspect-square">
            <GlobeComponent className="top-0" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-[#317b22]/20 via-[#0f1a0f]/30 to-transparent rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-200">Pessoas Relocadas</span>
              </div>
              <div className="text-2xl font-semibold">467K+</div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-200">Países</span>
              </div>
              <div className="text-2xl font-semibold">50+</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Destinos Populares
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-colors"
                >
                  <div>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-300">
                      {location.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {location.users.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <TrendingUp className="w-3 h-3" />
                      {location.growth}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
