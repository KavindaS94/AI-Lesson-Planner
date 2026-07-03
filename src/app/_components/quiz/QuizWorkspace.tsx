"use client";

import { useReducer } from "react";
import { Spinner } from "@/app/_components/ui/Spinner";
import { ErrorBanner } from "@/app/_components/ui/ErrorBanner";
import { ExportBar } from "@/app/_components/export/ExportBar";
import { downloadBlob } from "@/lib/export/download";
import { Quiz, QuizRequest } from "@/lib/schemas/quiz";
import { QuizForm } from "./QuizForm";
import { QuizEditor } from "./QuizEditor";

type State =
  | { status: "idle"; lastRequest?: QuizRequest }
  | { status: "loading"; lastRequest: QuizRequest }
  | { status: "success"; lastRequest: QuizRequest; quiz: Quiz }
  | { status: "error"; lastRequest: QuizRequest; message: string };

type Action =
  | { type: "submit"; request: QuizRequest }
  | { type: "success"; quiz: Quiz }
  | { type: "error"; message: string }
  | { type: "edit"; quiz: Quiz };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "submit":
      return { status: "loading", lastRequest: action.request };
    case "success":
      if (state.status !== "loading") return state;
      return { status: "success", lastRequest: state.lastRequest, quiz: action.quiz };
    case "error":
      if (state.status !== "loading") return state;
      return { status: "error", lastRequest: state.lastRequest, message: action.message };
    case "edit":
      if (state.status !== "success") return state;
      return { ...state, quiz: action.quiz };
  }
}

export function QuizWorkspace({ initialTopic }: { initialTopic?: string }) {
  const [state, dispatch] = useReducer(reducer, { status: "idle" });

  const generate = async (request: QuizRequest) => {
    dispatch({ type: "submit", request });
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const body = await res.json();
      if (!res.ok) {
        dispatch({ type: "error", message: body.error ?? "Generation failed — please try again." });
        return;
      }
      dispatch({ type: "success", quiz: body.data as Quiz });
    } catch {
      dispatch({ type: "error", message: "Network error — please check your connection and try again." });
    }
  };

  const isLoading = state.status === "loading";
  const quiz = state.status === "success" ? state.quiz : null;

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Quiz & Worksheet Builder</h1>
        <p className="mt-1 text-sm text-gray-600">
          Choose question types and a topic to generate a quiz or worksheet.
        </p>
      </div>

      <QuizForm
        onSubmit={generate}
        disabled={isLoading}
        initialValues={
          state.status !== "idle"
            ? state.lastRequest
            : initialTopic
              ? {
                  topic: initialTopic,
                  questionTypes: ["mcq"],
                  questionCount: 5,
                  difficulty: "medium",
                }
              : undefined
        }
      />

      {isLoading && <Spinner label="Generating quiz…" />}

      {state.status === "error" && (
        <ErrorBanner message={state.message} onRetry={() => generate(state.lastRequest)} />
      )}

      {quiz && (
        <div className="space-y-6 border-t border-gray-200 pt-6">
          <ExportBar
            disabled={false}
            onExportPdf={async () => {
              const { buildQuizPdfBlob } = await import("@/lib/export/quizPdf");
              downloadBlob(await buildQuizPdfBlob(quiz), `${quiz.title || "quiz"}.pdf`);
            }}
            onExportDocx={async () => {
              const { buildQuizDocxBlob } = await import("@/lib/export/quizDocx");
              downloadBlob(await buildQuizDocxBlob(quiz), `${quiz.title || "quiz"}.docx`);
            }}
          />
          <QuizEditor quiz={quiz} onChange={(next) => dispatch({ type: "edit", quiz: next })} />
        </div>
      )}
    </div>
  );
}
