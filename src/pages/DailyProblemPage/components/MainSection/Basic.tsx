import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useDailyInfo } from "../../hook";

export default function Basic({ selectedGrade }: { selectedGrade: string }) {
  const { getGradeDescription } = useDailyInfo();
  return (
    <Card className="transition-colors bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40">
      <CardHeader>
        <CardTitle className="text-xl text-white">基礎</CardTitle>
        <CardDescription className="text-blue-200">
          {getGradeDescription(selectedGrade, "基礎")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-slate-700/30 border-slate-600">
            <div className="text-center">
              <p className="mb-2 text-blue-200">數學題目內容</p>
              <p className="text-sm text-slate-400">點擊開始解題</p>
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 focus:outline-none">
            開始解題
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
