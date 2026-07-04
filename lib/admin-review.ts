import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { quizAttempts, attemptAnswers, questions } from "@/db/schema";

export async function getAttemptReview(attemptId: string) {
  const [attempt] = await db.select().from(quizAttempts).where(eq(quizAttempts.id, attemptId));
  if (!attempt) return null;

  const answers = await db
    .select({
      questionId: questions.id,
      prompt: questions.prompt,
      options: questions.options,
      correctAnswer: questions.correctAnswer,
      explanation: questions.explanation,
      orderIndex: questions.orderIndex,
      submittedAnswer: attemptAnswers.submittedAnswer,
      isCorrect: attemptAnswers.isCorrect,
      timeSpentMs: attemptAnswers.timeSpentMs,
    })
    .from(attemptAnswers)
    .innerJoin(questions, eq(attemptAnswers.questionId, questions.id))
    .where(eq(attemptAnswers.attemptId, attemptId));

  answers.sort((a, b) => a.orderIndex - b.orderIndex);

  return { attempt, answers };
}
