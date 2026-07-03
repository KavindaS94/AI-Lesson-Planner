import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/lib/env";

// Switch to "claude-sonnet-5" here if generation cost becomes a concern —
// quality is close for structured content generation at a fraction of the price.
export const MODEL = "claude-opus-4-8";

export const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
