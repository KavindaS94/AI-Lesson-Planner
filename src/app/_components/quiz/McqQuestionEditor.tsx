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
    <div className="space-y-2">
      <TextArea
        label="Question"
        rows={2}
        value={question.question}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
      />
      <span className="mb-1 block text-sm font-medium text-gray-700">Options</span>
      <div className="space-y-2">
        {question.options.map((option, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.question}-${i}`}
              checked={question.correctOptionIndex === i}
              onChange={() => onChange({ ...question, correctOptionIndex: i })}
            />
            <TextField
              value={option}
              onChange={(e) => {
                const next = [...question.options];
                next[i] = e.target.value;
                onChange({ ...question, options: next });
              }}
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
