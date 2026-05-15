export class LLMService {
  private apiKey: string;
  private apiUrl: string = "https://openrouter.ai/api/v1";
  private model: string;

  constructor() {
    ((this.apiKey = process.env.OPENROUTER_API_KEY || ""),
      (this.model =
        process.env.OPENROUTER_LLM_MODEL ||
        "nvidia/nemotron-3-super-120b-a12b:free"));

    if (!this.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not defined");
    }
  }

  async generateResponse(
    prompt: string,
    context: string[] = [],
    asJson: boolean = false,
  ) {
    try {
      // Combine context with prompt for RAG
      let fullPrompt =
        context.length > 0
          ? `Context information:\n${context.join("\n\n")}\n\nQuestion: ${prompt}\n\nAnswer based on the context above.`
          : prompt;

      if (asJson) {
        fullPrompt += `\n\nReturn ONLY a valid JSON object matching this structure: 
        {
          "summary": "A brief overall summary or advice",
          "medicines": [
            {
              "name": "Exact Medicine Name",
              "reason": "Specific reason why this is recommended based on the provided context",
              "category": "Category of the medicine"
            }
          ]
        }. 
        Do not include any markdown formatting like \`\`\`json. Respond with ONLY the raw JSON string.`;
      }


      const systemMessage = asJson
        ? "You are a helpful assistant for Medicine Corner, a pharmacy management system. Answer questions based on the provided context. You MUST respond with ONLY valid JSON format. Do not include markdown tags."
        : "You are a helpful assistant for Medicine Corner, a pharmacy management system. Answer questions based on the provided context. If the context does not contain the answer, say you don't have enough information.";

      const bodyPayload: any = {
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        temperature: 0.1, // Lower temperature for more deterministic JSON
        max_tokens: 1500,
      };

      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://medicine-corner.vercel.app",
          "X-Title": "Medicine Corner",
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenRouter API error: ${response.status} - ${
            errorData.error?.message || "unknown error"
          }`,
        );
      }

      const data = await response.json();

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating LLM response:", error);
      throw error;
    }
  }
}
