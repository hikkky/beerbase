import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type RequestBody = {
  userId?: string;
};

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const userId = typeof body.userId === "string" ? body.userId : null;
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required." },
      { status: 400 }
    );
  }

  const profile = await prisma.user_profiles.findFirst({
    select: {
      username: true,
    },
    where: { user_id: userId },
  });

  return NextResponse.json({ username: profile?.username ?? null });
}
