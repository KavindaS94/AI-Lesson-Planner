import Link from "next/link";
import { BrandMark } from "@/app/_components/ui/BrandMark";
import { LoginForm } from "@/app/_components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-sm flex-col justify-center px-4 py-16">
      <div className="mb-8 flex justify-center">
        <BrandMark />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome back</h1>
        <p className="mt-1 mb-6 text-sm text-gray-600">Sign in to your account.</p>
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
