import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuth } from "@/lib/auth";
import { BrandMark } from "@/app/_components/ui/BrandMark";
import { SignOutButton } from "@/app/_components/auth/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuth().api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-4xl items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
          <div className="mr-4">
            <BrandMark href="/dashboard" />
          </div>
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Lesson Plan
          </Link>
          <Link
            href="/dashboard/quiz"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Quiz Builder
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:inline">{session.user.email}</span>
            <SignOutButton />
          </div>
        </nav>
      </header>
      <main className="flex-1 bg-white">{children}</main>
    </>
  );
}
