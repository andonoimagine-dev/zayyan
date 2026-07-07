import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAttemptReview, deleteAttempt } from "@/lib/admin-review";

export async function GET(_request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { attemptId } = await params;
  const review = await getAttemptReview(attemptId);
  if (!review) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(review);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { attemptId } = await params;
  await deleteAttempt(attemptId);

  return NextResponse.json({ ok: true });
}
