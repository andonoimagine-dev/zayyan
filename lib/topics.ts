import { db } from "@/db/client";
import { topics } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTopics(subjectId?: string) {
  if (subjectId) {
    return db.select().from(topics).where(eq(topics.subjectId, subjectId));
  }
  return db.select().from(topics);
}
