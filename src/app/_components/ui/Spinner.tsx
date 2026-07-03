export function Spinner({ label = "Generating…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-8 text-sm text-gray-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
      {label}
    </div>
  );
}
