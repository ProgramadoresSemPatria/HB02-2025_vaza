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
    <>
      {/* Hero Section - Apenas heading até botão */}
      <HeroBackground>
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16 px-4 py-16 container mx-auto">
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start">
            <HeroHeader
              title={title}
              subtitle={subtitle}
              description={description}
            />
          </div>

          <div className="w-full lg:w-[50%] flex justify-center items-center min-h-[500px] lg:min-h-[700px] overflow-hidden p-4">
            <GlobeSection />
          </div>
        </div>
      </HeroBackground>

      {/* Seções separadas abaixo da hero */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full"
          >
            <StatsSection />
            <PopularDestinations locations={locations} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
