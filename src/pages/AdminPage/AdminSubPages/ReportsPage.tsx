import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">檢舉審核</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            全部
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            待處理
          </Button>
          <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
            已處理
          </Button>
        </div>
      </div>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardContent className="p-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-blue-400/10 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">檢舉 #{i}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        i === 1 ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {i === 1 ? "待處理" : "已處理"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">2023/06/12 14:30</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">檢舉類型: {i === 1 ? "留言" : "題目"}</p>
                  <p className="text-xs text-slate-400">檢舉者: 用戶{i}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-200 mb-2">檢舉原因:</p>
                <p className="text-slate-300">
                  這個{i === 1 ? "留言" : "題目"}
                  包含不適當的內容，違反了社區規範。具體來說，它包含了錯誤的數學概念，可能會誤導其他用戶。
                </p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-200 mb-2">被檢舉內容:</p>
                <p className="text-slate-300">
                  {i === 1
                    ? "這是一條被檢舉的留言內容，可能包含不適當或錯誤的信息。"
                    : "這是一個被檢舉的題目內容，可能包含不適當或錯誤的信息。"}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  核准檢舉
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  駁回檢舉
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  查看詳情
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">顯示 1-3 / 共 7 筆</div>
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
