import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { Quiz, QuizQuestion } from "@/lib/schemas/quiz";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 20, marginBottom: 4 },
  meta: { fontSize: 10, color: "#555555", marginBottom: 16 },
  question: { marginBottom: 10 },
  bold: { fontWeight: 700 },
  option: { marginLeft: 12, marginBottom: 2 },
  answer: { marginLeft: 12, color: "#555555" },
});

function QuestionBlock({ question, index }: { question: QuizQuestion; index: number }) {
  const number = `${index + 1}.`;

  switch (question.type) {
    case "mcq":
      return (
        <View style={styles.question}>
          <Text style={styles.bold}>
            {number} {question.question}
          </Text>
          {question.options.map((option, i) => (
            <Text key={i} style={styles.option}>
              {String.fromCharCode(65 + i)}) {option}
              {i === question.correctOptionIndex ? "  (correct)" : ""}
            </Text>
          ))}
        </View>
      );
    case "short-answer":
      return (
        <View style={styles.question}>
          <Text style={styles.bold}>
            {number} {question.question}
          </Text>
          <Text style={styles.answer}>Sample answer: {question.sampleAnswer}</Text>
        </View>
      );
    case "fill-in-blank":
      return (
        <View style={styles.question}>
          <Text style={styles.bold}>
            {number} {question.textWithBlank}
          </Text>
          <Text style={styles.answer}>Answer: {question.answer}</Text>
        </View>
      );
  }
}

function QuizDocument({ quiz }: { quiz: Quiz }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.meta}>Topic: {quiz.topic}</Text>
        {quiz.questions.map((question, i) => (
          <QuestionBlock key={i} question={question} index={i} />
        ))}
      </Page>
    </Document>
  );
}

export async function buildQuizPdfBlob(quiz: Quiz): Promise<Blob> {
  return pdf(<QuizDocument quiz={quiz} />).toBlob();
}
