import { type ComponentType, lazy } from "react";

// 懶加載組件
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const DailyProblemPage = lazy(() => import("@/pages/DailyProblemPage/DailyProblemPage"));
const ProblemsPage = lazy(() => import("@/pages/ProblemsPage/ProblemsPage"));
const ProblemsDetailPage = lazy(() => import("@/pages/ProblemsPage/ProblemsDetailPage"));
const ConceptsPage = lazy(() => import("@/pages/ConceptsPage/ConceptsPage"));
const ConceptsDetailPage = lazy(() => import("@/pages/ConceptsPage/ConceptsDetailPage"));
const LeaderBoardPage = lazy(() => import("@/pages/LeaderBoardPage/LeaderBoardPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage/AnnouncementsPage"));
const FaqsPage = lazy(() => import("@/pages/FaqsPage/FaqsPage"));
const ReportIssuePage = lazy(() => import("@/pages/ReportIssuePage/ReportIssuePage"));

const MaintenancePage = lazy(() => import("@/pages/MaintenancePage/MaintenancePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage/AboutPage"));
const PlaygroundPage = lazy(() => import("@/pages/PlaygroundPage/PlaygroundPage"));

const RegisterPage = lazy(() => import("@/pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));

const AdminPage = lazy(() => import("@/pages/AdminPage/AdminPage"));

// 路由配置介面
export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<ComponentType>;
  requireAuth?: boolean;
  redirectTo?: string;
  title?: string;
  description?: string;
  permissions?: string[];
}

// 路由配置
export const routes: RouteConfig[] = [
  // 公開路由
  {
    path: "/",
    element: HomePage,
    title: "首頁",
    description: "MathHub 首頁",
  },
  {
    path: "/dailyProblem",
    element: DailyProblemPage,
    title: "每日一題",
    description: "每日一題",
  },
  {
    path: "/problems",
    element: ProblemsPage,
    title: "題目",
    description: "數學題目",
  },
  {
    path: "/problems/:problemId",
    element: ProblemsDetailPage,
    title: "題目內容",
    description: "數學題目內容",
  },
  {
    path: "/concepts",
    element: ConceptsPage,
    title: "觀念",
    description: "數學觀念",
  },
  {
    path: "/concepts/:conceptId",
    element: ConceptsDetailPage,
    title: "觀念內容",
    description: "數學觀念內容",
  },
  {
    path: "/leaderBoard",
    element: LeaderBoardPage,
    title: "排行榜",
    description: "數學排行榜",
  },
  {
    path: "/announcements",
    element: AnnouncementsPage,
    title: "公告",
    description: "系統公告",
  },
  {
    path: "/faqs",
    element: FaqsPage,
    title: "常見問題",
    description: "常見問題",
  },
  {
    path: "/reportIssue",
    element: ReportIssuePage,
    title: "問題回報",
    description: "問題回報",
  },

  //
  {
    path: "/maintenance",
    element: MaintenancePage,
    title: "系統維護",
    description: "系統維護",
  },
  {
    path: "/about",
    element: AboutPage,
    title: "關於我們",
    description: "關於我們",
  },
  {
    path: "/playground",
    element: PlaygroundPage,
    title: "遊樂場",
    description: "數學遊樂場",
  },

  // 登入頁面（已登入用戶不能訪問）
  {
    path: "/login",
    element: LoginPage,
    title: "登入",
    description: "用戶登入",
  },
  // 註冊頁面（已登入用戶不能訪問）
  {
    path: "/register",
    element: RegisterPage,
    title: "註冊",
    description: "用戶註冊",
  },

  // 後臺權限路由
  {
    path: "/admin",
    element: AdminPage,
    // requireAuth: true,
    permissions: ["admin"],
    title: "後臺",
    description: "後臺管理",
  },
];

// 根據路徑獲取路由配置
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return routes.find((route) => {
    // 處理動態路由參數
    if (route.path.includes(":")) {
      const routePathParts = route.path.split("/");
      const pathParts = path.split("/");

      if (routePathParts.length !== pathParts.length) {
        return false;
      }

      return routePathParts.every((part, index) => {
        return part.startsWith(":") || part === pathParts[index];
      });
    }

    return route.path === path;
  });
};

// 檢查路由是否需要權限
export const isRouteProtected = (path: string): boolean => {
  const config = getRouteConfig(path);
  return config?.requireAuth || false;
};

// 獲取路由重定向路徑
export const getRouteRedirect = (path: string): string | undefined => {
  const config = getRouteConfig(path);
  return config?.redirectTo;
};
