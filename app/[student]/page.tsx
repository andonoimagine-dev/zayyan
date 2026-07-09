import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudents } from "@/lib/students";
import { getSubjects } from "@/lib/subjects";
import { subjectEmoji, subjectColorClasses } from "@/lib/subject-style";

export const dynamic = "force-dynamic";

export default async function StudentHome({ params }: { params: Promise<{ student: string }> }) {
  const { student: studentId } = await params;

  const students = await getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) notFound();

  const subjects = await getSubjects(studentId);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <Link href="/" className="text-sm text-sky-600 hover:underline dark:text-sky-400">
            ← Ganti Anak
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{student.name}</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {student.grade} · Pilih mata pelajaran untuk mulai berlatih!
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/${studentId}/${subject.id}`}
              className={`rounded-2xl p-8 text-center shadow-sm transition-colors ${subjectColorClasses(subject.name)}`}
            >
              <div className="mb-2 text-4xl">{subjectEmoji(subject.name)}</div>
              <h2 className="text-xl font-semibold">{subject.name}</h2>
              {subject.description && <p className="mt-1 text-sm opacity-80">{subject.description}</p>}
            </Link>
          ))}
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
