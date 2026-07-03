import Link from "next/link";
import { BrandMark } from "@/app/_components/ui/BrandMark";
import { LinkButton } from "@/app/_components/ui/LinkButton";
import { LessonSheetPreview } from "@/app/_components/marketing/LessonSheetPreview";

const STEPS = [
  {
    n: "01",
    title: "Tell it the basics",
    body: "Subject, grade level, topic, and how long the lesson runs. That's the whole form.",
  },
  {
    n: "02",
    title: "Get a full plan",
    body: "Objectives, a warm-up, activities with timings, discussion questions, and an assessment — in under a minute.",
  },
  {
    n: "03",
    title: "Edit and export",
    body: "Tweak any section in place, then download a polished PDF or a Word file for Google Docs.",
  },
];

const FEATURES = [
  {
    title: "Lesson plan generator",
    body: "A complete, ready-to-teach plan from four quick inputs — objectives through materials list.",
    icon: (
      <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 1v4h4M7 13h9M7 17h6" />
    ),
  },
  {
    title: "Quiz & worksheet builder",
    body: "Multiple choice, short answer, and fill-in-the-blank, mixed however you need them.",
    icon: <path d="M5 4h14v16H5zM9 9l2 2 4-4M9 15h6" />,
  },
  {
    title: "Inline editing",
    body: "Every generated section is yours to adjust before it leaves the screen.",
    icon: <path d="M4 20h16M6 16l9-9 3 3-9 9H6v-3Z" />,
  },
  {
    title: "PDF & Word export",
    body: "Hand out a clean PDF, or open the .docx straight in Google Docs.",
    icon: <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 8v6m-3-3 3 3 3-3" />,
  },
];

const SUBJECTS = [
  { name: "Science", color: "#059669" },
  { name: "Math", color: "#2563EB" },
  { name: "English", color: "#D97706" },
  { name: "History", color: "#E11D48" },
  { name: "Geography", color: "#7C3AED" },
  { name: "Art", color: "#DB2777" },
];

const STATS = [
  { value: "6–10 hrs", label: "spent on prep each week — before this" },
  { value: "< 60 sec", label: "to generate a full, structured lesson plan" },
  { value: "Zero", label: "training or setup — start on your first visit" },
];

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    who: "New users",
    features: ["5 plans per month", "Watermarked exports"],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    who: "Individual teachers",
    features: ["Unlimited plans & quizzes", "All export formats", "Curriculum alignment"],
    highlighted: true,
  },
  {
    name: "School",
    price: "$199",
    period: "/mo",
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
      {children}
    </p>
  );
}

export default function MarketingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-1 sm:gap-2">
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
        <section className="relative overflow-hidden">
          <div className="graph-paper absolute inset-0" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-8 lg:px-8">
            <div className="fade-up">
              <Eyebrow>For K–12 teachers</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Your lesson plans,
                <br />
                written by the time
                <br />
                the kettle boils.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
                Enter a subject, grade, and topic. Get a full, curriculum-aligned plan — with a
                quiz, activities, and an assessment — ready to edit and hand out.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <LinkButton href="/signup" className="px-6 py-3 text-base">
                  Get started free
                </LinkButton>
                <LinkButton href="/login" variant="secondary" className="px-6 py-3 text-base">
                  Log in
                </LinkButton>
              </div>
              <p className="mt-4 text-sm text-gray-500">Free to start · No credit card required</p>
            </div>

            <div className="fade-up-delay lg:pl-6">
              <LessonSheetPreview />
            </div>
          </div>
        </section>

        {/* Time-truth stat band */}
        <section className="border-y border-gray-100 bg-[#F8F7F4]">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-4xl font-semibold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Three steps between a topic and a finished lesson.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="border-t-2 border-gray-900 pt-5">
                <p className="font-mono text-sm font-medium text-blue-600">{step.n}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-100 bg-[#F8F7F4]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <Eyebrow>What you get</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Everything for the lesson, none of the busywork.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.body}</p>
                </div>
              ))}
            </div>

            {/* Subject color-coding — works across every subject */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-sm font-medium text-gray-500">Works across every subject:</span>
              {SUBJECTS.map((subject) => (
                <span key={subject.name} className="flex items-center gap-2 text-sm text-gray-700">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  {subject.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Start free. Upgrade when you need more.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  tier.highlighted
                    ? "border-blue-600 bg-white shadow-lg shadow-blue-600/10 ring-1 ring-blue-600"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{tier.who}</p>
                <p className="mt-4">
                  <span className="font-display text-4xl font-semibold tracking-tight text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-sm text-gray-500">{tier.period}</span>
                </p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-blue-600">✓</span>
                      {feature}
                    </li>
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
        </section>

        {/* Final CTA */}
        <section className="bg-gray-900">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Get your evenings back.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-300">
              Join teachers who plan a week&apos;s worth of lessons in the time it used to take to
              plan one.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                Start free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/login" className="transition-colors hover:text-gray-900">
              Log in
            </Link>
            <Link href="/signup" className="transition-colors hover:text-gray-900">
              Sign up
            </Link>
            <span>© {new Date().getFullYear()} AI Lesson Planner</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
