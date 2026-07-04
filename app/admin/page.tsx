import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAttempts } from "@/lib/stats";
import { getTopics } from "@/lib/topics";
import LogoutButton from "./LogoutButton";

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminHomePage() {
  if (!(await isAdminRequest())) redirect("/admin/login");

  const [attempts, topics] = await Promise.all([getAttempts(), getTopics()]);
  const topicNameById = new Map(topics.map((t) => [t.id, t.name]));
  const sortedDesc = [...attempts].sort((a, b) => b.startedAt - a.startedAt);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Kunci Jawaban - Riwayat</h1>
          <LogoutButton />
        </div>

        {sortedDesc.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Belum ada riwayat latihan.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedDesc.map((a) => (
              <Link
                key={a.id}
                href={`/admin/attempts/${a.id}`}
                className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(a.startedAt)}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {a.topicFilter ? (topicNameById.get(a.topicFilter) ?? a.topicFilter) : "Campuran"}
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {a.correctCount}/{a.totalQuestions} ({a.scorePercent}%)
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
