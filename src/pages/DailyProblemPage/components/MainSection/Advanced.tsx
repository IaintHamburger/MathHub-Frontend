import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useDailyInfo } from "../../hook";

export default function Advanced({ selectedGrade }: { selectedGrade: string }) {
  const { userProgress, getGradeDescription } = useDailyInfo();
  return (
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
        <CardDescription
          className={userProgress.advancedUnlocked ? "text-purple-200" : "text-slate-500"}
        >
          {userProgress.advancedUnlocked
            ? getGradeDescription(selectedGrade, "進階")
            : "需要完成基礎題目"}
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
                <p className="mb-2 text-purple-200">進階數學題目</p>
                <p className="text-sm text-purple-300">挑戰更高難度</p>
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
  );
}
