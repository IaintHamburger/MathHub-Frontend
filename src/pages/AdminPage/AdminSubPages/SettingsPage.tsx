import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">系統設定</h2>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-white">基本設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="site-name"
              className="text-sm font-medium text-blue-200 block mb-1"
            >
              網站名稱
            </label>
            <Input
              id="site-name"
              placeholder="MathHub"
              className="bg-slate-900/50 border-blue-400/30 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="site-description"
              className="text-sm font-medium text-blue-200 block mb-1"
            >
              網站描述
            </label>
            <Input
              id="site-description"
              placeholder="一個專為自學數學的平台"
              className="bg-slate-900/50 border-blue-400/30 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="text-sm font-medium text-blue-200 block mb-1"
            >
              聯絡信箱
            </label>
            <Input
              id="contact-email"
              placeholder="contact@mathhub.com"
              className="bg-slate-900/50 border-blue-400/30 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="maintenance" className="rounded bg-slate-900/50 border-blue-400/30" />
            <label htmlFor="maintenance" className="text-sm text-blue-200">
              維護模式
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-white">權限設定</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm font-medium text-blue-200 block mb-1">用戶註冊</span>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                開放
              </Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                關閉
              </Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                邀請制
              </Button>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-blue-200 block mb-1">留言審核</span>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                自動通過
              </Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                需要審核
              </Button>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-blue-200 block mb-1">題目提交</span>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                所有用戶
              </Button>
              <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
                僅管理員
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button className="bg-blue-600 hover:bg-blue-700">儲存設定</Button>
        <Button variant="outline" className="border-blue-400/30 text-blue-400 bg-transparent">
          重置
        </Button>
      </div>
    </div>
  )
}
