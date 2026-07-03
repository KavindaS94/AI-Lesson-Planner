"use client";

import { SelectHTMLAttributes } from "react";

export function Select({
  label,
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <select
        className={`w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
