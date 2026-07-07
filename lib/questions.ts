import { db } from "@/db/client";
import { questions, topics } from "@/db/schema";
import { eq } from "drizzle-orm";

export type PublicQuestion = {
  id: string;
  type: "multiple_choice" | "short_answer";
  prompt: string;
  options: string[] | null;
};

const MIXED_QUESTION_COUNT = 15;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function getQuestionSet(subjectId: string, topicId: string | null): Promise<PublicQuestion[]> {
  const rows = topicId
    ? await db.select().from(questions).where(eq(questions.topicId, topicId))
    : await db
        .select({
          id: questions.id,
          topicId: questions.topicId,
          type: questions.type,
          difficulty: questions.difficulty,
          prompt: questions.prompt,
          options: questions.options,
          correctAnswer: questions.correctAnswer,
          explanation: questions.explanation,
          orderIndex: questions.orderIndex,
          isActive: questions.isActive,
        })
        .from(questions)
        .innerJoin(topics, eq(questions.topicId, topics.id))
        .where(eq(topics.subjectId, subjectId));

  const active = rows.filter((q) => q.isActive);

  const selected = topicId
    ? [...active].sort((a, b) => a.orderIndex - b.orderIndex)
    : shuffle(active).slice(0, MIXED_QUESTION_COUNT);

  return selected.map((q) => ({
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    options: q.options,
  }));
}
