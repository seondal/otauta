import { prisma } from "@/lib/db";
import SongCard from "@/components/SongCard";
import { notFound } from "next/navigation";

interface SeriesPageProps {
  params: {
    id: string;
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const series = await prisma.series.findUnique({
    where: { id: params.id },
    include: {
      songs: {
        include: {
          karaokeInfo: true,
          userFavorites: true,
          submissions: true,
          series: true,
        },
      },
    },
  });

  if (!series) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      {/* 시리즈 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {series.titleKr} ({series.title})
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>총 {series.songs.length}개의 노래</span>
          <span>
            최근 업데이트: {series.updatedAt.toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>

      {/* 노래 목록 */}
      <div>
        {series.songs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {series.songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 등록된 노래가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 시리즈 정보 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          시리즈 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">제목</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">원어: {series.title}</p>
              {series.titleKr && (
                <p className="text-sm text-gray-600">
                  한국어: {series.titleKr}
                </p>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">통계</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                OP: {series.songs.filter((s) => s.type === "OP").length}개
              </p>
              <p className="text-sm text-gray-600">
                ED: {series.songs.filter((s) => s.type === "ED").length}개
              </p>
              <p className="text-sm text-gray-600">
                Insert: {series.songs.filter((s) => s.type === "INSERT").length}
                개
              </p>
              <p className="text-sm text-gray-600">
                Track: {series.songs.filter((s) => s.type === "TRACK").length}개
              </p>
              <p className="text-sm text-gray-600">
                Character Song:{" "}
                {series.songs.filter((s) => s.type === "CHARACTER").length}개
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
