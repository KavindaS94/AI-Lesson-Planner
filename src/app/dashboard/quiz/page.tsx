import { QuizWorkspace } from "@/app/_components/quiz/QuizWorkspace";

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return <QuizWorkspace initialTopic={topic} />;
}
