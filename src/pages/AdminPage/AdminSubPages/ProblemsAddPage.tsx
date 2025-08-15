import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ProblemsAddPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">審題/新增題目</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">新增題目</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-blue-400/20 col-span-1">
          <CardHeader>
            <CardTitle className="text-white">待審核題目</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-blue-400/10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-4 hover:bg-slate-700/50 cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white">題目 #{i}</p>
                    <p className="text-xs text-slate-400">提交於 2023/06/12</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">待審核</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-blue-400/20 col-span-2">
          <CardHeader>
            <CardTitle className="text-white">題目詳情</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="problem-title"
                className="text-sm font-medium text-blue-200 block mb-1"
              >
                題目標題
              </label>
              <Input
                id="problem-title"
                placeholder="請輸入題目標題"
                className="bg-slate-900/50 border-blue-400/30 text-white"
              />
            </div>

            <div>
              <label
                htmlFor="problem-description"
                className="text-sm font-medium text-blue-200 block mb-1"
              >
                題目描述
              </label>
              <textarea
                id="problem-description"
                rows={6}
                className="w-full rounded-md bg-slate-900/50 border-blue-400/30 text-white p-3 placeholder:text-slate-400"
                placeholder="請輸入題目描述..."
              />
            </div>

            <div>
              <span className="text-sm font-medium text-blue-200 block mb-1">難度</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  簡單
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  中等
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  困難
                </Button>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-blue-200 block mb-1">分類</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  代數
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  幾何
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  微積分
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  統計
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  線性代數
                </Button>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button className="bg-green-600 hover:bg-green-700">核准</Button>
              <Button className="bg-red-600 hover:bg-red-700">拒絕</Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                儲存草稿
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
