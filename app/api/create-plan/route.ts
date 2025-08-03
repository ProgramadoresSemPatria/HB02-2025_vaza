import { UserProfile } from "@/types/profile";
import { createClient } from "@/utils/supabase/server";
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject, jsonSchema } from "ai";

const ImmigrationPlanSchema = jsonSchema({
  type: "object",
  properties: {
    plan: {
      type: "object",
      properties: {
        recommended_visa_type: { type: "string" },
        visa_explanation: { type: "string" },
        expected_timeline: { type: "string" },
        timeline_explanation: { type: "string" },
        expected_cost: { type: "string" },
        cost_explanation: { type: "string" },
      },
      required: ["recommended_visa_type", "visa_explanation", "expected_timeline", "timeline_explanation", "expected_cost", "cost_explanation"],
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          order: { type: "number" },
          title: { type: "string" },
          description: { type: "string" },
          is_completed: { type: "boolean" },
        },
        required: ["order", "title", "description", "is_completed"],
      },
    },
  },
  required: ["plan", "steps"],
});

export async function POST(request: Request) {
  try {
    const { targetCountry } = await request.json();

    if (!targetCountry) {
      return new Response(
        JSON.stringify({ error: "Country is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get user profile
    let userProfile: UserProfile | null = null;
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

    const createImmigrationPrompt = (
      profile: UserProfile | null,
      targetCountry: string
    ) => {
      const profileContext = profile
        ? `
User Profile Context:
- Name: ${profile.full_name || "Not provided"}
- Current Country: ${profile.country || "Not specified"}
- Job: ${profile.job_title || "Not specified"}
- Age: ${profile.age || "Not specified"}
- Education: ${profile.degree || "Not specified"} ${profile.institution ? `from ${profile.institution}` : ""
        }
- Citizenships: ${profile.citizenships?.join(", ") || "Not specified"
        }
- Marital Status: ${profile.marital_status || "Not specified"}
- Children: ${profile.children || "Not specified"}
`
        : "No user profile available - provide general immigration guidance.";

      return `You are an expert immigration consultant with access to the most current immigration laws, requirements, and procedures. Your task is to create a comprehensive, personalized immigration plan for someone wanting to immigrate to ${targetCountry}.

${profileContext}

CRITICAL INSTRUCTIONS:
1. Search the web for the most up-to-date immigration requirements, visa categories, processing times, and costs for ${targetCountry}
2. Consider the user's specific situation (current country, age, education, work experience, family status) when creating the plan
3. Provide accurate, current information as of 2025/2026
4. Include realistic timelines and cost estimates
5. Prioritize tasks in logical order
6. Be specific about document requirements and procedures

RESEARCH REQUIREMENTS:
- Current immigration policies for ${targetCountry}
- Visa categories and eligibility requirements
- Required documents and their validity periods
- Processing times and fees
- Medical examination requirements
- Language requirements if any
- Financial requirements and proof needed
- Interview processes if applicable
- Recent policy changes or updates

Create a detailed immigration plan that includes:
{
  "plan": {
    "recommended_visa_type": "string",
    "visa_explanation": "string",
    "expected_timeline": "string",
    "timeline_explanation": "string",
    "expected_cost": "string",
    "cost_explanation": "string",
  },
  "steps": [
    {
      "order": number,
      "title": "string",
      "description": "string",
      "is_completed": boolean, // always false
    }
  ]
}

Ensure all information is current, accurate, and tailored to the user's specific situation. If certain information varies by region or consulate, mention this explicitly.`;
    };

    const result = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      prompt: createImmigrationPrompt(userProfile, targetCountry),
      schema: ImmigrationPlanSchema,
      temperature: 0.3,
    });

    return new Response(JSON.stringify(result.object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating immigration plan:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to create immigration plan",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}