import { AlertTriangle, FileText, MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 統計卡片組件
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red";
}) {
  const bgColor = {
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    red: "bg-red-500/20 text-red-400",
  };

  return (
    <Card className="bg-slate-800 border-blue-400/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-3xl   text-white mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${bgColor[color]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// 儀表板內容
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="總用戶數" value="1,234" icon={<Users size={24} />} color="blue" />
        <StatCard title="待審題目" value="42" icon={<FileText size={24} />} color="green" />
        <StatCard title="未處理留言" value="18" icon={<MessageSquare size={24} />} color="yellow" />
        <StatCard title="檢舉案件" value="7" icon={<AlertTriangle size={24} />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-white">最近活動</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 pb-4 border-b border-blue-400/10"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-200">用戶提交了新題目</p>
                    <p className="text-xs text-slate-400">2小時前</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-white">系統狀態</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">CPU 使用率</span>
                  <span className="text-sm text-blue-200">28%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "28%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">記憶體使用率</span>
                  <span className="text-sm text-blue-200">64%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "64%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-200">儲存空間</span>
                  <span className="text-sm text-blue-200">42%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
