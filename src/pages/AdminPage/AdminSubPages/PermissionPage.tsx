import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 權限管理內容
export default function PermissionPage() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [selectedUser, setSelectedUser] = useState(null);

  const roles = [
    { id: "admin", name: "管理員", color: "red", members: 2 },
    { id: "moderator", name: "版主", color: "blue", members: 5 },
    { id: "teacher", name: "教師", color: "green", members: 12 },
    { id: "student", name: "學生", color: "gray", members: 1234 },
  ];

  const permissions = [
    { id: "manage_users", name: "管理用戶", description: "創建、編輯、刪除用戶帳號" },
    { id: "manage_problems", name: "管理題目", description: "新增、編輯、刪除題目" },
    { id: "manage_comments", name: "管理留言", description: "審核、刪除用戶留言" },
    { id: "manage_announcements", name: "管理公告", description: "發布、編輯公告" },
    { id: "view_reports", name: "查看檢舉", description: "查看和處理檢舉案件" },
    { id: "manage_system", name: "系統管理", description: "修改系統設定" },
    { id: "submit_problems", name: "提交題目", description: "提交新題目供審核" },
    { id: "comment", name: "發表留言", description: "在題目下方發表留言" },
    { id: "report", name: "檢舉內容", description: "檢舉不當內容" },
    { id: "view_leaderboard", name: "查看排行榜", description: "查看用戶排行榜" },
  ];

  const rolePermissions = {
    admin: [
      "manage_users",
      "manage_problems",
      "manage_comments",
      "manage_announcements",
      "view_reports",
      "manage_system",
      "submit_problems",
      "comment",
      "report",
      "view_leaderboard",
    ],
    moderator: [
      "manage_comments",
      "view_reports",
      "submit_problems",
      "comment",
      "report",
      "view_leaderboard",
    ],
    teacher: ["submit_problems", "comment", "report", "view_leaderboard"],
    student: ["comment", "report", "view_leaderboard"],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">權限管理</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">新增角色</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 角色列表 */}
        <Card className="bg-slate-800 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-white">角色列表</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-blue-400/10">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 hover:bg-slate-700/50 cursor-pointer transition-colors ${
                    selectedRole === role.id ? "bg-slate-700/50 border-l-4 border-blue-400" : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          role.color === "red"
                            ? "bg-red-500"
                            : role.color === "blue"
                              ? "bg-blue-500"
                              : role.color === "green"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-white">{role.name}</p>
                        <p className="text-xs text-slate-400">{role.members} 位成員</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 權限設定 */}
        <Card className="bg-slate-800 border-blue-400/20 col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{roles.find((r) => r.id === selectedRole)?.name} 權限設定</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  重置
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  儲存
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {permissions.map((permission) => {
                const hasPermission = rolePermissions[selectedRole]?.includes(permission.id);
                return (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={hasPermission}
                          className="rounded bg-slate-900/50 border-blue-400/30"
                          readOnly
                        />
                        <div>
                          <p className="font-medium text-white">{permission.name}</p>
                          <p className="text-sm text-slate-400">{permission.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 成員管理 */}
      <Card className="bg-slate-800 border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-white">角色成員管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="搜尋用戶..."
                  className="bg-slate-900/50 border-blue-400/30 text-white w-64"
                />
                <Button
                  variant="outline"
                  className="border-blue-400/30 text-blue-400 bg-transparent"
                >
                  搜尋
                </Button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">添加成員</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="text-left p-4 text-blue-200">用戶</th>
                    <th className="text-left p-4 text-blue-200">當前角色</th>
                    <th className="text-left p-4 text-blue-200">加入時間</th>
                    <th className="text-left p-4 text-blue-200">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-slate-700/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                          <div>
                            <p className="text-white">用戶{i}</p>
                            <p className="text-xs text-slate-400">user{i}@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            i === 1
                              ? "bg-red-500/20 text-red-400"
                              : i === 2
                                ? "bg-blue-500/20 text-blue-400"
                                : i === 3
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {i === 1 ? "管理員" : i === 2 ? "版主" : i === 3 ? "教師" : "學生"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">2023/06/{10 + i}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            編輯角色
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            移除
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
