import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Lesson Planner",
  description:
    "Generate curriculum-aligned lesson plans, quizzes, and worksheets in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-gray-900">
        <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-4xl items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="mr-4 flex items-center gap-2 text-sm font-semibold text-gray-900"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                A
              </span>
              AI Lesson Planner
            </Link>
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Lesson Plan
            </Link>
            <Link
              href="/quiz"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Quiz Builder
            </Link>
          </nav>
        </header>
        <main className="flex-1 bg-white">{children}</main>
      </body>
    </html>
  );
}
