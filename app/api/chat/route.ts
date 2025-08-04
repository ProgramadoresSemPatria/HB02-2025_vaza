import { Profile } from "@/types/db";
import { createClient } from "@/utils/supabase/server";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

const saveChat = async (profile_id: string, user_message: string, ai_message: string, country_name: string) => {
  const supabase = await createClient();

  const chatMessages = [
    { message: user_message, sender: "user" },
    { message: ai_message, sender: "ai" }
  ];

  // First try to get the existing country
  const { data: country } = await supabase
    .from("countries")
    .select("*")
    .eq("name", country_name)
    .eq("profile_id", profile_id)
    .single();

  if (!country) {
    const { data: newCountry, error: createError } = await supabase
      .from("countries")
      .insert({
        name: country_name,
        profile_id: profile_id,
        chat: chatMessages,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating country:", createError);
      throw createError;
    }

    return newCountry;
  }

  // Update existing country with appended chat messages
  const updatedChat = [...(country.chat || []), ...chatMessages];
  const { error: updateError } = await supabase
    .from("countries")
    .update({ chat: updatedChat })
    .eq("id", country.id);  // Use the specific ID we already have

  if (updateError) {
    console.error("Error updating country chat:", updateError);
    throw updateError;
  }

  return country;
}

export async function POST(request: Request) {
  const { messages, character = "Travel Wizard", country } = await request.json();

  let userProfile = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user && !userError) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      userProfile = profile;
    }
  } catch (error) {
    console.log("Error fetching user profile or country:", error);
  }

  const characterPrompts = {
    "Travel Wizard": `You are the Travel Wizard, a magical and enchanting travel planning expert. You have deep knowledge about tourist destinations, best times to travel, money-saving tips and unique experiences. You always respond with enthusiasm and creativity, suggesting magical places and unforgettable experiences. Use emojis occasionally to make responses more engaging.`,

    "Visa Expert": `You are the Visa Expert, a specialist in travel documentation and visa processes. You have deep knowledge of visa requirements for different countries, processing times, required documents and tips to facilitate the process. Your answers are accurate, detailed and always include information about timelines and procedures. Maintain a professional but accessible tone.`,

    "Local Guide": `You are the Local Guide, an experienced local guide who knows the secrets and hidden treasures of destinations. You offer authentic tips about where to eat, what to do, how to get around and how to live like a local. You always suggest authentic experiences, avoid very touristy places and share interesting stories about places. Your tone is friendly and you speak like someone who really knows the place.`,
  };

  const createSystemPrompt = (
    profile: Profile | null,
    characterName: string
  ) => {
    const characterPrompt =
      characterPrompts[characterName as keyof typeof characterPrompts] ||
      characterPrompts["Travel Wizard"];

    let basePrompt = `${characterPrompt}

    You help users with:
    - Travel and destination planning
    - Visa requirements and application processes
    - Documentation and document preparation
    - Country-specific information
    - Local tips and authentic experiences

    Always be helpful, concise and enthusiastic about travel and immigration. If someone asks about something outside the scope of travel/immigration, politely redirect to related topics.`;

    if (profile) {
      basePrompt += `\n\nUser Context:
      - Name: ${profile.full_name || "Not provided"}
      - Current Country: ${profile.country || "Not specified"}
      - Job Title: ${profile.job_title || "Not specified"}
      - Age: ${profile.age || "Not specified"}
      - Education: ${profile.degree || "Not specified"} ${profile.institution ? `from ${profile.institution}` : ""
        }
      - Citizenships: ${profile.citizenships
          ? profile.citizenships.join(", ")
          : "Not specified"
        }
      - Marital Status: ${profile.marital_status || "Not specified"}
      - Children: ${profile.children || "Not specified"}

      Use this information to provide personalized advice. For example:
      - Consider current country when discussing visa requirements
      - Adapt recommendations based on background and family situation
      - Reference citizenship(s) when discussing visa-free travel options
      - Be mindful of age and work when suggesting types of travel or destinations`;
    }

    return basePrompt;
  };

  const systemMessage = {
    role: "system" as const,
    content: createSystemPrompt(userProfile, character),
  };

  const allMessages = [systemMessage, ...messages];

  const result = streamText({
    model: anthropic("claude-3-haiku-20240307"),
    messages: allMessages,
    maxTokens: 500,
    temperature: 0.7,
    onFinish: async (completion) => {
      console.log("Starting onFinish");
      console.log("Country", country);
      if (userProfile && country) {
        try {
          // Get the last user message from the messages array
          const lastUserMessage = messages[messages.length - 1].content;

          // Save the chat interaction
          console.log("Saving chat");
          await saveChat(
            userProfile.id,
            lastUserMessage,
            completion.text,
            country
          );
          console.log("Chat saved");
        } catch (error) {
          console.error("Error saving chat:", error);
        }
      }
    }
  });

  return result.toDataStreamResponse();
}
