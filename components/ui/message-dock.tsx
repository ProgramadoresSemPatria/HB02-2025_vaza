"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Character {
  id?: string | number;
  emoji: string;
  name: string;
  online: boolean;
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientColors?: string;
  avatar?: string;
}

export interface MessageDockProps {
  characters?: Character[];
  onMessageSend?: (
    message: string,
    character: Character,
    characterIndex: number
  ) => void;
  onCharacterSelect?: (character: Character, characterIndex: number) => void;
  onDockToggle?: (isExpanded: boolean) => void;
  className?: string;
  expandedWidth?: number;
  position?: "bottom" | "top";
  showSparkleButton?: boolean;
  showMenuButton?: boolean;
  enableAnimations?: boolean;
  animationDuration?: number;
  placeholder?: (characterName: string) => string;
  theme?: "light" | "dark" | "auto";
  autoFocus?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  closeOnSend?: boolean;
  hasActiveConversations?: (character: Character) => boolean;
}

const defaultCharacters: Character[] = [
  { emoji: "✨", name: "Sparkle", online: false },
  {
    emoji: "🧙‍♂️",
    name: "Wizard",
    online: true,
    backgroundColor: "bg-green-300",
    gradientFrom: "from-green-300",
    gradientTo: "to-green-100",
    gradientColors: "#86efac, #dcfce7",
  },
  {
    emoji: "🦄",
    name: "Unicorn",
    online: true,
    backgroundColor: "bg-purple-300",
    gradientFrom: "from-purple-300",
    gradientTo: "to-purple-100",
    gradientColors: "#c084fc, #f3e8ff",
  },
  {
    emoji: "🐵",
    name: "Monkey",
    online: true,
    backgroundColor: "bg-yellow-300",
    gradientFrom: "from-yellow-300",
    gradientTo: "to-yellow-100",
    gradientColors: "#fde047, #fefce8",
  },
  {
    emoji: "🤖",
    name: "Robot",
    online: false,
    backgroundColor: "bg-red-300",
    gradientFrom: "from-red-300",
    gradientTo: "to-red-100",
    gradientColors: "#fca5a5, #fef2f2",
  },
];

const getGradientColors = (character: Character): string => {
  return character.gradientColors || "#86efac, #dcfce7";
};

export function MessageDock({
  characters = defaultCharacters,
  onMessageSend,
  onCharacterSelect,
  onDockToggle,
  className,
  expandedWidth = 480,
  position = "bottom",
  showSparkleButton = true,
  showMenuButton = true,
  enableAnimations = true,
  animationDuration = 1,
  placeholder = (name: string) => `Message ${name}...`,
  theme = "light",
  autoFocus = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  closeOnSend = true,
  hasActiveConversations,
}: MessageDockProps) {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCharacter, setExpandedCharacter] = useState<number | null>(
    null
  );
  const [messageInput, setMessageInput] = useState("");
  const dockRef = useRef<HTMLDivElement>(null);
  const [collapsedWidth, setCollapsedWidth] = useState<number>(266);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (dockRef.current && !hasInitialized) {
      const width = dockRef.current.offsetWidth;
      if (width > 0) {
        setCollapsedWidth(width);
        setHasInitialized(true);
      }
    }
  }, [hasInitialized]);

  useEffect(() => {
    if (!closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setExpandedCharacter(null);
        setMessageInput("");
        onDockToggle?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickOutside, onDockToggle]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const hoverAnimation = shouldReduceMotion
    ? { scale: 1.02 }
    : {
        scale: 1.05,
        y: -8,
        transition: {
          type: "spring" as const,
          stiffness: 400,
          damping: 25,
        },
      };

  const handleCharacterClick = (index: number) => {
    const character = characters[index];
    const hasActive = hasActiveConversations
      ? hasActiveConversations(character)
      : false;

    if (expandedCharacter === index) {
      setExpandedCharacter(null);
      setMessageInput("");
      onDockToggle?.(false);
    } else {
      setExpandedCharacter(index);
      onCharacterSelect?.(character, index);
      onDockToggle?.(true);

      if (hasActive) {
        onMessageSend?.("", character, index);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageInput(value);

    if ((window as Window & { autoSendTimer?: NodeJS.Timeout }).autoSendTimer) {
      clearTimeout(
        (window as Window & { autoSendTimer?: NodeJS.Timeout }).autoSendTimer!
      );
    }

    if (value.trim()) {
      (window as Window & { autoSendTimer?: NodeJS.Timeout }).autoSendTimer =
        setTimeout(() => {
          if (value.trim() && expandedCharacter !== null) {
            const character = characters[expandedCharacter];
            console.log(
              "Auto-sending message from dock:",
              value,
              "to",
              character.name
            );

            onMessageSend?.(value, character, expandedCharacter);
            setMessageInput("");

            if (closeOnSend) {
              setExpandedCharacter(null);
              onDockToggle?.(false);
            }
          }
        }, 1500);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && expandedCharacter !== null) {
      const character = characters[expandedCharacter];
      console.log("Manual send from dock:", messageInput, "to", character.name);

      onMessageSend?.(messageInput, character, expandedCharacter);
      setMessageInput("");

      if (closeOnSend) {
        setExpandedCharacter(null);
        onDockToggle?.(false);
      }
    }
  };

  const selectedCharacter =
    expandedCharacter !== null ? characters[expandedCharacter] : null;
  const isExpanded = expandedCharacter !== null;

  const positionClasses =
    position === "top"
      ? "fixed top-4 left-1/2 -translate-x-1/2 z-50 message-dock-container"
      : "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 message-dock-container";

  return (
    <motion.div
      ref={dockRef}
      className={cn(positionClasses, className)}
      initial={enableAnimations ? "hidden" : "visible"}
      animate="visible"
      variants={enableAnimations ? containerVariants : undefined}
    >
      <motion.div
        className="rounded-2xl px-4 py-2 shadow-xl border border-gray-200/50 backdrop-blur-sm chat-backdrop"
        animate={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          background:
            isExpanded && selectedCharacter
              ? `linear-gradient(135deg, ${getGradientColors(
                  selectedCharacter
                )})`
              : theme === "dark"
              ? "rgba(31, 41, 55, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
        }}
        transition={
          enableAnimations
            ? {
                type: "spring",
                stiffness: isExpanded ? 300 : 500,
                damping: isExpanded ? 30 : 35,
                mass: isExpanded ? 0.8 : 0.6,
                background: {
                  duration: 0.2 * animationDuration,
                  ease: "easeInOut",
                },
              }
            : { duration: 0 }
        }
      >
        <div className="flex items-center gap-2 relative">
          {showSparkleButton && (
            <motion.div
              className="flex items-center justify-center"
              animate={{
                opacity: isExpanded ? 0 : 1,
                x: isExpanded ? -20 : 0,
                scale: isExpanded ? 0.8 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: isExpanded ? 0 : 0,
              }}
            >
              <motion.button
                className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-xl hover:bg-white/10 transition-colors chat-hover"
                whileHover={
                  !isExpanded
                    ? {
                        scale: 1.02,
                        y: -2,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        },
                      }
                    : undefined
                }
                whileTap={{ scale: 0.95 }}
                aria-label="Sparkle"
              >
                <span className="text-xl">✨</span>
              </motion.button>
            </motion.div>
          )}

          {characters.map((character, index) => {
            const isSelected = expandedCharacter === index;

            return (
              <motion.div
                key={character.name}
                className={cn(
                  "relative",
                  isSelected && isExpanded && "absolute left-1 top-1 z-20"
                )}
                style={{
                  width: isSelected && isExpanded ? 0 : "auto",
                  minWidth: isSelected && isExpanded ? 0 : "auto",
                  overflow: "visible",
                }}
                animate={{
                  opacity: isExpanded && !isSelected ? 0 : 1,
                  y: isExpanded && !isSelected ? 60 : 0,
                  scale: isExpanded && !isSelected ? 0.8 : 1,
                  x: isSelected && isExpanded ? 0 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay:
                    isExpanded && !isSelected
                      ? index * 0.05
                      : isExpanded
                      ? 0.1
                      : 0,
                }}
              >
                <motion.button
                  className={cn(
                    "relative w-10 h-10 rounded-xl flex items-center justify-center text-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 chat-hover",
                    isSelected && isExpanded
                      ? "bg-white/90 shadow-lg"
                      : character.backgroundColor
                  )}
                  onClick={() => handleCharacterClick(index)}
                  whileHover={!isExpanded ? hoverAnimation : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Message ${character.name}`}
                >
                  <span className="text-lg">{character.emoji}</span>

                  {character.online && (
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: isExpanded && !isSelected ? 0 : 1 }}
                      transition={{
                        delay: isExpanded
                          ? isSelected
                            ? 0.3
                            : 0
                          : (index + 1) * 0.1 + 0.5,
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {isExpanded && !hasActiveConversations?.(selectedCharacter!) && (
              <motion.input
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                  if (e.key === "Escape" && closeOnEscape) {
                    setExpandedCharacter(null);
                    setMessageInput("");
                    onDockToggle?.(false);
                  }
                }}
                placeholder={placeholder(selectedCharacter?.name || "")}
                className={cn(
                  showSparkleButton
                    ? "w-[300px] absolute left-14 right-0 bg-transparent border-none outline-none text-sm font-medium z-50 placeholder:text-gray-500"
                    : "w-[400px] absolute left-4 pl-10 right-0 bg-transparent border-none outline-none text-sm font-medium z-50 placeholder:text-gray-500",
                  theme === "dark"
                    ? "text-gray-100 placeholder:text-gray-400"
                    : "text-gray-700 placeholder:text-gray-500"
                )}
                autoFocus={autoFocus}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeOut",
                  },
                }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="w-px h-6 bg-gray-300/50 ml-2 -mr-2"
            animate={{
              opacity: isExpanded ? 0 : 1,
              scaleY: isExpanded ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: isExpanded ? 0 : 0,
            }}
          />

          {showMenuButton && (
            <motion.div
              className={cn(
                "flex items-center justify-center z-20",
                isExpanded && "absolute right-0"
              )}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.button
                    key="menu"
                    className="w-11 h-11 flex items-center justify-center cursor-pointer rounded-xl hover:bg-white/10 transition-colors chat-hover"
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Menu"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.button
                    key="send"
                    onClick={handleSendMessage}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 hover:bg-white transition-all duration-200 disabled:opacity-50 cursor-pointer relative z-30 shadow-sm hover:shadow-md chat-hover"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!messageInput.trim()}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        delay: 0.25,
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      rotate: 90,
                      transition: {
                        duration: 0.1,
                        ease: "easeIn",
                      },
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      <path d="m22 2-7 20-4-9-9-4z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
