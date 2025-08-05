"use client";

import { Heart, Play, ExternalLink } from "lucide-react";
import { Anime } from "@/types";
import Link from "next/link";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const handleLike = () => {
    // 좋아요 로직 구현
    console.log("Like anime:", anime.id);
  };

  const getDisplayTitle = () => {
    if (anime.titleEn && anime.title !== anime.titleEn) {
      return `${anime.title} (${anime.titleEn})`;
    }
    return anime.title;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* 애니메이션 정보 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getDisplayTitle()}
        </h3>
        {anime.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {anime.description}
          </p>
        )}
        <p className="text-sm text-gray-500">
          총 {anime.songs.length}개의 노래
        </p>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
            <Heart className="h-4 w-4" />
            <span>좋아요</span>
          </button>

          <Link
            href={`/anime/${anime.id}`}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
            <Play className="h-4 w-4" />
            <span>자세히 보기</span>
          </Link>
        </div>
      </div>

      {/* 최근 노래들 */}
      {anime.songs.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">최근 노래</h4>
          <div className="space-y-2">
            {anime.songs.slice(0, 3).map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {song.title} ({song.type})
                </span>
                <Link
                  href={`/song/${song.id}`}
                  className="text-purple-600 hover:text-purple-700 text-xs">
                  자세히
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
