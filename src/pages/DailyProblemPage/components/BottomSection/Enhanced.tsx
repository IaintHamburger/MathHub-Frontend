import { BookOpen, CalendarIcon, Lightbulb, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Enhanced({ selectedGrade }: { selectedGrade: string }) {
  return (
    <Card className="bg-slate-800/50 border-blue-400/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
          學習指南
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/20">
          <div className="flex items-center mb-2">
            <Target className="w-5 h-5 mr-2 text-blue-400" />
            <h4 className="font-semibold text-blue-400">今日目標</h4>
          </div>
          <p className="mb-2 text-sm text-blue-200">完成基礎和進階題目</p>
          <div className="flex items-center space-x-2">
            <div className="w-full h-2 rounded-full bg-slate-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: "50%" }}
              />
            </div>
            <span className="text-xs font-medium text-blue-400">1/2</span>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/20">
          <div className="flex items-center mb-2">
            <Trophy className="w-5 h-5 mr-2 text-green-400" />
            <h4 className="font-semibold text-green-400">連續挑戰</h4>
          </div>
          <p className="text-sm text-green-200">保持每日答題習慣</p>
          <p className="mt-1 text-xs text-green-300">🎯 目標：連續 60 天</p>
        </div>

        <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/20">
          <div className="flex items-center mb-2">
            <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
            <h4 className="font-semibold text-purple-400">學習建議</h4>
          </div>
          <ul className="space-y-1 text-sm text-purple-200">
            <li>• 先完成基礎題目建立信心</li>
            <li>• 進階題目需要更多思考時間</li>
            <li>• 記錄解題思路和錯誤</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/20">
          <div className="flex items-center mb-2">
            <CalendarIcon className="w-5 h-5 mr-2 text-orange-400" />
            <h4 className="font-semibold text-orange-400">本週重點</h4>
          </div>
          <p className="text-sm text-orange-200">{selectedGrade} 重點概念複習</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-1 text-xs text-orange-300 rounded bg-orange-500/20">
              二次函數
            </span>
            <span className="px-2 py-1 text-xs text-orange-300 rounded bg-orange-500/20">
              三角函數
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
