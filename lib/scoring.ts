function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isAnswerCorrect(correctAnswer: string, submittedAnswer: string | null | undefined): boolean {
  if (!submittedAnswer) return false;
  return normalize(submittedAnswer) === normalize(correctAnswer);
}
