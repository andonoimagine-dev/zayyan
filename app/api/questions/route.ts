import { NextRequest, NextResponse } from "next/server";
import { getQuestionSet } from "@/lib/questions";

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get("topic");
  const questions = await getQuestionSet(topic && topic !== "campuran" ? topic : null);
  return NextResponse.json({ questions });
}
