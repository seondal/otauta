import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 시리즈 데이터 생성
  const naruto = await prisma.series.create({
    data: {
      title: "NARUTO -ナルト-",
      titleEn: "Naruto",
      titleKr: "나루토",
    },
  });

  const onePiece = await prisma.series.create({
    data: {
      title: "ONE PIECE",
      titleEn: "One Piece",
      titleKr: "원피스",
    },
  });

  const dragonBall = await prisma.series.create({
    data: {
      title: "ドラゴンボール",
      titleEn: "Dragon Ball",
      titleKr: "드래곤볼",
    },
  });

  // 노래 데이터 생성
  const narutoSongs = [
    {
      title: "Rocks",
      titleKr: "Rocks",
      type: "OP" as const,
      season: "Season 1",
      artist: "Hound Dog",
      seriesId: naruto.id,
    },
    {
      title: "GO!!!",
      titleKr: "GO!!!",
      type: "OP" as const,
      season: "Season 1",
      artist: "FLOW",
      seriesId: naruto.id,
    },
    {
      title: "Wind",
      titleKr: "Wind",
      type: "ED" as const,
      season: "Season 1",
      artist: "Akeboshi",
      seriesId: naruto.id,
    },
  ];

  const onePieceSongs = [
    {
      title: "We Are!",
      titleKr: "We Are!",
      type: "OP" as const,
      season: "Season 1",
      artist: "Hiroshi Kitadani",
      seriesId: onePiece.id,
    },
    {
      title: "Memories",
      titleKr: "Memories",
      type: "ED" as const,
      season: "Season 1",
      artist: "Maki Otsuki",
      seriesId: onePiece.id,
    },
  ];

  const dragonBallSongs = [
    {
      title: "魔訶不思議アドベンチャー!",
      titleKr: "마카후시기 어드벤처!",
      type: "OP" as const,
      season: "Season 1",
      artist: "Hiroki Takahashi",
      seriesId: dragonBall.id,
    },
  ];

  // 모든 노래 생성
  const allSongs = [...narutoSongs, ...onePieceSongs, ...dragonBallSongs];

  for (const songData of allSongs) {
    const song = await prisma.song.create({
      data: songData,
    });

    // 노래방 정보 추가 (일본)
    if (songData.seriesId === naruto.id) {
      await prisma.karaokeInfo.createMany({
        data: [
          {
            provider: "DAM",
            country: "Japan",
            songNumber: "12345",
            songId: song.id,
          },
          {
            provider: "JOYSOUND",
            country: "Japan",
            songNumber: "67890",
            songId: song.id,
          },
        ],
      });
    }

    // 노래방 정보 추가 (한국)
    if (songData.seriesId === onePiece.id) {
      await prisma.karaokeInfo.createMany({
        data: [
          {
            provider: "TJ",
            country: "Korea",
            songNumber: "12345",
            songId: song.id,
          },
          {
            provider: "KY",
            country: "Korea",
            songNumber: "67890",
            songId: song.id,
          },
        ],
      });
    }
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
