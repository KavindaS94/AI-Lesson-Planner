import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { getEnv } from "@/lib/env";

function createAuth() {
  const env = getEnv();
  return betterAuth({
    database: new Database("sqlite.db"),
    emailAndPassword: { enabled: true },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
  });
}

let auth: ReturnType<typeof createAuth> | undefined;

// Constructed lazily, on first use — see getEnv() for why (eager construction
// at module import time breaks `next build`'s page-data collection step,
// which imports every route module without invoking its handlers).
export function getAuth() {
  if (!auth) {
    auth = createAuth();
  }
  return auth;
}
