import { Profile } from "@/types/db";
import { createClient } from "@/utils/supabase/server";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { messages, character = "Travel Wizard" } = await request.json();

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
    console.log("Error fetching user profile:", error);
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
      - Education: ${profile.degree || "Not specified"} ${
        profile.institution ? `from ${profile.institution}` : ""
      }
      - Citizenships: ${
        profile.citizenships
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
  });

  return result.toDataStreamResponse();
}
