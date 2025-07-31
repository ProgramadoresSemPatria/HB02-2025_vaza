"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
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
      className="text-center lg:text-left mb-4 lg:mb-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-4"
      >
        <Badge
          variant="metallic"
          size="lg"
          className="px-4 py-0 rounded-lg !rounded-lg"
        >
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
            className="mr-3"
          >
            <Avatar className="size-10">
              <AvatarImage draggable={false} src="/vaza-logo.webp" />
              <AvatarFallback>VAZA</AvatarFallback>
            </Avatar>
          </SpringElement>
          <span className="text-sm font-medium">Relocação Internacional</span>
        </Badge>
      </motion.div>

      <HandWrittenTitle title={title} subtitle="" />

      <AnimatedText
        variant="white"
        size="lg"
        animation="fadeIn"
        delay={0.3}
        className="text-center lg:text-left mb-3"
      >
        {subtitle}
      </AnimatedText>

      <AnimatedText
        variant="white"
        size="md"
        animation="fadeIn"
        delay={0.4}
        className="text-center lg:text-left max-w-xl leading-relaxed mb-6"
      >
        {description}
      </AnimatedText>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="inline-flex justify-center lg:justify-start"
      >
        <InteractiveHoverButton
          text="Get Started"
          className="w-40 h-12 text-sm"
        />
      </motion.div>
    </motion.div>
  );
}
