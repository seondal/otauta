"use client";

import { Heart, Play, ExternalLink } from "lucide-react";
import { Series } from "@/types";
import Link from "next/link";

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const handleLike = () => {
    // 좋아요 로직 구현
    console.log("Like series:", series.id);
  };

  const getDisplayTitle = () => {
    if (!series) {
      return "시리즈 정보 없음";
    }
    if (series.titleEn && series.title !== series.titleEn) {
      return `${series.title} (${series.titleEn})`;
    }
    return series.title;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* 시리즈 정보 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getDisplayTitle()}
        </h3>
        {series.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {series.description}
          </p>
        )}
        <p className="text-sm text-gray-500">
          총 {series.songs?.length || 0}개의 노래
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
            href={`/series/${series.id}`}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors">
            <Play className="h-4 w-4" />
            <span>자세히 보기</span>
          </Link>
        </div>
      </div>

      {/* 최근 노래들 */}
      {series.songs && series.songs.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">최근 노래</h4>
          <div className="space-y-2">
            {series.songs.slice(0, 3).map((song) => (
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
