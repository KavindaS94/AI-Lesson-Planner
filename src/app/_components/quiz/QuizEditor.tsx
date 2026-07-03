"use client";

import { TextField } from "@/app/_components/ui/TextField";
import { Button } from "@/app/_components/ui/Button";
import { AddButton } from "@/app/_components/ui/AddButton";
import type { Quiz, QuizQuestion } from "@/lib/schemas/quiz";
import { McqQuestionEditor } from "./McqQuestionEditor";
import { ShortAnswerQuestionEditor } from "./ShortAnswerQuestionEditor";
import { FillInBlankQuestionEditor } from "./FillInBlankQuestionEditor";

const BLANK_QUESTION: Record<QuizQuestion["type"], QuizQuestion> = {
  mcq: { type: "mcq", question: "", options: ["", "", "", ""], correctOptionIndex: 0 },
  "short-answer": { type: "short-answer", question: "", sampleAnswer: "" },
  "fill-in-blank": { type: "fill-in-blank", textWithBlank: "", answer: "" },
};

const TYPE_LABELS: Record<QuizQuestion["type"], string> = {
  mcq: "Multiple choice",
  "short-answer": "Short answer",
  "fill-in-blank": "Fill in the blank",
};

function QuestionEditor({
  question,
  onChange,
}: {
  question: QuizQuestion;
  onChange: (question: QuizQuestion) => void;
}) {
  switch (question.type) {
    case "mcq":
      return <McqQuestionEditor question={question} onChange={onChange} />;
    case "short-answer":
      return <ShortAnswerQuestionEditor question={question} onChange={onChange} />;
    case "fill-in-blank":
      return <FillInBlankQuestionEditor question={question} onChange={onChange} />;
  }
}

export function QuizEditor({
  quiz,
  onChange,
}: {
  quiz: Quiz;
  onChange: (quiz: Quiz) => void;
}) {
  const questionTypesInUse = Array.from(new Set(quiz.questions.map((q) => q.type)));
  const addType = questionTypesInUse[0] ?? "mcq";

  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={quiz.title}
        onChange={(e) => onChange({ ...quiz, title: e.target.value })}
      />

      <div className="space-y-3">
        {quiz.questions.map((question, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {TYPE_LABELS[question.type]}
                </span>
              </div>
              <Button
                type="button"
                variant="danger"
                iconOnly
                aria-label="Remove question"
                onClick={() =>
                  onChange({
                    ...quiz,
                    questions: quiz.questions.filter((_, idx) => idx !== i),
                  })
                }
              >
                ✕
              </Button>
            </div>
            <QuestionEditor
              question={question}
              onChange={(next) => {
                const nextQuestions = [...quiz.questions];
                nextQuestions[i] = next;
                onChange({ ...quiz, questions: nextQuestions });
              }}
            />
          </div>
        ))}
      </div>

      <AddButton
        label="+ Add question"
        onClick={() => onChange({ ...quiz, questions: [...quiz.questions, BLANK_QUESTION[addType]] })}
      />
    </div>
  );
}
