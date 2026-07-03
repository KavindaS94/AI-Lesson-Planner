export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </span>
  );
}
