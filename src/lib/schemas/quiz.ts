import { z } from "zod";

export const QuizRequestSchema = z.object({
  topic: z.string().min(1).max(200),
  subject: z.string().max(100).optional(),
  gradeLevel: z.string().max(50).optional(),
  questionTypes: z
    .array(z.enum(["mcq", "short-answer", "fill-in-blank"]))
    .min(1),
  questionCount: z.number().int().min(1).max(20),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
});
export type QuizRequest = z.infer<typeof QuizRequestSchema>;

const McqQuestionSchema = z.object({
  type: z.literal("mcq"),
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctOptionIndex: z.number().int().min(0).max(3),
});

const ShortAnswerQuestionSchema = z.object({
  type: z.literal("short-answer"),
  question: z.string(),
  sampleAnswer: z.string(),
});

const FillInBlankQuestionSchema = z.object({
  type: z.literal("fill-in-blank"),
  textWithBlank: z.string(),
  answer: z.string(),
});

export const QuizQuestionSchema = z.discriminatedUnion("type", [
  McqQuestionSchema,
  ShortAnswerQuestionSchema,
  FillInBlankQuestionSchema,
]);
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const QuizSchema = z.object({
  title: z.string(),
  topic: z.string(),
  questions: z.array(QuizQuestionSchema).min(1),
});
export type Quiz = z.infer<typeof QuizSchema>;
