import { NextResponse } from "next/server";
import { getAttempts, getTopicAccuracy } from "@/lib/stats";

export async function GET() {
  const [attempts, topicAccuracy] = await Promise.all([getAttempts(), getTopicAccuracy()]);
  return NextResponse.json({ attempts, topicAccuracy });
}
