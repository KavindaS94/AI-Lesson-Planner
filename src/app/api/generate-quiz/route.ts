import { NextRequest, NextResponse } from "next/server";
import { QuizRequestSchema, QuizSchema } from "@/lib/schemas/quiz";
import { generateStructured, GenerationError } from "@/lib/generate";
import { requireSession } from "@/lib/require-session";

export async function POST(req: NextRequest) {
  const { session, response } = await requireSession(req.headers);
  if (!session) return response;

  const body = await req.json().catch(() => null);
  const parsedRequest = QuizRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "invalid_request", issues: parsedRequest.error.flatten() },
      { status: 400 },
    );
  }

  const { topic, subject, gradeLevel, questionTypes, questionCount, difficulty } =
    parsedRequest.data;

  try {
    const quiz = await generateStructured({
      schema: QuizSchema,
      system:
        "You are an expert K-12 assessment writer. Generate a quiz or worksheet as structured JSON, mixing only the requested question types. Every question must have a clear, unambiguous correct answer.",
      prompt: `Create a quiz for:
Topic: ${topic}
${subject ? `Subject: ${subject}\n` : ""}${gradeLevel ? `Grade level: ${gradeLevel}\n` : ""}Question types to use: ${questionTypes.join(", ")}
Number of questions: ${questionCount}
${difficulty ? `Difficulty: ${difficulty}\n` : ""}
Distribute the ${questionCount} questions across only the requested question types. For MCQ questions, provide exactly 4 options with exactly one correct answer.`,
    });

    return NextResponse.json({ data: quiz });
  } catch (err) {
    if (err instanceof GenerationError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Unexpected error generating quiz:", err);
    return NextResponse.json(
      { error: "Generation failed — please try again." },
      { status: 502 },
    );
  }
}
