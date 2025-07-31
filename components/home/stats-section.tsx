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
      className="max-w-4xl mx-auto"
    >
      <StatsGrid
        stats={[
          {
            number: "467K+",
            label: "Pessoas Relocadas",
            icon: Users,
            variant: "metallic",
            numberVariant: "white",
            numberSize: "lg",
            labelVariant: "white",
          },
          {
            number: "50+",
            label: "Países",
            icon: MapPin,
            variant: "metallic",
            numberVariant: "white",
            numberSize: "lg",
            labelVariant: "white",
          },
        ]}
        columns={2}
        className="mb-8"
        staggerDelay={0.2}
      />
    </motion.div>
  );
}
