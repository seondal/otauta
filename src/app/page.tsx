"use client";

import { useState, useEffect } from "react";
import SongCard from "@/components/SongCard";
import SeriesCard from "@/components/SeriesCard";
import TabNavigation from "@/components/TabNavigation";
import { Search } from "lucide-react";
import { Series, SongT } from "@/types";

export default function HomePage() {
  const [songs, setSongs] = useState<SongT[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongT[]>([]);
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);
  const [songSearchTerm, setSongSearchTerm] = useState("");
  const [seriesSearchTerm, setSeriesSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 데이터 로드
    const fetchData = async () => {
      try {
        const [songsResponse, seriesResponse] = await Promise.all([
          fetch("/api/songs"),
          fetch("/api/series"),
        ]);

        if (songsResponse.ok && seriesResponse.ok) {
          const songsData = await songsResponse.json();
          const seriesData = await seriesResponse.json();

          setSongs(songsData);
          setFilteredSongs(songsData);
          setSeries(seriesData);
          setFilteredSeries(seriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 노래 검색 필터링
  useEffect(() => {
    if (!songSearchTerm.replace(/\s/g, "")) {
      setFilteredSongs(songs);
      return;
    }

    const filtered = songs.filter((song) => {
      const searchTerm = songSearchTerm.toLowerCase();
      return (
        song.title.toLowerCase().replace(/\s/g, "").includes(searchTerm) ||
        song.titleKr?.toLowerCase().replace(/\s/g, "").includes(searchTerm) ||
        song.artist?.toLowerCase().replace(/\s/g, "").includes(searchTerm) ||
        song.series?.title
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchTerm) ||
        song.series?.titleKr
          ?.toLowerCase()
          .replace(/\s/g, "")
          .includes(searchTerm)
      );
    });

    setFilteredSongs(filtered);
  }, [songSearchTerm, songs]);

  // 시리즈 검색 필터링
  useEffect(() => {
    if (!seriesSearchTerm.replace(/\s/g, "")) {
      setFilteredSeries(series);
      return;
    }

    const filtered = series.filter((item) => {
      const searchTerm = seriesSearchTerm.toLowerCase();
      return (
        item.title.toLowerCase().replace(/\s/g, "").includes(searchTerm) ||
        item.titleKr?.toLowerCase().replace(/\s/g, "").includes(searchTerm)
      );
    });

    setFilteredSeries(filtered);
  }, [seriesSearchTerm, series]);

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
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          내 장르 노래방곡 모아보기
        </h1>
        <p className="text-xl text-gray-600">
          애니메이션, 드라마 CD의 OST와 노래방 정보를 쉽게 찾아보세요
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto">
        <TabNavigation
          tabs={[
            {
              id: "songs",
              label: `노래 (${filteredSongs.length}개)`,
              content: (
                <div>
                  <div className="flex items-center justify-between mb-6">
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
                          : "노래가 없습니다."}
                      </p>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: "series",
              label: `시리즈 (${filteredSeries.length}개)`,
              content: (
                <div>
                  <div className="flex items-center justify-between mb-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredSeries.map((series) => (
                        <SeriesCard key={series.id} series={series} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {seriesSearchTerm
                          ? "검색 결과가 없습니다."
                          : "시리즈가 없습니다."}
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
