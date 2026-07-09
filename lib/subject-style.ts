export function subjectEmoji(subjectName: string): string {
  if (subjectName.startsWith("Matematika")) return "📐";
  if (subjectName.startsWith("Bahasa Inggris")) return "🔤";
  return "📘";
}

export function subjectColorClasses(subjectName: string): string {
  if (subjectName.startsWith("Matematika")) {
    return "bg-sky-100 hover:bg-sky-200 text-sky-900 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 dark:text-sky-100";
  }
  if (subjectName.startsWith("Bahasa Inggris")) {
    return "bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-900 dark:bg-fuchsia-900/40 dark:hover:bg-fuchsia-900/60 dark:text-fuchsia-100";
  }
  return "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100";
}
