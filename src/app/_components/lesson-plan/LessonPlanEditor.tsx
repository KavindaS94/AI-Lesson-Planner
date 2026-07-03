"use client";

import { TextField } from "@/app/_components/ui/TextField";
import { TextArea } from "@/app/_components/ui/TextArea";
import { Button } from "@/app/_components/ui/Button";
import type { LessonPlan } from "@/lib/schemas/lessonPlan";

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <TextArea
              value={item}
              rows={2}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1"
            />
            <Button
              type="button"
              variant="danger"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-2"
        onClick={() => onChange([...items, ""])}
      >
        + Add
      </Button>
    </div>
  );
}

export function LessonPlanEditor({
  plan,
  onChange,
}: {
  plan: LessonPlan;
  onChange: (plan: LessonPlan) => void;
}) {
  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={plan.title}
        onChange={(e) => onChange({ ...plan, title: e.target.value })}
      />

      <StringListEditor
        label="Learning Objectives"
        items={plan.learningObjectives}
        onChange={(learningObjectives) => onChange({ ...plan, learningObjectives })}
      />

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Warm-Up</h3>
        <div className="space-y-2 rounded-md border border-gray-200 p-3">
          <TextField
            label="Title"
            value={plan.warmUp.title}
            onChange={(e) =>
              onChange({ ...plan, warmUp: { ...plan.warmUp, title: e.target.value } })
            }
          />
          <TextField
            label="Duration (minutes)"
            type="number"
            value={plan.warmUp.durationMinutes}
            onChange={(e) =>
              onChange({
                ...plan,
                warmUp: { ...plan.warmUp, durationMinutes: Number(e.target.value) },
              })
            }
          />
          <TextArea
            label="Description"
            rows={3}
            value={plan.warmUp.description}
            onChange={(e) =>
              onChange({ ...plan, warmUp: { ...plan.warmUp, description: e.target.value } })
            }
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Main Activities</h3>
        <div className="space-y-3">
          {plan.mainActivities.map((activity, i) => (
            <div key={i} className="space-y-2 rounded-md border border-gray-200 p-3">
              <div className="flex items-start gap-2">
                <TextField
                  label="Title"
                  value={activity.title}
                  onChange={(e) => {
                    const next = [...plan.mainActivities];
                    next[i] = { ...activity, title: e.target.value };
                    onChange({ ...plan, mainActivities: next });
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="danger"
                  className="mt-6"
                  onClick={() =>
                    onChange({
                      ...plan,
                      mainActivities: plan.mainActivities.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  ✕
                </Button>
              </div>
              <TextField
                label="Duration (minutes)"
                type="number"
                value={activity.durationMinutes}
                onChange={(e) => {
                  const next = [...plan.mainActivities];
                  next[i] = { ...activity, durationMinutes: Number(e.target.value) };
                  onChange({ ...plan, mainActivities: next });
                }}
              />
              <TextArea
                label="Description"
                rows={2}
                value={activity.description}
                onChange={(e) => {
                  const next = [...plan.mainActivities];
                  next[i] = { ...activity, description: e.target.value };
                  onChange({ ...plan, mainActivities: next });
                }}
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mt-2"
          onClick={() =>
            onChange({
              ...plan,
              mainActivities: [
                ...plan.mainActivities,
                { title: "", description: "", durationMinutes: 10 },
              ],
            })
          }
        >
          + Add activity
        </Button>
      </div>

      <StringListEditor
        label="Discussion Questions"
        items={plan.discussionQuestions}
        onChange={(discussionQuestions) => onChange({ ...plan, discussionQuestions })}
      />

      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900">Assessment</h3>
        <div className="space-y-2 rounded-md border border-gray-200 p-3">
          <TextArea
            label="Instructions"
            rows={2}
            value={plan.assessment.instructions}
            onChange={(e) =>
              onChange({
                ...plan,
                assessment: { ...plan.assessment, instructions: e.target.value },
              })
            }
          />
          <StringListEditor
            label="Items"
            items={plan.assessment.items}
            onChange={(items) => onChange({ ...plan, assessment: { ...plan.assessment, items } })}
          />
        </div>
      </div>

      <StringListEditor
        label="Materials"
        items={plan.materials}
        onChange={(materials) => onChange({ ...plan, materials })}
      />
    </div>
  );
}
