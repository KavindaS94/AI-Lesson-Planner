import { NextRequest, NextResponse } from "next/server";
import { LessonPlanRequestSchema, LessonPlanSchema } from "@/lib/schemas/lessonPlan";
import { generateStructured, GenerationError } from "@/lib/generate";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsedRequest = LessonPlanRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "invalid_request", issues: parsedRequest.error.flatten() },
      { status: 400 },
    );
  }

  const { subject, gradeLevel, topic, durationMinutes } = parsedRequest.data;

  try {
    const plan = await generateStructured({
      schema: LessonPlanSchema,
      system:
        "You are an expert K-12 curriculum designer. Generate a complete, ready-to-teach lesson plan as structured JSON. Be specific and practical — a teacher should be able to use this plan with no further editing required.",
      prompt: `Create a lesson plan for:
Subject: ${subject}
Grade level: ${gradeLevel}
Topic: ${topic}
Duration: ${durationMinutes} minutes

Include learning objectives, a warm-up activity, main lesson activities (with time allocations that sum to roughly the total duration), discussion questions, an assessment (quiz or worksheet) with simple prompts, and a materials list.`,
    });

    return NextResponse.json({ data: plan });
  } catch (err) {
    if (err instanceof GenerationError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Unexpected error generating lesson plan:", err);
    return NextResponse.json(
      { error: "Generation failed — please try again." },
      { status: 502 },
    );
  }
}
