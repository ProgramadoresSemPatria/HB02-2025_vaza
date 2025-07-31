"use client";

import { motion } from "framer-motion";
import { GlobeSection } from "./globe-section";
import { HeroBackground } from "./hero-background";
import { HeroHeader } from "./hero-header";
import { PopularDestinations } from "./popular-destinations";
import { StatsSection } from "./stats-section";

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
  title,
  subtitle,
  description,
  locations,
}: GlobeHeroProps) {
  return (
    <HeroBackground>
      <HeroHeader title={title} subtitle={subtitle} description={description} />

      <GlobeSection />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <StatsSection />

        <PopularDestinations locations={locations} />
      </motion.div>
    </HeroBackground>
  );
}
