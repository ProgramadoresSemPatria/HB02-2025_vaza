"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Character } from "../ui/message-dock";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ExpandedChatProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: string, character: Character) => void;
  initialMessage?: string;
  existingMessages?: ChatMessage[];
  onSaveConversation?: (messages: ChatMessage[]) => void;
}

export default function ExpandedChat({
  character,
  isOpen,
  onClose,
  initialMessage = "",
  existingMessages = [],
  onSaveConversation,
}: ExpandedChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    append,
  } = useChat({
    api: "/api/chat",
    body: {
      character: character.name,
    },
    onFinish: (message) => {
      console.log("AI response finished:", message);
    },
    onError: (error) => {
      console.error("AI response error:", error);
    },
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [localMessages, setLocalMessages] =
    useState<ChatMessage[]>(existingMessages);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, localMessages]);

  useEffect(() => {
    if (isOpen && existingMessages.length > 0 && messages.length === 0) {
      const formattedMessages = existingMessages.map((msg, index) => ({
        id: `existing-${index}`,
        role: msg.role,
        content: msg.content,
        parts: [{ type: "text" as const, text: msg.content }],
      }));

      setMessages(formattedMessages);
      setLocalMessages(existingMessages);
    }
  }, [isOpen, existingMessages, messages.length, setMessages]);

  useEffect(() => {
    if (isOpen && initialMessage && !hasInitialized && messages.length === 0) {
      console.log("Initializing chat with message:", initialMessage);
      setHasInitialized(true);

      append({
        role: "user",
        content: initialMessage,
      });

      console.log("Initial message sent to API");
    }
  }, [isOpen, initialMessage, hasInitialized, messages.length, append]);

  useEffect(() => {
    if (!isOpen) {
      setHasInitialized(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) {
      const newLocalMessages: ChatMessage[] = messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.parts
          .map((part) => {
            if ("text" in part) {
              return part.text;
            }
            return "";
          })
          .join(""),
        timestamp: new Date(),
      }));

      const currentContent = JSON.stringify(
        localMessages.map((m) => ({ role: m.role, content: m.content }))
      );
      const newContent = JSON.stringify(
        newLocalMessages.map((m) => ({ role: m.role, content: m.content }))
      );

      if (currentContent !== newContent) {
        setLocalMessages(newLocalMessages);

        if (onSaveConversation) {
          onSaveConversation(newLocalMessages);
        }
      }
    }
  }, [localMessages, messages, onSaveConversation]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const getCharacterPrompt = (characterName: string): string => {
    switch (characterName) {
      case "Travel Wizard":
        return "Ask me about travel planning, destinations, and magical experiences! ✨";
      case "Visa Expert":
        return "I can help you with visa requirements, documentation, and travel permits! 📋";
      case "Local Guide":
        return "Let me show you the hidden gems and authentic local experiences! 🗺️";
      default:
        return "Start a conversation with me!";
    }
  };

  const displayMessages = localMessages.length > 0 ? localMessages : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl h-[600px] bg-background rounded-lg shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={character.avatar} />
                  <AvatarFallback className="text-lg">
                    {character.emoji}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={character.online ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {character.online ? "Online" : "Offline"}
                    </Badge>
                    {character.online && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <Separator />

            <CardContent className="p-4 h-[400px]">
              <ScrollArea ref={scrollAreaRef} className="h-full pr-4">
                <div className="space-y-4">
                  {displayMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation with {character.name}</p>
                      <p className="text-sm mt-2">
                        {getCharacterPrompt(character.name)}
                      </p>
                    </div>
                  ) : (
                    displayMessages.map((message, index) => (
                      <div
                        key={`${
                          message.role
                        }-${index}-${message.timestamp.getTime()}`}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${
                            message.role === "user"
                              ? "flex-row-reverse space-x-reverse"
                              : ""
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={
                                message.role === "user"
                                  ? undefined
                                  : character.avatar
                              }
                            />
                            <AvatarFallback className="text-sm">
                              {message.role === "user" ? (
                                <User className="h-4 w-4" />
                              ) : (
                                character.emoji
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <Card
                            className={`${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <CardContent className="p-3">
                              <div className="whitespace-pre-wrap text-sm">
                                {message.content}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-sm">
                            {character.emoji}
                          </AvatarFallback>
                        </Avatar>
                        <Card className="bg-muted">
                          <CardContent className="p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <Separator />

            <CardContent className="p-4">
              <form
                onSubmit={handleSubmit}
                className="flex items-end space-x-2"
              >
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask ${character.name} about your travel plans...`}
                  className="min-h-[60px] max-h-[120px] resize-none"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-[60px] w-[60px]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
