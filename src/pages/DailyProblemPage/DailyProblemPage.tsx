import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  CalendarIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Lock,
  Target,
  Trophy,
} from "lucide-react"
import { useState } from "react"

export default function DailyProblemPage() {
  const [selectedGrade, setSelectedGrade] = useState("國中二年級")

  // 模擬用戶進度數據
  const userProgress = {
    consecutiveDays: 51, // 連續天數
    correctAnswers: 12, // 答對題數
    lastCorrect: 3, // 上題答對天數
    basicCompleted: true, // 基礎是否完成
    advancedUnlocked: true, // 進階是否解鎖（簡化邏輯）
  }

  const gradeOptions = [
    { value: "國中一年級", label: "國中一年級", category: "國中" },
    { value: "國中二年級", label: "國中二年級", category: "國中" },
    { value: "國中三年級", label: "國中三年級", category: "國中" },
    { value: "高中一年級", label: "高中一年級", category: "高中" },
    { value: "高中二年級", label: "高中二年級", category: "高中" },
    { value: "高中三年級", label: "高中三年級", category: "高中" },
    { value: "大學數學", label: "大學數學", category: "大學" },
  ]

  const getGradeDescription = (grade: string, level: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      國中二年級: {
        基礎: "一元一次方程式",
        進階: "二元一次聯立方程式",
      },
      高中二年級: {
        基礎: "二次函數基本性質",
        進階: "二次函數圖形變換",
      },
      // 可以繼續添加其他年級...
    }

    return descriptions[grade]?.[level] || `${grade}${level}數學題目`
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl   text-white">每日一題</h1>
            <div className="flex items-center space-x-4">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-48 bg-slate-700/50 border-blue-400/30 text-white">
                  <SelectValue placeholder="選擇您的年級" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-blue-400/30">
                  {gradeOptions.map((grade) => (
                    <SelectItem key={grade.value} value={grade.value} className="text-white hover:bg-slate-700">
                      <div className="flex items-center justify-between w-full">
                        <span>{grade.label}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {grade.category}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Basic Problem */}
          <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-colors">
            <CardHeader>
              <CardTitle className="text-white text-xl">基礎</CardTitle>
              <CardDescription className="text-blue-200">{getGradeDescription(selectedGrade, "基礎")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-40 bg-slate-700/30 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                  <div className="text-center">
                    <p className="text-blue-200 mb-2">數學題目內容</p>
                    <p className="text-slate-400 text-sm">點擊開始解題</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">開始解題</Button>
              </div>
            </CardContent>
          </Card>

          {/* Date Display */}
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardContent className="p-8 text-center">
              <div className="text-3xl   text-white mb-2">May</div>
              <div className="text-8xl   text-blue-400 mb-2">5</div>
              <div className="text-blue-200 text-lg">2025</div>
            </CardContent>
          </Card>

          {/* Advanced Problem */}
          <Card
            className={`bg-slate-800/50 transition-colors ${
              userProgress.advancedUnlocked
                ? "border-purple-400/20 hover:border-purple-400/40"
                : "border-slate-600/20 opacity-60"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={`text-xl flex items-center ${
                  userProgress.advancedUnlocked ? "text-white" : "text-slate-400"
                }`}
              >
                進階
                {!userProgress.advancedUnlocked && <Lock className="w-5 h-5 ml-2" />}
              </CardTitle>
              <CardDescription className={userProgress.advancedUnlocked ? "text-purple-200" : "text-slate-500"}>
                {userProgress.advancedUnlocked ? getGradeDescription(selectedGrade, "進階") : "需要完成基礎題目"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`h-40 rounded-lg flex items-center justify-center relative ${
                    userProgress.advancedUnlocked
                      ? "bg-purple-700/20 border-2 border-dashed border-purple-600"
                      : "bg-slate-700/20"
                  }`}
                >
                  {userProgress.advancedUnlocked ? (
                    <div className="text-center">
                      <p className="text-purple-200 mb-2">進階數學題目</p>
                      <p className="text-purple-300 text-sm">挑戰更高難度</p>
                    </div>
                  ) : (
                    <>
                      <span className="text-slate-500">鎖定中</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-600/20 to-transparent">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(148, 163, 184, 0.1) 10px,
                            rgba(148, 163, 184, 0.1) 20px
                          )`,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <Button
                  disabled={!userProgress.advancedUnlocked}
                  className={`w-full ${
                    userProgress.advancedUnlocked
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-slate-700 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {userProgress.advancedUnlocked ? (
                    "開始挑戰"
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      已鎖定
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                學習統計
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/20">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
                  <span className="text-2xl   text-yellow-400">{userProgress.consecutiveDays}</span>
                </div>
                <p className="text-yellow-200 font-medium">連續答題天數</p>
                <p className="text-yellow-300 text-sm mt-1">🔥 保持熱度！</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                  <div className="text-2xl   text-green-400 mb-1">{userProgress.correctAnswers}</div>
                  <p className="text-green-200 text-sm">答對題數</p>
                  <div className="flex justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <div className="text-2xl   text-blue-400 mb-1">{userProgress.lastCorrect}</div>
                  <p className="text-blue-200 text-sm">上次連續</p>
                  <div className="flex justify-center mt-1">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200 text-sm">本月進度</span>
                  <span className="text-purple-400  ">75%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <p className="text-purple-300 text-xs mt-1">距離月度目標還差 8 題</p>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-400" />
                  <span className="text-2xl  ">2025 May</span>
                </span>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-blue-300 mb-3">
                  <div className="py-2">日</div>
                  <div className="py-2">一</div>
                  <div className="py-2">二</div>
                  <div className="py-2">三</div>
                  <div className="py-2">四</div>
                  <div className="py-2">五</div>
                  <div className="py-2">六</div>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* First week */}
                  <div />
                  <div />
                  <div />
                  <div />
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-200 transform hover:scale-110 shadow-lg">
                    1
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-all duration-200 transform hover:scale-110 shadow-lg">
                    2
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-200 transform hover:scale-110 shadow-lg">
                    3
                  </div>

                  {/* Second week */}
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-all duration-200 transform hover:scale-110 shadow-lg">
                    4
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-purple-500 text-white hover:bg-purple-600 cursor-pointer transition-all duration-200 transform hover:scale-110 ring-2 ring-purple-300 ring-offset-2 ring-offset-slate-800 shadow-xl">
                    5
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-700 text-blue-200 hover:bg-slate-600 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    6
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-700 text-blue-200 hover:bg-slate-600 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    7
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-700 text-blue-200 hover:bg-slate-600 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    8
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-700 text-blue-200 hover:bg-slate-600 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    9
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-700 text-blue-200 hover:bg-slate-600 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    10
                  </div>

                  {/* Third week */}
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    11
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    12
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    13
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    14
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    15
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    16
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    17
                  </div>

                  {/* Fourth week */}
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    18
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    19
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    20
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    21
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    22
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    23
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    24
                  </div>

                  {/* Fifth week */}
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    25
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    26
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    27
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    28
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    29
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    30
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-sm rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed opacity-50">
                    31
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="flex justify-center space-x-3 text-xs pt-3 border-t border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
                    <span className="text-blue-400 font-medium">基礎完成</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
                    <span className="text-green-400 font-medium">全部完成</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full ring-1 ring-purple-300 shadow-sm" />
                    <span className="text-purple-400 font-medium">今日</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-700 rounded-full shadow-sm" />
                    <span className="text-slate-400 font-medium">可用</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-slate-800 rounded-full opacity-50" />
                    <span className="text-slate-500 font-medium">鎖定</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Tips */}
          <Card className="bg-slate-800/50 border-blue-400/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                學習指南
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/20">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-blue-400 mr-2" />
                  <h4 className="text-blue-400 font-semibold">今日目標</h4>
                </div>
                <p className="text-blue-200 text-sm mb-2">完成基礎和進階題目</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                  <span className="text-blue-400 text-xs font-medium">1/2</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/20">
                <div className="flex items-center mb-2">
                  <Trophy className="w-5 h-5 text-green-400 mr-2" />
                  <h4 className="text-green-400 font-semibold">連續挑戰</h4>
                </div>
                <p className="text-green-200 text-sm">保持每日答題習慣</p>
                <p className="text-green-300 text-xs mt-1">🎯 目標：連續 60 天</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/20">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-purple-400 mr-2" />
                  <h4 className="text-purple-400 font-semibold">學習建議</h4>
                </div>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• 先完成基礎題目建立信心</li>
                  <li>• 進階題目需要更多思考時間</li>
                  <li>• 記錄解題思路和錯誤</li>
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
                <div className="flex items-center mb-2">
                  <CalendarIcon className="w-5 h-5 text-orange-400 mr-2" />
                  <h4 className="text-orange-400 font-semibold">本週重點</h4>
                </div>
                <p className="text-orange-200 text-sm">{selectedGrade} 重點概念複習</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">二次函數</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">三角函數</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
