import { prisma } from "@/lib/db";
import { Eye, Check, X, Clock } from "lucide-react";

export default async function SubmissionsPage() {
  // 대기 중인 제안들 가져오기
  const pendingSongSubmissions = await prisma.songSubmission.findMany({
    where: { status: "PENDING" },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pendingSeriesSubmissions = await prisma.seriesSubmission.findMany({
    where: { status: "PENDING" },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">제안 관리</h1>
        <p className="text-gray-600">사용자 제안을 검토하고 승인/거부하세요</p>
      </div>

      {/* 노래 제안 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            노래 제안 ({pendingSongSubmissions.length}개)
          </h2>
        </div>
        <div className="p-6">
          {pendingSongSubmissions.length > 0 ? (
            <div className="space-y-4">
              {pendingSongSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {submission.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {submission.animeTitle} • {submission.type}
                        {submission.season && ` • ${submission.season}`}
                      </p>
                      {submission.artist && (
                        <p className="text-sm text-gray-500 mt-1">
                          아티스트: {submission.artist}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>
                          제안자:{" "}
                          {submission.user.name || submission.user.email}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(submission.createdAt).toLocaleDateString(
                            "ko-KR"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:text-green-600">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              대기 중인 노래 제안이 없습니다.
            </p>
          )}
        </div>
      </div>

      {/* 시리즈 제안 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            시리즈 제안 ({pendingSeriesSubmissions.length}개)
          </h2>
        </div>
        <div className="p-6">
          {pendingSeriesSubmissions.length > 0 ? (
            <div className="space-y-4">
              {pendingSeriesSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {submission.title}
                      </h3>
                      {submission.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {submission.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>
                          제안자:{" "}
                          {submission.user.name || submission.user.email}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(submission.createdAt).toLocaleDateString(
                            "ko-KR"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:text-green-600">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              대기 중인 시리즈 제안이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
