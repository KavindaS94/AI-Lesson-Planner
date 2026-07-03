import Link from "next/link";
import { AuthPageShell } from "@/app/_components/auth/AuthPageShell";
import { SignupForm } from "@/app/_components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthPageShell
      title="Create your account"
      subtitle="Start generating lesson plans in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthPageShell>
  );
}
