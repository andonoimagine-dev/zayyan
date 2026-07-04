import { notFound } from "next/navigation";
import { getQuestionSet } from "@/lib/questions";
import { getTopics } from "@/lib/topics";
import QuizRunner from "./QuizRunner";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ topicOrMixed: string }> }) {
  const { topicOrMixed } = await params;
  const isMixed = topicOrMixed === "campuran";

  let topicName = "Latihan Campuran";
  let topicFilter: string | null = null;

  if (!isMixed) {
    const topics = await getTopics();
    const topic = topics.find((t) => t.id === topicOrMixed);
    if (!topic) notFound();
    topicName = topic.name;
    topicFilter = topic.id;
  }

  const questions = await getQuestionSet(topicFilter);
  if (questions.length === 0) notFound();

  return <QuizRunner topicName={topicName} topicFilter={topicFilter} questions={questions} />;
}
