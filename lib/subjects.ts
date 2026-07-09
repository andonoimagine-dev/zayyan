import { db } from "@/db/client";
import { subjects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSubjects(studentId?: string) {
  if (studentId) {
    return db.select().from(subjects).where(eq(subjects.studentId, studentId));
  }
  return db.select().from(subjects);
}
