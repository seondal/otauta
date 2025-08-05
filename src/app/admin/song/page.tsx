import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Music } from "lucide-react";

export default async function SongsManagementPage() {
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">노래 관리</h1>
          <p className="text-gray-600">노래를 관리하고 편집하세요</p>
        </div>
        <Link
          href="/admin/song/new"
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>새 노래 추가</span>
        </Link>
      </div>

      {/* 노래 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            노래 목록 ({songs.length}개)
          </h2>
        </div>
        <div className="p-6">
          {songs.length > 0 ? (
            <div className="space-y-4">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Music className="h-4 w-4 text-gray-400" />
                      <h3 className="font-medium text-gray-900">
                        {song.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {song.series?.title} • {song.type}
                      {song.season && ` • ${song.season}`}
                    </p>
                    {song.artist && (
                      <p className="text-sm text-gray-500 mt-1">
                        아티스트: {song.artist}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>노래방: {song.karaokeInfo.length}개</span>
                      <span>•</span>
                      <span>
                        {new Date(song.createdAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/song/${song.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/songs/${song.id}/edit`}
                      className="p-2 text-blue-400 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              등록된 노래가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
