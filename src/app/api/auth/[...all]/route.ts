import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

// Wrapped in a plain function (not `toNextJsHandler(getAuth())`) so getAuth()
// — and the env validation / DB construction inside it — runs per-request,
// not at module import time. See getAuth() for why that matters for `next build`.
export const { GET, POST } = toNextJsHandler((request: Request) => getAuth().handler(request));
