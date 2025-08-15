import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProblemsStatusPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl  ">修改題目狀態</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            全部
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            已發布
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            草稿
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            已下架
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left p-4 text-blue-200">ID</th>
                  <th className="text-left p-4 text-blue-200">題目標題</th>
                  <th className="text-left p-4 text-blue-200">難度</th>
                  <th className="text-left p-4 text-blue-200">分類</th>
                  <th className="text-left p-4 text-blue-200">狀態</th>
                  <th className="text-left p-4 text-blue-200">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-700/50">
                    <td className="p-4 text-slate-300">{i}</td>
                    <td className="p-4 text-slate-300">數學題目 #{i}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          i % 3 === 0
                            ? "bg-red-500/20 text-red-400"
                            : i % 3 === 1
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {i % 3 === 0 ? "困難" : i % 3 === 1 ? "中等" : "簡單"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">{i % 2 === 0 ? "代數" : i % 3 === 0 ? "幾何" : "微積分"}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          i % 3 === 0
                            ? "bg-slate-500/20 text-slate-400"
                            : i % 3 === 1
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {i % 3 === 0 ? "草稿" : i % 3 === 1 ? "已下架" : "已發布"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          編輯
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-green-300"
                        >
                          發布
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          下架
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">顯示 1-5 / 共 42 筆</div>
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
  )
}
