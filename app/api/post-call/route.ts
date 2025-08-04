import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

// Webhook secret should be stored in environment variables
const WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET;

const validateWebhook = (
  signature: string | null,
  payload: string,
  secret: string
) => {
  if (!signature) return false;

  const [timestampStr, hmacSignature] = signature.split(",");
  const timestamp = timestampStr.split("=")[1];
  const providedSignature = hmacSignature.split("=")[1];

  // Validate timestamp (within 30 minutes)
  const tolerance = Math.floor(Date.now() / 1000) - 30 * 60;
  if (parseInt(timestamp) < tolerance) return false;

  // Validate signature
  const fullPayloadToSign = `${timestamp}.${payload}`;
  const hmac = createHmac("sha256", secret);
  hmac.update(fullPayloadToSign);
  const computedSignature = "v0=" + hmac.digest("hex");

  return computedSignature === hmacSignature;
};

const saveChat = async (profile_id: string, messages: { message: string; sender: string }[]) => {
  const supabase = await createClient();

  // First try to get the existing country - we'll use a default country name for voice calls
  const { data: country } = await supabase
    .from("countries")
    .select("*")
    .eq("name", "Voice Calls")
    .eq("profile_id", profile_id)
    .single();

  if (!country) {
    const { data: newCountry, error: createError } = await supabase
      .from("countries")
      .insert({
        name: "Voice Calls",
        profile_id: profile_id,
        chat: messages,
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
  const updatedChat = [...(country.chat || []), ...messages];
  const { error: updateError } = await supabase
    .from("countries")
    .update({ chat: updatedChat })
    .eq("id", country.id);

  if (updateError) {
    console.error("Error updating country chat:", updateError);
    throw updateError;
  }

  return country;
};

export async function POST(request: Request) {
  try {
    console.log("1. Webhook received");
    // Get the raw request body for signature validation
    const rawBody = await request.text();
    const signature = request.headers.get("elevenlabs-signature");

    // Validate webhook signature
    if (!WEBHOOK_SECRET || !validateWebhook(signature, rawBody, WEBHOOK_SECRET)) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const body = JSON.parse(rawBody);

    // Verify this is a post-call transcription webhook
    if (body.type !== "post_call_transcription") {
      return new NextResponse("Unsupported webhook type", { status: 400 });
    }

    const supabase = await createClient();

    // Get the profile ID from user_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", body.data.user_id)
      .single();

    if (!profile) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Transform transcript into our chat format
    const chatMessages = body.data.transcript.map((turn: any) => ({
      message: turn.message,
      sender: turn.role === "agent" ? "ai" : "user"
    }));

    // Save the chat
    await saveChat(profile.id, chatMessages);

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
