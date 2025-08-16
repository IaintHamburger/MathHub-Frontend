import { CheckCircle, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const userProgress = {
  consecutiveDays: 51, // 連續天數
  correctAnswers: 12, // 答對題數
  lastCorrect: 3, // 上題答對天數
  basicCompleted: true, // 基礎是否完成
  advancedUnlocked: true, // 進階是否解鎖（簡化邏輯）
};

export default function Statistics({}) {
  return (
    <Card className="bg-slate-800/50 border-blue-400/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          學習統計
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 text-center border rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/20">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-8 h-8 mr-2 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">
              {userProgress.consecutiveDays}
            </span>
          </div>
          <p className="font-medium text-yellow-200">連續答題天數</p>
          <p className="mt-1 text-sm text-yellow-300">🔥 保持熱度！</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 text-center border rounded-lg bg-green-500/10 border-green-400/20">
            <div className="mb-1 text-2xl font-bold text-green-400">
              {userProgress.correctAnswers}
            </div>
            <p className="text-sm text-green-200">答對題數</p>
            <div className="flex justify-center mt-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <div className="p-3 text-center border rounded-lg bg-blue-500/10 border-blue-400/20">
            <div className="mb-1 text-2xl font-bold text-blue-400">{userProgress.lastCorrect}</div>
            <p className="text-sm text-blue-200">上次連續</p>
            <div className="flex justify-center mt-1">
              <Target className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="p-3 border rounded-lg bg-purple-500/10 border-purple-400/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-200">本月進度</span>
            <span className="font-bold text-purple-400">75%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: "75%" }}
            />
          </div>
          <p className="mt-1 text-xs text-purple-300">距離月度目標還差 8 題</p>
        </div>
      </CardContent>
    </Card>
  );
}
