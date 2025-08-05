"use client";

import { useState } from "react";
import { Plus, Music, Film } from "lucide-react";

export default function SubmitPage() {
  const [submissionType, setSubmissionType] = useState<"song" | "anime">(
    "song"
  );
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    titleKr: "",
    type: "OP",
    season: "",
    artist: "",
    animeTitle: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      submissionType === "song"
        ? "/api/song-submissions"
        : "/api/series-submissions";

    const payload =
      submissionType === "song"
        ? {
            title: formData.title,
            titleEn: formData.titleEn || null,
            titleKr: formData.titleKr || null,
            type: formData.type,
            season: formData.season || null,
            artist: formData.artist || null,
            animeTitle: formData.animeTitle,
          }
        : {
            title: formData.title,
            titleKr: formData.titleKr || null,
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("서버 오류");
      }

      const data = await res.json();
      alert("제안이 성공적으로 제출되었습니다!");
      console.log(data);
      // 폼 초기화
      setFormData({
        title: "",
        titleEn: "",
        titleKr: "",
        type: "OP",
        season: "",
        artist: "",
        animeTitle: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("제안 제출 중 오류가 발생했습니다.");
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">제안하기</h1>
        <p className="text-gray-600">
          새로운 애니메이션이나 노래를 제안해주세요
        </p>
      </div>

      {/* 제출 타입 선택 */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSubmissionType("song")}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
            submissionType === "song"
              ? "border-purple-500 bg-purple-50 text-purple-700"
              : "border-gray-300 text-gray-600 hover:border-gray-400"
          }`}>
          <Music className="h-5 w-5" />
          <span>노래 제안</span>
        </button>

        <button
          onClick={() => setSubmissionType("anime")}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-colors ${
            submissionType === "anime"
              ? "border-purple-500 bg-purple-50 text-purple-700"
              : "border-gray-300 text-gray-600 hover:border-gray-400"
          }`}>
          <Film className="h-5 w-5" />
          <span>애니메이션 제안</span>
        </button>
      </div>

      {/* 제출 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {submissionType === "song" ? (
          <>
            {/* 노래 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                노래 제목 (원어)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            {/* 한국어 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한국어 제목 (선택)
              </label>
              <input
                type="text"
                value={formData.titleKr}
                onChange={(e) => handleInputChange("titleKr", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 노래 타입 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                노래 타입
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option value="OP">OP (오프닝)</option>
                <option value="ED">ED (엔딩)</option>
                <option value="INSERT">Insert (삽입곡)</option>
              </select>
            </div>

            {/* 시즌 정보 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시즌 정보 (선택)
              </label>
              <input
                type="text"
                value={formData.season}
                onChange={(e) => handleInputChange("season", e.target.value)}
                placeholder="예: Season 1, 2기"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 아티스트 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아티스트 (선택)
              </label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => handleInputChange("artist", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 애니메이션 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                애니메이션 제목
              </label>
              <input
                type="text"
                value={formData.animeTitle}
                onChange={(e) =>
                  handleInputChange("animeTitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </>
        ) : (
          <>
            {/* 애니메이션 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                애니메이션 제목 (원어)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* 한국어 제목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한국어 제목 (선택)
              </label>
              <input
                type="text"
                value={formData.titleKr}
                onChange={(e) => handleInputChange("titleKr", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
          <Plus className="h-5 w-5" />
          <span>제안하기</span>
        </button>
      </form>
    </div>
  );
}
