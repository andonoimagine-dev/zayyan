import { db } from "./client";
import { students, subjects, topics, questions } from "./schema";
import { seedStudents, seedSubjects, seedTopics, seedQuestions } from "./seed-data";

async function main() {
  for (const student of seedStudents) {
    await db
      .insert(students)
      .values(student)
      .onConflictDoUpdate({
        target: students.id,
        set: { name: student.name, grade: student.grade, description: student.description },
      });
  }

  for (const subject of seedSubjects) {
    await db
      .insert(subjects)
      .values(subject)
      .onConflictDoUpdate({
        target: subjects.id,
        set: { studentId: subject.studentId, name: subject.name, description: subject.description },
      });
  }

  for (const topic of seedTopics) {
    await db
      .insert(topics)
      .values(topic)
      .onConflictDoUpdate({
        target: topics.id,
        set: { subjectId: topic.subjectId, name: topic.name, description: topic.description },
      });
  }

  for (const q of seedQuestions) {
    await db
      .insert(questions)
      .values({
        id: q.id,
        topicId: q.topicId,
        type: q.type,
        difficulty: q.difficulty,
        prompt: q.prompt,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        orderIndex: q.orderIndex,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: questions.id,
        set: {
          topicId: q.topicId,
          type: q.type,
          difficulty: q.difficulty,
          prompt: q.prompt,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          orderIndex: q.orderIndex,
        },
      });
  }

  console.log(
    `Seeded ${seedStudents.length} students, ${seedSubjects.length} subjects, ${seedTopics.length} topics, and ${seedQuestions.length} questions.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
