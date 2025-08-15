import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl  ">公告編輯</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">新增公告</Button>
      </div>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left p-4 text-blue-200">ID</th>
                  <th className="text-left p-4 text-blue-200">標題</th>
                  <th className="text-left p-4 text-blue-200">發布日期</th>
                  <th className="text-left p-4 text-blue-200">狀態</th>
                  <th className="text-left p-4 text-blue-200">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-700/50">
                    <td className="p-4 text-slate-300">{i}</td>
                    <td className="p-4 text-slate-300">系統公告 #{i}</td>
                    <td className="p-4 text-slate-300">2023/06/{10 + i}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          i % 2 === 0 ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {i % 2 === 0 ? "已發布" : "草稿"}
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
                          刪除
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

      <Card className="bg-slate-800 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-white">編輯公告</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="announcement-title"
              className="text-sm font-medium text-blue-200 block mb-1"
            >
              公告標題
            </label>
            <Input
              id="announcement-title"
              placeholder="請輸入公告標題"
              className="bg-slate-900/50 border-blue-400/30 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="announcement-content"
              className="text-sm font-medium text-blue-200 block mb-1"
            >
              公告內容
            </label>
            <textarea
              id="announcement-content"
              rows={8}
              className="w-full rounded-md bg-slate-900/50 border-blue-400/30 text-white p-3 placeholder:text-slate-400"
              placeholder="請輸入公告內容..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pinned" className="rounded bg-slate-900/50 border-blue-400/30" />
            <label htmlFor="pinned" className="text-sm text-blue-200">
              置頂公告
            </label>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">發布公告</Button>
            <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
              儲存草稿
            </Button>
            <Button variant="outline" className="border-red-400/30 text-red-400 bg-transparent">
              取消
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
