/** Floating lesson-plan sheet preview — reused on marketing and auth hero panels. */
export function LessonSheetPreview() {
  return (
    <div className="fade-up-delay relative">
      <div className="pointer-events-none absolute -right-4 -top-4 z-10 rounded-full border border-gray-200 bg-white px-3 py-1 font-mono text-xs text-gray-500 shadow-sm">
        Generated in 7s
      </div>
      <div className="relative flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 sm:rotate-1">
        <div className="w-1.5 shrink-0 bg-emerald-500" />
        <div className="w-8 shrink-0 border-r border-gray-100 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_27px,rgba(17,24,39,0.06)_27px,rgba(17,24,39,0.06)_28px)]" />
        <div className="min-w-0 flex-1 p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-600">
            Science · Grade 5 · 45 min
          </p>
          <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-gray-900">
            Photosynthesis: How Plants Make Food
          </h3>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-gray-400">
            Learning objectives
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-emerald-500">✓</span> Explain how plants convert sunlight into
              energy
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-500">✓</span> Identify the role of chlorophyll and
              water
            </li>
          </ul>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-gray-400">
            Warm-up · 5 min
          </p>
          <p className="mt-1.5 text-sm text-gray-700">
            Ask: what would happen to a plant kept in a dark closet for a week?
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400">
              Export
            </span>
            <div className="flex gap-2">
              <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                PDF
              </span>
              <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                Word
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
