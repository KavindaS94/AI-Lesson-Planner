"use client";

import { InputHTMLAttributes } from "react";

export function TextField({
  label,
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  const field = (
    <input
      className={`w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none ${
        error ? "border-red-400" : "border-gray-300"
      } ${className}`}
      {...props}
    />
  );

  if (!label) return field;

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {field}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
