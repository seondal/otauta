"use client";

import { Heart, Play, ExternalLink } from "lucide-react";
import { Song } from "@/types";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  const handleLike = () => {
    // 좋아요 로직 구현
    console.log("Like song:", song.id);
  };

  const handleYouTubeSearch = () => {
    const searchQuery = encodeURIComponent(song.title);
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank"
    );
  };

  const handleKaraokeSearch = (provider: string) => {
    const searchQuery = encodeURIComponent(`${song.title} ${provider} karaoke`);
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank"
    );
  };

  const getDisplayTitle = () => {
    if (song.titleEn && song.title !== song.titleEn) {
      return `${song.title} (${song.titleEn})`;
    }
    return song.title;
  };

  const getSeriesDisplay = () => {
    if (!song.series) {
      return `${song.type} (시리즈 정보 없음)`;
    }
    const seriesTitle = song.series.titleEn || song.series.title;
    const seasonInfo = song.season ? ` ${song.season}` : "";
    return `${seriesTitle}${seasonInfo} ${song.type}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* 노래 정보 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getDisplayTitle()}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{getSeriesDisplay()}</p>
        {song.artist && (
          <p className="text-sm text-gray-500">아티스트: {song.artist}</p>
        )}
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

          <button
            onClick={handleYouTubeSearch}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
            <Play className="h-4 w-4" />
            <span>YouTube</span>
          </button>
        </div>
      </div>

      {/* 노래방 정보 */}
      {song.karaokeInfo.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            노래방 정보
          </h4>
          <div className="space-y-2">
            {song.karaokeInfo.map((karaoke) => (
              <div
                key={karaoke.id}
                className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {karaoke.country}: {karaoke.provider}
                  {karaoke.songNumber && ` (${karaoke.songNumber})`}
                </span>
                <button
                  onClick={() => handleKaraokeSearch(karaoke.provider)}
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded transition-colors">
                  <ExternalLink className="h-3 w-3" />
                  <span>검색</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 시리즈 태그 */}
      {song.series && (
        <div className="mt-4 pt-4 border-t">
          <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors">
            {song.series.titleEn || song.series.title}
          </button>
        </div>
      )}
    </div>
  );
}
