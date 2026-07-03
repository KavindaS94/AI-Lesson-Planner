import Link from "next/link";
import { BrandMark } from "@/app/_components/ui/BrandMark";
import { LinkButton } from "@/app/_components/ui/LinkButton";

const FEATURES = [
  {
    title: "Lesson plan generator",
    description:
      "Enter a subject, grade level, topic, and duration — get a full, ready-to-teach lesson plan in seconds.",
  },
  {
    title: "Quiz & worksheet builder",
    description: "Multiple choice, short answer, and fill-in-the-blank questions, generated on demand.",
  },
  {
    title: "Inline editing",
    description: "Every generated section is editable in place before you export it.",
  },
  {
    title: "PDF & Word export",
    description: "Download a polished PDF or a .docx you can open straight in Google Docs.",
  },
];

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    who: "New users",
    features: ["5 plans/month", "Watermarked exports"],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    who: "Individual teachers",
    features: ["Unlimited plans + quizzes", "All export formats", "Curriculum alignment"],
    highlighted: true,
  },
  {
    name: "School",
    price: "$199",
    period: "/month",
    who: "Up to 20 teachers",
    features: ["Everything in Pro", "Admin dashboard", "Priority support"],
  },
  {
    name: "District",
    price: "Custom",
    period: "",
    who: "100+ teachers",
    features: ["Custom curriculum maps", "SSO", "LMS integrations & onboarding"],
  },
];

export default function MarketingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-gray-100">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Log in
            </Link>
            <LinkButton href="/signup">Sign up</LinkButton>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold text-blue-600">AI-Powered</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Lesson plans, quizzes, and worksheets — generated in minutes
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Stop spending your evenings on prep work. Enter a topic, get a curriculum-aligned lesson
            plan you can edit and export right away.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/signup" className="px-6 py-3 text-base">
              Get started free
            </LinkButton>
            <LinkButton href="/login" variant="secondary" className="px-6 py-3 text-base">
              Log in
            </LinkButton>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-100 bg-gray-50/60">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Simple, teacher-friendly pricing
              </h2>
              <p className="mt-2 text-gray-600">Start free. Upgrade when you need more.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-6 shadow-sm ${
                    tier.highlighted ? "border-blue-600 ring-1 ring-blue-600" : "border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{tier.who}</p>
                  <p className="mt-4">
                    <span className="text-3xl font-bold tracking-tight text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-sm text-gray-500">{tier.period}</span>
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-gray-600">
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <LinkButton
                    href="/signup"
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className="mt-6 w-full"
                  >
                    Get started
                  </LinkButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AI Lesson Planner
        </div>
      </footer>
    </div>
  );
}
