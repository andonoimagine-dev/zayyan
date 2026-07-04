import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminSessionToken, ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE_SECONDS } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string };
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!password || !hash) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return NextResponse.json({ error: "Password salah" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}
