import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  BookOpen,
  Calculator,
  Heart,
  Lightbulb,
  Mail,
  Target,
  Users
} from "lucide-react"

import { ReactComponent as DiscordIcon } from "@/assets/icons/icon_discord.svg"
import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg"
import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "張開發",
      role: "首席開發工程師",
      description: "負責平台架構設計和核心功能開發",
      avatar: "/placeholder.svg?height=80&width=80",
      skills: ["React", "Node.js", "數學建模"],
    },
    {
      name: "李設計",
      role: "UI/UX 設計師",
      description: "負責用戶介面設計和用戶體驗優化",
      avatar: "/placeholder.svg?height=80&width=80",
      skills: ["Figma", "用戶研究", "視覺設計"],
    },
    {
      name: "王數學",
      role: "數學內容專家",
      description: "負責題目設計和數學內容審核",
      avatar: "/placeholder.svg?height=80&width=80",
      skills: ["高等數學", "教學設計", "LaTeX"],
    },
    {
      name: "陳測試",
      role: "品質保證工程師",
      description: "負責系統測試和品質控制",
      avatar: "/placeholder.svg?height=80&width=80",
      skills: ["自動化測試", "性能優化", "錯誤追蹤"],
    },
  ]

  const features = [
    {
      icon: Calculator,
      title: "LaTeX 編輯器",
      description: "強大的數學公式編輯器，支援即時預覽和語法高亮",
    },
    {
      icon: BookOpen,
      title: "豐富題庫",
      description: "涵蓋各個數學領域的精選題目，難度分級明確",
    },
    {
      icon: Users,
      title: "社群互動",
      description: "與全球數學愛好者交流學習心得和解題技巧",
    },
    {
      icon: Target,
      title: "個人化學習",
      description: "根據學習進度推薦適合的題目和概念",
    },
    {
      icon: Award,
      title: "成就系統",
      description: "完成挑戰獲得徽章，追蹤學習成果",
    },
    {
      icon: Lightbulb,
      title: "智能提示",
      description: "遇到困難時提供適當的提示和解題思路",
    },
  ]

  const stats = [
    { label: "註冊用戶", value: "50,000+", icon: Users },
    { label: "題目數量", value: "10,000+", icon: BookOpen },
    { label: "每日活躍", value: "5,000+", icon: Target },
    { label: "社群貢獻", value: "1,000+", icon: Heart },
  ]

  return (
    <div className="">
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <MathCatLogo className="mx-auto mb-6" />
            <h1 className="text-4xl   text-white mb-4">讓數學學習變得更簡單</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              MathHub 致力於為全球數學學習者提供最優質的學習平台，
              透過創新的技術和精心設計的內容，讓每個人都能享受數學的樂趣。
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={`stat-${stat.label}-${index}`} className="bg-slate-800/50 border-blue-400/20 text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl   text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <Card className="bg-slate-800/50 border-blue-400/20 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-red-400" />
              我們的使命
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                我們相信數學是理解世界的重要工具，但傳統的學習方式往往讓人望而卻步。 MathHub
                的誕生就是為了改變這種現狀，讓數學學習變得更加有趣、互動和有效。
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">創新教學</h3>
                  <p className="text-blue-200 text-sm">運用最新技術提供創新的學習體驗</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">社群驅動</h3>
                  <p className="text-blue-200 text-sm">建立活躍的學習社群，互相幫助成長</p>
                </div>
                <div className="text-center">
                  <Target className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">個人化學習</h3>
                  <p className="text-blue-200 text-sm">為每個學習者量身定制學習路徑</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl   text-white text-center mb-8">核心功能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={`feature-${feature.title}-${index}`}
                className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-colors"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl   text-white text-center mb-8">開發團隊</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={`${member.name}-${index}`} className="bg-slate-800/50 border-blue-400/20">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl text-blue-400">{member.name[0]}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                  <p className="text-blue-200 text-sm mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.map((skill, idx) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      <Badge key={`skill-${skill}-${idx}`} variant="outline" className="text-xs text-blue-300 border-blue-400/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card className="bg-slate-800/50 border-blue-400/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">聯絡我們</CardTitle>
            <CardDescription className="text-blue-200 text-center">有任何問題或建議，歡迎與我們聯繫</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-6">
              <Button
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                <GitHubIcon className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                <DiscordIcon className="w-4 h-4 mr-2" />
                Discord
              </Button>
              <Button
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
