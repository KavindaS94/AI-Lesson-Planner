"use client";

import { FormEvent, useState } from "react";
import { TextField } from "@/app/_components/ui/TextField";
import { Select } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { QuizRequest, QuizRequestSchema } from "@/lib/schemas/quiz";

const QUESTION_TYPES: { value: QuizRequest["questionTypes"][number]; label: string }[] = [
  { value: "mcq", label: "Multiple choice" },
  { value: "short-answer", label: "Short answer" },
  { value: "fill-in-blank", label: "Fill in the blank" },
];

const DEFAULT_VALUES: QuizRequest = {
  topic: "",
  subject: "",
  gradeLevel: "",
  questionTypes: ["mcq"],
  questionCount: 5,
  difficulty: "medium",
};

export function QuizForm({
  onSubmit,
  disabled,
  initialValues,
}: {
  onSubmit: (values: QuizRequest) => void;
  disabled: boolean;
  initialValues?: QuizRequest;
}) {
  const [values, setValues] = useState<QuizRequest>(initialValues ?? DEFAULT_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleType = (type: QuizRequest["questionTypes"][number]) => {
    const has = values.questionTypes.includes(type);
    setValues({
      ...values,
      questionTypes: has
        ? values.questionTypes.filter((t) => t !== type)
        : [...values.questionTypes, type],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const candidate: QuizRequest = {
      ...values,
      subject: values.subject || undefined,
      gradeLevel: values.gradeLevel || undefined,
    };

    const result = QuizRequestSchema.safeParse(candidate);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        label="Topic"
        placeholder="e.g. The water cycle"
        value={values.topic}
        onChange={(e) => setValues({ ...values, topic: e.target.value })}
        error={errors.topic}
        disabled={disabled}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Subject (optional)"
          value={values.subject ?? ""}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
          disabled={disabled}
        />

        <TextField
          label="Grade level (optional)"
          value={values.gradeLevel ?? ""}
          onChange={(e) => setValues({ ...values, gradeLevel: e.target.value })}
          disabled={disabled}
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-gray-700">Question types</span>
        <div className="flex flex-wrap gap-2">
          {QUESTION_TYPES.map(({ value, label }) => {
            const selected = values.questionTypes.includes(value);
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                disabled={disabled}
                onClick={() => toggleType(value)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  selected
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {errors.questionTypes && (
          <span className="mt-1.5 block text-xs text-red-600">{errors.questionTypes}</span>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Number of questions"
          type="number"
          min={1}
          max={20}
          value={values.questionCount}
          onChange={(e) => setValues({ ...values, questionCount: Number(e.target.value) })}
          error={errors.questionCount}
          disabled={disabled}
        />

        <Select
          label="Difficulty"
          value={values.difficulty}
          onChange={(e) =>
            setValues({ ...values, difficulty: e.target.value as QuizRequest["difficulty"] })
          }
          disabled={disabled}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
          Generate quiz
        </Button>
      </div>
    </form>
  );
}
