"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PublicQuestion } from "@/lib/questions";
import { now } from "@/lib/time";

type Answer = {
  submittedAnswer: string | null;
  timeSpentMs: number;
};

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function QuizRunner({
  topicName,
  topicFilter,
  questions,
}: {
  topicName: string;
  topicFilter: string | null;
  questions: PublicQuestion[];
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startedAtRef = useRef(now());
  const questionShownAtRef = useRef(now());
  const answersRef = useRef<Record<string, Answer>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMs(now() - startedAtRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  async function handleNext() {
    const clickedAt = now();
    const timeSpentMs = clickedAt - questionShownAtRef.current;
    const submittedAnswer = currentQuestion.type === "multiple_choice" ? selectedOption : textAnswer.trim() || null;

    answersRef.current[currentQuestion.id] = { submittedAnswer, timeSpentMs };

    if (isLastQuestion) {
      await submitAttempt(clickedAt);
      return;
    }

    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setTextAnswer("");
    questionShownAtRef.current = now();
  }

  async function submitAttempt(finishedAt: number) {
    setSubmitting(true);
    setError(null);
    try {
      const answers = questions.map((q) => ({
        questionId: q.id,
        submittedAnswer: answersRef.current[q.id]?.submittedAnswer ?? null,
        timeSpentMs: answersRef.current[q.id]?.timeSpentMs ?? null,
      }));

      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicFilter,
          startedAt: startedAtRef.current,
          finishedAt,
          answers,
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim jawaban");
      const data = await res.json();
      router.push(`/result/${data.attemptId}`);
    } catch {
      setError("Gagal mengirim jawaban. Coba lagi ya.");
      setSubmitting(false);
    }
  }

  const canProceed = currentQuestion.type === "multiple_choice" ? selectedOption !== null : textAnswer.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{topicName}</span>
          <span>⏱ {formatElapsed(elapsedMs)}</span>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
          Soal {currentIndex + 1} dari {questions.length}
        </p>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <p className="mb-6 text-lg font-medium text-zinc-900 dark:text-zinc-100">{currentQuestion.prompt}</p>

          {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    selectedOption === option
                      ? "border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100"
                      : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "short_answer" && (
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Tulis jawabanmu di sini"
              className="w-full rounded-xl border border-zinc-300 p-3 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || submitting}
            className="mt-6 w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {submitting ? "Mengirim..." : isLastQuestion ? "Selesai" : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
}
