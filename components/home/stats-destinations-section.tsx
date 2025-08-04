"use client";

import { motion } from "framer-motion";
import { PopularDestinations } from "./popular-destinations";

interface LocationData {
  name: string;
  country: string;
  users: number;
  growth: string;
}

interface StatsDestinationsSectionProps {
  locations?: LocationData[];
}

export function StatsDestinationsSection({
  locations,
}: StatsDestinationsSectionProps) {
  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full"
        >
          <PopularDestinations locations={locations} />
        </motion.div>
      </div>
    </div>
  );
}
