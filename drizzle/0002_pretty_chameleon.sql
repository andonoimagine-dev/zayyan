CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`grade` text NOT NULL,
	`description` text
);
--> statement-breakpoint
ALTER TABLE `subjects` ADD `student_id` text REFERENCES students(id);