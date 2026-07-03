"use client";

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600"
    >
      {label}
    </button>
  );
}
