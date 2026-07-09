import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { quizAttempts, subjects, students } from "@/db/schema";

function formatDuration(ms: number | null): string {
  if (ms === null) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} menit ${seconds} detik`;
}

function scoreMessage(scorePercent: number, studentName?: string): string {
  const name = studentName ? `, ${studentName}` : "";
  if (scorePercent === 100) return `Sempurna! Hebat sekali${name}! 🎉`;
  if (scorePercent >= 80) return "Kerja bagus! Sedikit lagi sempurna! 🌟";
  if (scorePercent >= 60) return "Bagus! Terus berlatih ya! 💪";
  return "Terus semangat berlatih, pasti bisa lebih baik! 📚";
}

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const [attempt] = await db.select().from(quizAttempts).where(eq(quizAttempts.id, attemptId));

  if (!attempt) notFound();

  const [subject] = await db.select().from(subjects).where(eq(subjects.id, attempt.subjectId));
  const student = subject?.studentId
    ? (await db.select().from(students).where(eq(students.id, subject.studentId)))[0]
    : undefined;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
        <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          {scoreMessage(attempt.scorePercent, student?.name)}
        </p>

        <div className="my-6">
          <p className="text-5xl font-bold text-sky-600 dark:text-sky-400">
            {attempt.correctCount}/{attempt.totalQuestions}
          </p>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">jawaban benar ({attempt.scorePercent}%)</p>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400">Waktu pengerjaan: {formatDuration(attempt.durationMs)}</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-xl bg-zinc-900 py-3 font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/stats"
            className="rounded-xl border border-zinc-300 py-3 font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Lihat Statistik
          </Link>
        </div>
      </div>
    </div>
  );
}
