import { db } from "@/db/client";
import { quizAttempts, attemptAnswers, questions, topics } from "@/db/schema";
import { eq } from "drizzle-orm";

export type AttemptSummary = {
  id: string;
  startedAt: number;
  finishedAt: number | null;
  durationMs: number | null;
  topicFilter: string | null;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
};

export type TopicAccuracy = {
  topicId: string;
  topicName: string;
  totalAnswered: number;
  correctAnswered: number;
  accuracyPercent: number;
};

export async function getAttempts(): Promise<AttemptSummary[]> {
  const rows = await db.select().from(quizAttempts).orderBy(quizAttempts.startedAt);
  return rows.filter((r) => r.finishedAt !== null);
}

export async function getTopicAccuracy(): Promise<TopicAccuracy[]> {
  const rows = await db
    .select({
      topicId: topics.id,
      topicName: topics.name,
      isCorrect: attemptAnswers.isCorrect,
    })
    .from(attemptAnswers)
    .innerJoin(questions, eq(attemptAnswers.questionId, questions.id))
    .innerJoin(topics, eq(questions.topicId, topics.id));

  const byTopic = new Map<string, { topicName: string; total: number; correct: number }>();
  for (const row of rows) {
    const entry = byTopic.get(row.topicId) ?? { topicName: row.topicName, total: 0, correct: 0 };
    entry.total += 1;
    if (row.isCorrect) entry.correct += 1;
    byTopic.set(row.topicId, entry);
  }

  return Array.from(byTopic.entries()).map(([topicId, { topicName, total, correct }]) => ({
    topicId,
    topicName,
    totalAnswered: total,
    correctAnswered: correct,
    accuracyPercent: total > 0 ? Math.round((correct / total) * 100) : 0,
  }));
}
