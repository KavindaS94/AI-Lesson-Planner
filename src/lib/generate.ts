import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod";
import { getAnthropicClient, MODEL } from "@/lib/anthropic";

export class GenerationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const REINFORCEMENT =
  "\n\nIMPORTANT: Conform exactly to the required JSON structure — every required field must be present and correctly typed.";

export async function generateStructured<Schema extends z.ZodType>(params: {
  schema: Schema;
  system: string;
  prompt: string;
}): Promise<z.infer<Schema>> {
  const { schema, system, prompt } = params;
  const format = zodOutputFormat(schema);

  const attempt = (reinforce: boolean) =>
    getAnthropicClient().messages.parse({
      model: MODEL,
      max_tokens: 4096,
      system: reinforce ? `${system}${REINFORCEMENT}` : system,
      messages: [{ role: "user", content: prompt }],
      output_config: { format },
    });

  let response;
  try {
    response = await attempt(false);
  } catch (err) {
    if (isRetryableParseFailure(err)) {
      response = await attempt(true).catch((retryErr) => {
        throw mapAnthropicError(retryErr);
      });
    } else {
      throw mapAnthropicError(err);
    }
  }

  if (response.stop_reason === "refusal" || response.parsed_output === null) {
    response = await attempt(true).catch((retryErr) => {
      throw mapAnthropicError(retryErr);
    });
    if (response.stop_reason === "refusal" || response.parsed_output === null) {
      if (response.stop_reason !== "refusal") {
        console.error("Anthropic structured output still empty after retry", {
          stop_reason: response.stop_reason,
        });
      }
      throw new GenerationError(
        response.stop_reason === "refusal" ? 422 : 502,
        response.stop_reason === "refusal"
          ? "Couldn't generate this — try adjusting your topic or details."
          : "Generation failed — please try again.",
      );
    }
  }

  return response.parsed_output;
}

// zodOutputFormat().parse() throws a plain AnthropicError (not an APIError
// subclass) when the model's JSON fails schema validation — that's the one
// failure mode worth a same-request retry rather than surfacing immediately.
function isRetryableParseFailure(err: unknown): boolean {
  return err instanceof Anthropic.AnthropicError && !(err instanceof Anthropic.APIError);
}

function mapAnthropicError(err: unknown): GenerationError {
  console.error("Anthropic API error:", err);
  if (err instanceof Anthropic.RateLimitError) {
    return new GenerationError(429, "Rate limited — please try again shortly.");
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return new GenerationError(503, "Could not reach the AI service — please try again.");
  }
  if (err instanceof Anthropic.APIError) {
    return new GenerationError(502, "The AI service returned an error — please try again.");
  }
  return new GenerationError(502, "Generation failed — please try again.");
}
