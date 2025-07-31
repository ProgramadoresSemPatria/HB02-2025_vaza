"use client";

import { Heading } from "@/components/ui/heading";
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
    { name: "Toronto", country: "Canadá", users: 125000, growth: "+15%" },
    { name: "Melbourne", country: "Austrália", users: 89000, growth: "+12%" },
    { name: "Berlim", country: "Alemanha", users: 67000, growth: "+18%" },
    { name: "Amsterdã", country: "Holanda", users: 54000, growth: "+22%" },
    { name: "Dublin", country: "Irlanda", users: 98000, growth: "+25%" },
    {
      name: "Wellington",
      country: "Nova Zelândia",
      users: 34000,
      growth: "+20%",
    },
  ],
}: PopularDestinationsProps) {
  return (
    <div className="space-y-4">
      <Heading
        as="h3"
        variant="white"
        size="lg"
        align="center"
        className="mb-6"
      >
        Destinos Populares
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-colors"
          >
            <div>
              <HighlightText
                variant="white"
                size="md"
                className="font-semibold"
              >
                {location.name}
              </HighlightText>
              <div className="text-sm text-gray-200 font-medium">
                {location.country}
              </div>
            </div>
            <div className="text-right">
              <HighlightText
                variant="white"
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
