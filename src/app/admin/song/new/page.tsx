"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Series {
  id: string;
  title: string;
  titleKr: string;
}

export default function NewSongPage() {
  const router = useRouter();
  const [series, setSeries] = useState<Series[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    titleKr: "",
    type: "TRACK",
    season: "",
    artist: "",
    seriesId: "",
    karaokeInfo: [
      { provider: "TJ", country: "Korea", songNumber: "" },
      { provider: "KY", country: "Korea", songNumber: "" },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 시리즈 목록 가져오기
    fetch("/api/series")
      .then((res) => res.json())
      .then((data) => setSeries(data))
      .catch((error) => console.error("Error fetching series:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("성공");
      } else {
        console.error("Failed to create song");
        alert("실패");
      }
    } catch (error) {
      console.error("Error creating song:", error);
      alert("에러");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addKaraoke = () => {
    setFormData((prev) => ({
      ...prev,
      karaokeInfo: [
        ...prev.karaokeInfo,
        { provider: "DAM", country: "Korea", songNumber: "" },
      ],
    }));
  };

  const removeKaraoke = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      karaokeInfo: prev.karaokeInfo.filter((_, i) => i !== index),
    }));
  };

  const handleKaraokeChange = (
    index: number,
    field: "provider" | "country" | "songNumber",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.karaokeInfo];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, karaokeInfo: updated };
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4 ">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>뒤로 가기</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">새 노래 추가</h1>
          <p className="text-gray-600">새로운 노래를 추가하세요</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 시리즈 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시리즈 *
            </label>
            <select
              value={formData.seriesId}
              onChange={(e) => handleInputChange("seriesId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required>
              <option value="">시리즈를 선택하세요</option>
              {series.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.titleKr} (${item.title})`}
                </option>
              ))}
            </select>
          </div>

          {/* 노래 제목 (원어) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노래 제목 (원어) *
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

          {/* 아티스트 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아티스트 *
            </label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => handleInputChange("artist", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* 노래 타입 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노래 타입 *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required>
              <option value="TRACK">Track (트랙)</option>
              <option value="OP">OP (오프닝)</option>
              <option value="ED">ED (엔딩)</option>
              <option value="INSERT">Insert (삽입곡)</option>
              <option value="CHARACTER">Character Song (캐릭터송)</option>
            </select>
          </div>

          {/* 시즌 정보 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시즌 (선택, 드라마CD의 경우 앨범명)
            </label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => handleInputChange("season", e.target.value)}
              placeholder="예: Season 1, 2기"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/** 노래방 정보 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노래방 정보
            </label>
            {formData.karaokeInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={info.provider}
                  onChange={(e) =>
                    handleKaraokeChange(index, "provider", e.target.value)
                  }
                  className="px-2 py-1 border rounded w-28">
                  <option value="DAM">DAM</option>
                  <option value="JOYSOUND">JOYSOUND</option>
                  <option value="TJ">TJ (태진)</option>
                  <option value="KY">KY (금영)</option>
                </select>
                <input
                  type="text"
                  placeholder="곡 번호"
                  value={info.songNumber}
                  onChange={(e) =>
                    handleKaraokeChange(index, "songNumber", e.target.value)
                  }
                  className="px-2 py-1 border rounded w-32"
                />

                <button
                  type="button"
                  onClick={() => removeKaraoke(index)}
                  className="text-red-500 hover:underline text-sm">
                  삭제
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addKaraoke}
              className="mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 text-sm">
              + 노래방 정보 추가
            </button>
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/songs"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors">
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? "저장 중..." : "저장"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
