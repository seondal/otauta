// /app/api/song-submissions/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, titleKr } = body;

  try {
    const submission = await prisma.seriesSubmission.create({
      data: {
        title,
        titleKr,
        userId: "anonymous",
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
