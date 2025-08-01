import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
  const { messages } = await request.json()

  // Get user profile information
  let userProfile = null
  try {
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (user && !userError) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()

      userProfile = profile
    }
  } catch (error) {
    console.log("Error fetching user profile:", error)
    // Continue without profile data if there's an error
  }

  // Create personalized system prompt
  const createSystemPrompt = (profile: any) => {
    let basePrompt = `You are Vaza AI, a friendly and knowledgeable travel assistant. You help users with:
    - Visa requirements and application processes
    - Travel planning and destination recommendations  
    - Document preparation guidance
    - Country-specific travel information
    
    Always be helpful, concise, and enthusiastic about travel. If someone asks about something outside of travel, politely redirect them back to travel-related topics.`

    if (profile) {
      basePrompt += `\n\nUser Context:
      - Name: ${profile.full_name || 'Not provided'}
      - Current Country: ${profile.country || 'Not specified'}
      - Job Title: ${profile.job_title || 'Not specified'}
      - Age: ${profile.age || 'Not specified'}
      - Education: ${profile.degree || 'Not specified'} ${profile.institution ? `from ${profile.institution}` : ''}
      - Citizenships: ${profile.citizenships ? profile.citizenships.join(', ') : 'Not specified'}
      - Marital Status: ${profile.marital_status || 'Not specified'}
      - Children: ${profile.children || 'Not specified'}
      
      Use this information to provide personalized advice. For example:
      - Consider their current country when discussing visa requirements
      - Tailor recommendations based on their background and family situation
      - Reference their citizenship(s) when discussing visa-free travel options
      - Be mindful of their age and job when suggesting travel types or destinations`
    }

    return basePrompt
  }

  const systemMessage = {
    role: "system" as const,
    content: createSystemPrompt(userProfile)
  }

  // Combine system message with user messages
  const allMessages = [systemMessage, ...messages]

  const result = streamText({
    model: anthropic('claude-3-haiku-20240307'),
    messages: allMessages,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}