"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const GLOBE_CONFIG: COBEOptions = {
  width: 1500,
  height: 1500,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.8, 0.8, 0.8],
  markerColor: [0.1, 0.9, 0.1],
  glowColor: [0.8, 0.8, 0.8],
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

export function GlobeComponent({
  className,
  config = GLOBE_CONFIG,
}: GlobeComponentProps) {
  let phi = 0;
  let width = 0;
  let height = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      phi += 0.005;
      state.phi = phi;
      state.width = width * 2;
      state.height = height * 2;
    },
    [width, height]
  );

  const onResize = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      onResize();
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const newWidth = rect.width;
        const newHeight = rect.height;

        canvasRef.current.width = newWidth * 2;
        canvasRef.current.height = newHeight * 2;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: height * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));

    return () => {
      window.removeEventListener("resize", handleResize);
      globe.destroy();
    };
  }, [width, height, config, onRender]);

  return (
    <div
      className={cn(
        "absolute inset-0 aspect-[1/1] w-full h-full min-h-[800px] scale-110 lg:scale-105",
        className ?? ""
      )}
    >
      <canvas
        className={cn(
          "w-full h-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
      />
    </div>
  );
}
