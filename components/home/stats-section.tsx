"use client";

import { StatsGrid } from "@/components/ui/stats";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

export function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="w-full mb-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nossos Números
        </h2>
        <p className="text-muted-foreground text-lg">
          Milhares de pessoas já transformaram suas vidas conosco
        </p>
      </div>

      <StatsGrid
        stats={[
          {
            number: "467K+",
            label: "Pessoas Relocadas",
            icon: Users,
            variant: "default",
            numberVariant: "default",
            numberSize: "lg",
            labelVariant: "default",
          },
          {
            number: "50+",
            label: "Países",
            icon: MapPin,
            variant: "default",
            numberVariant: "default",
            numberSize: "lg",
            labelVariant: "default",
          },
        ]}
        columns={2}
        className="max-w-4xl mx-auto"
        staggerDelay={0.2}
      />
    </motion.div>
  );
}
