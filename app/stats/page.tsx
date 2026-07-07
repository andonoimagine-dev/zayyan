import Link from "next/link";
import { getAttempts, getTopicAccuracy } from "@/lib/stats";
import { getSubjects } from "@/lib/subjects";
import { getTopics } from "@/lib/topics";
import { ScoreTrendChart, TimeTrendChart, TopicAccuracyChart, ChartCard } from "./StatsCharts";

export const dynamic = "force-dynamic";

const SUBJECT_EMOJI: Record<string, string> = {
  matematika: "📐",
  "bahasa-inggris": "🔤",
};

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export default async function StatsPage() {
  const [subjects, allAttempts, topics] = await Promise.all([getSubjects(), getAttempts(), getTopics()]);
  const topicNameById = new Map(topics.map((t) => [t.id, t.name]));
  const subjectNameById = new Map(subjects.map((s) => [s.id, s.name]));
  const sortedDesc = [...allAttempts].sort((a, b) => b.startedAt - a.startedAt);

  const subjectSections = await Promise.all(
    subjects.map(async (subject) => {
      const [attempts, topicAccuracy] = await Promise.all([
        getAttempts(subject.id),
        getTopicAccuracy(subject.id),
      ]);
      const sorted = [...attempts].sort((a, b) => a.startedAt - b.startedAt);
      return { subject, attempts: sorted, topicAccuracy };
    })
  );

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Statistik Latihan</h1>
          <Link href="/" className="text-sm text-sky-600 hover:underline dark:text-sky-400">
            ← Beranda
          </Link>
        </div>

        {subjectSections.map(({ subject, attempts, topicAccuracy }) => (
          <div key={subject.id} className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {SUBJECT_EMOJI[subject.id] ?? "📘"} {subject.name}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ChartCard title="Skor per Latihan (%)">
                <ScoreTrendChart attempts={attempts} />
              </ChartCard>
              <ChartCard title="Waktu Pengerjaan (menit)">
                <TimeTrendChart attempts={attempts} />
              </ChartCard>
            </div>

            <div className="mt-4">
              <ChartCard title="Akurasi per Topik (%)">
                <TopicAccuracyChart topicAccuracy={topicAccuracy} />
              </ChartCard>
            </div>
          </div>
        ))}

        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Riwayat Latihan</h3>
          {sortedDesc.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Belum ada riwayat latihan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="py-2 pr-4 font-medium">Tanggal</th>
                    <th className="py-2 pr-4 font-medium">Mata Pelajaran</th>
                    <th className="py-2 pr-4 font-medium">Topik</th>
                    <th className="py-2 pr-4 font-medium">Skor</th>
                    <th className="py-2 pr-4 font-medium">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDesc.map((a) => (
                    <tr key={a.id} className="border-b border-zinc-100 dark:border-zinc-800/60">
                      <td className="py-2 pr-4 whitespace-nowrap">{formatDate(a.startedAt)}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">{subjectNameById.get(a.subjectId) ?? a.subjectId}</td>
                      <td className="py-2 pr-4">{a.topicFilter ? (topicNameById.get(a.topicFilter) ?? a.topicFilter) : "Campuran"}</td>
                      <td className="py-2 pr-4">
                        {a.correctCount}/{a.totalQuestions} ({a.scorePercent}%)
                      </td>
                      <td className="py-2 pr-4 whitespace-nowrap">{formatDuration(a.durationMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/admin" className="text-xs text-zinc-400 hover:text-zinc-600 hover:underline dark:text-zinc-600 dark:hover:text-zinc-400">
            admin
          </Link>
        </div>
      </div>
    </div>
  );
}
