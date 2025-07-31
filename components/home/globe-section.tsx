"use client";

import { motion } from "framer-motion";
import { GlobeComponent } from "./globe-component";

export function GlobeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="relative flex items-center justify-center mb-8"
    >
      <div className="relative w-full max-w-[500px] lg:max-w-[800px] aspect-square">
        <GlobeComponent className="top-0" />

        <div className="absolute inset-0 bg-gradient-radial from-[#4a7c4a]/30 via-[#2d5a2d]/20 to-transparent rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}
