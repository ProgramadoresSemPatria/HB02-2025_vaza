"use client";

import { useEffect, useState } from "react";
import { useCountry } from "@/hooks/country/useCountry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import ExpandedChat from "@/components/chat/ExpandedChat";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
import { Country } from "@/types/db";

interface ChatCardsProps {
  profileId: string;
}

export const ChatCards = ({ profileId }: ChatCardsProps) => {
  const { countries, getCountries, getCountryByNameAndProfileId } = useCountry();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      await getCountries(profileId);
      setIsInitialLoading(false);
    };
    loadCountries();
  }, [getCountries, profileId]);

  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!countries.length) {
    return (
      <Card className="p-6">
        <p className="text-gray-600">No countries added yet.</p>
      </Card>
    );
  }

  const handleContinueChat = async (country: Country) => {
    try {
      const freshCountry = await getCountryByNameAndProfileId(country.name, profileId);
      if (freshCountry) {
        setSelectedCountry(freshCountry);
        setIsChatOpen(true);
      }
    } catch (error) {
      console.error("Failed to load country chat:", error);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedCountry(null);
  };

  // Transform country chat messages to ExpandedChat format
  const transformChatMessages = (country: Country | null): ChatMessage[] => {
    if (!country?.chat) return [];
    
    return country.chat.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.message,
      timestamp: new Date() // Since we don't have timestamp in the original data
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <Card key={country.id} className="p-6 flex flex-row justify-between items-center">
            <h3 className="text-xl font-semibold">{country.name}</h3>
            <Button onClick={() => handleContinueChat(country)}>
              <Play className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </Card>
        ))}
      </div>

      {selectedCountry && (
        <ExpandedChat
          character={{
            name: "Travel Wizard",
            avatar: "/vaza-logo.webp",
            emoji: "✈️",
            online: true
          }}
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          existingMessages={transformChatMessages(selectedCountry)}
          country={selectedCountry.name}
          onSendMessage={(message, character) => {
            console.log("Message sent:", message, character);
          }}
          onSaveConversation={(messages) => {
            // TODO: Implement saving conversation back to the country
            console.log("Save conversation:", messages);
          }}
        />
      )}
    </>
  );
};
