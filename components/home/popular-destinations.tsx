"use client";

import { HighlightText } from "@/components/ui/highlight-text";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface LocationData {
  name: string;
  country: string;
  users: number;
  growth: string;
}

interface PopularDestinationsProps {
  locations?: LocationData[];
}

export function PopularDestinations({
  locations = [
    { name: "Toronto", country: "Canada", users: 125000, growth: "+15%" },
    { name: "Melbourne", country: "Australia", users: 89000, growth: "+12%" },
    { name: "Berlin", country: "Germany", users: 67000, growth: "+18%" },
    { name: "Amsterdam", country: "Netherlands", users: 54000, growth: "+22%" },
    { name: "Dublin", country: "Ireland", users: 98000, growth: "+25%" },
    {
      name: "Wellington",
      country: "New Zealand",
      users: 34000,
      growth: "+20%",
    },
  ],
}: PopularDestinationsProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Popular Destinations
        </h2>
        <p className="text-muted-foreground text-lg">
          The countries most chosen by our clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
          >
            <div>
              <HighlightText
                variant="default"
                size="md"
                className="font-semibold"
              >
                {location.name}
              </HighlightText>
              <div className="text-sm text-muted-foreground font-medium">
                {location.country}
              </div>
            </div>
            <div className="text-right">
              <HighlightText
                variant="default"
                size="md"
                className="font-semibold"
              >
                {location.users.toLocaleString()}
              </HighlightText>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <HighlightText
                  variant="success"
                  size="sm"
                  className="font-medium"
                >
                  {location.growth}
                </HighlightText>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
