import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { quizAttempts, attemptAnswers, questions, subjects, students } from "@/db/schema";

export async function getAttemptReview(attemptId: string) {
  const [attempt] = await db.select().from(quizAttempts).where(eq(quizAttempts.id, attemptId));
  if (!attempt) return null;

  const [subject] = await db.select().from(subjects).where(eq(subjects.id, attempt.subjectId));
  const student = subject?.studentId
    ? (await db.select().from(students).where(eq(students.id, subject.studentId)))[0]
    : undefined;

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

  return { attempt, answers, subjectName: subject?.name, studentName: student?.name };
}

export async function deleteAttempt(attemptId: string): Promise<void> {
  await db.delete(attemptAnswers).where(eq(attemptAnswers.attemptId, attemptId));
  await db.delete(quizAttempts).where(eq(quizAttempts.id, attemptId));
}
