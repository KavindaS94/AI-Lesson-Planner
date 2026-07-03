"use client";

import { FormEvent, useState } from "react";
import { TextField } from "@/app/_components/ui/TextField";
import { Select } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LessonPlanRequest, LessonPlanRequestSchema } from "@/lib/schemas/lessonPlan";

const GRADE_LEVELS = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Other",
];

const DEFAULT_VALUES: LessonPlanRequest = {
  subject: "",
  gradeLevel: GRADE_LEVELS[0],
  topic: "",
  durationMinutes: 45,
};

export function LessonPlanForm({
  onSubmit,
  disabled,
  initialValues,
}: {
  onSubmit: (values: LessonPlanRequest) => void;
  disabled: boolean;
  initialValues?: LessonPlanRequest;
}) {
  const [values, setValues] = useState<LessonPlanRequest>(initialValues ?? DEFAULT_VALUES);
  const [otherGradeLevel, setOtherGradeLevel] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const gradeLevel = values.gradeLevel === "Other" ? otherGradeLevel : values.gradeLevel;
    const candidate: LessonPlanRequest = { ...values, gradeLevel };

    const result = LessonPlanRequestSchema.safeParse(candidate);
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
        label="Subject"
        placeholder="e.g. Science"
        value={values.subject}
        onChange={(e) => setValues({ ...values, subject: e.target.value })}
        error={errors.subject}
        disabled={disabled}
      />

      <Select
        label="Grade level"
        value={values.gradeLevel}
        onChange={(e) => setValues({ ...values, gradeLevel: e.target.value })}
        disabled={disabled}
      >
        {GRADE_LEVELS.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </Select>

      {values.gradeLevel === "Other" && (
        <TextField
          label="Specify grade level / curriculum stage"
          placeholder="e.g. IB Year 4, UK Key Stage 2"
          value={otherGradeLevel}
          onChange={(e) => setOtherGradeLevel(e.target.value)}
          error={errors.gradeLevel}
          disabled={disabled}
        />
      )}

      <TextField
        label="Topic"
        placeholder="e.g. Photosynthesis"
        value={values.topic}
        onChange={(e) => setValues({ ...values, topic: e.target.value })}
        error={errors.topic}
        disabled={disabled}
      />

      <TextField
        label="Duration (minutes)"
        type="number"
        min={5}
        max={240}
        value={values.durationMinutes}
        onChange={(e) => setValues({ ...values, durationMinutes: Number(e.target.value) })}
        error={errors.durationMinutes}
        disabled={disabled}
      />

      <Button type="submit" disabled={disabled}>
        Generate lesson plan
      </Button>
    </form>
  );
}
