"use client";

import { cn } from "@/lib/utils";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.1,
  diffuse: 0.3,
  mapSamples: 16000,
  mapBrightness: 1.0,
  baseColor: [0.6, 0.6, 0.6],
  markerColor: [0.1, 0.9, 0.1],
  glowColor: [0.7, 0.7, 0.7],
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

type GlobeInstance = {
  destroy: () => void;
};

export function GlobeComponent({
  className,
  config = GLOBE_CONFIG,
}: GlobeComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0 });
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  let phi = 0;

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
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, unknown>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = dimensions.width * 2;
      state.height = dimensions.width * 2;
    },
    [r, dimensions.width]
  );

  const createGlobeInstance = useCallback(() => {
    if (!canvasRef.current) return;

    const newWidth = canvasRef.current.offsetWidth;

    if (globeRef.current) {
      globeRef.current.destroy();
    }

    globeRef.current = createGlobe(canvasRef.current, {
      ...config,
      width: newWidth * 2,
      height: newWidth * 2,
      onRender,
    });

    setDimensions({ width: newWidth });
  }, [config, onRender]);

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const newWidth = canvasRef.current.offsetWidth;

    if (newWidth !== dimensions.width) {
      createGlobeInstance();
    }
  }, [dimensions.width, createGlobeInstance]);

  useEffect(() => {
    createGlobeInstance();

    if (canvasRef.current) {
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 100);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [createGlobeInstance, handleResize]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] scale-150 sm:scale-140 md:scale-130 lg:scale-150 xl:scale-140",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
