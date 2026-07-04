import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAttemptReview } from "@/lib/admin-review";

export default async function AdminAttemptReviewPage({ params }: { params: Promise<{ attemptId: string }> }) {
  if (!(await isAdminRequest())) redirect("/admin/login");

  const { attemptId } = await params;
  const review = await getAttemptReview(attemptId);
  if (!review) notFound();

  const { attempt, answers } = review;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin" className="text-sm text-sky-600 hover:underline dark:text-sky-400">
            ← Riwayat
          </Link>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            Skor: {attempt.correctCount}/{attempt.totalQuestions} ({attempt.scorePercent}%)
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {answers.map((a, i) => (
            <div key={a.questionId} className="rounded-2xl bg-white p-5 shadow-sm dark:bg-zinc-900">
              <p className="mb-2 text-xs font-medium text-zinc-400">Soal {i + 1}</p>
              <p className="mb-3 font-medium text-zinc-900 dark:text-zinc-100">{a.prompt}</p>

              <div className="mb-2 flex flex-wrap gap-2 text-sm">
                <span
                  className={`rounded-full px-3 py-1 ${
                    a.isCorrect
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
                  }`}
                >
                  Jawaban Zayyan: {a.submittedAnswer ?? "(kosong)"}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
                  Kunci: {a.correctAnswer}
                </span>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">{a.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
