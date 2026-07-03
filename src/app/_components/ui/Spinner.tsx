export function Spinner({ label = "Generating…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm text-gray-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
      {label}
    </div>
  );
}
