"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewSeriesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    titleKr: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("성공");
      } else {
        alert("실패");
      }
    } catch (error) {
      console.error("Error creating series:", error);
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

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>뒤로 가기</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">새 시리즈 추가</h1>
          <p className="text-gray-600">새로운 시리즈를 추가하세요</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 시리즈 제목 (원어) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시리즈 제목 (원어) *
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

          {/* 버튼 */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/admin/series"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors">
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? "저장 중..." : "저장"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
