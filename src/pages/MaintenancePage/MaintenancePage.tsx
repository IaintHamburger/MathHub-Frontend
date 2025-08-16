import { ReactComponent as MathCatLogo } from "@/assets/MathCat_Full.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, Clock, Settings } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-slate-800/70 border-blue-400/20 mx-4">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-3">
            <MathCatLogo />
          </div>
          <div className="flex justify-center">
            <div className="p-4 bg-yellow-500/20 rounded-full">
              <Settings className="w-12 h-12 text-yellow-400 animate-spin" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div>
            <h2 className="text-2xl text-white mb-2">系統維護中</h2>
            <p className="text-blue-200 text-lg">
              我們正在進行系統升級和維護，以提供更好的服務體驗
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-200 font-medium">預計完成時間</span>
              </div>
              <p className="text-white text-lg">2024年1月15日 18:00</p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-200 font-medium">維護狀態</span>
              </div>
              <p className="text-white text-lg">進行中</p>
            </div>
          </div>

          <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-400/20">
            <h3 className="text-xl font-semibold text-white mb-3">維護內容</h3>
            <ul className="text-blue-200 space-y-2 text-left">
              <li>• 系統性能優化</li>
              <li>• 數據庫升級</li>
              <li>• 新功能部署</li>
              <li>• 安全性增強</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-blue-200 mb-4">維護期間造成的不便，我們深感抱歉</p>
            <p className="text-slate-400 text-sm">
              如有緊急問題，請聯繫：
              <a
                href="mailto:support@mathhub.com"
                className="text-blue-400 hover:text-blue-300 ml-1"
              >
                support@mathhub.com
              </a>
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
