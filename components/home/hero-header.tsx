"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { SpringElement } from "@/components/ui/spring-element";
import { motion } from "framer-motion";

interface HeroHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function HeroHeader({
  title = "Are you ready to change your life?",
  subtitle = "Turn the dream of leaving your country into a real actionable plan",
  description = "Get your passport, plan your journey, and discover the perfect destination for your new life. We guide you through every step of your international relocation journey.",
}: HeroHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-4 lg:mb-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <Badge variant="metallic" size="lg" className="px-3 py-2">
          <SpringElement
            springClassName="stroke-green-400/50"
            springConfig={{ stiffness: 300, damping: 25 }}
            springPathConfig={{
              coilCount: 3,
              amplitudeMin: 6,
              amplitudeMax: 12,
              curveRatioMin: 0.8,
              curveRatioMax: 1,
              bezierOffset: 4,
            }}
            className="mr-2"
          >
            <Avatar className="size-12">
              <AvatarImage draggable={false} src="/vaza-logo.webp" />
              <AvatarFallback>VAZA</AvatarFallback>
            </Avatar>
          </SpringElement>
          Relocação Internacional
        </Badge>
      </motion.div>

      <Heading
        as="h1"
        variant="white"
        size="2xl"
        align="center"
        className="mb-6"
      >
        {title}
      </Heading>

      <AnimatedText
        variant="white"
        size="lg"
        animation="fadeIn"
        delay={0.3}
        className="text-center mb-4"
      >
        {subtitle}
      </AnimatedText>

      <AnimatedText
        variant="white"
        size="md"
        animation="fadeIn"
        delay={0.4}
        className="text-center max-w-xl mx-auto leading-relaxed mb-4"
      >
        {description}
      </AnimatedText>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="inline-flex flex-col sm:flex-row gap-4"
      >
        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
          Get Started
        </button>
        <button className="px-8 py-4 border border-border rounded-full font-medium hover:bg-background/50 transition-colors">
          Learn More
        </button>
      </motion.div>
    </motion.div>
  );
}
