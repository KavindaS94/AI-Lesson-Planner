import Anthropic from "@anthropic-ai/sdk";
import { getEnv } from "@/lib/env";

// Switch to "claude-sonnet-5" here if generation cost becomes a concern —
// quality is close for structured content generation at a fraction of the price.
export const MODEL = "claude-opus-4-8";

let client: Anthropic | undefined;

// Constructed lazily, on first use — see getEnv() for why.
export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: getEnv().ANTHROPIC_API_KEY });
  }
  return client;
}
