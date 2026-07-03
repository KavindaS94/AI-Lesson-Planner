import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { Quiz, QuizQuestion } from "@/lib/schemas/quiz";

function questionParagraphs(question: QuizQuestion, index: number): Paragraph[] {
  const number = `${index + 1}.`;

  switch (question.type) {
    case "mcq":
      return [
        new Paragraph({
          children: [new TextRun({ text: `${number} ${question.question}`, bold: true })],
        }),
        ...question.options.map(
          (option, i) =>
            new Paragraph({
              text: `${String.fromCharCode(65 + i)}) ${option}${
                i === question.correctOptionIndex ? "  (correct)" : ""
              }`,
              indent: { left: 360 },
            }),
        ),
      ];
    case "short-answer":
      return [
        new Paragraph({
          children: [new TextRun({ text: `${number} ${question.question}`, bold: true })],
        }),
        new Paragraph({ text: `Sample answer: ${question.sampleAnswer}`, indent: { left: 360 } }),
      ];
    case "fill-in-blank":
      return [
        new Paragraph({
          children: [new TextRun({ text: `${number} ${question.textWithBlank}`, bold: true })],
        }),
        new Paragraph({ text: `Answer: ${question.answer}`, indent: { left: 360 } }),
      ];
  }
}

export async function buildQuizDocxBlob(quiz: Quiz): Promise<Blob> {
  const children: Paragraph[] = [
    new Paragraph({ text: quiz.title, heading: HeadingLevel.TITLE }),
    new Paragraph({ children: [new TextRun(`Topic: ${quiz.topic}`)] }),
    ...quiz.questions.flatMap((question, index) => questionParagraphs(question, index)),
  ];

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}
