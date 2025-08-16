import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl  ">留言管理</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            全部
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            待審核
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            已核准
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            已拒絕
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardContent className="p-6 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-blue-400/10 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700" />
                  <div>
                    <p className="font-medium text-white">用戶{i}</p>
                    <p className="text-xs text-slate-400">2023/06/12 14:30</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    i === 1
                      ? "bg-yellow-500/20 text-yellow-400"
                      : i === 2
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {i === 1 ? "待審核" : i === 2 ? "已核准" : "已拒絕"}
                </span>
              </div>
              <p className="text-blue-200 mb-4">這是一條留言內容，可能包含對題目的討論或者問題。</p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  回覆
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-400/30 text-green-400 bg-transparent"
                >
                  核准
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-400/30 text-red-400 bg-transparent"
                >
                  拒絕
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">顯示 1-4 / 共 18 筆</div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-400/30 text-blue-400 bg-transparent"
          >
            上一頁
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-400/30 text-blue-400 bg-transparent"
          >
            下一頁
          </Button>
        </div>
      </div>
    </div>
  );
}
