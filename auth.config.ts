// Used only by the Better Auth CLI (`npx @better-auth/cli migrate`) for schema
// generation — the CLI needs a synchronously-exported `auth`. The app itself
// never imports this file; it uses the lazy singleton in src/lib/auth.ts
// instead, which defers construction to request time (see that file for why).
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("sqlite.db"),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
});
