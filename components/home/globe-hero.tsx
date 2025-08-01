"use client";

import { Gallery4Demo } from "@/components/blocks/gallery4-demo";
import VideoExpansionSection from "@/components/blocks/video-expansion-section";
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
      <HeroBackground>
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-4 px-4 py-16 lg:pl-[5%]">
          <div className="w-full lg:w-[59%] flex flex-col items-start">
            <HeroHeader
              title={title}
              subtitle={subtitle}
              description={description}
            />
          </div>

          <div className="w-full lg:w-[80%] flex justify-center items-center min-h-[100px] lg:min-h-[600px] relative overflow-visible">
            <div className="absolute inset-0 flex justify-center items-center overflow-visible">
              <GlobeSection />
            </div>
          </div>
        </div>
      </HeroBackground>

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

      <Gallery4Demo />
      <VideoExpansionSection />
    </>
  );
}
