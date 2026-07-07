import { NextRequest, NextResponse } from "next/server";
import { getQuestionSet } from "@/lib/questions";

export async function GET(request: NextRequest) {
  const subject = request.nextUrl.searchParams.get("subject");
  const topic = request.nextUrl.searchParams.get("topic");
  if (!subject) {
    return NextResponse.json({ error: "Missing subject" }, { status: 400 });
  }
  const questions = await getQuestionSet(subject, topic && topic !== "campuran" ? topic : null);
  return NextResponse.json({ questions });
}
