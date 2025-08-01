"use client";

import { Character, MessageDock } from "@/components/ui/message-dock";
import { useState } from "react";
import ExpandedChat from "./ExpandedChat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  character: Character;
  messages: ChatMessage[];
}

const travelAgents: Character[] = [
  {
    emoji: "🧙‍♂️",
    name: "Travel Wizard",
    online: true,
    backgroundColor: "bg-green-300",
    gradientColors: "#86efac, #dcfce7",
  },
  {
    emoji: "📋",
    name: "Visa Expert",
    online: true,
    backgroundColor: "bg-blue-300",
    gradientColors: "#93c5fd, #dbeafe",
  },
  {
    emoji: "🗺️",
    name: "Local Guide",
    online: true,
    backgroundColor: "bg-purple-300",
    gradientColors: "#c084fc, #f3e8ff",
  },
];

export default function FloatingChat() {
  const [expandedChatOpen, setExpandedChatOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [initialMessage, setInitialMessage] = useState("");
  const [conversations, setConversations] = useState<Map<string, Conversation>>(
    new Map()
  );

  const handleMessageSend = (
    message: string,
    character: Character,
    index: number
  ) => {
    console.log("Message from dock (opening chat only):", {
      message,
      character: character.name,
      index,
    });

    if (!message.trim()) {
      console.log("Empty message, opening chat directly");
      setSelectedCharacter(character);
      setExpandedChatOpen(true);
      setInitialMessage("");
      return;
    }

    console.log("Opening chat with message:", message);
    setInitialMessage(message);
    setSelectedCharacter(character);
    setExpandedChatOpen(true);
  };

  const handleCharacterSelect = (character: Character) => {
    console.log("Character selected:", character.name);

    const characterKey = character.name;
    const existingConversation = conversations.get(characterKey);

    if (existingConversation && existingConversation.messages.length > 0) {
      setSelectedCharacter(character);
      setExpandedChatOpen(true);
      setInitialMessage("");
    } else {
      setSelectedCharacter(character);
    }
  };

  const handleDockToggle = (isExpanded: boolean) => {
    console.log("Dock expanded:", isExpanded);
  };

  const handleExpandedChatClose = () => {
    setExpandedChatOpen(false);
    setSelectedCharacter(null);
    setInitialMessage("");
  };

  const handleExpandedChatMessage = (message: string, character: Character) => {
    console.log("Expanded chat message:", {
      message,
      character: character.name,
    });
  };

  const handleSaveConversation = (messages: ChatMessage[]) => {
    if (selectedCharacter) {
      const characterKey = selectedCharacter.name;
      const updatedConversation: Conversation = {
        character: selectedCharacter,
        messages: messages,
      };
      setConversations(
        new Map(conversations.set(characterKey, updatedConversation))
      );
    }
  };

  const hasActiveConversation = (character: Character): boolean => {
    const conversation = conversations.get(character.name);
    return conversation ? conversation.messages.length > 0 : false;
  };

  return (
    <>
      <MessageDock
        characters={travelAgents}
        onMessageSend={handleMessageSend}
        onCharacterSelect={handleCharacterSelect}
        onDockToggle={handleDockToggle}
        expandedWidth={500}
        placeholder={(name) => `Ask ${name} about your travel plans...`}
        theme="light"
        enableAnimations={true}
        closeOnSend={true}
        autoFocus={true}
        position="bottom"
        showSparkleButton={false}
        showMenuButton={true}
        hasActiveConversations={hasActiveConversation}
      />

      {selectedCharacter && (
        <ExpandedChat
          character={selectedCharacter}
          isOpen={expandedChatOpen}
          onClose={handleExpandedChatClose}
          onSendMessage={handleExpandedChatMessage}
          initialMessage={initialMessage}
          existingMessages={
            conversations.get(selectedCharacter.name)?.messages || []
          }
          onSaveConversation={handleSaveConversation}
        />
      )}
    </>
  );
}
