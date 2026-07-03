import { ApiError, type GenerateContentResponse } from "@google/genai";
import { z } from "zod";
import { getGeminiClient, MODEL } from "@/lib/gemini";

export class GenerationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const REINFORCEMENT =
  "\n\nIMPORTANT: Conform exactly to the required JSON structure — every required field must be present and correctly typed.";

const REFUSAL_FINISH_REASONS = new Set(["SAFETY", "PROHIBITED_CONTENT", "BLOCKLIST", "SPII"]);

type AttemptResult<T> =
  | { status: "ok"; data: T }
  | { status: "refused" }
  | { status: "empty" };

export async function generateStructured<Schema extends z.ZodType>(params: {
  schema: Schema;
  system: string;
  prompt: string;
}): Promise<z.infer<Schema>> {
  const { schema, system, prompt } = params;
  const jsonSchema = z.toJSONSchema(schema);

  const attempt = async (reinforce: boolean): Promise<AttemptResult<z.infer<Schema>>> => {
    const response = await getGeminiClient().models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction: reinforce ? `${system}${REINFORCEMENT}` : system,
        responseMimeType: "application/json",
        responseJsonSchema: jsonSchema,
        maxOutputTokens: 4096,
      },
    });

    if (isRefused(response)) {
      return { status: "refused" };
    }

    const text = response.text;
    if (!text) {
      return { status: "empty" };
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return { status: "empty" };
    }

    const parsed = schema.safeParse(raw);
    return parsed.success ? { status: "ok", data: parsed.data } : { status: "empty" };
  };

  let result: AttemptResult<z.infer<Schema>>;
  try {
    result = await attempt(false);
  } catch (err) {
    throw mapGeminiError(err);
  }

  if (result.status !== "ok") {
    try {
      result = await attempt(true);
    } catch (err) {
      throw mapGeminiError(err);
    }
    if (result.status !== "ok") {
      if (result.status === "empty") {
        console.error("Gemini structured output still invalid after retry");
      }
      throw new GenerationError(
        result.status === "refused" ? 422 : 502,
        result.status === "refused"
          ? "Couldn't generate this — try adjusting your topic or details."
          : "Generation failed — please try again.",
      );
    }
  }

  return result.data;
}

// A prompt can be blocked before generation starts (promptFeedback.blockReason)
// or generation can be cut short by a safety-related finish reason — both count
// as a refusal worth surfacing distinctly from "malformed output."
function isRefused(response: GenerateContentResponse): boolean {
  if (response.promptFeedback?.blockReason) {
    return true;
  }
  const finishReason = response.candidates?.[0]?.finishReason;
  return finishReason !== undefined && REFUSAL_FINISH_REASONS.has(finishReason);
}

function mapGeminiError(err: unknown): GenerationError {
  console.error("Gemini API error:", err);
  if (err instanceof ApiError) {
    if (err.status === 429) {
      return new GenerationError(429, "Rate limited — please try again shortly.");
    }
    if (err.status >= 500) {
      return new GenerationError(503, "Could not reach the AI service — please try again.");
    }
    return new GenerationError(502, "The AI service returned an error — please try again.");
  }
  return new GenerationError(502, "Generation failed — please try again.");
}
