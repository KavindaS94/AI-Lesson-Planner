import Link from "next/link";
import { BrandMark } from "@/app/_components/ui/BrandMark";
import { SignupForm } from "@/app/_components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-sm flex-col justify-center px-4 py-16">
      <div className="mb-8 flex justify-center">
        <BrandMark />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Create your account</h1>
        <p className="mt-1 mb-6 text-sm text-gray-600">
          Start generating lesson plans in minutes.
        </p>
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
