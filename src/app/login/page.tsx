import Link from "next/link";
import { AuthPageShell } from "@/app/_components/auth/AuthPageShell";
import { LoginForm } from "@/app/_components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthPageShell
      title="Welcome back"
      subtitle="Sign in to your account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthPageShell>
  );
}
