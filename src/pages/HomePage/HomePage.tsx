import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getUUID } from "@/lib/utils"

import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg"
import { Bell, BookOpen, Calendar, PenTool, Search } from "lucide-react"

import { ReactComponent as DiscordIcon } from "@/assets/icons/icon_discord.svg"
import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg"

const Home = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="flex justify-center items-center mb-4">
              <MathCatLogo />
            </div>
            <p className="text-xl text-blue-200 mb-8">一個專為自學數學的平台</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="搜尋數學公式、概念或題目..."
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-400/30 bg-slate-800/50 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
              <Button
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-1" />
                搜尋
              </Button>
            </div>
          </div>

          {/* 公告預覽區域 - 移到搜尋欄下方 */}
          <section className="mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    最新公告
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" asChild>
                    <a href="/announcements">更多 →</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "系統維護通知",
                      date: "2025-01-02",
                      preview: "系統將於本週末進行例行維護，預計影響時間...",
                    },
                    {
                      title: "新功能上線",
                      date: "2025-01-01",
                      preview: "我們很高興宣布 LaTeX 編輯器新增了更多功能...",
                    },
                    {
                      title: "每日一題活動開始",
                      date: "2024-12-30",
                      preview: "全新的每日一題挑戰活動正式開始，歡迎大家參與...",
                    },
                  ].map((announcement, i) => (
                    <div
                      key={getUUID()}
                      className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-medium text-left">{announcement.title}</h4>
                        <span className="text-xs text-slate-400">{announcement.date}</span>
                      </div>
                      <p className="text-blue-200 text-sm text-left">{announcement.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 快速功能入口 */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">題庫</h3>
                <p className="text-blue-200 mb-4">豐富的數學題目練習</p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="/problems">開始練習</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">每日一題</h3>
                <p className="text-blue-200 mb-4">每天挑戰一道精選題目</p>
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <a href="/daily-problem">今日挑戰</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <PenTool className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">觀念學習</h3>
                <p className="text-blue-200 mb-4">系統化的數學概念</p>
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="/concepts">開始學習</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 分類 Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-8">分類</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card
                  key={getUUID()}
                  className="aspect-square hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer transform bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40"
                >
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-blue-200 mt-4">可以選擇已經編輯/學習的概念/項目</p>
          </section>

          {/* 問題 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                  <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">問題</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">簡單feature介紹</span>
                </p>
                <Input
                  placeholder="搜尋問題"
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>

          {/* 觀念 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">觀念</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">簡潔feature介紹</span>
                </p>
                <Input
                  placeholder="搜尋觀念"
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-blue-400/20 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-6">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <DiscordIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <GitHubIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <a href="/about">關於我們</a>
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-blue-200 text-sm">© 2025 MathHub. 讓數學學習變得更美好。</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
