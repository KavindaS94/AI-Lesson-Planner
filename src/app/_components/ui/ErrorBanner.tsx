"use client";

import { Button } from "./Button";

export function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <span>{message}</span>
      {onRetry && (
        <Button variant="danger" onClick={onRetry} className="shrink-0">
          Try again
        </Button>
      )}
    </div>
  );
}
