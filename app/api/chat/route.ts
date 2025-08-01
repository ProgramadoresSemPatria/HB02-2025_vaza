import { streamText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: anthropic('claude-3-haiku-20240307'),
    messages,
    maxTokens: 100
  })

  return result.toDataStreamResponse()
}