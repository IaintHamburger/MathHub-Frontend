import { useNavigate } from "react-router-dom";

/**
 * 通用導航 hook
 * 提供統一的頁面導航功能
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    // 認證相關
    goToLogin: () => navigate("/login"),
    goToRegister: () => navigate("/register"),
    goToHome: () => navigate("/"),

    // 主要功能頁面
    goToDailyProblem: () => navigate("/dailyProblem"),
    goToProblems: () => navigate("/problems"),
    goToConcepts: () => navigate("/concepts"),
    goToLeaderBoard: () => navigate("/leaderBoard"),
    goToAnnouncements: () => navigate("/announcements"),
    goToPlayground: () => navigate("/playground"),

    // 支援頁面
    goToFaqs: () => navigate("/faqs"),
    goToReportIssue: () => navigate("/reportIssue"),
    goToAbout: () => navigate("/about"),

    // 管理頁面
    goToAdmin: () => navigate("/admin"),

    // 通用導航
    goTo: (path: string) => navigate(path),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),

    // 替換當前頁面（不會留下瀏覽記錄）
    replace: (path: string) => navigate(path, { replace: true }),
  };
};
