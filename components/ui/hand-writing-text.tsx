"use client";

import { motion } from "framer-motion";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "Optional subtitle",
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { duration: 0.5 },
      },
    },
  };

  const getTitlePath = (text: string) => {
    const length = text.length;
    const width = Math.max(800, length * 40);
    const height = 200;
    const centerX = width / 2;
    const centerY = height / 2;

    return `M ${centerX - width / 3} ${centerY - 30}
            Q ${centerX - width / 6} ${centerY - 80}, ${centerX} ${centerY - 30}
            T ${centerX + width / 3} ${centerY - 30}
            Q ${centerX + width / 6} ${centerY + 20}, ${centerX} ${centerY + 30}
            T ${centerX - width / 3} ${centerY + 30}
            Q ${centerX - width / 6} ${centerY - 20}, ${centerX - width / 3} ${
      centerY - 30
    } Z`;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-6">
      <div className="absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${Math.max(1200, title.length * 50)} 300`}
          initial="hidden"
          animate="visible"
          className="w-full h-full"
        >
          <motion.path
            d={getTitlePath(title)}
            fill="none"
            strokeWidth="6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-70"
          />
        </motion.svg>
      </div>
      <div className="relative lg:text-left z-10 flex flex-col items-center lg:items-start justify-center">
        <motion.h1
          className="text-5xl md:text-7xl text-white tracking-tighter font-extrabold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-xl text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
