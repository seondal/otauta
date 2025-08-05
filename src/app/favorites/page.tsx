"use client";

import { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import SeriesCard from "@/components/SeriesCard";
import TabNavigation from "@/components/TabNavigation";
import { Search } from "lucide-react";
import { Series, SongT } from "@/types";

export default function FavoritesPage() {
  const [favoriteSongs, setFavoriteSongs] = useState<SongT[]>([]);
  const [favoriteSeries, setFavoriteSeries] = useState<Series[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);
  const [songSearchTerm, setSongSearchTerm] = useState("");
  const [seriesSearchTerm, setSeriesSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제로는 사용자 인증 후 해당 사용자의 즐겨찾기를 가져와야 합니다
    const fetchFavorites = async () => {
      try {
        const [songsResponse, seriesResponse] = await Promise.all([
          fetch("/api/songs"),
          fetch("/api/series"),
        ]);

        if (songsResponse.ok && seriesResponse.ok) {
          const songsData = await songsResponse.json();
          const seriesData = await seriesResponse.json();

          // 임시로 최근 10개를 즐겨찾기로 표시
          setFavoriteSongs(songsData.slice(0, 10));
          setFilteredSongs(songsData.slice(0, 10));
          setFavoriteSeries(seriesData.slice(0, 10));
          setFilteredSeries(seriesData.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // 노래 검색 필터링
  useEffect(() => {
    if (!songSearchTerm.trim()) {
      setFilteredSongs(favoriteSongs);
      return;
    }

    const filtered = favoriteSongs.filter((song) => {
      const searchTerm = songSearchTerm.toLowerCase();
      return (
        song.title.toLowerCase().includes(searchTerm) ||
        song.titleKr?.toLowerCase().includes(searchTerm) ||
        song.artist?.toLowerCase().includes(searchTerm) ||
        song.series?.title.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredSongs(filtered);
  }, [songSearchTerm, favoriteSongs]);

  // 시리즈 검색 필터링
  useEffect(() => {
    if (!seriesSearchTerm.trim()) {
      setFilteredSeries(favoriteSeries);
      return;
    }

    const filtered = favoriteSeries.filter((item) => {
      const searchTerm = seriesSearchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.titleKr?.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredSeries(filtered);
  }, [seriesSearchTerm, favoriteSeries]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">즐겨찾기</h1>
        <p className="text-gray-600">좋아하는 노래와 시리즈를 관리하세요</p>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto">
        <TabNavigation
          tabs={[
            {
              id: "songs",
              label: "좋아하는 노래",
              content: (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      좋아하는 노래 ({filteredSongs.length}개)
                    </h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="노래 제목, 아티스트, 시리즈로 검색..."
                        value={songSearchTerm}
                        onChange={(e) => setSongSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
                      />
                    </div>
                  </div>
                  {filteredSongs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredSongs.map((song) => (
                        <SongCard key={song.id} song={song} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {songSearchTerm
                          ? "검색 결과가 없습니다."
                          : "아직 좋아하는 노래가 없습니다."}
                      </p>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "series",
              label: "좋아하는 시리즈",
              content: (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      좋아하는 시리즈 ({filteredSeries.length}개)
                    </h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="시리즈 제목으로 검색..."
                        value={seriesSearchTerm}
                        onChange={(e) => setSeriesSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80"
                      />
                    </div>
                  </div>
                  {filteredSeries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSeries.map((series) => (
                        <SeriesCard key={series.id} series={series} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {seriesSearchTerm
                          ? "검색 결과가 없습니다."
                          : "아직 좋아하는 시리즈가 없습니다."}
                      </p>
                    </div>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
