import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type React from "react";
import { useState } from "react";

import { ReactComponent as MathCat } from "@/assets/logo/MathCat.svg";

import { ChevronDown, LogIn, User } from "lucide-react";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="flex items-center space-x-2 hover:bg-transparent" asChild>
            <a href="/">
              <MathCat />
            </a>
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-blue-300">
          <a href="/dailyProblem" className="hover:text-blue-400 transition-colors">
            每日一題
          </a>
          <a href="/problems" className="hover:text-blue-400 transition-colors">
            題目
          </a>
          <a href="/concepts" className="hover:text-blue-400 transition-colors">
            觀念
          </a>
          <a href="/leaderboard" className="hover:text-blue-400 transition-colors">
            排行榜
          </a>
          <a href="/announcements" className="hover:text-blue-400 transition-colors">
            公告
          </a>
          <div className="relative group">
            <button type="button" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
              <span>支援</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-blue-400/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="/faqs"
                className="block px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-t-lg transition-colors"
              >
                FAQ
              </a>
              <a
                href="/reportIssue"
                className="block px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-b-lg transition-colors"
              >
                問題回報
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="w-4 h-4 mr-1" />
                {user?.name || '用戶'}
              </Button>
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-blue-400/20 rounded-lg shadow-lg z-50">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 transition-colors"
                  >
                    登出
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
                asChild
              >
                <a href="/register">
                  <User className="w-4 h-4 mr-1" />
                  註冊
                </a>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/login">
                  <LogIn className="w-4 h-4 mr-1" />
                  登入
                </a>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
