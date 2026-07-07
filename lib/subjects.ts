import { db } from "@/db/client";
import { subjects } from "@/db/schema";

export async function getSubjects() {
  return db.select().from(subjects);
}
