import { notFound } from "next/navigation";
import { getQuestionSet } from "@/lib/questions";
import { getSubjects } from "@/lib/subjects";
import { getTopics } from "@/lib/topics";
import QuizRunner from "./QuizRunner";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ subject: string; topicOrMixed: string }>;
}) {
  const { subject: subjectId, topicOrMixed } = await params;

  const subjects = await getSubjects();
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const isMixed = topicOrMixed === "campuran";

  let topicName = `Latihan Campuran - ${subject.name}`;
  let topicFilter: string | null = null;

  if (!isMixed) {
    const topics = await getTopics(subjectId);
    const topic = topics.find((t) => t.id === topicOrMixed);
    if (!topic) notFound();
    topicName = topic.name;
    topicFilter = topic.id;
  }

  const questions = await getQuestionSet(subjectId, topicFilter);
  if (questions.length === 0) notFound();

  return <QuizRunner subjectId={subjectId} topicName={topicName} topicFilter={topicFilter} questions={questions} />;
}
