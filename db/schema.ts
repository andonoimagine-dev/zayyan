import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const students = sqliteTable("students", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(),
  description: text("description"),
});

export const subjects = sqliteTable("subjects", {
  id: text("id").primaryKey(),
  studentId: text("student_id").references(() => students.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const topics = sqliteTable("topics", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subjects.id),
  name: text("name").notNull(),
  description: text("description"),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id),
  type: text("type", { enum: ["multiple_choice", "short_answer"] }).notNull(),
  difficulty: text("difficulty", { enum: ["mudah", "sedang", "sulit"] }).notNull(),
  prompt: text("prompt").notNull(),
  options: text("options", { mode: "json" }).$type<string[] | null>(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subjects.id),
  startedAt: integer("started_at").notNull(),
  finishedAt: integer("finished_at"),
  durationMs: integer("duration_ms"),
  topicFilter: text("topic_filter"),
  totalQuestions: integer("total_questions").notNull(),
  correctCount: integer("correct_count").notNull().default(0),
  scorePercent: real("score_percent").notNull().default(0),
});

export const attemptAnswers = sqliteTable("attempt_answers", {
  id: text("id").primaryKey(),
  attemptId: text("attempt_id")
    .notNull()
    .references(() => quizAttempts.id),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id),
  submittedAnswer: text("submitted_answer"),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  timeSpentMs: integer("time_spent_ms"),
  answeredAt: integer("answered_at").notNull(),
});
