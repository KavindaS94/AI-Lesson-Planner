"use client";

import { TextArea } from "@/app/_components/ui/TextArea";
import { TextField } from "@/app/_components/ui/TextField";
import type { QuizQuestion } from "@/lib/schemas/quiz";

type McqQuestion = Extract<QuizQuestion, { type: "mcq" }>;

export function McqQuestionEditor({
  question,
  onChange,
}: {
  question: McqQuestion;
  onChange: (question: McqQuestion) => void;
}) {
  return (
    <div className="space-y-3">
      <TextArea
        label="Question"
        rows={2}
        value={question.question}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
      />
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        Options (select the correct answer)
      </span>
      <div className="space-y-2">
        {question.options.map((option, i) => {
          const isCorrect = question.correctOptionIndex === i;
          return (
            <div
              key={i}
              className={`flex items-center gap-2.5 rounded-lg border p-2 transition-colors ${
                isCorrect ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name={`correct-${i}-of-${question.options.length}`}
                checked={isCorrect}
                onChange={() => onChange({ ...question, correctOptionIndex: i })}
                className="h-4 w-4 shrink-0 accent-green-600"
              />
              <TextField
                value={option}
                onChange={(e) => {
                  const next = [...question.options];
                  next[i] = e.target.value;
                  onChange({ ...question, options: next });
                }}
                className="flex-1 border-0 bg-transparent px-0 py-0.5 shadow-none focus:ring-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
