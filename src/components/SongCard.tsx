"use client";

import { SongT } from "@/types";
import Link from "next/link";

interface SongCardProps {
  song: SongT;
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
    const searchQuery = encodeURIComponent(`${song.title} ${provider}`);
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank"
    );
  };

  return (
    <div className=" bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      {/* 노래 정보 */}
      <div className="mb-4">
        <h3
          className="text-lg font-semibold text-gray-900 mb-2 hover:underline cursor-pointer"
          onClick={handleYouTubeSearch}>
          {song.title} {song.titleKr && `(${song.titleKr})`}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{song.artist}</p>
        {song.series && (
          <Link
            href={`/series/${song.series.id}`}
            className="text-sm text-gray-600 hover:underline">
            {song.series?.titleKr ?? song.series?.title} {song.season}{" "}
            {song.type}
          </Link>
        )}
      </div>

      {/* 노래방 정보 */}
      {song.karaokeInfo.length > 0 && (
        <div className="flex gap-2">
          {song.karaokeInfo.map((karaoke) => (
            <button
              onClick={() => handleKaraokeSearch(karaoke.provider)}
              key={karaoke.id}
              className="cursor-pointer inline-flex items-center text-sm px-2 py-1 font-medium text-purple-600 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors">
              {karaoke.provider}
              {karaoke.songNumber && ` ${karaoke.songNumber}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
