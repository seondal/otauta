"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [selectedAnime, setSelectedAnime] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log("Search:", { query, selectedAnime, selectedType });
  };

  return (
    <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* 검색어 입력 */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="애니메이션 제목이나 노래 제목을 입력하세요..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* 애니메이션 필터 */}
        <div className="md:w-48">
          <select
            value={selectedAnime}
            onChange={(e) => setSelectedAnime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">모든 애니메이션</option>
            <option value="naruto">나루토</option>
            <option value="onepiece">원피스</option>
            <option value="dragonball">드래곤볼</option>
          </select>
        </div>

        {/* 노래 타입 필터 */}
        <div className="md:w-32">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">모든 타입</option>
            <option value="OP">OP</option>
            <option value="ED">ED</option>
            <option value="INSERT">Insert</option>
          </select>
        </div>

        {/* 검색 버튼 */}
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
          검색
        </button>
      </div>
    </form>
  );
}
