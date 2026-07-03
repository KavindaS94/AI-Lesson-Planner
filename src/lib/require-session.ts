import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function requireSession(headers: Headers) {
  const session = await getAuth().api.getSession({ headers });

  if (!session) {
    return {
      session: null,
      response: NextResponse.json(
        { error: "Your session has expired — please log in again." },
        { status: 401 },
      ),
    };
  }

  return { session, response: null };
}
