import { GoogleGenAI } from "@google/genai";
import { getEnv } from "@/lib/env";

// Free-tier eligible, good quality/cost balance for structured content generation.
// Switch to "gemini-2.5-flash-lite" for lower cost/latency, or "gemini-2.5-pro"
// for higher quality (paid only, no free tier).
export const MODEL = "gemini-2.5-flash";

let client: GoogleGenAI | undefined;

// Constructed lazily, on first use — see getEnv() for why.
export function getGeminiClient(): GoogleGenAI {
  if (!client) {
    client = new GoogleGenAI({ apiKey: getEnv().GEMINI_API_KEY });
  }
  return client;
}
