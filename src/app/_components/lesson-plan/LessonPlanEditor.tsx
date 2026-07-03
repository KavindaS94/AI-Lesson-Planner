"use client";

import { TextField } from "@/app/_components/ui/TextField";
import { TextArea } from "@/app/_components/ui/TextArea";
import { Button } from "@/app/_components/ui/Button";
import { AddButton } from "@/app/_components/ui/AddButton";
import { SectionLabel } from "@/app/_components/ui/SectionLabel";
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
      <SectionLabel>{label}</SectionLabel>
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
              iconOnly
              aria-label="Remove"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
      <AddButton label="+ Add" onClick={() => onChange([...items, ""])} />
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
    <div className="space-y-8">
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
        <SectionLabel>Warm-Up</SectionLabel>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
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
        <SectionLabel>Main Activities</SectionLabel>
        <div className="space-y-3">
          {plan.mainActivities.map((activity, i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4"
            >
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
                  iconOnly
                  aria-label="Remove activity"
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
        <AddButton
          label="+ Add activity"
          onClick={() =>
            onChange({
              ...plan,
              mainActivities: [
                ...plan.mainActivities,
                { title: "", description: "", durationMinutes: 10 },
              ],
            })
          }
        />
      </div>

      <StringListEditor
        label="Discussion Questions"
        items={plan.discussionQuestions}
        onChange={(discussionQuestions) => onChange({ ...plan, discussionQuestions })}
      />

      <div>
        <SectionLabel>Assessment</SectionLabel>
        <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
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
