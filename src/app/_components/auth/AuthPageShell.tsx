import { BrandMark } from "@/app/_components/ui/BrandMark";
import { AuthHeroPanel } from "@/app/_components/auth/AuthHeroPanel";

export function AuthPageShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <AuthHeroPanel />

      <main className="flex w-full flex-1 flex-col justify-center border-gray-200 bg-white lg:w-1/2 lg:border-l">
        <div className="mx-auto w-full max-w-xl px-6 py-12 sm:px-10 lg:max-w-2xl lg:px-12 lg:py-16 xl:px-16">
          <div className="mb-10 lg:hidden">
            <BrandMark />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 mb-8 text-center text-sm leading-relaxed text-gray-600 sm:text-base">
              {subtitle}
            </p>

            {children}

            <p className="mt-8 text-sm text-gray-600">{footer}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
