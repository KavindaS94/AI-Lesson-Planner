import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { LessonPlan } from "@/lib/schemas/lessonPlan";

export async function buildLessonPlanDocxBlob(plan: LessonPlan): Promise<Blob> {
  const children: Paragraph[] = [
    new Paragraph({ text: plan.title, heading: HeadingLevel.TITLE }),
    new Paragraph({
      children: [
        new TextRun(`${plan.subject} · ${plan.gradeLevel} · ${plan.durationMinutes} minutes`),
      ],
    }),

    new Paragraph({ text: "Learning Objectives", heading: HeadingLevel.HEADING_2 }),
    ...plan.learningObjectives.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),

    new Paragraph({ text: "Warm-Up", heading: HeadingLevel.HEADING_2 }),
    new Paragraph({
      children: [
        new TextRun({ text: `${plan.warmUp.title} (${plan.warmUp.durationMinutes} min)`, bold: true }),
      ],
    }),
    new Paragraph({ text: plan.warmUp.description }),

    new Paragraph({ text: "Main Activities", heading: HeadingLevel.HEADING_2 }),
    ...plan.mainActivities.flatMap((activity) => [
      new Paragraph({
        children: [
          new TextRun({ text: `${activity.title} (${activity.durationMinutes} min)`, bold: true }),
        ],
      }),
      new Paragraph({ text: activity.description }),
    ]),

    new Paragraph({ text: "Discussion Questions", heading: HeadingLevel.HEADING_2 }),
    ...plan.discussionQuestions.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),

    new Paragraph({ text: "Assessment", heading: HeadingLevel.HEADING_2 }),
    new Paragraph({ text: `Type: ${plan.assessment.type}` }),
    new Paragraph({ text: plan.assessment.instructions }),
    ...plan.assessment.items.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),

    new Paragraph({ text: "Materials", heading: HeadingLevel.HEADING_2 }),
    ...plan.materials.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),
  ];

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}
