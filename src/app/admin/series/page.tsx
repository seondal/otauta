import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export default async function SeriesManagementPage() {
  const series = await prisma.series.findMany({
    include: {
      songs: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">시리즈 관리</h1>
          <p className="text-gray-600">시리즈를 관리하고 편집하세요</p>
        </div>
        <Link
          href="/admin/series/new"
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>새 시리즈 추가</span>
        </Link>
      </div>

      {/* 시리즈 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            시리즈 목록 ({series.length}개)
          </h2>
        </div>
        <div className="p-6">
          {series.length > 0 ? (
            <div className="space-y-4">
              {series.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>

                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>노래 {item.songs.length}개</span>
                      <span>•</span>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/series/${item.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/series/${item.id}/edit`}
                      className="p-2 text-blue-400 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              등록된 시리즈가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
