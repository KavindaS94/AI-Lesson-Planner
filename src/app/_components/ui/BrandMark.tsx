import Link from "next/link";

export function BrandMark({
  href = "/",
  theme = "dark",
}: {
  href?: string;
  theme?: "dark" | "light";
}) {
  const textClass = theme === "light" ? "text-white" : "text-gray-900";

  return (
    <Link href={href} className={`flex items-center gap-2 text-sm font-semibold ${textClass}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
        A
      </span>
      AI Lesson Planner
    </Link>
  );
}
