import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Calendar,
  Crown,
  Medal,
  Star,
  Target,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"

export default function LeaderBoardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedCategory, setSelectedCategory] = useState("total-problems") // 新增
  const [selectedSubject, setSelectedSubject] = useState("all") // 新增
  const [selectedGrade, setSelectedGrade] = useState("all") // 新增
  const [selectedStreak, setSelectedStreak] = useState("all") // 新增

  const [currentUser] = useState({
    rank: 42,
    name: "我的帳號",
    score: 1850,
    solved: 28,
    streak: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  })

  const leaderboardData = {
    monthly: Array.from({ length: 100 }, (_, i) => ({
      rank: i + 1,
      name:
        i < 10
          ? [
              "數學天才",
              "解題高手",
              "公式達人",
              "微積分王",
              "代數專家",
              "幾何大師",
              "統計學者",
              "數論愛好者",
              "機率專家",
              "三角函數王",
            ][i]
          : `用戶${i + 1}`,
      score: 3000 - i * 15 - Math.floor(Math.random() * 50),
      solved: 50 - i - Math.floor(Math.random() * 5),
      streak: Math.max(1, 30 - i - Math.floor(Math.random() * 10)),
      avatar: "/placeholder.svg?height=40&width=40",
    })),
    weekly: [
      { rank: 1, name: "本週之星", score: 680, solved: 12, streak: 7, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 2, name: "週末戰士", score: 650, solved: 11, streak: 6, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 3, name: "每日挑戰者", score: 620, solved: 10, streak: 5, avatar: "/placeholder.svg?height=40&width=40" },
    ],
    allTime: [
      {
        rank: 1,
        name: "傳奇數學家",
        score: 15420,
        solved: 234,
        streak: 89,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "永恆學者",
        score: 14850,
        solved: 221,
        streak: 76,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "數學宗師",
        score: 14320,
        solved: 208,
        streak: 68,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-blue-400  ">{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500 text-black">冠軍</Badge>
      case 2:
        return <Badge className="bg-gray-400 text-white">亞軍</Badge>
      case 3:
        return <Badge className="bg-amber-600 text-white">季軍</Badge>
      default:
        return null
    }
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-blue-400/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">篩選條件</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 主要分類 */}
                <div>
                  <label htmlFor="ranking-type" className="text-sm font-medium text-blue-200 block mb-3">排行榜類型</label>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === "daily-problem" ? "default" : "outline"}
                      className={`w-full justify-start ${
                        selectedCategory === "daily-problem"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      }`}
                      onClick={() => setSelectedCategory("daily-problem")}
                    >
                      每日一題
                    </Button>
                    <Button
                      variant={selectedCategory === "total-problems" ? "default" : "outline"}
                      className={`w-full justify-start ${
                        selectedCategory === "total-problems"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                      }`}
                      onClick={() => setSelectedCategory("total-problems")}
                    >
                      總解題數
                    </Button>
                  </div>
                </div>

                {/* 時間範圍 */}
                <div>
                  <label htmlFor="time-range" className="text-sm font-medium text-blue-200 block mb-3">時間範圍</label>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <TabsList className="bg-slate-700/50 w-full">
                      <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600 flex-1">
                        本週
                      </TabsTrigger>
                      <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-600 flex-1">
                        本月
                      </TabsTrigger>
                      <TabsTrigger value="allTime" className="data-[state=active]:bg-blue-600 flex-1">
                        總排
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* 學科分類 */}
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-blue-200 block mb-3">學科分類</label>
                  <select
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-slate-700/50 border-blue-400/30 text-white rounded-md p-2 focus:border-blue-400 focus:ring-blue-400/20"
                  >
                    <option value="all">全部學科</option>
                    <option value="algebra">代數</option>
                    <option value="geometry">幾何</option>
                    <option value="calculus">微積分</option>
                    <option value="trigonometry">三角函數</option>
                    <option value="statistics">機率統計</option>
                    <option value="complex">複數</option>
                    <option value="linear-algebra">線性代數</option>
                  </select>
                </div>

                {/* 年級篩選 */}
                <div>
                  <label htmlFor="grade" className="text-sm font-medium text-blue-200 block mb-3">年級</label>
                  <select
                    id="grade"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full bg-slate-700/50 border-blue-400/30 text-white rounded-md p-2 focus:border-blue-400 focus:ring-blue-400/20"
                  >
                    <option value="all">全部年級</option>
                    <option value="elementary">國小</option>
                    <option value="junior-high">國中</option>
                    <option value="senior-high">高中</option>
                    <option value="university">大學</option>
                  </select>
                </div>

                {/* 連續答題天數 */}
                <div>
                    <label htmlFor="streak" className="text-sm font-medium text-blue-200 block mb-3">連續答題天數</label>
                  <select
                    id="streak"
                    value={selectedStreak}
                    onChange={(e) => setSelectedStreak(e.target.value)}
                    className="w-full bg-slate-700/50 border-blue-400/30 text-white rounded-md p-2 focus:border-blue-400 focus:ring-blue-400/20"
                  >
                    <option value="all">不限制</option>
                    <option value="7+">7天以上</option>
                    <option value="14+">14天以上</option>
                    <option value="30+">30天以上</option>
                    <option value="60+">60天以上</option>
                  </select>
                </div>

                {/* 重置按鈕 */}
                <Button
                  variant="outline"
                  className="w-full border-blue-400/30 text-blue-400 bg-transparent hover:bg-blue-400/10"
                  onClick={() => {
                    setSelectedCategory("total-problems")
                    setSelectedPeriod("monthly")
                    setSelectedSubject("all")
                    setSelectedGrade("all")
                    setSelectedStreak("all")
                  }}
                >
                  重置篩選
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Rankings */}
          <div className="lg:col-span-3">
            {/* Top 3 Podium */}
            <div className="mb-8">
              <h2 className="text-2xl   text-white text-center mb-6">本月前三名</h2>
              <div className="flex justify-center items-end space-x-4">
                {/* Second Place */}
                <Card className="bg-slate-800/50 border-gray-400/30 w-48">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Medal className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <Badge className="bg-gray-400 text-white">亞軍</Badge>
                    </div>
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback>解</AvatarFallback>
                    </Avatar>
                    <h3 className="text-white  ">解題高手</h3>
                    <p className="text-blue-200 text-sm">2720 分</p>
                  </CardContent>
                </Card>

                {/* First Place */}
                <Card className="bg-slate-800/50 border-yellow-400/30 w-52 transform scale-110">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                      <Badge className="bg-yellow-500 text-black">冠軍</Badge>
                    </div>
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback>數</AvatarFallback>
                    </Avatar>
                    <h3 className="text-white   text-lg">數學天才</h3>
                    <p className="text-yellow-400  ">2850 分</p>
                  </CardContent>
                </Card>

                {/* Third Place */}
                <Card className="bg-slate-800/50 border-amber-600/30 w-48">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Award className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                      <Badge className="bg-amber-600 text-white">季軍</Badge>
                    </div>
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" />
                      <AvatarFallback>公</AvatarFallback>
                    </Avatar>
                    <h3 className="text-white  ">公式達人</h3>
                    <p className="text-blue-200 text-sm">2650 分</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Rankings */}
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl">詳細排名</CardTitle>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <TabsList className="bg-slate-700/50">
                      <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600">
                        本週
                      </TabsTrigger>
                      <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-600">
                        本月
                      </TabsTrigger>
                      <TabsTrigger value="allTime" className="data-[state=active]:bg-blue-600">
                        總排行
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* 滾動區域 */}
                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-1 p-4">
                    {leaderboardData[selectedPeriod as keyof typeof leaderboardData].map((user, index) => (
                      <div
                        key={`leaderboard-${user.rank}-${index}`}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors hover:bg-slate-700/30 ${
                          user.rank <= 3
                            ? "bg-slate-700/20 border border-blue-400/20"
                            : user.rank === currentUser.rank
                              ? "bg-orange-500/20 border border-orange-400/30"
                              : "bg-slate-700/10"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3
                                className={`font-medium ${user.rank === currentUser.rank ? "text-orange-300" : "text-white"}`}
                              >
                                {user.name}
                              </h3>
                              {getRankBadge(user.rank)}
                              {user.rank === currentUser.rank && (
                                <Badge className="bg-orange-500 text-white text-xs">你</Badge>
                              )}
                            </div>
                            <p
                              className={`text-sm ${user.rank === currentUser.rank ? "text-orange-200" : "text-blue-200"}`}
                            >
                              連續 {user.streak} 天
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-right">
                          <div>
                            <p
                              className={`  text-lg ${user.rank === currentUser.rank ? "text-orange-300" : "text-white"}`}
                            >
                              {user.score}
                            </p>
                            <p
                              className={`text-sm ${user.rank === currentUser.rank ? "text-orange-200" : "text-blue-200"}`}
                            >
                              總分
                            </p>
                          </div>
                          <div>
                            <p
                              className={`font-medium ${user.rank === currentUser.rank ? "text-orange-400" : "text-green-400"}`}
                            >
                              {user.solved}
                            </p>
                            <p
                              className={`text-sm ${user.rank === currentUser.rank ? "text-orange-200" : "text-blue-200"}`}
                            >
                              已解題
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp
                              className={`w-4 h-4 ${user.rank === currentUser.rank ? "text-orange-400" : "text-blue-400"}`}
                            />
                            <span
                              className={`text-sm ${user.rank === currentUser.rank ? "text-orange-400" : "text-blue-400"}`}
                            >
                              +{Math.floor(Math.random() * 50) + 10}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 固定在底部的當前用戶排名 */}
                <div className="border-t border-blue-400/20 bg-slate-800/80 p-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-orange-500/20 border border-orange-400/30">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8">
                        <span className="w-6 h-6 flex items-center justify-center text-orange-400  ">
                          {currentUser.rank}
                        </span>
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>我</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-orange-300 font-medium">{currentUser.name}</h3>
                          <Badge className="bg-orange-500 text-white text-xs">你</Badge>
                        </div>
                        <p className="text-orange-200 text-sm">連續 {currentUser.streak} 天</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <p className="text-orange-300   text-lg">{currentUser.score}</p>
                        <p className="text-orange-200 text-sm">總分</p>
                      </div>
                      <div>
                        <p className="text-orange-400 font-medium">{currentUser.solved}</p>
                        <p className="text-orange-200 text-sm">已解題</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 text-sm">+15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-slate-800/50 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    本週亮點
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-200">最高單日得分</span>
                      <span className="text-white  ">285分</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">最長連勝</span>
                      <span className="text-white  ">12題</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">完美解答</span>
                      <span className="text-white  ">8次</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-400" />
                    挑戰目標
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-200">月度目標</span>
                        <span className="text-white">75%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-blue-200">連續天數</span>
                        <span className="text-white">90%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: "90%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                    活動預告
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
                      <h4 className="text-purple-400 font-medium">數學競賽週</h4>
                      <p className="text-blue-200 text-sm">1月20日 - 1月27日</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                      <h4 className="text-green-400 font-medium">團隊挑戰</h4>
                      <p className="text-blue-200 text-sm">2月1日開始</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
