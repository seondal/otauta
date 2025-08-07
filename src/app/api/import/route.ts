import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { animeList, songList } = await req.json();

    const result = await prisma.$transaction(
      async (tx) => {
        const csvIdToDbId = new Map<string, string>();

        // 1. 애니메이션 생성
        for (const anime of animeList) {
          const created = await tx.series.create({
            data: {
              title: anime.title,
              titleKr: anime.titleKr,
            },
          });
          csvIdToDbId.set(anime.csvId, created.id);
          console.log(
            `📺 Series : Csv Id: ${anime.csvId} / Prisma Id: ${created.id} / ${anime.title}`
          );
        }

        // 2. 노래 생성
        for (const song of songList) {
          const seriesId = csvIdToDbId.get(song.seriesCsvId);
          if (!seriesId)
            throw new Error(`🤔 시리즈 ID 매핑 실패: ${song.seriesCsvId}`);

          await tx.song.create({
            data: {
              title: song.title,
              titleKr: song.titleKr,
              type: song.type,
              season: song.season,
              artist: song.artist,
              seriesId: seriesId,
              karaokeInfo: {
                create: song.karaokeInfo.map(
                  (info: {
                    provider: string;
                    country: string;
                    songNumber: string;
                  }) => ({
                    provider: info.provider,
                    country: info.country,
                    songNumber: info.songNumber,
                  })
                ),
              },
            },
          });
          console.log(`🎵 Song : ${song.title} - ${song.artist}`);
        }
      },
      { timeout: 60000 }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🚨 [IMPORT_ALL_ERROR]", err);
    return NextResponse.json(
      { error: "🤮 전체 삽입 실패. 모든 변경이 롤백되었습니다." },
      { status: 500 }
    );
  }
}
