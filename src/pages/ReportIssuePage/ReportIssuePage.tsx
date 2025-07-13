import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Bug, Lightbulb, Send } from "lucide-react"

export default function ReportIssuePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">問題回報</h1>
          <p className="text-blue-200 text-lg">遇到問題或有建議嗎？請告訴我們，我們會盡快處理您的回饋。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Issue Types */}
          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-red-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Bug className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">錯誤回報</h3>
              <p className="text-blue-200 text-sm">回報系統錯誤、功能異常或其他技術問題</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-yellow-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">功能建議</h3>
              <p className="text-blue-200 text-sm">提出新功能想法或改善現有功能的建議</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-orange-400/40 transition-colors">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">內容問題</h3>
              <p className="text-blue-200 text-sm">回報題目錯誤、概念說明不清楚等內容問題</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Form */}
        <Card className="bg-slate-800/50 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">提交問題回報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueType" className="block text-white font-medium mb-2">問題類型 *</label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder="選擇問題類型" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    <SelectItem value="bug" className="text-white hover:bg-slate-700">
                      🐛 錯誤回報
                    </SelectItem>
                    <SelectItem value="feature" className="text-white hover:bg-slate-700">
                      💡 功能建議
                    </SelectItem>
                    <SelectItem value="content" className="text-white hover:bg-slate-700">
                      ⚠️ 內容問題
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700">
                      📝 其他
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-white font-medium mb-2">優先級</label>
                <Select>
                  <SelectTrigger className="bg-slate-700/50 border-blue-400/30 text-white">
                    <SelectValue placeholder="選擇優先級" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-blue-400/30">
                    <SelectItem value="low" className="text-white hover:bg-slate-700">
                      🟢 低 - 一般問題
                    </SelectItem>
                    <SelectItem value="medium" className="text-white hover:bg-slate-700">
                      🟡 中 - 影響使用體驗
                    </SelectItem>
                    <SelectItem value="high" className="text-white hover:bg-slate-700">
                      🟠 高 - 重要功能異常
                    </SelectItem>
                    <SelectItem value="critical" className="text-white hover:bg-slate-700">
                      🔴 緊急 - 系統無法使用
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-white font-medium mb-2">問題標題 *</label>
              <Input
                placeholder="簡短描述您遇到的問題"
                className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">詳細描述 *</label>
              <Textarea
                placeholder="請詳細描述問題的情況，包括：&#10;1. 您在做什麼時遇到這個問題？&#10;2. 預期的結果是什麼？&#10;3. 實際發生了什麼？&#10;4. 如何重現這個問題？"
                rows={8}
                className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">您的電子郵件</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
                <p className="text-blue-300 text-sm mt-1">選填，用於回覆您的問題</p>
              </div>

              <div>
                <label htmlFor="browser" className="block text-white font-medium mb-2">瀏覽器資訊</label>
                <Input
                  placeholder="Chrome 120, Safari 17, Firefox 121..."
                  className="bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
                <p className="text-blue-300 text-sm mt-1">選填，有助於我們診斷問題</p>
              </div>
            </div>

            <div>
              <label htmlFor="screenshot" className="block text-white font-medium mb-2">螢幕截圖或附件</label>
              <div className="border-2 border-dashed border-blue-400/30 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors cursor-pointer">
                <div className="text-blue-300">
                  <p className="mb-2">點擊上傳檔案或拖拽檔案到此處</p>
                  <p className="text-sm">支援 PNG, JPG, GIF, PDF 格式，最大 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                className="border-blue-400/30 text-blue-300 hover:bg-slate-700/50 bg-transparent"
              >
                取消
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                提交回報
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        {/* <div className="mt-8 text-center">
          <p className="text-blue-200 mb-4">您也可以透過其他方式聯絡我們：</p>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              Discord 社群
            </Button>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              <Github className="w-5 h-5 mr-2" />
              GitHub Issues
            </Button>
          </div>
        </div> */}
      </main>
    </div>
  )
}
