import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const seriesList = await prisma.series.findMany({
      orderBy: { createdAt: "desc" }, // 최신순
      include: {
        songs: true, // 시리즈에 포함된 노래들 (필요 없다면 생략 가능)
      },
    });

    return NextResponse.json(seriesList);
  } catch (error) {
    console.error("Failed to fetch series", error);
    return NextResponse.json(
      { error: "Failed to fetch series" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await request.json();
    const { title, titleKr } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const series = await prisma.series.create({
      data: {
        title,
        titleKr,
      },
    });

    return NextResponse.json(series, { status: 201 });
  } catch (error) {
    console.error("Error creating series:", error);
    return NextResponse.json(
      { error: "Failed to create series" },
      { status: 500 }
    );
  }
}
