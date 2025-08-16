import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl  ">{t("userPage.title")}</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">{t("userPage.btn.addUser")}</Button>
      </div>

      <Card className="bg-slate-800 border-blue-400/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.id")}</th>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.name")}</th>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.email")}</th>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.role")}</th>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.status")}</th>
                  <th className="text-left p-4 text-blue-200">{t("userPage.table.action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-700/50">
                    <td className="p-4 text-slate-300">{i}</td>
                    <td className="p-4 text-slate-300">用戶{i}</td>
                    <td className="p-4 text-slate-300">user{i}@example.com</td>
                    <td className="p-4 text-slate-300">{i === 1 ? "管理員" : "一般用戶"}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          i % 3 === 0
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {i % 3 === 0 ? "停用" : "啟用"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          編輯
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          刪除
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">顯示 1-5 / 共 24 筆</div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-400/30 text-blue-400 bg-transparent"
          >
            上一頁
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-400/30 text-blue-400 bg-transparent"
          >
            下一頁
          </Button>
        </div>
      </div>
    </div>
  );
}
