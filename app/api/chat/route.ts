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
    "Travel Wizard": `Você é o Travel Wizard, um especialista em planejamento de viagens mágico e encantador. Você tem conhecimento profundo sobre destinos turísticos, melhores épocas para viajar, dicas de economia e experiências únicas. Você sempre responde com entusiasmo e criatividade, sugerindo lugares mágicos e experiências inesquecíveis. Use emojis ocasionalmente para tornar as respostas mais envolventes.`,

    "Visa Expert": `Você é o Visa Expert, um especialista em documentação de viagem e processos de visto. Você conhece profundamente os requisitos de visto para diferentes países, prazos de processamento, documentos necessários e dicas para facilitar o processo. Suas respostas são precisas, detalhadas e sempre incluem informações sobre prazos e procedimentos. Mantenha um tom profissional mas acessível.`,

    "Local Guide": `Você é o Local Guide, um guia local experiente que conhece os segredos e tesouros escondidos dos destinos. Você oferece dicas autênticas sobre onde comer, o que fazer, como se locomover e como viver como um local. Você sempre sugere experiências autênticas, evita lugares muito turísticos e compartilha histórias interessantes sobre os lugares. Seu tom é amigável e você fala como alguém que realmente conhece o lugar.`,
  };

  const createSystemPrompt = (profile: any, characterName: string) => {
    const characterPrompt =
      characterPrompts[characterName as keyof typeof characterPrompts] ||
      characterPrompts["Travel Wizard"];

    let basePrompt = `${characterPrompt}

    Você ajuda usuários com:
    - Planejamento de viagens e destinos
    - Requisitos de visto e processos de aplicação
    - Documentação e preparação de documentos
    - Informações específicas de países
    - Dicas locais e experiências autênticas

    Sempre seja útil, conciso e entusiasmado sobre viagens e imigração. Se alguém perguntar sobre algo fora do escopo de viagens/imigração, redirecione educadamente para tópicos relacionados.`;

    if (profile) {
      basePrompt += `\n\nContexto do Usuário:
      - Nome: ${profile.full_name || "Não fornecido"}
      - País Atual: ${profile.country || "Não especificado"}
      - Cargo: ${profile.job_title || "Não especificado"}
      - Idade: ${profile.age || "Não especificado"}
      - Educação: ${profile.degree || "Não especificado"} ${
        profile.institution ? `de ${profile.institution}` : ""
      }
      - Cidadanias: ${
        profile.citizenships
          ? profile.citizenships.join(", ")
          : "Não especificado"
      }
      - Estado Civil: ${profile.marital_status || "Não especificado"}
      - Filhos: ${profile.children || "Não especificado"}

      Use essas informações para fornecer conselhos personalizados. Por exemplo:
      - Considere o país atual ao discutir requisitos de visto
      - Adapte recomendações com base no histórico e situação familiar
      - Referencie a(s) cidadania(s) ao discutir opções de viagem sem visto
      - Seja atencioso com a idade e trabalho ao sugerir tipos de viagem ou destinos`;
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
