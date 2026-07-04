import { db } from "@/db/client";
import { topics } from "@/db/schema";

export async function getTopics() {
  return db.select().from(topics);
}
