import { db } from "@/db/client";
import { students } from "@/db/schema";

export async function getStudents() {
  return db.select().from(students);
}
