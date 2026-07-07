import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { db } from "@/db/client";
import { questions, quizAttempts, attemptAnswers } from "@/db/schema";
import { isAnswerCorrect } from "@/lib/scoring";

type IncomingAnswer = {
  questionId: string;
  submittedAnswer: string | null;
  timeSpentMs: number | null;
};

type SubmitAttemptBody = {
  subjectId: string;
  topicFilter: string | null;
  startedAt: number;
  finishedAt: number;
  answers: IncomingAnswer[];
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as SubmitAttemptBody;
  const { subjectId, topicFilter, startedAt, finishedAt, answers } = body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: "No answers submitted" }, { status: 400 });
  }

  const questionIds = answers.map((a) => a.questionId);
  const relatedQuestions = await db.select().from(questions).where(inArray(questions.id, questionIds));
  const questionMap = new Map(relatedQuestions.map((q) => [q.id, q]));

  let correctCount = 0;
  const answerRows = answers.map((a) => {
    const question = questionMap.get(a.questionId);
    const correct = question ? isAnswerCorrect(question.correctAnswer, a.submittedAnswer) : false;
    if (correct) correctCount += 1;
    return {
      id: randomUUID(),
      questionId: a.questionId,
      submittedAnswer: a.submittedAnswer ?? null,
      isCorrect: correct,
      timeSpentMs: a.timeSpentMs ?? null,
      answeredAt: finishedAt,
    };
  });

  const attemptId = randomUUID();
  const totalQuestions = answers.length;
  const durationMs = finishedAt - startedAt;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  await db.insert(quizAttempts).values({
    id: attemptId,
    subjectId,
    startedAt,
    finishedAt,
    durationMs,
    topicFilter: topicFilter ?? null,
    totalQuestions,
    correctCount,
    scorePercent,
  });

  await db.insert(attemptAnswers).values(
    answerRows.map((row) => ({ ...row, attemptId }))
  );

  return NextResponse.json({ attemptId, correctCount, totalQuestions, scorePercent, durationMs });
}
