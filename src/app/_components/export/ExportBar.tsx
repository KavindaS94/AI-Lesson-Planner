"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";

export function ExportBar({
  disabled,
  onExportPdf,
  onExportDocx,
}: {
  disabled: boolean;
  onExportPdf: () => Promise<void>;
  onExportDocx: () => Promise<void>;
}) {
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);

  const runExport = async (kind: "pdf" | "docx", action: () => Promise<void>) => {
    setExporting(kind);
    try {
      await action();
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        disabled={disabled || exporting !== null}
        onClick={() => runExport("pdf", onExportPdf)}
      >
        {exporting === "pdf" ? "Preparing…" : "↓ PDF"}
      </Button>
      <Button
        variant="secondary"
        disabled={disabled || exporting !== null}
        onClick={() => runExport("docx", onExportDocx)}
      >
        {exporting === "docx" ? "Preparing…" : "↓ Word (.docx)"}
      </Button>
    </div>
  );
}
