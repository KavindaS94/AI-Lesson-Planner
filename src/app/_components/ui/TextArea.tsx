"use client";

import { TextareaHTMLAttributes } from "react";

export function TextArea({
  label,
  error,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  const field = (
    <textarea
      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
        error ? "border-red-300" : "border-gray-300"
      } ${className}`}
      {...props}
    />
  );

  if (!label) return field;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {field}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
