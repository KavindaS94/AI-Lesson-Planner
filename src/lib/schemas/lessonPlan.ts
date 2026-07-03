import { z } from "zod";

export const LessonPlanRequestSchema = z.object({
  subject: z.string().min(1).max(100),
  gradeLevel: z.string().min(1).max(50),
  topic: z.string().min(1).max(200),
  durationMinutes: z.number().int().min(5).max(240),
});
export type LessonPlanRequest = z.infer<typeof LessonPlanRequestSchema>;

export const LessonPlanSchema = z.object({
  title: z.string(),
  subject: z.string(),
  gradeLevel: z.string(),
  durationMinutes: z.number(),
  learningObjectives: z.array(z.string()).min(1),
  warmUp: z.object({
    title: z.string(),
    description: z.string(),
    durationMinutes: z.number(),
  }),
  mainActivities: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        durationMinutes: z.number(),
      }),
    )
    .min(1),
  discussionQuestions: z.array(z.string()).min(1),
  assessment: z.object({
    type: z.enum(["quiz", "worksheet"]),
    instructions: z.string(),
    items: z.array(z.string()).min(1),
  }),
  materials: z.array(z.string()).min(1),
});
export type LessonPlan = z.infer<typeof LessonPlanSchema>;
