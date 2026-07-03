import { z } from "zod";

const EnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
