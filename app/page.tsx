import Link from "next/link";
import { getTopics } from "@/lib/topics";

const TOPIC_COLORS: Record<string, string> = {
  bilangan: "bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 dark:text-sky-100",
  pecahan: "bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 dark:text-amber-100",
  pola_deret: "bg-violet-100 hover:bg-violet-200 text-violet-900 dark:bg-violet-900/40 dark:hover:bg-violet-900/60 dark:text-violet-100",
  geometri: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 dark:text-emerald-100",
  pengukuran: "bg-rose-100 hover:bg-rose-200 text-rose-900 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 dark:text-rose-100",
  cerita_logika: "bg-orange-100 hover:bg-orange-200 text-orange-900 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 dark:text-orange-100",
};

export default async function Home() {
  const topics = await getTopics();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Latihan Matematika Zayyan
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Latihan soal gaya olimpiade Puspresnas untuk kelas 3 SD. Pilih topik untuk mulai berlatih!
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/quiz/${topic.id}`}
              className={`rounded-2xl p-6 shadow-sm transition-colors ${TOPIC_COLORS[topic.id] ?? "bg-zinc-100 hover:bg-zinc-200"}`}
            >
              <h2 className="text-xl font-semibold">{topic.name}</h2>
              {topic.description && <p className="mt-1 text-sm opacity-80">{topic.description}</p>}
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/quiz/campuran"
            className="rounded-2xl bg-zinc-900 p-6 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            🎲 Latihan Campuran
          </Link>
          <Link
            href="/stats"
            className="flex items-center justify-center rounded-2xl border border-zinc-300 p-6 text-lg font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            📊 Lihat Statistik
          </Link>
        </div>
      </div>
    </div>
  );
}
