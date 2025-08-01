"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChatWithMessage: (message: string) => void;
  initialMessage: string | null;
  clearInitialMessage: () => void;
  shouldClearMessages: boolean;
  clearMessageFlag: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);
  const [shouldClearMessages, setShouldClearMessages] = useState(false);

  const openChatWithMessage = (message: string) => {
    setShouldClearMessages(true); // Flag to clear messages
    setInitialMessage(message);
    setIsOpen(true);
  };

  const clearInitialMessage = () => {
    setInitialMessage(null);
  };

  const clearMessageFlag = () => {
    setShouldClearMessages(false);
  };

  const value: ChatContextType = {
    isOpen,
    setIsOpen,
    openChatWithMessage,
    initialMessage,
    clearInitialMessage,
    shouldClearMessages,
    clearMessageFlag,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
