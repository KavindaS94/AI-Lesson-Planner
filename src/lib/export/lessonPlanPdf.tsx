import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import type { LessonPlan } from "@/lib/schemas/lessonPlan";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
  title: { fontSize: 20, marginBottom: 4 },
  meta: { fontSize: 10, color: "#555555", marginBottom: 16 },
  heading: { fontSize: 14, marginTop: 16, marginBottom: 6 },
  bullet: { marginBottom: 3 },
  bold: { fontWeight: 700 },
  paragraph: { marginBottom: 6 },
});

function LessonPlanDocument({ plan }: { plan: LessonPlan }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.meta}>
          {plan.subject} · {plan.gradeLevel} · {plan.durationMinutes} minutes
        </Text>

        <Text style={styles.heading}>Learning Objectives</Text>
        {plan.learningObjectives.map((item, i) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        <Text style={styles.heading}>Warm-Up</Text>
        <Text style={styles.bold}>
          {plan.warmUp.title} ({plan.warmUp.durationMinutes} min)
        </Text>
        <Text style={styles.paragraph}>{plan.warmUp.description}</Text>

        <Text style={styles.heading}>Main Activities</Text>
        {plan.mainActivities.map((activity, i) => (
          <View key={i} style={styles.paragraph}>
            <Text style={styles.bold}>
              {activity.title} ({activity.durationMinutes} min)
            </Text>
            <Text>{activity.description}</Text>
          </View>
        ))}

        <Text style={styles.heading}>Discussion Questions</Text>
        {plan.discussionQuestions.map((item, i) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        <Text style={styles.heading}>Assessment</Text>
        <Text style={styles.paragraph}>
          Type: {plan.assessment.type}
          {"\n"}
          {plan.assessment.instructions}
        </Text>
        {plan.assessment.items.map((item, i) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}

        <Text style={styles.heading}>Materials</Text>
        {plan.materials.map((item, i) => (
          <Text key={i} style={styles.bullet}>
            • {item}
          </Text>
        ))}
      </Page>
    </Document>
  );
}

export async function buildLessonPlanPdfBlob(plan: LessonPlan): Promise<Blob> {
  return pdf(<LessonPlanDocument plan={plan} />).toBlob();
}
