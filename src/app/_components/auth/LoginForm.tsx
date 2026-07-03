"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/app/_components/ui/TextField";
import { Button } from "@/app/_components/ui/Button";
import { ErrorBanner } from "@/app/_components/ui/ErrorBanner";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error: signInError } = await authClient.signIn.email({ email, password });

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      setStatus("error");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="py-3"
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={status === "loading"}
        className="py-3"
      />

      {status === "error" && <ErrorBanner message={error} />}

      <Button type="submit" disabled={status === "loading"} className="mt-2 w-full py-3">
        {status === "loading" ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
