import Link from "next/link";
import { getSubjects } from "@/lib/subjects";

const SUBJECT_STYLES: Record<string, { emoji: string; color: string }> = {
  matematika: {
    emoji: "📐",
    color: "bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 dark:text-sky-100",
  },
  "bahasa-inggris": {
    emoji: "🔤",
    color:
      "bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-900 dark:bg-fuchsia-900/40 dark:hover:bg-fuchsia-900/60 dark:text-fuchsia-100",
  },
};

export default async function Home() {
  const subjects = await getSubjects();

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Media Pembelajaran Zayyan
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Pilih mata pelajaran untuk mulai berlatih!</p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {subjects.map((subject) => {
            const style = SUBJECT_STYLES[subject.id] ?? { emoji: "📘", color: "bg-zinc-100 hover:bg-zinc-200" };
            return (
              <Link
                key={subject.id}
                href={`/${subject.id}`}
                className={`rounded-2xl p-8 text-center shadow-sm transition-colors ${style.color}`}
              >
                <div className="mb-2 text-4xl">{style.emoji}</div>
                <h2 className="text-xl font-semibold">{subject.name}</h2>
                {subject.description && <p className="mt-1 text-sm opacity-80">{subject.description}</p>}
              </Link>
            );
          })}
        </div>

        <div className="mt-6">
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
