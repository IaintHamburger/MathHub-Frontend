"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Bell,
  Calendar,
  Info,
  Megaphone,
  Pin,
  Search,
  Star,
} from "lucide-react"
import { useState } from "react"

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const announcements = [
    {
      id: 1,
      title: "🎉 MathHub 2.0 重大更新上線！",
      content:
        "我們很興奮地宣布 MathHub 2.0 正式上線！新版本包含全新的 LaTeX 編輯器、改進的題庫系統、個人化學習路徑，以及更直觀的用戶介面。感謝所有用戶的耐心等待和寶貴建議。",
      category: "功能更新",
      date: "2024-01-15",
      author: "MathHub 開發團隊",
      priority: "high",
      pinned: true,
      tags: ["更新", "新功能", "LaTeX"],
    },
    {
      id: 2,
      title: "🏆 寒假數學競賽報名開始",
      content:
        "2024年寒假數學競賽現已開放報名！比賽將於1月20日至2月10日舉行，分為初級、中級、高級三個組別。獲勝者將獲得豐厚獎品和證書。報名截止日期：1月18日。",
      category: "活動公告",
      date: "2024-01-12",
      author: "活動組織委員會",
      priority: "high",
      pinned: true,
      tags: ["競賽", "寒假", "報名"],
    },
    {
      id: 3,
      title: "⚠️ 系統維護通知",
      content:
        "為了提供更好的服務品質，我們將於1月16日凌晨2:00-6:00進行系統維護。維護期間網站將暫時無法訪問，請提前安排學習時間。造成不便，敬請諒解。",
      category: "系統公告",
      date: "2024-01-10",
      author: "技術團隊",
      priority: "medium",
      pinned: false,
      tags: ["維護", "系統", "通知"],
    },
    {
      id: 4,
      title: "📚 新增微積分進階題庫",
      content:
        "應廣大用戶要求，我們新增了微積分進階題庫，包含極限、導數、積分等高難度題目。適合準備大學入學考試和數學競賽的同學練習。",
      category: "內容更新",
      date: "2024-01-08",
      author: "內容團隊",
      priority: "low",
      pinned: false,
      tags: ["微積分", "題庫", "進階"],
    },
    {
      id: 5,
      title: "🎯 每日一題挑戰活動開始",
      content:
        "全新的每日一題挑戰活動正式開始！每天完成一道精選題目，連續完成可獲得積分獎勵。連續30天完成挑戰的用戶將獲得特殊徽章和稱號。",
      category: "活動公告",
      date: "2024-01-05",
      author: "社群管理員",
      priority: "medium",
      pinned: false,
      tags: ["每日一題", "挑戰", "積分"],
    },
    {
      id: 6,
      title: "🔧 修復已知問題",
      content:
        "我們已修復以下問題：LaTeX 公式渲染延遲、搜尋功能偶爾失效、個人資料頁面載入緩慢。如果您仍遇到問題，請聯絡客服。",
      category: "錯誤修復",
      date: "2024-01-03",
      author: "技術團隊",
      priority: "low",
      pinned: false,
      tags: ["修復", "LaTeX", "搜尋"],
    },
  ]

  const categories = [
    { value: "all", label: "全部", icon: Bell },
    { value: "功能更新", label: "功能更新", icon: Star },
    { value: "活動公告", label: "活動公告", icon: Megaphone },
    { value: "系統公告", label: "系統公告", icon: AlertTriangle },
    { value: "內容更新", label: "內容更新", icon: Info },
    { value: "錯誤修復", label: "錯誤修復", icon: Info },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 border-red-400/30 text-red-400"
      case "medium":
        return "bg-yellow-500/10 border-yellow-400/30 text-yellow-400"
      case "low":
        return "bg-blue-500/10 border-blue-400/30 text-blue-400"
      default:
        return "bg-gray-500/10 border-gray-400/30 text-gray-400"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "功能更新":
        return "bg-green-600"
      case "活動公告":
        return "bg-purple-600"
      case "系統公告":
        return "bg-orange-600"
      case "內容更新":
        return "bg-blue-600"
      case "錯誤修復":
        return "bg-gray-600"
      default:
        return "bg-slate-600"
    }
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.pinned)
  const regularAnnouncements = filteredAnnouncements.filter((a) => !a.pinned)

  return (
    <div className="">
      <div className="max-w-6xl mx-auto p-6">
        {/* Search and Filter */}
        <Card className="bg-slate-800/50 border-blue-400/20 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <Input
                  placeholder="搜尋公告..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-blue-400/30 text-white placeholder:text-blue-200"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-slate-700/50">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-blue-600"
                    >
                      <category.icon className="w-4 h-4 mr-1" />
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl   text-white mb-4 flex items-center">
              <Pin className="w-5 h-5 mr-2 text-yellow-400" />
              置頂公告
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="bg-slate-800/50 border-yellow-400/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Pin className="w-4 h-4 text-yellow-400" />
                          <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                          <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                            {announcement.priority === "high"
                              ? "重要"
                              : announcement.priority === "medium"
                                ? "一般"
                                : "普通"}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-lg mb-2">{announcement.title}</CardTitle>
                        <CardDescription className="text-blue-200 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {announcement.date} • {announcement.author}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 mb-4 leading-relaxed">{announcement.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {announcement.tags.map((tag, index) => (
                        <Badge key={`tag-${announcement.id}-${index}`} variant="outline" className="text-blue-300 border-blue-400/30">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div>
          <h2 className="text-xl   text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-400" />
            所有公告
          </h2>
          <div className="space-y-4">
            {regularAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(announcement.category)}>{announcement.category}</Badge>
                        <Badge variant="outline" className={getPriorityColor(announcement.priority)}>
                          {announcement.priority === "high"
                            ? "重要"
                            : announcement.priority === "medium"
                              ? "一般"
                              : "普通"}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg mb-2">{announcement.title}</CardTitle>
                      <CardDescription className="text-blue-200 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {announcement.date} • {announcement.author}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4 leading-relaxed">{announcement.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {announcement.tags.map((tag, index) => (
                      <Badge key={`tag-${announcement.id}-${index}`} variant="outline" className="text-blue-300 border-blue-400/30">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">沒有找到相關公告</h3>
              <p className="text-blue-200">請嘗試調整搜尋條件或選擇不同的分類</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
