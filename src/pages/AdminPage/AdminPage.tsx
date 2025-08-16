import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg";
import { Button } from "@/components/ui/button";
import { type ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

// 後台 管理員 頁面 子頁面
import AnnouncementsPage from "./AdminSubPages/AnnouncementsPage";
import CommentsPage from "./AdminSubPages/CommentsPage";
import DashboardPage from "./AdminSubPages/DashboardPage";
import ProblemsAddPage from "./AdminSubPages/ProblemsAddPage";
import ProblemsStatusPage from "./AdminSubPages/ProblemsStatusPage";
import ReportsPage from "./AdminSubPages/ReportsPage";
import SettingsPage from "./AdminSubPages/SettingsPage";
import UsersPage from "./AdminSubPages/UsersPage";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/redux/store/app";
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
  X,
} from "lucide-react";
import { useSelector } from "react-redux";

// 定義類型
interface NavItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

// 定義後台頁面名稱
const ADMIN_PAGES = {
  dashboard: "dashboard",
  users: "users",
  comments: "comments",
  problemsAdd: "problemsAdd",
  problemsStatus: "problemsStatus",
  reports: "reports",
  announcements: "announcements",
  settings: "settings",
} as const;

type AdminPage = keyof typeof ADMIN_PAGES;

export default function AdminPage() {
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.authSlice);

  const [activeTab, setActiveTab] = useState<AdminPage>(ADMIN_PAGES.dashboard);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userName = useMemo(() => user?.name || "User", [user]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* 側邊導航欄 */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-800 border-r border-blue-400/20 transition-all duration-300 flex flex-col`}
      >
        <div
          className={`${sidebarOpen ? "justify-between" : "justify-center"} p-4 border-b border-blue-400/20 flex items-center`}
        >
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <MathCatLogo className="w-full h-auto" />
              <span className="  text-lg">{t("adminPage.title")}</span>
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
            active={activeTab === ADMIN_PAGES.dashboard}
            onClick={() => setActiveTab(ADMIN_PAGES.dashboard)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Users size={20} />}
            label={t("navigate.admin.users")}
            active={activeTab === ADMIN_PAGES.users}
            onClick={() => setActiveTab(ADMIN_PAGES.users)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<MessageSquare size={20} />}
            label={t("navigate.admin.comments")}
            active={activeTab === ADMIN_PAGES.comments}
            onClick={() => setActiveTab(ADMIN_PAGES.comments)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<PlusCircle size={20} />}
            label={t("navigate.admin.problemsAdd")}
            active={activeTab === ADMIN_PAGES.problemsAdd}
            onClick={() => setActiveTab(ADMIN_PAGES.problemsAdd)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<CheckCircle size={20} />}
            label={t("navigate.admin.problemsStatus")}
            active={activeTab === ADMIN_PAGES.problemsStatus}
            onClick={() => setActiveTab(ADMIN_PAGES.problemsStatus)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Flag size={20} />}
            label={t("navigate.admin.reports")}
            active={activeTab === ADMIN_PAGES.reports}
            onClick={() => setActiveTab(ADMIN_PAGES.reports)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Bell size={20} />}
            label={t("navigate.admin.announcements")}
            active={activeTab === ADMIN_PAGES.announcements}
            onClick={() => setActiveTab(ADMIN_PAGES.announcements)}
            collapsed={!sidebarOpen}
          />
          <NavItem
            icon={<Settings size={20} />}
            label={t("navigate.admin.settings")}
            active={activeTab === ADMIN_PAGES.settings}
            onClick={() => setActiveTab(ADMIN_PAGES.settings)}
            collapsed={!sidebarOpen}
          />
        </div>
      </div>

      {/* 主要內容區域 */}
      <div className="flex-1 overflow-auto">
        {/* 頂部導航欄 */}
        <header className="bg-slate-800 border-b border-blue-400/20 p-4 flex items-center justify-between">
          <h1 className="text-xl  ">{t(`navigate.admin.${activeTab}`)}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-200">{userName}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-blue-600/20">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <span className=" ">{userName.charAt(0) || "U"}</span>
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
                    <p className="text-sm font-medium leading-none text-white">{userName}</p>
                    <p className="text-xs leading-none text-blue-200">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-blue-400/20" />
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("adminPage.menuItem.userInfo")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>{t("adminPage.menuItem.userStatistics")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-200 hover:bg-slate-700 hover:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("adminPage.menuItem.accountSettings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-blue-400/20" />
                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20 hover:text-red-300">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("header.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* 內容區域 */}
        <main className="p-6">
          {activeTab === ADMIN_PAGES.dashboard && <DashboardPage />}
          {activeTab === ADMIN_PAGES.users && <UsersPage />}
          {activeTab === ADMIN_PAGES.comments && <CommentsPage />}
          {activeTab === ADMIN_PAGES.problemsAdd && <ProblemsAddPage />}
          {activeTab === ADMIN_PAGES.problemsStatus && <ProblemsStatusPage />}
          {activeTab === ADMIN_PAGES.reports && <ReportsPage />}
          {activeTab === ADMIN_PAGES.announcements && <AnnouncementsPage />}
          {activeTab === ADMIN_PAGES.settings && <SettingsPage />}
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
      className={`w-full flex items-center px-4 py-3 cursor-pointer ${
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
