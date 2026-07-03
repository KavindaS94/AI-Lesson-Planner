"use client";

import { useReducer } from "react";
import Link from "next/link";
import { Spinner } from "@/app/_components/ui/Spinner";
import { ErrorBanner } from "@/app/_components/ui/ErrorBanner";
import { ExportBar } from "@/app/_components/export/ExportBar";
import { downloadBlob } from "@/lib/export/download";
import { LessonPlan, LessonPlanRequest } from "@/lib/schemas/lessonPlan";
import { LessonPlanForm } from "./LessonPlanForm";
import { LessonPlanEditor } from "./LessonPlanEditor";

type State =
  | { status: "idle"; lastRequest?: LessonPlanRequest }
  | { status: "loading"; lastRequest: LessonPlanRequest }
  | { status: "success"; lastRequest: LessonPlanRequest; plan: LessonPlan }
  | { status: "error"; lastRequest: LessonPlanRequest; message: string };

type Action =
  | { type: "submit"; request: LessonPlanRequest }
  | { type: "success"; plan: LessonPlan }
  | { type: "error"; message: string }
  | { type: "edit"; plan: LessonPlan };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "submit":
      return { status: "loading", lastRequest: action.request };
    case "success":
      if (state.status !== "loading") return state;
      return { status: "success", lastRequest: state.lastRequest, plan: action.plan };
    case "error":
      if (state.status !== "loading") return state;
      return { status: "error", lastRequest: state.lastRequest, message: action.message };
    case "edit":
      if (state.status !== "success") return state;
      return { ...state, plan: action.plan };
  }
}

export function LessonPlanWorkspace() {
  const [state, dispatch] = useReducer(reducer, { status: "idle" });

  const generate = async (request: LessonPlanRequest) => {
    dispatch({ type: "submit", request });
    try {
      const res = await fetch("/api/generate-lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const body = await res.json();
      if (!res.ok) {
        dispatch({ type: "error", message: body.error ?? "Generation failed — please try again." });
        return;
      }
      dispatch({ type: "success", plan: body.data as LessonPlan });
    } catch {
      dispatch({ type: "error", message: "Network error — please check your connection and try again." });
    }
  };

  const isLoading = state.status === "loading";
  const plan = state.status === "success" ? state.plan : null;
  const topic = state.status === "success" ? state.lastRequest.topic : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">AI-Powered</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          Lesson Plan Generator
        </h1>
        <p className="mt-2 text-base text-gray-600">
          Enter a subject, grade level, topic, and duration to generate a full lesson plan.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <LessonPlanForm
          onSubmit={generate}
          disabled={isLoading}
          initialValues={state.status !== "idle" ? state.lastRequest : undefined}
        />

        {isLoading && <Spinner label="Generating lesson plan…" />}

        {state.status === "error" && (
          <div className="mt-6">
            <ErrorBanner message={state.message} onRetry={() => generate(state.lastRequest)} />
          </div>
        )}
      </div>

      {plan && topic && (
        <div className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href={`/quiz?topic=${encodeURIComponent(topic)}`}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Build a matching quiz →
            </Link>
            <ExportBar
              disabled={false}
              onExportPdf={async () => {
                const { buildLessonPlanPdfBlob } = await import("@/lib/export/lessonPlanPdf");
                downloadBlob(await buildLessonPlanPdfBlob(plan), `${plan.title || "lesson-plan"}.pdf`);
              }}
              onExportDocx={async () => {
                const { buildLessonPlanDocxBlob } = await import("@/lib/export/lessonPlanDocx");
                downloadBlob(await buildLessonPlanDocxBlob(plan), `${plan.title || "lesson-plan"}.docx`);
              }}
            />
          </div>
          <LessonPlanEditor plan={plan} onChange={(next) => dispatch({ type: "edit", plan: next })} />
        </div>
      )}
    </div>
  );
}
