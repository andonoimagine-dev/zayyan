import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudents } from "@/lib/students";
import { getSubjects } from "@/lib/subjects";
import { getTopics } from "@/lib/topics";

const TOPIC_COLORS: Record<string, string> = {
  bilangan: "bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 dark:text-sky-100",
  pecahan: "bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 dark:text-amber-100",
  pola_deret: "bg-violet-100 hover:bg-violet-200 text-violet-900 dark:bg-violet-900/40 dark:hover:bg-violet-900/60 dark:text-violet-100",
  geometri: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60 dark:text-emerald-100",
  pengukuran: "bg-rose-100 hover:bg-rose-200 text-rose-900 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 dark:text-rose-100",
  cerita_logika: "bg-orange-100 hover:bg-orange-200 text-orange-900 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 dark:text-orange-100",
  kosakata: "bg-teal-100 hover:bg-teal-200 text-teal-900 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 dark:text-teal-100",
  tata_bahasa: "bg-indigo-100 hover:bg-indigo-200 text-indigo-900 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 dark:text-indigo-100",
  percakapan: "bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-900 dark:bg-fuchsia-900/40 dark:hover:bg-fuchsia-900/60 dark:text-fuchsia-100",
  membaca: "bg-lime-100 hover:bg-lime-200 text-lime-900 dark:bg-lime-900/40 dark:hover:bg-lime-900/60 dark:text-lime-100",
  penjumlahan_pengurangan: "bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 dark:text-sky-100",
  bilangan_dasar: "bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 dark:text-amber-100",
  bentuk_pola: "bg-violet-100 hover:bg-violet-200 text-violet-900 dark:bg-violet-900/40 dark:hover:bg-violet-900/60 dark:text-violet-100",
  pengukuran_dasar: "bg-rose-100 hover:bg-rose-200 text-rose-900 dark:bg-rose-900/40 dark:hover:bg-rose-900/60 dark:text-rose-100",
  kosakata_dasar: "bg-teal-100 hover:bg-teal-200 text-teal-900 dark:bg-teal-900/40 dark:hover:bg-teal-900/60 dark:text-teal-100",
  kalimat_sederhana: "bg-indigo-100 hover:bg-indigo-200 text-indigo-900 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 dark:text-indigo-100",
  sapaan: "bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-900 dark:bg-fuchsia-900/40 dark:hover:bg-fuchsia-900/60 dark:text-fuchsia-100",
};

export default async function SubjectHome({
  params,
}: {
  params: Promise<{ student: string; subject: string }>;
}) {
  const { student: studentId, subject: subjectId } = await params;

  const students = await getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) notFound();

  const subjects = await getSubjects(studentId);
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) notFound();

  const topics = await getTopics(subjectId);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <Link href={`/${studentId}`} className="text-sm text-sky-600 hover:underline dark:text-sky-400">
            ← Ganti Mata Pelajaran
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{subject.name}</h1>
          {subject.description && <p className="mt-2 text-zinc-600 dark:text-zinc-400">{subject.description}</p>}
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/quiz/${subjectId}/${topic.id}`}
              className={`rounded-2xl p-6 shadow-sm transition-colors ${TOPIC_COLORS[topic.id] ?? "bg-zinc-100 hover:bg-zinc-200"}`}
            >
              <h2 className="text-xl font-semibold">{topic.name}</h2>
              {topic.description && <p className="mt-1 text-sm opacity-80">{topic.description}</p>}
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href={`/quiz/${subjectId}/campuran`}
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
