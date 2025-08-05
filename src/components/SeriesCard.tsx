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

  return (
    <Link
      href={`/series/${series.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 hover:opacity-50">
      {/* 시리즈 정보 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {series.titleKr
            ? `${series.titleKr} (${series.title})`
            : series.title}
        </h3>
      </div>

      {/* 최근 노래들 */}
      {series.songs && series.songs.length > 0 && (
        <div className="border-t pt-4">
          <div className="space-y-2">
            {series.songs.slice(0, 3).map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {song.title} {song.season && `(${song.season} ${song.type})`}
                </span>
                <span className="text-gray-400">{song.artist}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            ... 외 {series.songs?.length - 3 || 0}개의 노래
          </p>
        </div>
      )}
    </Link>
  );
}
