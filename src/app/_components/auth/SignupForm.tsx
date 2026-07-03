"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/app/_components/ui/TextField";
import { Button } from "@/app/_components/ui/Button";
import { ErrorBanner } from "@/app/_components/ui/ErrorBanner";
import { authClient } from "@/lib/auth-client";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error: signUpError } = await authClient.signUp.email({ name, email, password });

    if (signUpError) {
      setError(signUpError.message ?? "Couldn't create your account — please try again.");
      setStatus("error");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <TextField
        label="Name"
        autoComplete="name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
        className="py-3"
      />
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
        autoComplete="new-password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={status === "loading"}
        className="py-3"
      />

      {status === "error" && <ErrorBanner message={error} />}

      <Button type="submit" disabled={status === "loading"} className="mt-2 w-full py-3">
        {status === "loading" ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
