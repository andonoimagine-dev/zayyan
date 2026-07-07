PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `subjects` (`id`, `name`, `description`) VALUES ('matematika', 'Matematika', 'Latihan soal gaya olimpiade Puspresnas untuk kelas 3 SD.');
--> statement-breakpoint
CREATE TABLE `__new_topics` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL REFERENCES subjects(id),
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `__new_topics` (`id`, `subject_id`, `name`, `description`) SELECT `id`, 'matematika', `name`, `description` FROM `topics`;
--> statement-breakpoint
DROP TABLE `topics`;
--> statement-breakpoint
ALTER TABLE `__new_topics` RENAME TO `topics`;
--> statement-breakpoint
CREATE TABLE `__new_quiz_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_id` text NOT NULL REFERENCES subjects(id),
	`started_at` integer NOT NULL,
	`finished_at` integer,
	`duration_ms` integer,
	`topic_filter` text,
	`total_questions` integer NOT NULL,
	`correct_count` integer DEFAULT 0 NOT NULL,
	`score_percent` real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_quiz_attempts` (`id`, `subject_id`, `started_at`, `finished_at`, `duration_ms`, `topic_filter`, `total_questions`, `correct_count`, `score_percent`) SELECT `id`, 'matematika', `started_at`, `finished_at`, `duration_ms`, `topic_filter`, `total_questions`, `correct_count`, `score_percent` FROM `quiz_attempts`;
--> statement-breakpoint
DROP TABLE `quiz_attempts`;
--> statement-breakpoint
ALTER TABLE `__new_quiz_attempts` RENAME TO `quiz_attempts`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;
