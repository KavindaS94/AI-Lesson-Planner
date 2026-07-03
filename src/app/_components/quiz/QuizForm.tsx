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
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Topic"
        placeholder="e.g. The water cycle"
        value={values.topic}
        onChange={(e) => setValues({ ...values, topic: e.target.value })}
        error={errors.topic}
        disabled={disabled}
      />

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

      <div>
        <span className="mb-1 block text-sm font-medium text-gray-700">Question types</span>
        <div className="flex flex-wrap gap-3">
          {QUESTION_TYPES.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={values.questionTypes.includes(value)}
                onChange={() => toggleType(value)}
                disabled={disabled}
              />
              {label}
            </label>
          ))}
        </div>
        {errors.questionTypes && (
          <span className="mt-1 block text-xs text-red-600">{errors.questionTypes}</span>
        )}
      </div>

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

      <Button type="submit" disabled={disabled}>
        Generate quiz
      </Button>
    </form>
  );
}
