import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const songs = await prisma.song.findMany({
      include: {
        series: {
          select: {
            id: true,
            title: true,
          },
        },
        karaokeInfo: {
          select: {
            id: true,
            provider: true,
            country: true,
            songNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, titleKr, type, season, artist, seriesId, karaokeInfo } =
      await req.json();

    const createdSong = await prisma.song.create({
      data: {
        title,
        titleKr,
        type,
        season,
        artist,
        seriesId,
        karaokeInfo: {
          create: karaokeInfo.map((info: any) => ({
            provider: info.provider,
            country: info.country,
            songNumber: info.songNumber,
          })),
        },
      },
      include: {
        karaokeInfo: true,
      },
    });

    return NextResponse.json(createdSong, { status: 201 });
  } catch (error) {
    console.error("Error creating song:", error);
    return NextResponse.json(
      { error: "노래 추가 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
