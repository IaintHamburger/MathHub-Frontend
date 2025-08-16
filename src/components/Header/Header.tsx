import { ChevronDown, LogIn, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/hooks/useNavigation";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const {
    goToHome,
    goToDailyProblem,
    goToProblems,
    goToConcepts,
    goToLeaderBoard,
    goToAnnouncements,
    goToFaqs,
    goToReportIssue,
    goToRegister,
    goToLogin,
  } = useNavigation();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-[100px] flex items-center cursor-pointer">
          <MathCatLogo className="mx-auto" onClick={goToHome} />
        </div>
        <div className="hidden md:flex items-center space-x-6 text-blue-300">
          <button
            type="button"
            onClick={goToDailyProblem}
            className="hover:text-blue-400 transition-colors"
          >
            {t("navigate.dailyProblem")}
          </button>
          <button
            type="button"
            onClick={goToProblems}
            className="hover:text-blue-400 transition-colors"
          >
            {t("navigate.problems")}
          </button>
          <button
            type="button"
            onClick={goToConcepts}
            className="hover:text-blue-400 transition-colors"
          >
            {t("navigate.concepts")}
          </button>
          <button
            type="button"
            onClick={goToLeaderBoard}
            className="hover:text-blue-400 transition-colors"
          >
            {t("navigate.leaderboard")}
          </button>
          <button
            type="button"
            onClick={goToAnnouncements}
            className="hover:text-blue-400 transition-colors"
          >
            {t("navigate.announcements")}
          </button>
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
            >
              <span>{t("navigate.supports")}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-blue-400/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button
                type="button"
                onClick={goToFaqs}
                className="block w-full text-left px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-t-lg transition-colors"
              >
                {t("navigate.faqs")}
              </button>
              <button
                type="button"
                onClick={goToReportIssue}
                className="block w-full text-left px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 rounded-b-lg transition-colors"
              >
                {t("navigate.reportIssue")}
              </button>
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
                {user?.name || t("header.user")}
              </Button>
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-blue-400/20 rounded-lg shadow-lg z-50">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-blue-300 hover:text-blue-400 hover:bg-slate-700/50 transition-colors"
                  >
                    {t("header.logout")}
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
                onClick={goToRegister}
              >
                <User className="w-4 h-4 mr-1" />
                {t("header.register")}
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={goToLogin}>
                <LogIn className="w-4 h-4 mr-1" />
                {t("header.login")}
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
