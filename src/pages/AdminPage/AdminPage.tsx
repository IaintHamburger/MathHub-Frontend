import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg";
import { Button } from "@/components/ui/button";
import { type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import AnnouncementsPage from "./adminPages/AnnouncementsPage";
import CommentsPage from "./adminPages/CommentsPage";
import DashboardPage from "./adminPages/DashboardPage";
import ProblemsAddPage from "./adminPages/ProblemsAddPage";
import ProblemsStatusPage from "./adminPages/ProblemsStatusPage";
import ReportsPage from "./adminPages/ReportsPage";
import SettingsPage from "./adminPages/SettingsPage";
import UsersPage from "./adminPages/UsersPage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Bell,
  CheckCircle,
  Flag,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  Users,
  X
} from "lucide-react";

// 定義類型
interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

export default function AdminPage() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* 側邊導航欄 */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-800 border-r border-blue-400/20 transition-all duration-300 flex flex-col`}
      >
        <div className={`${sidebarOpen ? "justify-between" : "justify-center"} p-4 border-b border-blue-400/20 flex items-center`}>
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <MathCatLogo className="w-full h-auto"/>
              <span className="font-bold text-lg">{t("adminPage.title")}</span>
            </div>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-200 hover:text-white hover:bg-blue-600/20"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <div className="flex-1 py-4 space-y-1">
          <NavItem
            icon={<Home size={20} />}
            label={t("navigate.admin.dashboard")}
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Users size={20} />}
            label={t("navigate.admin.users")}
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<MessageSquare size={20} />}
            label={t("navigate.admin.comments")}
            active={activeTab === "comments"}
            onClick={() => setActiveTab("comments")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label={t("navigate.admin.problemsAdd")}
            active={activeTab === "problems-add"}
            onClick={() => setActiveTab("problems-add")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<CheckCircle size={20} />}
            label={t("navigate.admin.problemsStatus")}
            active={activeTab === "problems-status"}
            onClick={() => setActiveTab("problems-status")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Flag size={20} />}
            label={t("navigate.admin.reports")}
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Bell size={20} />}
            label={t("navigate.admin.announcements")}
            active={activeTab === "announcements"}
            onClick={() => setActiveTab("announcements")}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Settings size={20} />}
            label={t("navigate.admin.settings")}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            collapsed={!sidebarOpen}
          />
        </div>
      </div>

      {/* 主要內容區域 */}
      <div className="flex-1 overflow-auto">
        {/* 頂部導航欄 */}
        <header className="bg-slate-800 border-b border-blue-400/20 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {activeTab === "dashboard" && "儀表板"}
            {activeTab === "users" && "帳號管理"}
            {activeTab === "comments" && "留言管理"}
            {activeTab === "problems-add" && "審題/新增題目"}
            {activeTab === "problems-status" && "修改題目狀態"}
            {activeTab === "reports" && "檢舉審核"}
            {activeTab === "announcements" && "公告編輯"}
            {activeTab === "settings" && "系統設定"}
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-200">管理員</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="font-bold">A</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-800 border-blue-400/20"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">管理員</p>
                    <p className="text-xs leading-none text-blue-200">admin@mathhub.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-blue-400/20" />
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>個人資料</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>解題統計</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>帳號設定</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-blue-400/20" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>登出</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* 內容區域 */}
        <main className="p-6">
          {activeTab === "dashboard" && <DashboardPage />}
          {activeTab === "users" && <UsersPage />}
          {activeTab === "comments" && <CommentsPage />}
          {activeTab === "problems-add" && <ProblemsAddPage />}
          {activeTab === "problems-status" && <ProblemsStatusPage />}
          {activeTab === "reports" && <ReportsPage />}
          {activeTab === "announcements" && <AnnouncementsPage />}
          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

// 導航項目組件
function NavItem({ icon, label, active, onClick, collapsed }: NavItemProps) {
  return (
    <button
      type="button"
      className={`w-full flex items-center px-4 py-3 ${
        active
          ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
          : "text-blue-200 border-l-4 border-transparent hover:bg-slate-700"
      } transition-colors`}
      onClick={onClick}
    >
      <span className={collapsed ? "mx-auto" : "mr-3"}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
