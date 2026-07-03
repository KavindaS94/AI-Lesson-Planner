"use client";

import { TextArea } from "@/app/_components/ui/TextArea";
import { TextField } from "@/app/_components/ui/TextField";
import type { QuizQuestion } from "@/lib/schemas/quiz";

type FillInBlankQuestion = Extract<QuizQuestion, { type: "fill-in-blank" }>;

export function FillInBlankQuestionEditor({
  question,
  onChange,
}: {
  question: FillInBlankQuestion;
  onChange: (question: FillInBlankQuestion) => void;
}) {
  return (
    <div className="space-y-3">
      <TextArea
        label="Text with blank"
        rows={2}
        value={question.textWithBlank}
        onChange={(e) => onChange({ ...question, textWithBlank: e.target.value })}
      />
      <TextField
        label="Answer"
        value={question.answer}
        onChange={(e) => onChange({ ...question, answer: e.target.value })}
      />
    </div>
  );
}
