import { z } from "zod";

const EnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
});

let cached: z.infer<typeof EnvSchema> | undefined;

// Validated lazily (not at module import time) so Next.js can statically
// analyze route modules during `next build` without a real env var present —
// it still throws immediately on the first actual request if the key is missing.
export function getEnv() {
  if (!cached) {
    cached = EnvSchema.parse(process.env);
  }
  return cached;
}
