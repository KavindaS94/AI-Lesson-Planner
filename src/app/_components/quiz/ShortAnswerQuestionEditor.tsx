"use client";

import { TextArea } from "@/app/_components/ui/TextArea";
import type { QuizQuestion } from "@/lib/schemas/quiz";

type ShortAnswerQuestion = Extract<QuizQuestion, { type: "short-answer" }>;

export function ShortAnswerQuestionEditor({
  question,
  onChange,
}: {
  question: ShortAnswerQuestion;
  onChange: (question: ShortAnswerQuestion) => void;
}) {
  return (
    <div className="space-y-3">
      <TextArea
        label="Question"
        rows={2}
        value={question.question}
        onChange={(e) => onChange({ ...question, question: e.target.value })}
      />
      <TextArea
        label="Sample answer"
        rows={2}
        value={question.sampleAnswer}
        onChange={(e) => onChange({ ...question, sampleAnswer: e.target.value })}
      />
    </div>
  );
}
