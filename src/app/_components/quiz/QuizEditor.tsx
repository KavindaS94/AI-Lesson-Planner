"use client";

import { TextField } from "@/app/_components/ui/TextField";
import { Button } from "@/app/_components/ui/Button";
import type { Quiz, QuizQuestion } from "@/lib/schemas/quiz";
import { McqQuestionEditor } from "./McqQuestionEditor";
import { ShortAnswerQuestionEditor } from "./ShortAnswerQuestionEditor";
import { FillInBlankQuestionEditor } from "./FillInBlankQuestionEditor";

const BLANK_QUESTION: Record<QuizQuestion["type"], QuizQuestion> = {
  mcq: { type: "mcq", question: "", options: ["", "", "", ""], correctOptionIndex: 0 },
  "short-answer": { type: "short-answer", question: "", sampleAnswer: "" },
  "fill-in-blank": { type: "fill-in-blank", textWithBlank: "", answer: "" },
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
          <div key={i} className="space-y-2 rounded-md border border-gray-200 p-3">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium uppercase text-gray-500">
                Question {i + 1} · {question.type}
              </span>
              <Button
                type="button"
                variant="danger"
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

      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          onChange({ ...quiz, questions: [...quiz.questions, BLANK_QUESTION[addType]] })
        }
      >
        + Add question
      </Button>
    </div>
  );
}
