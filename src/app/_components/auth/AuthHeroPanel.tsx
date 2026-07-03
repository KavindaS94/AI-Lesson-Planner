import Image from "next/image";
import { BrandMark } from "@/app/_components/ui/BrandMark";

export function AuthHeroPanel() {
  return (
    <aside className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col">
      <Image
        src="/auth-hero.png"
        alt="Teacher planning a lesson with AI Lesson Planner"
        fill
        priority
        className="object-cover object-center"
        sizes="50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/50 to-blue-800/30" />

      <div className="graph-paper absolute inset-0 opacity-15" />

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-12 xl:px-16 xl:py-16">
        <BrandMark theme="light" />

        <div className="max-w-lg">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
            Lesson plans that are ready to teach — in under a minute.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue-100">
            Generate structured plans, quizzes, and worksheets aligned to your subject and grade
            level.
          </p>
        </div>
      </div>
    </aside>
  );
}
