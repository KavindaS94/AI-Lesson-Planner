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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-3">
            <Link href="/" className="text-sm font-semibold text-gray-900">
              AI Lesson Planner
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Lesson Plan
            </Link>
            <Link href="/quiz" className="text-sm text-gray-600 hover:text-gray-900">
              Quiz Builder
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
